<?php

namespace App\Http\Controllers\Auth\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserAuthController extends Controller
{
    public function sendOtp(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|numeric|digits:10',
            ]);

            $phone = $request->phone;

            // Create or find user
            $user = User::firstOrCreate(['phone' => $phone]);

            // Generate OTP
            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $otpExpiresAt = now()->addMinutes(5);

            $user->update([
                'otp' => $otp,
                'otp_expires_at' => $otpExpiresAt,
                'is_verified' => false,
            ]);

            // Message
            $message = "$otp is your Antworks Account verification code - ANTWORKS";

            // Send via SMS gateway
            $response = Http::asForm()->withOptions([
                // 'verify' => false,
            ])->post(config('services.sms_gateway.url'), [
                'username' => config('services.sms_gateway.username'),
                'hash'     => config('services.sms_gateway.hash'),
                'numbers'  => $phone,
                'sender'   => config('services.sms_gateway.sender'),
                'message'  => rawurlencode($message),
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'status' => false,
                    'message' => 'OTP generated but failed to send SMS',
                ], 500);
            }

            return response()->json([
                'status' => true,
                'message' => 'OTP sent successfully',
                'data' => [
                    'phone' => substr($phone, 0, 3) . 'XXXXX' . substr($phone, -2),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }
    // Verify OTP and Handle Registration/Login
    public function verifyOtp(Request $request)
    {
        try {
            // Validate the incoming request data
            $request->validate([
                'phone' => 'required|numeric|digits:10',
                'otp' => 'required|numeric|digits:6',
            ]);

            // Find user by phone number
            $user = User::where('phone', $request->phone)->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found'
                ], 404);
            }

            // Check if OTP has expired
            if (now()->gt($user->otp_expires_at)) {
                return response()->json([
                    'status' => false,
                    'message' => 'The OTP has expired. Please request a new one.'
                ], 401);
            }

            // Check if OTP matches
            if ($user->otp !== $request->otp) {
                return response()->json([
                    'status' => false,
                    'message' => 'The entered OTP is invalid. Please try again.'
                ], 401);
            }

            // OTP is valid and not expired, mark user as verified
            $user->update([
                'is_verified' => true,
                'otp' => null,
                'otp_expires_at' => null,
            ]);

            // If user already registered (has email), log them in with JWT token
            if ($user->email) {
                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'status' => true,
                    'message' => 'OTP Verified Successfully',
                    'registration_key' => 1, // 1 => Redirect to Dashboard
                    'token' => $token,
                ], 200);
            }

            // If user has no email, prompt them to complete registration
            return response()->json([
                'status' => true,
                'message' => 'OTP verified Successfully',
                'registration_key' => 2, // 2 => Redirect to registration form
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while verifying OTP',
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            // Step 1: Retrieve user by phone
            $user = User::where('phone', $request->phone)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User with this phone number not found.',
                ], 404);
            }

            // Step 2: Validate input
            $validated = $request->validate([
                'phone' => 'required|numeric|digits:10|exists:users,phone',
                'full_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'user_type' => 'required|in:1,2',
                'gender' => 'required|in:Male,Female,Other',
                'dob_or_incorporation' => 'required|date',
                'gst_details' => 'nullable|string|max:20',
                'aadhaar_number' => 'required|digits:12',
                'pan_number' => 'required|string|size:10|regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
                'address_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                'identity_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                'profile_logo' => 'required|file|image|mimes:jpg,jpeg,png|max:2048',
                'address_line' => 'required|string|max:255',
                'state' => 'required|string|max:100',
                'city' => 'required|string|max:100',
                'pincode' => 'required|string|digits:6',
            ]);

            $password = $this->generateStrongPassword(16); // 16-character strong password
            $user->password = Hash::make($password);

            // Step 4: Fill user fields
            $user->full_name = $validated['full_name'];
            $user->email = strtolower(trim($validated['email']));
            $user->user_type = $validated['user_type'];
            $user->gender = $validated['gender'];
            $user->dob_or_incorporation = $validated['dob_or_incorporation'];
            $user->gst_details = $validated['gst_details'] ?? null;
            $user->aadhaar_number = $validated['aadhaar_number'];
            $user->pan_number = $validated['pan_number'];
            $user->address_line = $validated['address_line'];
            $user->state = $validated['state'];
            $user->city = $validated['city'];
            $user->pincode = $validated['pincode'];

            // Handle address proof upload
            if ($request->hasFile('address_proof')) {
                if ($user->address_proof && Storage::disk('public')->exists($user->address_proof)) {
                    Storage::disk('public')->delete($user->address_proof);
                }

                $addressFile = $request->file('address_proof');
                $folder = 'address_proof/' . $user->id;
                $filename = time() . '_' . $addressFile->getClientOriginalName();
                $addressFile->storeAs($folder, $filename, 'public');
                $user->address_proof = $folder . '/' . $filename;
            }

            // Handle identity proof upload
            if ($request->hasFile('identity_proof')) {
                if ($user->identity_proof && Storage::disk('public')->exists($user->identity_proof)) {
                    Storage::disk('public')->delete($user->identity_proof);
                }

                $identityFile = $request->file('identity_proof');
                $folder = 'identity_proof/' . $user->id;
                $filename = time() . '_' . $identityFile->getClientOriginalName();
                $identityFile->storeAs($folder, $filename, 'public');
                $user->identity_proof = $folder . '/' . $filename;
            }

            // Handle profile logo upload
            if ($request->hasFile('profile_logo')) {
                if ($user->profile_logo && Storage::disk('public')->exists($user->profile_logo)) {
                    Storage::disk('public')->delete($user->profile_logo);
                }

                $logoFile = $request->file('profile_logo');
                $folder = 'profile_logo/' . $user->id;
                $filename = time() . '_' . $logoFile->getClientOriginalName();
                $logoFile->storeAs($folder, $filename, 'public');
                $user->profile_logo = $folder . '/' . $filename;
            }

            // Step 6: Send email with password
            try {
                $emailContent = "Dear {$user->full_name},\n\n"
                    . "Thank you for completing your registration.\n\n"
                    . "Here is your temporary password: $password\n\n"
                    . "Please log in and change your password immediately.\n\n"
                    . "Regards,\nYour Team";

                Mail::raw($emailContent, function ($message) use ($user) {
                    $message->to($user->email)
                        ->subject('Your Account Password');
                });
            } catch (\Exception $mailException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to send password email. Registration aborted.',
                ], 500);
            }

            // Step 7: Save user
            $user->save();
            // Step 8: Generate JWT token
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully. Password sent via Email.',
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    protected function generateStrongPassword($length = 16)
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        return substr(str_shuffle(str_repeat($characters, ceil($length / strlen($characters)))), 0, $length);
    }

    public function login(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Find user by email
        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
        // Generate OTP and set expiration time
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $otpExpiresAt = now()->addMinutes(10);

        // Update OTP and expiration time in the database
        $user->update([
            'otp' => $otp,
            'otp_expires_at' => $otpExpiresAt,
            'is_verified' => false
        ]);

        try {
            // Prepare email content
            $emailContent = "User Login Verification\n\n"
                . "Your One-Time Password (OTP) for User login is: $otp\n\n"
                . "This OTP is valid for 10 minutes. Do not share it.\n\n"
                . "If you didn't request this, please ignore this email.\n\n"
                . "Thanks,\n"
                . "The Team";

            // Send OTP via email
            Mail::raw($emailContent, function ($message) use ($user) {
                $message->to($user->email)
                    ->subject('Your User Login OTP');
            });

            return response()->json([
                'status' => 'success',
                'message' => 'OTP sent successfully, Please check your Email'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send OTP. Please try again.',
            ], 500);
        }
    }
    public function login_verify(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'otp' => 'required|string|digits:6',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found'
                ], 404);
            }

            // Check if OTP has expired first
            if (now()->gt($user->otp_expires_at)) {
                return response()->json([
                    'status' => false,
                    'message' => 'OTP has expired. Please request a new one.'
                ], 401);
            }

            // Then verify OTP match
            if ($user->otp !== $request->otp) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid OTP. Please try again.'
                ], 401);
            }

            // Mark as verified and clear OTP
            $user->update([
                'is_verified' => true,
                'otp' => null,
                'otp_expires_at' => null
            ]);

            // Generate JWT token
            $token = JWTAuth::fromUser($user);

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful, welcome to your Dashboard.',
                'access_token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to verify OTP',
            ], 500);
        }
    }
    // User Logout
    public function logout()
    {
        try {
            Auth::guard('user')->logout();

            return response()->json([
                'status' => true,
                'message' => 'Successfully logged out'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to logout'
            ], 500);
        }
    }
}
