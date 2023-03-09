import React, { useState } from "react";
import style from './ForgotPasswordPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid } from "../../utils/helpers/helperField";
import { forgotPasswordRequest } from "../../utils/api/auth";
import { checkResponse } from "../../utils/helpers/helperRequest";

function ForgotPasswordPage() {

    const [ request, setRequest ] = useState({
        load: false,
        failed: false,
        message: ''
    });
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(false);
    const [ errorText, setErrorText ] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        setError(false);
        setErrorText('');
        if(email === '') {
            setError(true);
            setErrorText('Необходимо указать e-mail');
            return false;
        }
        if(!isEmailValid(email)) {
            setError(true);
            setErrorText('Некорректный e-mail');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if(validate()) {
            setRequest({
                load: true,
                failed: false,
                message: ''
            });
            forgotPasswordRequest()
                .then(response => checkResponse(response))
                .then( response  => {
                    if (response && response.success) {
                        setRequest({
                            ...request, load: false
                        });
                        navigate('/reset-password');
                    } else {
                        setRequest({
                            load: false,
                            failed: true,
                            message: response.message
                        });
                    }
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
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={email}
                    name={'email'}
                    error={error}
                    errorText={errorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            {
                request.failed && <p className={style.requestError + " text_type_main-small"}>{request.message}</p>
            }
            <div className={style.buttonGroup}>
                {
                    request.load ? <p className="text_type_main-medium">Отправка...</p> :
                    <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Восстановить</Button>
                }
            </div>
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