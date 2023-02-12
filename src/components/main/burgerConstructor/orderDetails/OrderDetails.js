import React from "react";
import style from './OrderDetails.module.css'
import CheckIcon from "../../../common/CheckIcon";

function OrderDetails() {
    return (
        <div style={{maxWidth: '520px', margin: '0 auto', textAlign: 'center'}}>
            <div className={style.orderId + ' text_type_digits-large'}>034536</div>
            <h2 className="text_type_main-medium">идентификатор заказа</h2>
            <div className={style.img}>
                <span>
                    <CheckIcon/>
                </span>
            </div>
            <p className={style.p + " text_type_main-default"}>Ваш заказ начали готовить</p>
            <p className="text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails