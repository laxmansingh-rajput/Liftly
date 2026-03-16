import axios from "axios";
export const goTo = (navigate, page) => {
    navigate(`/${page}`)
}

export const google = (next) => {
    if (next == 'form')
        window.location.href = 'http://localhost:5173/form';
    else if (next == 'phone')
        window.location.href = 'http://localhost:5173/phone';
    else
        window.location.href = 'http://localhost:3000/auth/google';
}

export const fetchDetails = async (next, setnext, setdetails) => {
    try {
        const response = await axios.get(
            "http://localhost:3000/details",
            { withCredentials: true }
        );
        let data = response.data
        if (data.name != null && data.password != null && data.phoneNo != null) {
            let details = {
                name: data.name,
                password: data.password,
                phoneNo: data.phoneNo,
            }
            setdetails(details)
            if (!data.password) {
                setnext('form')
            } else if (!data.phoneNo) {
                setnext('phone')
            } else {
                window.location.href = 'http://localhost:5173/home'
            }
        }
    } catch (error) {
        console.log(error);
    }
};