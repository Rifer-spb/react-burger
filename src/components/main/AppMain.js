import React, {useState} from "react";
import PropTypes from "prop-types";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';

function AppMain({ingredients}) {

    const [state, setState] = useState({
        selected: {
            first: '60d3b41abdacab0026a733c6',
            middle: [
                '60d3b41abdacab0026a733cc',
                '60d3b41abdacab0026a733c8',
                '60d3b41abdacab0026a733d1',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733d4'
            ],
            last: '60d3b41abdacab0026a733c6'
        }
    });

    return(
        <main className={style.main}>
            <div className={style.cols}>
                <div>
                    <BurgerIngredients items={ingredients}/>
                </div>
                <div>
                    {
                        ingredients.length>0 &&
                        <BurgerConstructor { ...state.selected } ingredients={ingredients} />
                    }
                </div>
            </div>
        </main>
    );
}

AppMain.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AppMain