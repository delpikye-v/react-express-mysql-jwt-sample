// npm module
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

// component
import renderError from "../components/error/label.error";

// service
import AuthService from "./service/auth.service";
import { signInSchema } from "./service/yup.validator";

const SignInPage = ({ setToken, changePage }) => {
    const [isLoading, setLoading] = useState(false)
    const [message, setMessage] = useState('');

    const initialValues = {
        userName: "",
        password: "",
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleSubmit = async ({ userName, password }) => {
        setLoading(true)

        const response = await AuthService.loginUser(userName, password)
        let users = response.result

        setMessage(response.message)
        setToken(users); // save user_config
        setLoading(false)
        if (users.accessToken) {
            // navigate('/dashboards')
            window.location.reload();
        }
    };

    return (
        <div className="login-wrapper">
            <h2 className="text-center">SignIn</h2>
            <p className="error">{ message} </p>
            <Formik
                initialValues={initialValues}
                validationSchema={signInSchema()}
                onSubmit={async (values, { resetForm }) => {
                    let result = await handleSubmit(values);
                    if (result.error) {
                        return;
                    }
                    resetForm();
                }}
            >
                <Form>
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
                        <div>Password</div>
                        <Field
                            name="password"
                            type="password"
                            className="form-control"
                            maxLength='50'
                            autoComplete="off"
                            disabled={isLoading}
                        />
                        <ErrorMessage
                            name="password"
                            render={renderError}
                        />
                    </div>
                    <div className="form-group">
                        <button disabled={isLoading} type="submit" className="btn btn-primary">Submit</button>
                    </div>

                    <div className="form-group text-center">
                        <span className="nav-link" onClick={() => changePage(1)}>Create new Account</span>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default SignInPage;
