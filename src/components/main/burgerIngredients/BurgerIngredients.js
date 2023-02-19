import React, {useState, useContext, useEffect} from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import { DataContext } from "../../services/ingredientsContext";

function BurgerIngredients() {

    const {data, setData} = useContext(DataContext);
    const [state, setState] = useState({
        currentCategory: 'bun',
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

    const getCategory = () => {
        return state.categories.find(category => category.id === state.currentCategory);
    };

    const getCategoryItems = () => {
        return data.filter(item => item.type === state.currentCategory);
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
                    <Category category={getCategory()} items={getCategoryItems()} />
                </div>
            }
        </div>
    );
}

export default BurgerIngredients