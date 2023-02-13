import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";

function BurgerConstructor({ first, middle, last, ingredients }) {

    const [state, setState] = useState({
        first: null,
        middle: [],
        last: null,
        orderDetailsPopup: false
    });

    const getElement = (id) => {
        return ingredients.find(item => item['_id'] === id);
    };

    const getElements = (ids) => {
        let elements = [];
        for (let i=0; i<ids.length; i++) {
            elements.push(ingredients.find(item => item['_id'] === ids[i]));
        }
        return elements;
    };

    const handleCreateOrderMouseClick = () => {
        setState({
            ...state,
            orderDetailsPopup: true
        });
    };

    const OrderDetailsPopupClose = () => {
        setState({
            ...state,
            orderDetailsPopup: false
        });
    };

    useEffect(() => {
        setState({
            first: getElement(first),
            middle: getElements(middle),
            last: getElement(last),
        });
    },[]);

    return (
        <div className={style.main}>
            <div className={style.items}>
                {
                    state.first &&
                    <section>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={state.first.name}
                            price={state.first.price}
                            thumbnail={state.first.image}
                        />
                    </section>
                }
                {
                    state.middle.length>0 &&
                    <section className={style.middle}>
                        {state.middle.map(item => (
                            <div key={item._id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                        ))}
                    </section>
                }
                {
                    state.last &&
                    <section>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={state.last.name}
                            price={state.last.price}
                            thumbnail={state.last.image}
                        />
                    </section>
                }
            </div>
            {
                state.first && state.middle.length>0 && state.last &&
                <>
                    <section className={style.actions}>
                        <div>
                            <div className={style.price}>
                                <span className="text_type_digits-medium">610</span>
                                <CurrencyIcon type="primary" />
                            </div>
                            <Button htmlType="button" type="primary" size="medium" onClick={handleCreateOrderMouseClick}>
                                Оформить заказ
                            </Button>
                        </div>
                    </section>
                    {
                        state.orderDetailsPopup &&
                        <Modal onClose={OrderDetailsPopupClose}>
                            <OrderDetails />
                        </Modal>
                    }
                </>
            }
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    first: PropTypes.PropTypes.string.isRequired,
    middle: PropTypes.arrayOf(PropTypes.string).isRequired,
    last: PropTypes.PropTypes.string.isRequired
};

export default BurgerConstructor