import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import IngredientItem from './IngredientItem/IngredientItem';
import Modal from "../../../common/modal/Modal";
import IngredientDetails from "./IngredientItem/IngredientDetails/IngredientDetails";
import { updateCurrent, clearCurrent } from "../../../../services/actions/ingredient";
import {useDispatch, useSelector} from "react-redux";

function Category({category, items, index, setCategoryRef}) {

    const dispatch = useDispatch();
    const { currentIngredient } = useSelector(store => ({
        currentIngredient: store.ingredient.current
    }));
    const categoryBlockRef = useRef();
    const orderIngredients = useSelector(store => store.order.ingredients);

    const handleItemMouseClick = (item) => {
        dispatch(updateCurrent(item));
    };

    const itemPopupClose = () => {
        dispatch(clearCurrent(null));
    };

    const getCount = (id) => {
        const ingredient = orderIngredients.find(item => item.id === id);
        if (!ingredient) {
            return 0;
        }
        return ingredient.count;
    };


    useEffect(() => {
        setCategoryRef(categoryBlockRef.current, index);
    },[items, setCategoryRef, index]);

    return (
        <div>
            <div ref={categoryBlockRef}>
                <h2 className="text_type_main-medium">{category.name}</h2>
                <div className={style.items}>
                    {items.map(item => (
                        <IngredientItem
                            key={item['_id']}
                            item={item}
                            handleItemMouseClick={() => handleItemMouseClick(item)}
                            count={getCount(item['_id'])}
                        />
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
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number,
    setCategoryRef: PropTypes.func.isRequired
};

export default Category;