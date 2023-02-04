import React from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import PropTypes from "prop-types";

class BurgerIngredients extends React.Component {

    state = {
        currentTab: 'bun',
        categories: [
            {id: 'bun', name:'Булки'},
            {id: 'sauce', name:'Соусы'},
            {id: 'main', name:'Начинки'}
        ]
    };

    selectItem = (value) => {
        this.setState({currentTab: value});
    };

    getCategory = () => {
        return this.state.categories.find(category => category.id === this.state.currentTab);
    };

    getCategoryItems = () => {
        return this.props.items.filter(item => item.type === this.state.currentTab);
    };

    render() {
        return(
            <div>
                <h1 className={style.h1 + " text_type_main-medium"}>Соберите бургер</h1>
                <div className={style.tabs}>
                    {this.state.categories.map((item,index) =>
                        <Tab key={index} value={item.id} active={this.state.currentTab === item.id} onClick={this.selectItem}>
                            {item.name}
                        </Tab>
                    )}
                </div>
                <div className={style.categories}>
                    <Category category={this.getCategory()} items={this.getCategoryItems()} />
                </div>
            </div>
        );
    }
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerIngredients