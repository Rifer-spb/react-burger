import React from "react";
import style from './Category.module.css';
import Item from './item/Item';

class Category extends React.Component {

    render() {
        return (
            <div>
                <h2 className="text_type_main-medium">{this.props.category.name}</h2>
                <div className={style.items}>
                    {this.props.items.map((item,index) => <Item key={index} item={item} /> )}
                </div>
            </div>
        );
    }
}

export default Category