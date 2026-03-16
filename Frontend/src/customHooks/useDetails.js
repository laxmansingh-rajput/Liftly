import { useState, useEffect } from "react";
import { fetchDetails } from "../controller/clickHandler";

export const useDetails = () => {
    const [next, setnext] = useState(null)
    const [details, setdetails] = useState({
        name: null,
        password: false,
        phoneNo: false,
    })
    useEffect(() => {
        fetchDetails(next, setnext, setdetails);
    }, []);
    return [next, setnext, details, setdetails]
}