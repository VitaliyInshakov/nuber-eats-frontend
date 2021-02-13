import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
export const isLoggedInvar = makeVar(!!token);
export const authToken = makeVar(token);

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authToken() || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInvar();
                        },
                    },
                    token: {
                        read() {
                            return authToken();
                        },
                    },
                },
            },
        },
    }),
});