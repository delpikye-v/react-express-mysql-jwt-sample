// npm module
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

// compoent
import renderError from "../components/error/label.error";

// service
import AuthService from "./service/auth.service";
import { signUpSchema } from "./service/yup.validator";

const SignUpPage = ({ changePage }) => {
    const [isLoading, setLoading] = useState(false)
    const [isRegister, setRegister] = useState(false)

    const [message, setMessage] = useState('');

    const initialValues = {
        userName: "",
        email: "",
    };

    useEffect(() => {
        setRegister(false)
        setLoading(false)
    }, [])

    const handleSubmit = async ({ userName, email }) => {
        setLoading(true)
        const response = await AuthService.registeUser(userName, email)
        setMessage(response.message)
        setLoading(false)
        return response.error
    };

    const registerDone = () => {
        changePage(0)
    }

    return (
        <div className="login-wrapper">
            <h2 className="text-center">SignUp</h2>
            <p className="error">{ message } </p>
            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema()}
                onSubmit={async (values, { resetForm }) => {
                    let error = await handleSubmit(values);
                    if (error) {
                        return;
                    }
                    setRegister(true)
                    resetForm();
                }}
            >
                <Form>
                    {
                        !isRegister ? (
                            <>
                                <div className="form-group">
                                    <div>Username</div>
                                    <Field
                                        name="userName"
                                        type="text"
                                        className="form-control"
                                        maxLength='50'
                                        autoComplete="off"
                                        disabled={isLoading}
                                    />
                                    <ErrorMessage
                                        name="userName"
                                        render={renderError}
                                    />
                                </div>
                                <div className="form-group">
                                    <div>Email</div>
                                    <Field
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        maxLength='50'
                                        autoComplete="off"
                                        disabled={isLoading}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        render={renderError}
                                    />
                                </div>
                                <div className="form-group">
                                    <button disabled={isLoading} type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </>
                        ): (
                            <div className="form-group text-center message">
                                Password has been sent to your email.
                            </div>
                        )
                    }
                    <div className="form-group text-center">
                        <span className="nav-link" onClick={registerDone}>Goto Login</span>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default SignUpPage;
