import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import renderError from "../components/error/label.error";
import './Login.styles.scss'

import AuthService from "./service/auth.service";
import { signInSchema } from "./service/yup.validator";

const LoginPage = ({ setToken }) => {
    const initialValues = {
        userName: "",
        password: "",
    };
    const [message, setMessage] = useState('');

    const handleSubmit = async ({ userName, password }) => {
        const response = await AuthService.loginUser(userName, password)
        setMessage(response.message)
        setToken(response.accessToken);

        if (response.accessToken) {
            // navigate('/dashboards')
            window.location.reload();
        }
    };

    return (
        <div className="login-wrapper">
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
                        />
                        <ErrorMessage
                            name="password"
                            render={renderError}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginPage;
