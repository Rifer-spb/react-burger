import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients";

function BurgerConstructor(props) {

    const [state, setState] = useState({
        first: null,
        middle: null,
        last: null
    });

    const getElement = (id) => {
        return props.ingredients.find(item => item['_id'] === id);
    };

    const getElements = (ids) => {
        let elements = [];
        for (let i=0; i<ids.length; i++) {
            elements.push(props.ingredients.find(item => item['_id'] === ids[i]));
        }
        return elements;
    };

    useEffect(() => {
        setState({
            first: getElement(props.selected.first),
            middle: getElements(props.selected.middle),
            last: getElement(props.selected.last)
        });
    },[getElement,getElements]);

    return (
        <div className={style.main}>
            <div className={style.items}>
                <section className={style.first}>
                    {
                        state.first &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={state.first.name}
                            price={state.first.price}
                            thumbnail={state.first.image}
                        />
                    }
                </section>
                <section className={style.middle}>
                    {state.middle.length && state.middle.map(item =>
                        <div key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )}
                </section>
                <section className={style.last}>
                    {
                        state.last &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={state.last.name}
                            price={state.last.price}
                            thumbnail={state.last.image}
                        />
                    }
                </section>
            </div>
            <section className={style.actions}>
                <div>
                    <div className={style.price}>
                        <span className="text_type_digits-medium">610</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </div>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerConstructor