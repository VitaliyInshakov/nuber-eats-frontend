import React from "react";

import { isLoggedInvar } from "../apollo";

export const LoggedOutRouter = () => {
    return (
        <div>
            <h1>Logged Out</h1>
            <button onClick={() => isLoggedInvar(true)}>Click to login</button>
        </div>
    );
};