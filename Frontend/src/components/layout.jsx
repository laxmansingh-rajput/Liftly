import React from "react";
import Landing from "./landing"
import Form from "./form";
import Verify from "./verify";
import Login from "./login";

const Layout = ({ page }) => {
    const pages = {
        'Landing': <Landing />,
        'form': <Form />,
        'verify': <Verify />,
        'login': <Login />,
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-full w-[430px] ">
                {pages[page]}
            </div>
        </div>
    );
};

export default Layout;