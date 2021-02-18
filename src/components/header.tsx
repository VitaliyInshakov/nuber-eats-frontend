import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import { useMe } from "../hooks/useMe";

const Header: FC = () => {
    const { data } = useMe();

    return (
        <>
            {!data?.me.verified &&
                <div className="bg-red-500 p-3 text-center text-xs text-white">Please verify your email</div>
            }
            <header className="py-4">
                <div className="w-full px-5 xl:px-5 max-w-screen-xl mx-auto flex justify-between items-center">
                    <img src={logo} className="w-24" alt="logo" />
                    <span className="text-xs">
                    <Link to="/my-profile">
                        <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </Link>
                </span>
                </div>
            </header>
        </>
    );
};

export default Header;