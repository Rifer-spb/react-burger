import React from "react";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';
import {DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function AppMain() {
    return(
        <main className={style.main}>
            <div className={style.cols}>
                <DndProvider backend={HTML5Backend}>
                    <div>
                        <BurgerIngredients />
                    </div>
                    <div>
                        <BurgerConstructor/>
                    </div>
                </DndProvider>
            </div>
        </main>
    );
}

export default AppMain