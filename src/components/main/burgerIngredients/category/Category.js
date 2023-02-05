import React from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import Item from './item/Item';

class Category extends React.Component {

    render() {
        return (
            <div>
                <h2 className="text_type_main-medium">{this.props.category.name}</h2>
                <div className={style.items}>
                    {this.props.items.map(item => <Item key={item._id} item={item} /> )}
                </div>
            </div>
        );
    }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Category