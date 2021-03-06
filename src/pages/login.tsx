import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";

import FormError from "../components/form-error";
import Button from "../components/button";
import { LoginMutation, LoginMutationVariables } from "../__generated__/LoginMutation";
import logo from "../images/logo.svg";
import { authToken, isLoggedInvar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

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
    const {
        register,
        errors,
        handleSubmit,
        watch,
        formState,
    } = useForm<ILoginForm>({ mode: "onChange"});
    const onCompleted = (data: LoginMutation) => {
        const { login: { ok, token } } = data;
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authToken(token);
            isLoggedInvar(true);
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
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <Helmet>
                <title>Login | Nuber Eats</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={logo} className="w-52 mb-10" alt="logo" />
                <h4 className="w-full font-medium text-left text-3xl mb-5">
                    Welcome back
                </h4>
                <form className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="input"
                        placeholder="Email"
                        ref={register({
                            required: "Email is required",
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        type="email"
                        name="email"
                    />
                    {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
                    {errors.email?.type === "pattern" && <FormError errorMessage="Please enter a valid email" />}
                    <input
                        className="input"
                        placeholder="Password"
                        ref={register({ required: "Password is required" })}
                        type="password"
                        name="password"
                    />
                    {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText="Log in"
                    />
                    {data?.login.error && <FormError errorMessage={data.login.error} />}
                </form>
                <div>
                    New to Nuber?&nbsp;
                    <Link to="/create-account" className="text-lime-600 hover:underline">
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;