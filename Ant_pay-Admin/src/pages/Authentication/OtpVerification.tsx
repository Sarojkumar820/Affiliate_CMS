import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import siteConfig from '../../util/siteConfig';
import { IoIosCloseCircle } from 'react-icons/io';
import axios from 'axios';

interface OtpVerificationProps {
  initialTimer?: number;
  loginType?: number;
  verificationData?: any;
  onSuccess?: (userName: string) => void;
  onFailure?: () => void;
  closeModal: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  initialTimer = 30,
  loginType,
  verificationData,
  onSuccess,
  onFailure,
  closeModal,
}) => {
  const [timer, setTimer] = useState<number>(initialTimer);
  const [updatedOtp, setUpdatedOtp] = useState<string>('');
  const [isOtpValid, setIsOtpValid] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal visibility state

  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null),
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { userData, mobileNumber } = location.state || {};
    // setVerificationData(userData);
    console.log(mobileNumber, 'Mobile number received');
  }, [location.state]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    const otpValue = inputRefs.map((ref) => ref.current?.value || '').join('');
    setUpdatedOtp(otpValue);
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && index > 0 && !event.currentTarget.value) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = () => {
    if (verificationData.mobileNumber) {
      handleVerifyOtp();
      // getUserData();
    } else {
      setIsOtpValid(false);
      setTimeout(() => setIsOtpValid(true), 10000);
    }
  };

  const handleVerifyOtp = async () => {
    const dataToPost = {
      phone: verificationData.mobileNumber,
      otp: updatedOtp,
    };

    try {
      const responseData = await axios.post(
        `${siteConfig.USER_VERIFY}`,
        dataToPost,
      );
      if (responseData.data.message === 'OTP verified Successfully') {
        if (
          responseData.data.registration_key === siteConfig.USER_NOT_REGISTERED
        ) {
          navigate('/auth/signup');
        } else if (
          responseData.data.registration_key ===
          siteConfig.USER_ALREADY_REGISTERED
        ) {
          localStorage.setItem(
            'mobileNumber',
            String(verificationData.mobileNumber),
          );
          navigate('/');
          closeModal();
        } else {
          // Optional: handle other cases or show error
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getOtp = async () => {
    // Add your OTP request logic here
  };

  const getUserData = async () => {
    // Add logic to fetch user data after successful OTP verification
  };

  return (
    <>
      {/* Modal with background blur */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={closeModal} // Close modal when clicking outside the modal
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
        >
          {/* Close Button with Icon */}
          <IoIosCloseCircle
            className="absolute top-2 cursor-pointer right-2 hover:text-gray-800 p-2 rounded-full"
            size={40}
            color="red"
            onClick={closeModal}
          />{' '}
          {/* icon */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm font-semibold text-black">
              We have sent an OTP verification code to your{' '}
              {loginType === 1 ? 'Mobile Number' : 'Email'} :-
              {verificationData.mobileNumber || verificationData.email}
            </p>
            <p className="text-md font-bold text-gray-700">Verify OTP</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex justify-center items-center mb-1">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    ref={ref}
                    type="text"
                    maxLength={1}
                    className="w-10 h-10 text-center font-bold bg-beige focus:outline-none focus:ring-2 focus:ring-blue-400 mx-1 border-2 border-gray-300 rounded-md"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-bold mt-4"
                onClick={verifyOtp}
              >
                Verify
              </button>
              {!isOtpValid && (
                <div className="text-red-500 text-sm">
                  Invalid OTP. Please try again.
                </div>
              )}
              <p className="mt-2">
                {timer === 0 ? (
                  <button className="text-blue-500" onClick={getOtp}>
                    Re-send OTP
                  </button>
                ) : (
                  <>Resend your OTP in {timer} sec.</>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
