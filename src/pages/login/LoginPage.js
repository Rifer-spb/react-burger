import React, {useEffect, useState} from "react";
import style from './LoginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { isEmailValid } from "../../utils/helpers/helperField";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";
import { clearRequest } from "../../services/actions/auth";

function LoginPage() {

    const { request } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorText, setEmailErrorText ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorText, setPasswordErrorText ] = useState('');

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {

        let error = false;

        setEmailError(false);
        setEmailErrorText('');

        if(email === '') {
            setEmailError(true);
            setEmailErrorText('Необходимо указать e-mail');
            error = true;
        } else if(!isEmailValid(email)) {
            setEmailError(true);
            setEmailErrorText('Некорректный e-mail');
            error = true;
        }

        setPasswordError(false);
        setPasswordErrorText('');

        if(password === '') {
            setPasswordError(true);
            setPasswordErrorText('Необходимо указать пароль');
            error = true;
        }

        if(!error) {
            return true;
        }

        return false;
    };

    const handleSubmit = async () => {
        if(validate()) {
            dispatch(login({
                email: email,
                password: password
            }));
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearRequest());
        }
    },[]);

    return(
        <section className={style.login}>
            <h1 className={style.h1 + " text_type_main-medium"}>Вход</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={email}
                    name={'name'}
                    error={emailError}
                    errorText={emailErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={!showPassword?'password':'text'}
                    placeholder={'Пароль'}
                    value={password}
                    name={'name'}
                    error={passwordError}
                    errorText={passwordErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setPassword(e.target.value)}
                    icon={'ShowIcon'}
                    onIconClick={handleShowPasswordClick}
                />
            </div>
            {request.failed && <p className={style.error + " text_type_main-small"}>{request.message}</p>}
            <div className={style.buttonGroup}>
                {
                    request.load ? <p className="text_type_main-medium">Авторизация...</p> :
                    <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Войти</Button>
                }
            </div>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <Link to="/register">Зарегистрироваться</Link>
                </li>
                <li className="text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </li>
            </ul>
        </section>
    );
}

export default LoginPage