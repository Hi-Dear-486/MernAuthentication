"use client";
import { useAuth } from "@/app/context/UserContext";
import { otpAuth } from "@/lib/api/authentication";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OTPForm = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, userDetails } =
    useAuth();

  const { email, phone } = userDetails;
  let navigateTo = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    const payload = { email, otp: enteredOtp, phone };
    otpAuth(payload, setIsAuthenticated, setUser);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo.push("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            OTP Verification
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Enter the 5-digit OTP sent to your registered email or phone.
          </p>
          <form onSubmit={handleOtpVerification} className="mt-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OTPForm;
