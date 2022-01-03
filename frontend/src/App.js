import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// page
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/NotFound.page";
import SignOnPage from './pages/SignOn.page'

import "./App.scss";

// self
import useToken from "./useHook/useToken";
import UsersPage from "./pages/Users.page";

function App() {
    const { token, setToken } = useToken();

    useEffect(() => {
        if (token.accessToken) {
            // canbe check token if refresh page
            // let result = axios.get('/auth/check')
            // decode token and check exp
        }
    }, [])

    const isAdmin = useCallback(
        () => token.isAdmin,
        [token],
    )

    if (!token.accessToken) {
        return <SignOnPage setToken={setToken} />;
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li>
                    </div>

                    <div className="navbar-nav ml-auto right">
                        <li className="nav-item">
                            <div className="nav-link" style={{ cursor: 'pointer' }} onClick={logout}>
                                Logout
                            </div>
                        </li>
                        {
                            isAdmin() && (
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/user'}>
                                        Users
                                    </Link>
                                </li>
                            )
                        }
                    </div>
                </nav>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/user" element={<UsersPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
