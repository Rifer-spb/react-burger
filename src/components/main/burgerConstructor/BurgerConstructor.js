import React from "react";
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './BurgerConstructor.module.css';

class BurgerConstructor extends React.Component {
    render() {
        return (
            <div className={style.main}>
                <div className={style.items}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={15}
                        thumbnail='https://code.s3.yandex.net/react/code/sauce-03.png'
                    />
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={1337}
                        thumbnail='https://code.s3.yandex.net/react/code/meat-02.png'
                    />
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={874}
                        thumbnail='https://code.s3.yandex.net/react/code/sp_1.png'
                    />
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={300}
                        thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
                    />
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={300}
                        thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
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
}

export default BurgerConstructor