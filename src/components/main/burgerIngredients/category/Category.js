import React, {useState} from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import IngredientItem from './IngredientItem/IngredientItem';
import Modal from "../../../common/modal/Modal";
import IngredientDetails from "./IngredientItem/IngredientDetails/IngredientDetails";

function Category(props) {

    const [state, setState] = useState({
        currentItem: null,
        ingredientModal: false
    });

    const handleItemMouseClick = (item) => {
        setState({
            currentItem: item,
            ingredientModal: true
        });
    };

    const itemPopupClose = () => {
        setState({
            currentItem: null,
            ingredientModal: false
        });
    };

    return (
        <div>
            <h2 className="text_type_main-medium">{props.category.name}</h2>
            <div className={style.items}>
                {props.items.map(item => (
                    <IngredientItem key={item['_id']} item={item} handleItemMouseClick={() => handleItemMouseClick(item)} />
                ))}
            </div>
            {
                state.ingredientModal &&
                <Modal onClose={itemPopupClose} title="Детали ингредиента">
                    <IngredientDetails item={state.currentItem} />
                </Modal>
            }
        </div>
    );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Category