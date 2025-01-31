import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../components/api';
import toast from 'react-hot-toast';
import PasswordResetInput from "./PasswordResetInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { token } = useParams(); // Destructure the token from useParams
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onTouched",
  });

  const forgotHandler = async (data) => {
    setLoader(true);
    try {
      const response = await api.post("/accounts/reset-password", { password: data.password, reset_token: token }); // Send token and password in body
      console.log(response);
      toast.success("Reset-Password Successful");
      setLoader(false);
      reset();
      navigate("/login");
       // Optionally reset form fields after successful submission
    } catch (error) {
      console.error(error?.response?.data || error.message || "Reset failed!");
      toast.error(error?.response?.data || error.message );
    } finally {
      setLoader(false);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password) || "Password must be at least 8 characters long, contain at least one letter, one number, and one special character";
  };

  const validateConfirmPassword = (value) => {
    const password = document.getElementById("password").value;
    return value === password || "Passwords do not match";
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form onSubmit={handleSubmit(forgotHandler)} className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
        <h1 className="text-left font-serif text-black font-bold lg:text-3xl text-2xl">
          Password Reset
        </h1>

        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">
          <PasswordResetInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
            validationRules={{
              required: "Password is required",
              validate: validatePassword,
            }}
          />

          <PasswordResetInput
            label="Confirm Password"
            id="confirmpassword"
            type="password"
            placeholder="Re-enter your password"
            register={register}
            error={errors.confirmpassword}
            validationRules={{
              required: "Confirm Password is required",
              validate: validateConfirmPassword,
            }}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
        >
          {loader ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
