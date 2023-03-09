import React, {useEffect, useState} from "react";
import style from './RegisterPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { isEmailValid } from "../../utils/helpers/helperField";
import {useDispatch, useSelector} from "react-redux";
import {clearRequest, register} from "../../services/actions/auth";

function RegisterPage() {

    const dispatch = useDispatch();
    const { request } = useSelector(store => store.auth);
    const [ name, setName ] = useState('');
    const [ nameError, setNameError ] = useState(false);
    const [ nameErrorText, setNameErrorText ] = useState('');
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

        setNameError(false);
        setNameErrorText('');

        if(name === '') {
            setNameError(true);
            setNameErrorText('Необходимо указать имя');
            error = true;
        }

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
            dispatch(register({
                name: name,
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

    return (
        <section className={style.register}>
            <h1 className={style.h1 + " text_type_main-medium"}>Регистрация</h1>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={name}
                    name={'name'}
                    error={nameError}
                    errorText={nameErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
                    type={showPassword?'text':'password'}
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
                    request.load ? <p className="text_type_main-medium">Регистрация...</p> :
                    <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Зарегистрироваться</Button>
                }
            </div>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                    <Link to="/login">Войти</Link>
                </li>
            </ul>
        </section>
    );
}

export default RegisterPage;