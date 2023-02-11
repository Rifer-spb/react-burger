import React, {useState} from "react";
import PropTypes from "prop-types";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';

function AppMain(props) {

    const [state, setState] = useState({
        selected: {
            first: null,
            middle: [],
            last: null,
        }
    });

    return(
        <main className={style.main}>
            <div className={style.cols}>
                <div>
                    <BurgerIngredients items={props.ingredients}/>
                </div>
                <div>
                    {
                        props.ingredients.length>0 &&
                        <BurgerConstructor ingredients={props.ingredients} selected={state.selected} />
                    }
                </div>
            </div>
        </main>
    );
}

PropTypes.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AppMain