import React, {useEffect, useState} from "react";
import style from "./ProfilePage.module.css";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {updateUserRequest} from "../../utils/api/auth";
import {useFormAndValidation} from "../../utils/hooks";

function ProfilePage() {

    const [ request, setRequest ] = useState({
        load: false,
        failed: false,
        message: ''
    });

    const { user } = useSelector(store => store.auth);
    const { fields, handleChange, validate, setFields } = useFormAndValidation({
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

    const handleCancel = () => {
        fields.name.value = user.name;
        fields.email.value = user.email;
        fields.password.value = '';
        setFields({ ...fields });
    };

    const handleSubmit = () => {
        if(validate()) {
            setRequest({
                load: true,
                failed: false,
                message: ''
            });
            updateUserRequest({
                name: fields.name.value,
                email: fields.email.value,
                password: fields.password.value
            })
                .then( response  => {
                    setRequest({
                        ...request, load: false
                    });
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

    /*
        Вот тут такой момент. Я пытался изменять поля в useEffect при монтировании через setFields.
        Но при таком варианте надо пихать зависимости fields и setFields.
        И собстна идет зацикливание... Поетому прописал так как ниже написано...
        Можно так или нет? Или как можно написать через setFields, но чтобы не было зацикливания?
    */
    useEffect(() => {
        if (user) {
            fields.name.value = user.name;
            fields.email.value = user.email;
            fields.password.value = '';
        }
    },[user,fields]);

    return (
        <section>
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
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    value={fields.email.value}
                    name={'email'}
                    error={fields.email.error}
                    errorText={fields.email.errorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => handleChange(e)}
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    value={fields.password.value}
                    name={'password'}
                    error={fields.password.error}
                    errorText={fields.password.errorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => handleChange(e)}
                    icon="EditIcon"
                />
            </div>
            <div className={style.buttonGroup}>
                <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>Отмена</Button>
                {
                    request.load ?
                    <Button htmlType="button" type="primary" size="medium">Сохранение...</Button> :
                    <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>Сохранить</Button>
                }
            </div>
            {
                request.failed && <p className={style.requestError + " text_type_main-small"}>{request.message}</p>
            }
        </section>
    );
}

export default ProfilePage;