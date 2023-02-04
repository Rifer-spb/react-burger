import React from "react";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';

class AppMain extends React.Component {
    render() {
        return(
            <main className={style.main}>
                <div className={style.cols}>
                    <div>
                        <BurgerIngredients items={this.props.data}/>
                    </div>
                    <div>
                        <BurgerConstructor />
                    </div>
                </div>
            </main>
        );
    }
}

export default AppMain