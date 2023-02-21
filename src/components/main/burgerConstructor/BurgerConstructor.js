import React, {useEffect, useState, useContext} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { DataContext, SelectedContext, OrderContext } from "../../../utils/services/ingredientsContext";
import { createOrder } from "../../../utils/api";
import { checkResponse } from "../../../utils/services/helperRequest";

function BurgerConstructor() {

    const { data } = useContext(DataContext);
    const { selected } = useContext(SelectedContext);
    const { orderState, orderDispatcher } = useContext(OrderContext);
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
        const items = selected.map(id => {
            return data.find(item => item['_id'] === id);
        });
        const bun = items.find(item => item.type === 'bun');
        setBun(bun);
        setMiddle(
            items.filter(item => item.type !== 'bun')
        );
        let sum = 0;
        items.map(item => sum += item.price);
        orderDispatcher({
            type: 'set',
            payload: { price: sum }
        });
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
                orderDispatcher({
                    type: 'set',
                    payload: {
                        name: response.name, number: response.order.number
                    }
                });
                showPopup(true);
            })
            .catch((error) => {
                setError({hasError: true, errorMessage: error.message})
                showPopup(true);
            });
    };

    useEffect(() => {
        if (data.length) {
            init();
        }
    },[data, selected]);

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
                                <span className="text_type_digits-medium">{orderState.price}</span>
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
                            <OrderDetails number={orderState.number} error={error} />
                        </Modal>
                    }
                </>
            }
        </div>
    );
}

export default BurgerConstructor