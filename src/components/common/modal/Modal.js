import React, {useEffect} from "react";
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById("modal");

const ModalOverlay = (props) => {
    return (
        <div onClick={props.onClick} className={style.overlay}>&nbsp;</div>
    );
};

function Modal(props) {

    useEffect(() => {
        document.addEventListener("keydown", HandleKeyDown, false);
        return () => {
            document.removeEventListener("mousemove", HandleKeyDown);
        }
    },[]);

    const HandleKeyDown = (event) => {
        if (event.key === 'Escape') {
            props.onClose();
        }
    };

    return ReactDOM.createPortal(
        (
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
        ),
        modalRoot
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default Modal