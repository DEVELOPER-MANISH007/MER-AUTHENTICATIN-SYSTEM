import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true; //provided cookie from backend to frontend
  const { backendUrl, getUserData, isLoggedin, userData } =
    useContext(AppContext);
  const inputRefs = React.useRef([]);
  const submittingRef = React.useRef(false);

  const navigate = useNavigate();

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text =
      (e.clipboardData || window.clipboardData).getData("text") || "";
    const digits = text.replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    digits.split("").forEach((ch, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = ch;
    });
    const next = inputRefs.current[Math.min(digits.length, 5)];
    if (next) next.focus();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (submittingRef.current) return;
      submittingRef.current = true;
      const otpArray = inputRefs.current
        .slice(0, 6)
        .map((el) => (el && el.value ? el.value.trim() : ""));
      const otp = otpArray.join("");
      if (!/^\d{6}$/.test(otp)) {
        toast.error("Please enter a valid 6-digit OTP");
        submittingRef.current = false;
        return;
      }
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
        submittingRef.current = false;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      submittingRef.current = false;
    }
  };

useEffect(() => {
  if (isLoggedin && userData && userData.isAccountVerified) {
    navigate('/');
  }
}, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm  "
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify Otp
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          {" "}
          Enter 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between  mb-8 " onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                key={index}
                maxLength={1}
                type="text"
              />
            ))}
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          type="submit"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
