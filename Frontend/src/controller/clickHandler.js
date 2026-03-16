
export const goTo = (navigate, page) => {
    navigate(`/${page}`)
}

export const google = () => {
    window.location.href = 'http://localhost:3000/auth/google';
}