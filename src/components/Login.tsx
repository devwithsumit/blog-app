import { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index";
import authService from '../appwrite/authService';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface FormInput {
    name?: string,
    email: string,
    password: string,
}
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormInput>()
    const [error, setError] = useState("");

    const Login = async (data: FormInput) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate('/')
            }
        } catch (error: any) {
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
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account ?&nbsp;
                    <Link
                        to={"/signup"}
                        className='font-medium text-pretty transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {/* if error found show it*/}
                {error && <p className='text-red-500 text-center'>{error}</p>}

                {/* main form for login */}
                <form onSubmit={handleSubmit(Login)} className='mt-8'>
                    <div className='space-y-5'>
                        {/* Email input component*/}
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"

                            {...register("email", {
                                required: true,
                                //pattern : {value: regex, message: error) can also be used (used in sign-up form)
                                validate: {
                                    matchPatter: (value) =>
                                        /* there should be no line breaks otherwise error warning !*/
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {/* Password Input component */}
                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login