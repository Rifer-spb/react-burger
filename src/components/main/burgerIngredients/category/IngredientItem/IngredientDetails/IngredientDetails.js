import React from "react";
import style from './ItemInfo.module.css';
import PropTypes from "prop-types";

function IngredientDetails({item}) {
    return (
        <div className={style.itemInfo}>
            <img src={item.image_large} className={style.img} />
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

IngredientDetails.propTypes = {
    item: PropTypes.object.isRequired
};

export default IngredientDetails