import axios from "axios";

export const sendLoginDetails = async (data) => {
    try {
        let response = await axios.post('http://localhost:3000/auth/login', data,
            {
                Credential: true
            })
        return response.data
    } catch {
        return null
    }
}