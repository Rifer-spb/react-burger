import React from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import IngredientItem from './IngredientItem/IngredientItem';

function Category(props) {
    return (
        <div>
            <h2 className="text_type_main-medium">{props.category.name}</h2>
            <div className={style.items}>
                {props.items.map(item =>
                    <IngredientItem key={item._id} item={item} />
                )}
            </div>
        </div>
    );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Category