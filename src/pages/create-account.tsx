import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Helmet from "react-helmet";

import FormError from "../components/form-error";
import Button from "../components/button";
import logo from "../images/logo.svg";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { data } from "autoprefixer";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountDto!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

const CreateAccount = () => {
    const {
        register,
        errors,
        handleSubmit,
        watch,
        formState,
    } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Client,
        },
    });

    const history = useHistory();
    const onCompleted = (data: createAccountMutation) => {
        const { createAccount: { ok, error } } = data;

        if (ok) {
            history.push("/login");
        }
    };

    const [createAccountMutation, { loading, data }] = useMutation<createAccountMutation, createAccountMutationVariables>(
        CREATE_ACCOUNT_MUTATION, {
            variables: {
                createAccountInput: {
                    email: watch("email"),
                    password: watch("password"),
                    role: watch("role"),
                }
            },
            onCompleted,
        });
    const onSubmit = () => {
        if (!loading) {
            createAccountMutation();
        }
    };

    return (
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <Helmet>
                <title>Create Account | Nuber Eats</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <img src={logo} className="w-52 mb-10" alt="logo" />
                <h4 className="w-full font-medium text-left text-3xl mb-5">
                    Let's get started
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
                    <select
                        name="role"
                        className="input"
                        ref={register({ required: true })}
                    >
                        {Object.keys(UserRole).map((role, index) => <option key={index}>{role}</option>)}
                    </select>
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText="Create account"
                    />
                    {data?.createAccount.error && <FormError errorMessage={data.createAccount.error} />}
                </form>
                <div>
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-lime-600 hover:underline">
                        Log in now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;