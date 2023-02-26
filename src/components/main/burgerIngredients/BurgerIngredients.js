import React, {useEffect, useRef} from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import {useDispatch, useSelector} from "react-redux";
import ErrorComponent from "../../common/error/ErrorComponent";
import { loadIngredients } from "../../../services/actions/ingredient";
import { updateCurrent, updateActive } from "../../../services/actions/category";

function BurgerIngredients () {

    const {
        currentCategory,
        categories,
        ingredients,
        requestFailed
    } = useSelector(store => ({
        currentCategory: store.category.current,
        categories: store.category.categories,
        ingredients: store.ingredient.ingredients,
        requestFailed: store.ingredient.requestFailed
    }));
    const dispatch = useDispatch();
    const categoriesRef = useRef();
    const categoryRefs = useRef([]);

    const setCategoryRef = (element, index) => {
        const f = categoryRefs.current.find((item,key) => key === index);
        if(element && !f) {
            categoryRefs.current.push(element);
        }
    };

    const selectItem = (value) => {
        dispatch(updateCurrent(value));
    };

    const getCategory = (current) => {
        return categories.find(category => category.id === current);
    };

    const getCategoryItems = (current) => {
        return ingredients.filter(item => item.type === current);
    };

    const handleCategoryScroll = () => {
        let minPositions = [];
        categoryRefs.current.map((item) => {
            const position = item.getBoundingClientRect().bottom-categoriesRef.current.getBoundingClientRect().top;
            if(position<0) {
                minPositions.push(99999999);
            } else {
                minPositions.push(position);
            }
            return item;
        });
        minPositions = minPositions.filter(item => item !== null);
        const minPosition = Math.min(...minPositions);
        const categoryIndex = minPositions.indexOf(minPosition);
        dispatch(updateActive(categoryIndex));
    };

    useEffect(() => {

        dispatch(loadIngredients());

        handleCategoryScroll();

        categoriesRef.current.addEventListener('scroll', handleCategoryScroll);

        return () => {
            if (categoriesRef.current) {
                categoriesRef.current.removeEventListener('scroll', handleCategoryScroll);
            }
        };
    },[]);

    if(requestFailed) {
        return <ErrorComponent />
    }

    return(
        <div>
            <h1 className={style.h1 + " text_type_main-medium"}>Соберите бургер</h1>
            <div className={style.tabs}>
                {categories.map(item => (
                    <Tab
                        key={item.id}
                        value={item.id}
                        active={item.active || currentCategory === item.id}
                        onClick={selectItem}
                    >
                        {item.name}
                    </Tab>
                ))}
            </div>
            {
                <div ref={categoriesRef} className={style.categories}>
                    {
                        currentCategory === 'all' ? categories.map((category,index) =>
                            <Category
                                category={getCategory(category.id)}
                                key={category.id}
                                items={getCategoryItems(category.id)}
                                index={index}
                                setCategoryRef={setCategoryRef}
                            />
                        ) :
                        <Category
                            category={getCategory(currentCategory)}
                            items={getCategoryItems(currentCategory)}
                            setCategoryRef={setCategoryRef}
                        />
                    }
                </div>
            }
        </div>
    );
}

export default BurgerIngredients