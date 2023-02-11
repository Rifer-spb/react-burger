import React, {useState} from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import Item from './item/Item';
import Modal from "../../../common/modal/Modal";

function Category(props) {

    const [state, setState] = useState({
        currentItem: null,
        ingredientModal: false
    });

    const handleItemMouseClick = (item) => {
        setState({
            currentItem: item,
            ingredientModal: !state.ingredientModal
        });
    };

    const itemPopupClose = () => {
        setState({
            currentItem: null,
            ingredientModal: !state.ingredientModal
        });
    };

    return (
        <div>
            <h2 className="text_type_main-medium">{props.category.name}</h2>
            <div className={style.items}>
                {props.items.map(item =>
                    <Item key={item._id} item={item} handleItemMouseClick={() => handleItemMouseClick(item)} />
                )}
            </div>
            <Modal show={state.ingredientModal} onClose={itemPopupClose} title="Детали ингредиента">

            </Modal>
        </div>
    );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Category