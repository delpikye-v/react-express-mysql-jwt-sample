import * as Yup from "yup";

export const signUpSchema = () => {
    const validationSchema = Yup.object({
        userName: Yup.string()
            .required('This is require.')
            .min(6, 'Minimum length is 6.')
            .max(50, 'Minimum length is 50.'),
        email: Yup.string()
            .required('This is require.')
            .email('Format invalid.')
            .max(50, 'Minimum length is 50.')
    });
    return validationSchema;
};


export const signInSchema = () => {
    const validationSchema = Yup.object({
        userName: Yup.string()
            .required('This is require.')
            .min(6, 'Min length is 6.')
            .max(50, 'Max length is 50.'),
        password: Yup.string()
            .required('This is require.')
            .max(50, 'Max length is 50.')
    });
    return validationSchema;
};
