export const validateEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return !email || regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return (
        !password ||
        (password?.length >= 8 &&
            password?.length <= 15 &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[@$!%*#?&]/.test(password))
    );
};
