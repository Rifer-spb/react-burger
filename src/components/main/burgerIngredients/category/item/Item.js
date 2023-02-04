import React from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './Item.module.css';

class Item extends React.Component {
    render() {
        return (
            <section className={style.item}>
                <div>
                    <img src={this.props.item.image} />
                </div>
                <div className={style.price}>
                    <span className="text_type_digits-default">{this.props.item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <h3 className={style.h3 + " text_type_main-default"}>{this.props.item.name}</h3>
            </section>
        );
    }
}

export default Item