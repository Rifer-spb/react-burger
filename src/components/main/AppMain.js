import React from "react";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';

function AppMain() {

    return(
        <main className={style.main}>
            <div className={style.cols}>
                <div>
                    <BurgerIngredients />
                </div>
                <div>
                    <BurgerConstructor />
                </div>
            </div>
        </main>
    );
}

export default AppMain