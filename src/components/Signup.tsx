// import React from 'react'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import authService from "../appwrite/authService";
import { login } from "../store/authSlice";
import Logo from "./Logo";
import Input from "./Header/Input";
import Button from "./Header/Button";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const SignUp = async (data: any) => {
        setError("");
        console.log(error);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login(user));
                }
                navigate("/")
            }
        } catch (error: any) {
            console.log(1);
            setError(error.message);
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full py-8'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className='inline-block w-full max-w[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold'>
                    Sign Up to create  account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account ?&nbsp;
                    <Link
                        to={"/login"}
                        className='font-medium text-pretty transition-all duration-200 hover:underline'
                    >
                        Log in
                    </Link>
                </p>
                {/* if error found show it*/}
                {error && <p className='text-red-500 text-center'>{error}</p>}

                {/* main form */}
                <form onSubmit={handleSubmit(SignUp)} className='mt-8'>
                    <div className='space-y-5'>
                        {/* name input component */}
                        <Input
                            type="text"
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {/* email component */}
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                //validate : {matchPattern : (value)=> regex || error message} can also be used (used in Log in form)
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address"
                                }
                            })}
                        />
                        {/* password component */}
                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {/* submit button */}
                        <Button
                            type='submit'
                            className='w-full'
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup