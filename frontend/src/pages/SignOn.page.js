import React, { useState } from 'react'

import SignInPage from './SignIn.page'
import SignUpPage from './SignUp.page'

import './SignOn.styles.scss'

const pageIndex = (props) => {
    return {
        0: <SignInPage {...props } />,
        1: <SignUpPage {...props} />
    }
}

const SignOnPage = ({ setToken }) => {
    const [curentPage, setCurrentPage] = useState(0)

    const changePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            {pageIndex({ changePage, setToken })[curentPage]}
        </div>
    )
}

export default SignOnPage
