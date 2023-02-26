import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import IngredientItem from './IngredientItem/IngredientItem';
import Modal from "../../../common/modal/Modal";
import IngredientDetails from "./IngredientItem/IngredientDetails/IngredientDetails";
import { setCurrent } from '../../../../services/slices/ingredientSlice';
import {useDispatch, useSelector} from "react-redux";

function Category({category, items, index, setCategoryRef}) {

    const dispatch = useDispatch();
    const { currentIngredient } = useSelector(store => ({
        currentIngredient: store.ingredient.current
    }));
    const categoryBlockRef = useRef();

    const handleItemMouseClick = (item) => {
        dispatch(setCurrent(item));
    };

    const itemPopupClose = () => {
        dispatch(setCurrent(null));
    };

    useEffect(() => {
        setCategoryRef(categoryBlockRef.current, index);
    },[items]);

    return (
        <div>
            <div ref={categoryBlockRef}>
                <h2 className="text_type_main-medium">{category.name}</h2>
                <div className={style.items}>
                    {items.map(item => (
                        <IngredientItem key={item['_id']} item={item} handleItemMouseClick={() => handleItemMouseClick(item)} />
                    ))}
                </div>
                {
                    currentIngredient &&
                    <Modal onClose={itemPopupClose} title="Детали ингредиента">
                        <IngredientDetails item={currentIngredient} />
                    </Modal>
                }
            </div>
        </div>
    );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Category;