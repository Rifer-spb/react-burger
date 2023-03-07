import React, { useEffect } from "react";
import style from "./ProfilePage.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from 'react-router-dom';

function ProfilePage() {

    const { state, pathname } = useLocation();
    const navigate = useNavigate();
    const url = window.location.href;

    useEffect(() => {
        console.log(state);
        if (state) {
            navigate(pathname, { state: [...state, { path: pathname, url, title: 'List of Nobel laureates' }], replace: true });
        }
    },[pathname, state, url, navigate]);

    const onChange = () => {

    }

    console.log(state);

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