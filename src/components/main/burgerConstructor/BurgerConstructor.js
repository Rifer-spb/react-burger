import React, {useEffect, useState, useContext} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { DataContext, SelectedContext, OrderContext } from "../../services/ingredientsContext";
import { createOrder } from "../../api/api";

function BurgerConstructor() {

    const { data } = useContext(DataContext);
    const { selected } = useContext(SelectedContext);
    const { orderState, orderDispatcher } = useContext(OrderContext);
    const [ top, setTop ] = useState(null);
    const [ middle, setMiddle ] = useState([]);
    const [ bottom, setBottom ] = useState(null);
    const [ popup, showPopup ] = useState(false);
    const [ ingredients, setIngredients ] = useState([]);
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
        setTop(bun);
        setMiddle(
            items.filter(item => item.type !== 'bun')
        );
        setBottom(bun);
        let sum = 0;
        items.map(item => sum += item.price);
        orderDispatcher({
            type: 'set',
            payload: { price: sum }
        });
        setIngredients(items);
    };

    const handleSubmitCreateOrder = () => {
        const fields = {
            ingredients: ingredients.map(item => item['_id'])
        };
        createOrder(fields)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error create order');
            })
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
    },[data]);

    return (
        <div className={style.main}>
            <div className={style.items}>
                {
                    top &&
                    <section>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={top.name + ' (вверх)'}
                            price={top.price}
                            thumbnail={top.image}
                        />
                    </section>
                }
                {
                    middle.length>0 &&
                    <section className={style.middle}>
                        {middle.map(item => (
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
                    bottom &&
                    <section>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bottom.name + ' (низ)'}
                            price={bottom.price}
                            thumbnail={bottom.image}
                        />
                    </section>
                }
            </div>
            {
                top && middle.length>0 && bottom &&
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