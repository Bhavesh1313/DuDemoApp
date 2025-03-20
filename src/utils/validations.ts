export const validateEmail = (email: string): boolean => {
    if (!email) return false; // Ensure email is not empty
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
    if (!password) return false; // Ensure password is not empty
    return (
        password.length >= 8 &&
        password.length <= 15 &&
        /[A-Z]/.test(password) && // At least one uppercase letter
        /[a-z]/.test(password) && // At least one lowercase letter
        /\d/.test(password) && // At least one digit
        /[@$!%*#?&]/.test(password) // At least one special character
    );
};
