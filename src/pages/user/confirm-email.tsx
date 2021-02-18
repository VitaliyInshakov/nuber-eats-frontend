import React, { useEffect } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";

import { verifyEmail, verifyEmailVariables } from "../../__generated__/verifyEmail";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailDto!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`;

const ConfirmEmail = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const onCompleted = (data: verifyEmail) => {
        const { verifyEmail: { ok } } = data;

        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData?.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                },
            });
        }
    };
    const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
        onCompleted,
    });

    useEffect(() => {
        const [_, token] = window.location.href.split("code=");
        verifyEmail({
            variables: {
                input: {
                    code: token,
                },
            },
        });
    }, []);

    return (
        <div className="mt-52 flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium">Confirming email...</h2>
            <h4 className="text-gray-700 text-sm">Please wait, don't close this page...</h4>
        </div>
    );
}

export default ConfirmEmail;