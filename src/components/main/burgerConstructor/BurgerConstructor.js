import React, {useEffect, useState, useContext} from "react";
import style from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../common/modal/Modal";
import OrderDetails from "./orderDetails/OrderDetails";
import { DataContext, SelectedContext } from "../../services/ingredientsContext";

function BurgerConstructor() {

    const { data } = useContext(DataContext);
    const { selected } = useContext(SelectedContext);
    const [ top, setTop ] = useState(null);
    const [ middle, setMiddle ] = useState([]);
    const [ bottom, setBottom ] = useState(null);
    const [ popup, showPopup ] = useState(false);
    const [ sum, setSum ] = useState(0);

    const handleCreateOrderMouseClick = () => {
        showPopup(true);
    };

    const OrderDetailsPopupClose = () => {
        showPopup(false);
    };

    const init = () => {
        const ingredients = selected.map(id => {
            return data.find(item => item['_id'] === id);
        });
        const bun = ingredients.find(item => item.type === 'bun');
        setTop(bun);
        setMiddle(
            ingredients.filter(item => item.type !== 'bun')
        );
        setBottom(bun);
        let sum = 0;
        ingredients.map(item => sum += item.price);
        setSum(sum);
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
                                <span className="text_type_digits-medium">{sum}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                            <Button htmlType="button" type="primary" size="medium" onClick={handleCreateOrderMouseClick}>
                                Оформить заказ
                            </Button>
                        </div>
                    </section>
                    {
                        popup &&
                        <Modal onClose={OrderDetailsPopupClose}>
                            <OrderDetails />
                        </Modal>
                    }
                </>
            }
        </div>
    );
}

export default BurgerConstructor