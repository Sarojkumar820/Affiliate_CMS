<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\Admin;
use App\Models\User;

class AdminAuthController extends Controller
{
    public function sendOtp(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|numeric|digits:10',
            ]);

            $phone = $request->phone;

            // Create or find user
            $admin = Admin::firstOrCreate(['phone' => $phone]);

            // Generate OTP
            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $otpExpiresAt = now()->addMinutes(5);

            $admin->update([
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
                'phone' => substr($phone, 0, 3) . 'XXXXX' . substr($phone, -2),

            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|digits:10',
            'otp' => 'required|numeric|digits:6'
        ]);

        $admin = Admin::where('phone', $request->phone)->first();

        if (!$admin) {
            return response()->json(['error' => 'Invalid OTP or OTP expired'], 401);
        }
        if (now()->gt($admin->otp_expires_at)) {
            return response()->json([
                'status' => false,
                'message' => 'The OTP has expired. Please request a new one.'
            ], 401);
        }

        // Then check OTP match
        if ($admin->otp !== $request->otp) {
            return response()->json([
                'status' => false,
                'message' => 'The entered OTP is invalid. Please try again.'
            ], 401);
        }

        $admin->update(['is_verified' => true, 'otp' => null, 'otp_expires_at' => null]);
        $token = JWTAuth::fromUser($admin);

        return response()->json([
            'status' => true,
            'message' => 'OTP Verified Successfully, welcome to your Dashboard.',
            'token' => $token,
        ], 200);
    }

    public function adminlogin(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Find admin by email
        $admin = Admin::where('email', $validated['email'])->first();

        if (!$admin || !Hash::check($validated['password'], $admin->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate OTP and set expiration time
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $otpExpiresAt = now()->addMinutes(10);

        // Update OTP and expiration time in the database
        $admin->update([
            'otp' => $otp,
            'otp_expires_at' => $otpExpiresAt,
            'is_verified' => false
        ]);

        try {
            // Prepare email content
            $emailContent = "Admin Login Verification\n\n"
                . "Your One-Time Password (OTP) for admin login is: $otp\n\n"
                . "This OTP is valid for 10 minutes. Do not share it.\n\n"
                . "If you didn't request this, please ignore this email.\n\n"
                . "Thanks,\n"
                . "The Team";

            // Send OTP via email
            Mail::raw($emailContent, function ($message) use ($admin) {
                $message->to($admin->email)->subject('Your User Login OTP');
            });

            return response()->json([
                'status' => 'success',
                'message' => 'OTP sent successfully, Please check your Email',
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
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired OTP'
            ], 401);
        }

        if (now()->gt($admin->otp_expires_at)) {
            return response()->json([
                'status' => false,
                'message' => 'OTP has expired, Please request a new One'
            ], 401);
        }

        // Then verify OTP match
        if ($admin->otp !== $request->otp) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid OTP, Please try again'
            ], 401);
        }

        // Mark as verified and clear OTP
        $admin->update([
            'is_verified' => true,
            'otp' => null,
            'otp_expires_at' => null,
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($admin);

        return response()->json([
            'status' => 'success',
            'message' => 'OTP Verified Successfully, welcome to your Dashboard',
            'access_token' => $token,

        ]);
    }

    public function dashboard()
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return response()->json([
                'status'  => false,
                'message' => 'Unauthorized access.',
            ], 403);
        }

        $response = [
            'status'  => true,
            'message' => 'Dashboard data retrieved successfully.',
            'data'    => []
        ];

        switch ($admin->role) {
            case 1: // Super Admin - sees all admin roles
                $response['data'] = [
                    'admins' => Admin::whereIn('role', [1, 2, 3])->get(),
                ];
                break;

            case 2: // Support Executive - sees own admin role + all users
                $response['data'] = [
                    'admins' => Admin::where('role', 2)->get(),
                    'users'  => User::all(),
                ];
                break;

            case 3: // Accounts - sees only own role
                $response['data'] = [
                    'admins' => Admin::where('role', 3)->get(),
                ];
                break;

            default:
                return response()->json([
                    'status'  => false,
                    'message' => 'Invalid role assigned.',
                ], 403);
        }

        return response()->json($response, 200);
    }
    public function logout()
    {
        try {
            Auth::guard('admin')->logout();

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
