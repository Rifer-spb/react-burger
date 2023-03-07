import React, {useEffect} from "react";
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById("modal");

const ModalOverlay = (props) => {
    return (
        <div onClick={props.onClick} className={style.overlay}/>
    );
};

function Modal({ title, children, onClose }) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    },[]);

    return ReactDOM.createPortal(
        (
            <>
                <div className={style.modal}>
                    <section className={style.header}>
                        <h1 className="text_type_main-large">
                            {title}
                        </h1>
                        <a href="#" className={style.close} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </a>
                    </section>
                    <section>
                        {children}
                    </section>
                </div>
                <ModalOverlay onClick={onClose}/>
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