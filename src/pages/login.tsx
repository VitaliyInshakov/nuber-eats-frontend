import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
    email?: string;
    password?: string;
}

const Login = () => {
    const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
    const onSubmit = () => {

    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
                <h3 className="text-2xl text-gray-800">Log In</h3>
                <form className="grid gap-3 mt-5 px-5" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="input"
                        placeholder="Email"
                        ref={register({ required: "Email is required" })}
                        type="email"
                        name="email"
                    />
                    {errors.email?.message &&
                        <span className="font-medium text-red-500">{errors.email?.message}</span>
                    }
                    <input
                        className="input"
                        placeholder="Password"
                        ref={register({ required: "Password is required" })}
                        type="password"
                        name="password"
                    />
                    {errors.password?.message &&
                    <span className="font-medium text-red-500">{errors.password?.message}</span>
                    }
                    <button
                        className="button"
                    >Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;