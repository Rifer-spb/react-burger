import React from "react";
import style from "./ProfileForm.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileForm() {
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
                    onChange={console.log(true)}
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
                    onChange={console.log(true)}
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
                    onChange={console.log(true)}
                    icon="EditIcon"
                />
            </div>
        </section>
    );
}

export default ProfileForm;