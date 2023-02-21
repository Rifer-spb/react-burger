import React from "react";
import style from './ErrorComponent.module.css';
import PropTypes from "prop-types";

function ErrorComponent({text}) {
    return (
        <div className={style.error}>
            <h1 className={style.h1}>Ошибка: {text}</h1>
        </div>
    );
}

ErrorComponent.propTypes = {
    text: PropTypes.string.isRequired
};


export default ErrorComponent