import React, { useState } from "react";
import style from './ResetPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/api/auth";
import { useFormAndValidation } from "../../utils/hooks";

function ResetPasswordPage() {

    const navigate = useNavigate();
    const [ request, setRequest ] = useState({
        load: false,
        failed: false,
        message: ''
    });
    const { fields, handleChange, validate } = useFormAndValidation({
        password: {
            value: '',
            error: false,
            errorText: '',
            rules: ['required']
        },
        code: {
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
            setRequest({
                load: true,
                failed: false,
                message: ''
            });
            resetPasswordRequest({
                password: fields.password.value,
                token: fields.code.value
            })
                .then(response  => {
                    setRequest({
                        ...request, load: false
                    });
                    navigate('/login');
                }).catch( err => {
                    console.log(err);
                    setRequest({
                        load: false,
                        failed: true,
                        message: err.message
                    });
                });
        }
    };

    return (
        <section className={style.resetPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <Input
                        type={showPassword?'text':'password'}
                        placeholder={'Введите новый пароль'}
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
                <div className={style.formGroup}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={fields.code.value}
                        name={'code'}
                        error={fields.code.error}
                        errorText={fields.code.errorText}
                        size={'default'}
                        extraClass="ml-1"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {
                    request.failed && <p className={style.requestError + " text_type_main-small"}>{request.message}</p>
                }
                <div className={style.buttonGroup}>
                    {
                        request.load ? <p className="text_type_main-medium">Отправка...</p> :
                            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                    }
                </div>
            </form>
            <ul className={style.navigate}>
                <li className="text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    <Link to="/login">Войти</Link>
                </li>
            </ul>
        </section>
    );
}

export default ResetPasswordPage;