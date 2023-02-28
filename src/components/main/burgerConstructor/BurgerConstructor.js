import React, {useState} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {useDrop} from "react-dnd";
import BurgerDragItem from "./BurgerDragItem";
import { addItemOrder, dropItemOrder, addOrder } from "../../../services/actions/order";

function BurgerConstructor() {

    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const [ popup, showPopup ] = useState(false);
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addItemOrder(item));
        },
    });

    const OrderDetailsPopupClose = () => {
        showPopup(false);
    };

    const handleDeleteIngredient = (event,index) => {
        dispatch(dropItemOrder(index))
    };

    const handleSubmitCreateOrder = () => {
        const fields = {
            ingredients: [
                order.bun['_id'],
                ...order.ingredients.map(item => item['_id']),
                order.bun['_id']
            ]
        };
        dispatch(addOrder(fields));
        showPopup(true);
    };

    return (
        <div className={style.main} ref={dropTarget}>
            {
                !order.bun && !order.ingredients.length ?
                <div className={style.empty + ' text_type_main-medium'}>
                    <h2>Перетащите сюда ингредиенты...</h2>
                </div> :
                <>
                    <div className={style.items}>
                        {
                            order.bun &&
                            <section>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={order.bun.name + ' (вверх)'}
                                    price={order.bun.price}
                                    thumbnail={order.bun.image}
                                />
                            </section>
                        }
                        {
                            order.ingredients.length>0 &&
                            <section className={style.middle}>
                                {order.ingredients.map((item, index) => (
                                    <BurgerDragItem
                                        id={item['_id']}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                        index={index}
                                        key={index}
                                        handleDeleteIngredient={handleDeleteIngredient}
                                    />
                                ))}
                            </section>
                        }
                        {
                            order.bun &&
                            <section>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={order.bun.name + ' (низ)'}
                                    price={order.bun.price}
                                    thumbnail={order.bun.image}
                                />
                            </section>
                        }
                    </div>
                    {
                        order.bun && order.ingredients.length>0 &&
                        <>
                            <section className={style.actions}>
                                <div>
                                    <div className={style.price}>
                                        <span className="text_type_digits-medium">{ order.price }</span>
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
                                    <OrderDetails
                                        number={order.id}
                                        error={order.requestFailed}
                                        proccess={order.requestLoad}
                                    />
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