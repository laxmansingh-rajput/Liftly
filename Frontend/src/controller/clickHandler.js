import axios from "axios";
import { useState } from "react";
export const goTo = (navigate, page) => {
    navigate(`/${page}`)
}

export const google = (next) => {
    if (next == 'form')
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/form`;
    else if (next == 'phone')
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/phone`;
    else
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
}

export const fetchDetails = async (next, setnext, setdetails, file, setloader) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/details`,
            { withCredentials: true }
        );
        let data = response.data
        if (data.name != null && data.password != null && data.phoneNo != null) {
            let details = {
                name: data.name,
                password: data.phoneNo,
                phoneNo: data.phoneNo,
            }
            setdetails(details)
            if (!data.password) {
                setnext('form')
            } else if (!data.phoneNo) {
                setnext('phone')
                if (file == 'form')
                    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/phone`
            } else {
                if (file == 'phone' || file == "form" || file == "landing")
                    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/home`
            }
            setloader(false)
        } else {
            setloader(false)
            if (file != 'landing') {
                window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/`
            }
        }
    } catch (error) {
        console.log(error);
        setloader(false)
    }
};