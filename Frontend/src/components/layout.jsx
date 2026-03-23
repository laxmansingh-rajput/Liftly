import React from "react";
import Landing from "./landing"
import Form from "./form";
import Login from "./login";
import Phone from "./phone";
import Home from "./home";
import Driver from "./driver";
import Profile from "./profile";
import Drive from "./drive";
import User from "./user";
import SearchDriver from "./searchDriver";
import SearchUser from "./searchUser";
const Layout = ({ page }) => {
    const pages = {
        'Landing': <Landing />,
        'form': <Form />,
        'login': <Login />,
        'phone': <Phone />,
        'home': <Home />,
        'driver': <Driver />,
        'profile': <Profile />,
        'drive': <Drive />,
        'user': <User />,
        'searchDriver': <SearchDriver />,
        'searchUser': <SearchUser />,
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