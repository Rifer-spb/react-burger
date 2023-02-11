import React from "react";
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalOverlay = (props) => {
    return (
        <div onClick={props.onClick} className={style.overlay}>&nbsp;</div>
    );
};

function Modal(props) {
    if(!props.show) {
        return;
    }
    return (
        <>
            <div className={style.modal}>
                <section className={style.header}>
                    <h1 className="text_type_main-large">
                        {props.title}
                    </h1>
                    <a href="#" className={style.close} onClick={props.onClose}>
                        <CloseIcon type="primary" />
                    </a>
                </section>
                <section>
                    {props.children}
                </section>
            </div>
            <ModalOverlay onClick={props.onClose}/>
        </>
    );
}

Modal.propTypes = {
    title: PropTypes.string
};

export default Modal