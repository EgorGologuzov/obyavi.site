import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import InputPhone from '../../components/InputPhone';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';
import Spliter from '../../components/Spliter';
import "./Auth.css"
import Paragraf from '../../components/Paragraf';
import { cleanPhone } from "../../utils/utils";

export default function Auth() {
    const appContext = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const [inputs, setInputs] = useState({});
    const [awaitingServerAnswer, setAwaitingServerAnswer] = useState(false);

    const fromPage = location.state?.from?.pathname || "/";

    const handleSignInClick = (event) => {
        event.preventDefault();

        const login = inputs.login;
        const password = inputs.password;

        setAwaitingServerAnswer(true);
        appContext.signIn(login, password)
            .then(() => navigate(fromPage, { replace: true }))
            .catch((error) => setMessage(error.message))
            .finally(() => setAwaitingServerAnswer(false));
    }

    const handleInputChange = (event, fieldName) => {
        event.preventDefault();
        setInputs(olds => ({ ...olds, [fieldName]: event.target.value}));
    }

    const loginValid = (value) => {
        return value ? (/^\+7\d{10}$/g).test(cleanPhone(value)) : true;
    }

    const loginComment = (value) => {
        return loginValid(value) ? undefined : "Номер должен соотвествовать формату +7 (___) ___ __-__" ;
    }

    const passwordValid = (value) => {
        return value ? (/^.{10}$/g).test(value) : true;
    }

    const passwordComment = (value) => {
        return passwordValid(value) ? undefined : "Неверный пароль" ;
    }

    useEffect(() => {
        document.title = "Авторизация";
    });

    return (
        <div className="auth-page">
            <header className="auth-page__header">
                <Header level="2">Вход</Header>
                <img className="auth-page__logo" style={{ content: "var(--logo-full)" }} />
            </header>
            <form className="auth-page__form">
                <InputPhone
                    value={inputs?.login}
                    valid={loginValid(inputs?.login)}
                    comment={loginComment(inputs?.login)}
                    required={true}
                    onChange={(event) => handleInputChange(event, "login")} />
                <Spliter />
                <InputPassword
                    value={inputs?.password}
                    placeholder="Введите пароль"
                    valid={passwordValid(inputs?.password)}
                    comment={passwordComment(inputs?.password)}
                    required={true}
                    onChange={(event) => handleInputChange(event, "password")} />
                <div className="auth-page__links">
                    <Link to="/recovery">Забыли пароль?</Link>
                    <Link to="/reg">Зарегистрироваться</Link>
                </div>
                <Button onClick={handleSignInClick} disabled={awaitingServerAnswer}>Войти</Button>
            </form>
            {!awaitingServerAnswer && message &&
                <Paragraf fontSize="small" color="warning">{message}</Paragraf>
            }
        </div>
    )
}