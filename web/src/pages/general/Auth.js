import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
    const appContext = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const fromPage = location.state?.from?.pathname || "/";

    const handleSubmit = (event) => {
        event.preventDefault();
        const login = event.target.login.value;
        const password = event.target.password.value;
        appContext.signIn(login, password)
            .then(() => navigate(fromPage, {replace: true}))
            .catch((error) => setMessage(error.message));
    }

    useEffect(() => {
        document.title = "Авторизация";
    });
    
    return (
        <div>
            AuthPage
            <form onSubmit={handleSubmit}>
                <label>
                    Login: <input type="text" name="login" />
                </label>
                <label>
                    Password: <input type="text" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
            <span>{message}</span>
        </div>
    )
}
