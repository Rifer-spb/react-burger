import React from "react";
import style from "./ProfilePage.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

function ProfilePage() {

    const { user } = useSelector(store => store.auth);

    const onChange = () => {

    };

    return (
        <section>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={user.name}
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
                    value={user.email}
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