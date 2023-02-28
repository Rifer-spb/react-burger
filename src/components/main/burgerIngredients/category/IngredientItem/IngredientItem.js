import React from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientItem.module.css';
import {useDrag} from "react-dnd";

function IngredientItem({item, handleItemMouseClick, count}) {

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...item }
    });

    return (
        <>
            <section className={style.item} onClick={handleItemMouseClick} ref={dragRef}>
                <Counter count={count} size="default" extraClass="m-1" />
                <div>
                    <img src={item.image} alt={item.name} />
                </div>
                <div className={style.price}>
                    <span className="text_type_digits-default">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className={style.h3 + " text_type_main-default"}>{item.name}</h3>
            </section>
        </>
    );
}

IngredientItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleItemMouseClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
};

export default IngredientItem