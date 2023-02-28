import React from "react";
import style from './ErrorComponent.module.css';
import { REQUEST_ERROR } from "../../../utils/helpers/helperRequest";

function ErrorComponent() {
    return (
        <div className={style.error}>
            <h1 className={style.h1}>{REQUEST_ERROR}</h1>
        </div>
    );
}

export default ErrorComponent