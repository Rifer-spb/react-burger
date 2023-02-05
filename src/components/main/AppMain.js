import React from "react";
import style from './AppMainCss.module.css';
import BurgerIngredients from "./burgerIngredients/BurgerIngredients";
import BurgerConstructor from './burgerConstructor/BurgerConstructor';

class AppMain extends React.Component {

    state = {
        selected: {
            first: '60666c42cc7b410027a1a9b1',
            middle: [
                '60666c42cc7b410027a1a9b9',
                '60666c42cc7b410027a1a9b4',
                '60666c42cc7b410027a1a9bc',
                '60666c42cc7b410027a1a9bb',
                '60666c42cc7b410027a1a9ba'
            ],
            last: '60666c42cc7b410027a1a9b1',
        }
    };

    render() {
        return(
            <main className={style.main}>
                <div className={style.cols}>
                    <div>
                        <BurgerIngredients items={this.props.data}/>
                    </div>
                    <div>
                        <BurgerConstructor items={this.props.data} selected={this.state.selected} />
                    </div>
                </div>
            </main>
        );
    }
}

export default AppMain