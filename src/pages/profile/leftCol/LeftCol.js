import React from "react";
import Menu from "./menu/Menu";
import style from "./LeftCol.module.css"

function LeftCol() {
    return (
        <div className={style.col}>
            <Menu/>
            <p className="text_type_main-default text_color_inactive">
                В этом разделе вы можете<br/>изменить свои персональные данные
            </p>
        </div>
    );
}

export default LeftCol;