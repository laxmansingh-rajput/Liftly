import React from "react";
import Landing from "./landing"
import Form from "./form";
import Login from "./login";
import Phone from "./phone";
import Home from "./home";
import Rider from "./rider";
import Profile from "./profile";
import Ride from "./ride";
import User from "./user";

const Layout = ({ page }) => {
    const pages = {
        'Landing': <Landing />,
        'form': <Form />,
        'login': <Login />,
        'phone': <Phone />,
        'home': <Home />,
        'rider': <Rider />,
        'profile': <Profile />,
        'ride': <Ride />,
        'user': <User />,
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