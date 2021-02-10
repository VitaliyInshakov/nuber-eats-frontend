import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

import FormError from "../components/form-error";
import { LoginMutation, LoginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginInput: LoginDto!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const { register, errors, handleSubmit, watch } = useForm<ILoginForm>();
    const onCompleted = (data: LoginMutation) => {
        const { login: { ok, token } } = data;
        if (ok) {
            console.log(token);
        }
    };
    const [loginMutation, { loading, data }] = useMutation<LoginMutation, LoginMutationVariables>(
        LOGIN_MUTATION, {
        variables: {
            loginInput: {
                email: watch("email"),
                password: watch("password"),
            }
        },
        onCompleted,
    });
    const onSubmit = () => {
        if (!loading) {
            loginMutation();
        }
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
                    {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
                    <input
                        className="input"
                        placeholder="Password"
                        ref={register({ required: "Password is required" })}
                        type="password"
                        name="password"
                    />
                    {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
                    <button
                        className="button"
                    >{loading ? "Loading..." : "Log In"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;