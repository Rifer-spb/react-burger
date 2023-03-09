import React, {useEffect, useState} from "react";
import style from './ItemInfo.module.css';
import {useParams} from "react-router";
import { useSelector } from "react-redux";

function IngredientDetails() {

    const { id } = useParams();
    const { ingredients } = useSelector(store => store.ingredient);
    const [ item, setItem ] = useState({});
    const { currentIngredient } = useSelector(store => ({
        currentIngredient: store.ingredient.current
    }));

    useEffect(() => {
        if(id) {
            setItem(ingredients.find(item => item['_id'] === id));
        } else if (currentIngredient) {
            setItem(currentIngredient);
        }
    },[ingredients, id, currentIngredient]);

    return (
        item &&
        <div className={style.itemInfo}>
            <img src={item.image_large} className={style.img} alt={item.name} />
            <h2 className={style.h2 + ' text_type_main-medium'}>{item.name}</h2>
            <div className={style.info}>
                <div>
                    <span className="text_type_main-default text_color_inactive">Каллории,ккал</span>
                    <span className="text_type_digits-default text_color_inactive">{item.calories}</span>
                </div>
                <div>
                    <span className="text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text_type_digits-default text_color_inactive">{item.proteins}</span>
                </div>
                <div>
                    <span className="text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text_type_digits-default text_color_inactive">{item.fat}</span>
                </div>
                <div>
                    <span className="text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text_type_digits-default text_color_inactive">{item.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails