import React, {useState, useEffect, useRef} from "react";
import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Category from './category/Category';
import {useDispatch, useSelector} from "react-redux";
import ErrorComponent from "../../common/error/ErrorComponent";
import { loadIngredients } from "../../../services/actions/ingredient";
import { addIngredients} from "../../../services/actions/order";

function BurgerIngredients () {

    const [currentCategory, setCurrentCategory] = useState('all');
    const [categories, setCategories] = useState([
        {id: 'bun', name: 'Булки', active: false},
        {id: 'sauce', name: 'Соусы', active: false},
        {id: 'main', name: 'Начинки', active: false}
    ]);
    const categoryRefs = useRef([]);
    const categoriesRef = useRef();
    const dispatch = useDispatch();
    const { ingredients, requestFailed } = useSelector(
        store => store.ingredient
    );

    const setCategoryRef = (element, index) => {
        const f = categoryRefs.current.find((item,key) => key === index);
        if(element && !f) {
            categoryRefs.current.push(element);
        }
    };

    const selectItem = (value) => {
        setCurrentCategory(value);
    };

    const getCategory = (current) => {
        return categories.find(category => category.id === current);
    };

    const getCategoryItems = (current) => {
        return ingredients.filter(item => item.type === current);
    };

    const selectedRandom = () => {
        let items = [];
        const bun = ingredients.find(item => item.type === 'bun');
        items.push(bun['_id']);
        const withOutBunItems = ingredients.filter(item => item.type !== 'bun');
        let i = 0;
        while (i < 5) {
            const finedItem = withOutBunItems[
                Math.floor(Math.random()*withOutBunItems.length)
                ];
            const existItem = items.find(item => item === finedItem['_id']);
            if (!existItem) {
                items.push(finedItem['_id']);
                i++;
            }
        }
        dispatch(addIngredients(items));
    };

    const handleCategoryScroll = () => {
        let minPositions = [];
        categoryRefs.current.map(item  => {
            const position = item.getBoundingClientRect().bottom-categoriesRef.current.getBoundingClientRect().top;
            if(position<0) {
                minPositions.push(999999999);
            } else {
                minPositions.push(position);
            }
        });
        minPositions = minPositions.filter(item => item !== null);
        const minPosition = Math.min(...minPositions);
        const categoryIndex = minPositions.indexOf(minPosition);
        setCategories([...categories].map((category, index) => {
            if(index === categoryIndex) {
                category.active = true;
            } else {
                category.active = false;
            }
            return category;
        }));
    };

    useEffect(() => {

        dispatch(loadIngredients());

        handleCategoryScroll();

        categoriesRef.current.addEventListener('scroll', handleCategoryScroll);

        return () => {
            categoriesRef.current.removeEventListener('scroll', handleCategoryScroll);
        };
    },[]);

    useEffect(() => {
        if (ingredients.length) {
            selectedRandom();
            handleCategoryScroll();
        }
    },[ingredients]);

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
                        active={item.active}
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