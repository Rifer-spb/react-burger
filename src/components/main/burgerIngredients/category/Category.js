import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import style from './Category.module.css';
import IngredientItem from './IngredientItem/IngredientItem';
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

function Category({category, items, index, setCategoryRef}) {

    const location = useLocation();
    const categoryBlockRef = useRef();
    const { orderBun, orderIngredients } = useSelector(store => ({
        orderBun: store.order.bun,
        orderIngredients: store.order.ingredients
    }));

    const getCount = (id) => {
        if(orderBun && id === orderBun['_id']) {
            return 2;
        }
        if(orderIngredients.length) {
            return orderIngredients.filter(item => item['_id'] === id).length;
        }
        return 0;
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
                        <Link
                            key={item['_id']}
                            to={{ pathname: `/ingredients/${item['_id']}` }}
                            state={{ background: location }}
                            className={style.ingredientLink}
                        >
                            <IngredientItem
                                item={item}
                                count={getCount(item['_id'])}
                            />
                        </Link>
                    ))}
                </div>
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