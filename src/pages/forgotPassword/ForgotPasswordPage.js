import React, { useState } from "react";
import style from './ForgotPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../utils/api/auth";
import { useFormAndValidation } from "../../utils/hooks";

function ForgotPasswordPage() {

    const navigate = useNavigate();
    const [ request, setRequest ] = useState({
        load: false,
        failed: false,
        message: ''
    });
    const { fields, handleChange, validate } = useFormAndValidation({
        email: {
            value: '',
            error: false,
            errorText: '',
            rules: ['required','email']
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()) {
            setRequest({
                load: true,
                failed: false,
                message: ''
            });
            forgotPasswordRequest({
                email: fields.email.value
            })
                .then(response  => {
                    setRequest({
                        ...request, load: false
                    });
                    navigate('/reset-password');
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
        <section className={style.forgotPassword}>
            <h1 className={style.h1 + " text_type_main-medium"}>Восстановление пароля</h1>
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
                        onChange={e => handleChange(e)}
                    />
                </div>
                {
                    request.failed && <p className={style.requestError + " text_type_main-small"}>{request.message}</p>
                }
                <div className={style.buttonGroup}>
                    {
                        request.load ? <p className="text_type_main-medium">Отправка...</p> :
                            <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
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

export default ForgotPasswordPage;