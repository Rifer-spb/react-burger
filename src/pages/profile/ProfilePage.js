import React, {useState} from "react";
import style from "./ProfilePage.module.css";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {isEmailValid} from "../../utils/helpers/helperField";
import {updateUserRequest} from "../../utils/api/auth";

function ProfilePage() {

    const [ request, setRequest ] = useState({
        load: false,
        failed: false,
        message: ''
    });

    const { user } = useSelector(store => store.auth);
    const [ name, setName ] = useState(user.name);
    const [ nameError, setNameError ] = useState(false);
    const [ nameErrorText, setNameErrorText ] = useState('');

    const [ email, setEmail ] = useState(user.email);
    const [ emailError, setEmailError ] = useState(false);
    const [ emailErrorText, setEmailErrorText ] = useState('');

    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ passwordErrorText, setPasswordErrorText ] = useState('');

    const validate = () => {

        let error = false;

        setNameError(false);
        setNameErrorText('');

        if(name === '') {
            setNameError(true);
            setNameErrorText('Необходимо указать имя');
            error = true;
        }

        setEmailError(false);
        setEmailErrorText('');

        if(email === '') {
            setEmailError(true);
            setEmailErrorText('Необходимо указать e-mail');
            error = true;
        } else if (!isEmailValid(email)) {
            setEmailError(true);
            setEmailErrorText('Некорректный e-mail');
            error = true;
        }

        setPasswordError(false);
        setPasswordErrorText('');

        if(password === '') {
            setPasswordError(true);
            setPasswordErrorText('Необходимо указать пароль');
            error = true;
        }

        if(!error) {
            return true;
        }

        return false;
    };

    const handleSubmit = () => {
        if(validate()) {
            setRequest({
                load: true,
                failed: false,
                message: ''
            });
            updateUserRequest({
                name: name,
                email: email,
                password: password
            })
                .then( response  => {
                    if (response && response.success) {
                        setRequest({
                            ...request, load: false
                        });
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
        <section>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={name}
                    name={'name'}
                    error={nameError}
                    errorText={nameErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setName(e.target.value)}
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    value={email}
                    name={'mail'}
                    error={emailError}
                    errorText={emailErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setEmail(e.target.value)}
                    icon="EditIcon"
                />
            </div>
            <div className={style.formGroup}>
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    value={password}
                    name={'name'}
                    error={passwordError}
                    errorText={passwordErrorText}
                    size={'default'}
                    extraClass="ml-1"
                    onChange={(e) => setPassword(e.target.value)}
                    icon="EditIcon"
                />
            </div>
            <div className={style.buttonGroup}>
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