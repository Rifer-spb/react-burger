import React, { useEffect } from "react";
import style from "./ProfilePage.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function ProfilePage() {

    const { user } = useSelector(store => store.auth);
    const { state, pathname } = useLocation();
    const navigate = useNavigate();
    const url = window.location.href;

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    },[user, navigate]);

    const onChange = () => {

    };

    return (
        <section>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value="Марк"
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={onChange}
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    value="mail@stellar.burgers"
                    name={'mail'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={onChange}
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    value="******"
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={onChange}
                    icon="EditIcon"
                />
            </div>
        </section>
    );
}

export default ProfilePage;