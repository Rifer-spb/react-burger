import React, {useState} from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './IngredientItem.module.css';
import Modal from "../../../../common/modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";

function IngredientItem({item}) {

    const [state, setState] = useState({
        ingredientModal: false
    });

    const handleItemMouseClick = () => {
        setState({
            ingredientModal: true
        });
    };

    const itemPopupClose = () => {
        setState({
            ingredientModal: false
        });
    };

    return (
        <>
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
            {
                state.ingredientModal &&
                <Modal onClose={itemPopupClose}  title="Детали ингредиента">
                    <IngredientDetails item={item} />
                </Modal>
            }
        </>
    );
}

IngredientItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default IngredientItem