import React, {useState, useEffect, useReducer} from 'react';
import { getIngredients } from "../api/api";
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import ErrorComponent from "../common/error/ErrorComponent";
import { DataContext, SelectedContext, OrderContext } from '../services/ingredientsContext';

const orderDefault = {
    name: '',
    price: 0,
    number: null
};

function setOrder(state, action) {
    switch (action.type) {
        case "set":
            return { ...state, ...action.payload };
        case "reset":
            return orderDefault;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function App() {

    const [data, setData] = useState([]);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ''
    });
    const [selected, setSelected] = useState([]);

    const [orderState, orderDispatcher] = useReducer(setOrder, orderDefault, undefined);

    const selectedRandom = () => {
        let items = [];
        const bun = data.find(item => item.type === 'bun');
        items.push(bun['_id']);
        const withOutBunItems = data.filter(item => item.type !== 'bun');
        let i = 0;
        while (i < 5) {
            const finedItem = withOutBunItems[
                Math.floor(Math.random()*withOutBunItems.length)
            ];
            const existItem = items.find(item => item === finedItem['_id']);
            if (!existItem) {
                items.push(finedItem['_id']);
                i++;
            }
        }
        setSelected(items);
    };

    useEffect(() => {
        getIngredients()
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error load ingredients data');
            })
            .then(response => {
                setData(response.data);
            })
            .catch((error) =>
                setError({hasError: true, errorMessage: error.message})
            );
    },[]);

    useEffect(() => {
        if(data.length) {
            selectedRandom();
        }
    },[data]);

    return (
        <div>
            {
                (error.hasError && error.errorMessage) ?
                <ErrorComponent text={error.errorMessage} /> :
                <div className="App">
                    <AppHeader/>
                    <DataContext.Provider value={{data, setData}}>
                        <SelectedContext.Provider value={{selected, setSelected}}>
                            <OrderContext.Provider value={{orderState, orderDispatcher}}>
                                <AppMain />
                            </OrderContext.Provider>
                        </SelectedContext.Provider>
                    </DataContext.Provider>
                </div>
            }
        </div>
    );
}

export default App;