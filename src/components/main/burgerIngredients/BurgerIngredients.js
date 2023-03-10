import React, {useEffect, useRef, useState} from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import {useSelector} from "react-redux";
import ErrorComponent from "../../common/error/ErrorComponent";

function BurgerIngredients () {

    const currentCategory = useRef('bun');
    const categories = useRef([
        { id: 'bun', name: 'Булки', active: false },
        { id: 'sauce', name: 'Соусы', active: false },
        { id: 'main', name: 'Начинки', active: false }
    ]);
    const [ scroll, setScroll ] = useState(0);
    const { ingredients, requestFailed } = useSelector(
        store => store.ingredient
    );
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
        return categories.current.find(
            category => category.id === current
        );
    };

    const getCategoryItems = (current) => {
        return ingredients.filter(item => item.type === current);
    };

    const handleCategoryScroll = () => {
        setScroll(categoriesRef.current.scrollTop);
        let minPositions = [];
        categoryRefs.current.forEach((item) => {
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
                currentCategory.current = category.id;
            }
            return category;
        });
    };

    useEffect(() => {

        const catRef = categoriesRef.current;

        catRef.addEventListener('scroll', handleCategoryScroll);

        return () => {
            catRef.removeEventListener('scroll', handleCategoryScroll);
        };
    },[scroll]);

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
                        active={item.id === currentCategory.current}
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