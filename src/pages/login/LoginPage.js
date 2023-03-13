import React, {useEffect, useState} from "react";
import style from './LoginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {clearRequest, login} from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../../utils/hooks";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request } = useSelector(store => store.auth);
    /*
        Посмотрел я ваш пример кастомного хука useFormAndValidation. Все отлично, но...
        Я не люблю браузерную валидацию. Да, может это удобно, но я все же отдаю предпочтение кастомной валидации.
        Но тем не менее спасибо за подсказу, я чутка поменял код и сделал свой хук) Норм?
        В любом случае кода стало гораздо меньше :)
    */
    const { fields, handleChange, validate } = useFormAndValidation({
        email: {
            value: '',
            error: false,
            errorText: '',
            rules: ['required','email']
        },
        password: {
            value: '',
            error: false,
            errorText: '',
            rules: ['required']
        }
    });
    const [ showPassword, setShowPassword ] = useState(false);

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()) {
            dispatch(login({
                email: fields.email.value,
                password: fields.password.value
            }, () => navigate('/')))
        }
    };

    useEffect(() => {
        dispatch(clearRequest());
    },[dispatch]);

    return(
        <section className={style.login}>
            <h1 className={style.h1 + " text_type_main-medium"}>Вход</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        value={fields.email.value}
                        name={'email'}
                        error={fields.email.error}
                        errorText={fields.email.errorText}
                        size={'default'}
                        extraClass="ml-1"
                        onChange={(event) => handleChange(event)}
                    />
                </div>
                <div className={style.formGroup}>
                    <Input
                        type={!showPassword?'password':'text'}
                        placeholder={'Пароль'}
                        value={fields.password.value}
                        name={'password'}
                        error={fields.password.error}
                        errorText={fields.password.errorText}
                        size={'default'}
                        extraClass="ml-1"
                        onChange={(event) => handleChange(event)}
                        icon={'ShowIcon'}
                        onIconClick={handleShowPasswordClick}
                    />
                </div>
                {request.failed && <p className={style.error + " text_type_main-small"}>{request.message}</p>}
                <div className={style.buttonGroup}>
                    {
                        request.load ? <p className="text_type_main-medium">Авторизация...</p> :
                            <Button htmlType="submit" type="primary" size="medium">Войти</Button>
                    }
                </div>
            </form>
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