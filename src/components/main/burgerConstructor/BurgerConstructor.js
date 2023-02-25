import React, {useEffect, useState} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { createOrder } from "../../../utils/api";
import { checkResponse } from "../../../utils/services/helperRequest";
import { useDispatch, useSelector } from "react-redux";
import { setPrice, setOrder } from "../../../services/slices/orderSlice";

function BurgerConstructor() {

    const dispatch = useDispatch();
    const {
        ingredients,
        orderId,
        orderPrice,
        orderIngredients
    } = useSelector(store => ({
        ingredients: store.ingredient.items,
        orderId: store.order.id,
        orderPrice: store.order.price,
        orderIngredients: store.order.ingredients,
    }));
    const [ bun, setBun ] = useState(null);
    const [ middle, setMiddle ] = useState([]);
    const [ popup, showPopup ] = useState(false);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ''
    });

    const OrderDetailsPopupClose = () => {
        showPopup(false);
    };

    const init = () => {
        const items = orderIngredients.map(id => {
            return ingredients.find(item => item['_id'] === id);
        });
        const bun = items.find(item => item.type === 'bun');
        setBun(bun);
        setMiddle(
            items.filter(item => item.type !== 'bun')
        );
        let sum = 0;
        items.map(item => sum += item.price);
        dispatch(setPrice(sum));
    };

    const handleSubmitCreateOrder = () => {
        const ingredients = [
            bun['_id'],
            ...middle.map(item => item['_id']),
            bun['_id']
        ];
        const fields = {
            ingredients: ingredients
        };
        createOrder(fields)
            .then(response => checkResponse(response))
            .then(response => {
                dispatch(setOrder({
                    name: response.name,
                    id: response.order.number
                }));
                showPopup(true);
            })
            .catch((error) => {
                setError({hasError: true, errorMessage: error.message})
                showPopup(true);
            });
    };

    useEffect(() => {
        if (ingredients.length) {
            init();
        }
    },[ingredients, orderIngredients]);

    return (
        <div className={style.main}>
            <div className={style.items}>
                {
                    bun &&
                    <section>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + ' (вверх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </section>
                }
                {
                    middle.length>0 &&
                    <section className={style.middle}>
                        {middle.map(item => (
                            <div key={item['_id']}>
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
                    bun &&
                    <section>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + ' (низ)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </section>
                }
            </div>
            {
                bun && middle.length>0 &&
                <>
                    <section className={style.actions}>
                        <div>
                            <div className={style.price}>
                                <span className="text_type_digits-medium">{orderPrice}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                            <Button htmlType="button" type="primary" size="medium" onClick={handleSubmitCreateOrder}>
                                Оформить заказ
                            </Button>
                        </div>
                    </section>
                    {
                        popup &&
                        <Modal onClose={OrderDetailsPopupClose}>
                            <OrderDetails number={orderId} error={error} />
                        </Modal>
                    }
                </>
            }
        </div>
    );
}

export default BurgerConstructor