import React from "react";
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients";

class BurgerConstructor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first: this.getElement(props.selected.first),
            middle: this.getElements(props.selected.middle),
            last: this.getElement(props.selected.last)
        }
    }

    getElement(id) {
        return this.props.items.find(item => item['_id'] === id);
    }

    getElements(ids) {
        let elements = [];
        for (let i=0; i<ids.length; i++) {
            elements.push(this.props.items.find(item => item['_id'] === ids[i]));
        }
        return elements;
    }

    render() {
        return (
            <div className={style.main}>
                <div className={style.items}>
                    <section className={style.first}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={this.state.first.name}
                            price={this.state.first.price}
                            thumbnail={this.state.first.image}
                        />
                    </section>
                    <section className={style.middle}>
                        {this.state.middle.map(item =>
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
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={this.state.last.name}
                            price={this.state.last.price}
                            thumbnail={this.state.last.image}
                        />
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
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerConstructor