import React, {useEffect, useRef, useState} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {useDrop} from "react-dnd";
import { setIngredient, deleteIngredient } from "../../../services/actions/order";
import { create } from "../../../services/actions/order";
import BurgerDragItem from "./BurgerDragItem";
import { updateSort } from "../../../services/actions/order";

function BurgerConstructor() {

    const dispatch = useDispatch();
    const {
        ingredients,
        orderId,
        orderPrice,
        orderIngredients,
        requestLoad,
        requestFailed
    } = useSelector(store => ({
        ingredients: store.ingredient.ingredients,
        orderId: store.order.id,
        orderPrice: store.order.price,
        orderIngredients: store.order.ingredients,
        requestLoad: store.order.requestLoad,
        requestFailed: store.order.requestFailed
    }));
    const [ bun, setBun ] = useState(null);
    const [ middle, setMiddle ] = useState([]);
    const [ popup, showPopup ] = useState(false);
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(setIngredient(item['_id']));
        },
    });

    const OrderDetailsPopupClose = () => {
        showPopup(false);
    };

    const handleDeleteIngredient = (event,id) => {
        dispatch(deleteIngredient(id));
    };

    const init = () => {
        const items = orderIngredients.map(item => {
            return ingredients.find(ingredient => ingredient['_id'] === item.id);
        });
        const bun = items.find(item => item.type === 'bun');
        setBun(bun);
        setMiddle(
            items.filter(item => item.type !== 'bun')
        );
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
        dispatch(create(fields));
        showPopup(true);
    };

    useEffect(() => {
        if (ingredients.length && orderIngredients) {
            init();
        }
    },[ingredients, orderIngredients]);

    return (
        <div className={style.main} ref={dropTarget}>
            {
                !orderIngredients.length ?
                    <div className={style.empty + ' text_type_main-medium'}>
                        <h2>Перетащите сюда ингредиенты...</h2>
                    </div> :
                    <>
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
                                    {middle.map((item, index) => (
                                        <BurgerDragItem
                                            id={item['_id']}
                                            name={item.name}
                                            price={item.price}
                                            image={item.image}
                                            index={index}
                                            key={item['_id']}
                                            handleDeleteIngredient={handleDeleteIngredient}
                                        />
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
                                        <OrderDetails number={orderId} error={requestFailed} proccess={requestLoad} />
                                    </Modal>
                                }
                            </>
                        }
                    </>

            }
        </div>
    );
}

export default BurgerConstructor