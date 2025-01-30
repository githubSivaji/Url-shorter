import { useState } from "react";
import React from 'react';
import TextField from "./TextField";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../components/api';
import toast from 'react-hot-toast';

const Forgot = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
        },
        mode: "onTouched",
    });

    const forgotHandler = async (data) => {
        setLoader(true);
        try {
            const response = await api.post("/accounts/forgot", data);
            console.log(response);
            toast.success("Check your Gmail inbox for the reset link!");
            setLoader(false);
            reset(); // Optionally reset form fields after successful submission
        } catch (error) {
            console.error(error?.response?.data || error.message || "Login Failed!");
            toast.error("Failed email Not match!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(forgotHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <h1 className="text-left font-serif text-red-500 font-bold lg:text-3xl text-2xl">
                    Forgot Password 
                </h1>
                <p className="text-center mt-4 mb-3 text-sm">
                    Don't worry, we'll send you a password reset link.
                </p>

                <hr className="mt-2 mb-5 text-black" />

                <div className="flex flex-col gap-3">
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
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

export default Forgot;
