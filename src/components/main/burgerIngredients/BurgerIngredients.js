import React, { useState, useContext } from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import { DataContext } from "../../../utils/services/ingredientsContext";

function BurgerIngredients() {

    const {data, setData} = useContext(DataContext);
    const [state, setState] = useState({
        currentCategory: 'all',
        categories: [
            {id: 'bun', name:'Булки'},
            {id: 'sauce', name:'Соусы'},
            {id: 'main', name:'Начинки'}
        ]
    });

    const selectItem = (value) => {
        setState({
            ...state,
            currentCategory: value
        });
    };

    const getCategory = (currentCategory) => {
        return state.categories.find(category => category.id === currentCategory);
    };

    const getCategoryItems = (currentCategory) => {
        return data.filter(item => item.type === currentCategory);
    };

    return(
        <div>
            <h1 className={style.h1 + " text_type_main-medium"}>Соберите бургер</h1>
            <div className={style.tabs}>
                {state.categories.map(item => (
                    <Tab
                        key={item.id}
                        value={item.id}
                        active={state.currentCategory === item.id}
                        onClick={selectItem}
                    >
                        {item.name}
                    </Tab>
                ))}
            </div>
            {
                <div className={style.categories}>
                    {
                        state.currentCategory === 'all' ?
                        state.categories.map(category =>
                            <Category category={getCategory(category.id)} key={category.id} items={getCategoryItems(category.id)} />
                        ) :
                        <Category category={getCategory(state.currentCategory)} items={getCategoryItems(state.currentCategory)} />
                    }
                </div>
            }
        </div>
    );
}

export default BurgerIngredients