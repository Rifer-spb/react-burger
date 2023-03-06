import React from "react";
import style from './Home.module.css';
import BurgerIngredients from "../../components/main/burgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/main/burgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Home() {
    return(
        <div className={style.cols}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor/>
            </DndProvider>
        </div>
    );
}

export default Home