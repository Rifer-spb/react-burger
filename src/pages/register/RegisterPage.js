import React, {useEffect, useState} from "react";
import style from './RegisterPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearRequest, register} from "../../services/actions/auth";
import {useFormAndValidation} from "../../utils/hooks";

function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request } = useSelector(store => store.auth);
    const { fields, handleChange, validate } = useFormAndValidation({
        name: {
            value: '',
            error: false,
            errorText: '',
            rules: ['required']
        },
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
            dispatch(register({
                name: fields.name.value,
                email: fields.email.value,
                password: fields.password.value
            },() => navigate('/')));
        }
    };

    useEffect(() => {
        dispatch(clearRequest());
    },[dispatch]);

    return (
        <section className={style.register}>
            <h1 className={style.h1 + " text_type_main-medium"}>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={fields.name.value}
                        name={'name'}
                        error={fields.name.error}
                        errorText={fields.name.errorText}
                        size={'default'}
                        extraClass="ml-1"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
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
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={style.formGroup}>
                    <Input
                        type={showPassword?'text':'password'}
                        placeholder={'Пароль'}
                        value={fields.password.value}
                        name={'password'}
                        error={fields.password.error}
                        errorText={fields.password.errorText}
                        size={'default'}
                        extraClass="ml-1"
                        onChange={(e) => handleChange(e)}
                        icon={'ShowIcon'}
                        onIconClick={handleShowPasswordClick}
                    />
                </div>
                {request.failed && <p className={style.error + " text_type_main-small"}>{request.message}</p>}
                <div className={style.buttonGroup}>
                    {
                        request.load ? <p className="text_type_main-medium">Регистрация...</p> :
                            <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
                    }
                </div>
            </form>
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