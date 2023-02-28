import React from "react";
import style from './OrderDetails.module.css'
import CheckIcon from "../../../common/CheckIcon";
import PropTypes from 'prop-types';
import ErrorComponent from "../../../common/error/ErrorComponent";

function OrderDetails({ number, error, proccess }) {

    return (
        <div className={style.details}>
            {
                error ?
                <div>
                    <ErrorComponent />
                </div> :
                <>
                    {
                        proccess ?
                        <div>
                            <h2 className="text_type_main-medium">Создание заказа</h2>
                        </div> :
                        <>
                            <div className={style.orderId + ' text_type_digits-large'}>{number}</div>
                            <h2 className="text_type_main-medium">идентификатор заказа</h2>
                            <div className={style.img}>
                            <span>
                            <CheckIcon/>
                            </span>
                            </div>
                            <p className={style.p + " text_type_main-default"}>Ваш заказ начали готовить</p><p
                            className="text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                            станции</p>
                        </>
                    }
                </>
            }
        </div>
    );
}

OrderDetails.propTypes = {
    number: PropTypes.number,
    error: PropTypes.bool.isRequired,
    proccess: PropTypes.bool.isRequired
};


export default OrderDetails