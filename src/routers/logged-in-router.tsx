import React from "react";

import { isLoggedInvar } from "../apollo";

export const LoggedInRouter = () => {
    return (
        <div>
            <h1>Logged In</h1>
            <button onClick={() => isLoggedInvar(false)}>Log Out</button>
        </div>
    );
};