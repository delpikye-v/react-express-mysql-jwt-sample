import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// page
import HomePage from "./pages/Home.page";
import NotFoundPage from "./pages/NotFound.page";
import LoginPage from "./pages/Login.page";
import "./App.scss";

// self
import useToken from "./useHook/useToken";

function App() {
    const { token, setToken } = useToken();

    useEffect(() => {
        if (token) {
            // canbe check token if refresh page
            // let result = axios.get('/auth/check')
            // decode token and check exp
        }
    }, [])

    if (!token) {
        return <LoginPage setToken={setToken} />;
    }

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        {/* <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li> */}
                    </div>

                    <div className="navbar-nav ml-auto right">
                        <li className="nav-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <div className="nav-link" onClick={logout}>
                                Logout
                            </div>
                        </li>
                    </div>
                </nav>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="user" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
