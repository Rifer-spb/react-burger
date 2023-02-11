import React, {useState} from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './Item.module.css';

function Item({item, handleItemMouseClick}) {
    return (
        <section className={style.item} onClick={handleItemMouseClick}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div>
                <img src={item.image} />
            </div>
            <div className={style.price}>
                <span className="text_type_digits-default">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={style.h3 + " text_type_main-default"}>{item.name}</h3>
        </section>
    );
}

Item.propTypes = {
    item: PropTypes.object,
    handleIngredientMouseClick: PropTypes.func
};

export default Item