import React, {useEffect, useRef} from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import {useDispatch, useSelector} from "react-redux";
import ErrorComponent from "../../common/error/ErrorComponent";
import { loadIngredients } from "../../../services/actions/ingredient";

function BurgerIngredients () {

    /**
     * Не совсем понял что не так с табами при скроле? Проверил во всех браузерах - работает везде вроде. Что не так?
     * Сейчас при скролле ингредиентов табы меняются на активные в зависимости от того где находится скролл.
     * Так же при клике на таб, скполится к нужному блоку ингредиентов...
     * Уточните.....
     */

    const categories = useRef([
        { id: 'bun', name: 'Булки', active: false },
        { id: 'sauce', name: 'Соусы', active: false },
        { id: 'main', name: 'Начинки', active: false }
    ]);
    const { ingredients, requestFailed } = useSelector(
        store => store.ingredient
    );
    const dispatch = useDispatch();
    const categoriesRef = useRef();
    const categoryRefs = useRef([]);

    const setCategoryRef = (element, index) => {
        const f = categoryRefs.current.find((item,key) => key === index);
        if(element && !f) {
            categoryRefs.current.push(element);
        }
    };

    const selectItem = (index) => {
        const categoryElement = categoryRefs.current.find((
            item,itemIndex) => itemIndex === index
        );
        categoryElement.scrollIntoView();
        window.scroll(0,0);
    };

    const getCategory = (current) => {
        return categories.current.find(category => category.id === current);
    };

    const getCategoryItems = (current) => {
        return ingredients.filter(item => item.type === current);
    };

    const handleCategoryScroll = () => {
        let minPositions = [];
        categoryRefs.current.map((item) => {
            const position = (item.getBoundingClientRect().bottom-categoriesRef.current.getBoundingClientRect().top)-1;
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
        categories.current.map((category, index) => {
            if(index === categoryIndex) {
                category.active = true;
            } else {
                category.active = false;
            }
            return category;
        });
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
    },[ingredients]);

    if(requestFailed) {
        return <ErrorComponent />
    }

    return(
        <div>
            <h1 className={style.h1 + " text_type_main-medium"}>Соберите бургер</h1>
            <div className={style.tabs}>
                {categories.current.map((item,index) => (
                    <Tab
                        key={item.id}
                        value={item.id}
                        active={item.active}
                        onClick={() => selectItem(index)}
                        id={item.id}
                    >
                        {item.name}
                    </Tab>
                ))}
            </div>
            {
                <div ref={categoriesRef} className={style.categories}>
                    {
                        categories.current.map((category,index) =>
                            <Category
                                category={getCategory(category.id)}
                                key={category.id}
                                items={getCategoryItems(category.id)}
                                index={index}
                                setCategoryRef={setCategoryRef}
                            />
                        )
                    }
                </div>
            }
        </div>
    );
}

export default BurgerIngredients