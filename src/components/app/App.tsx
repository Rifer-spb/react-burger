import React, {useState, useEffect} from 'react';
import { getIngredients } from "../api/api";
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import ErrorComponent from "../common/error/ErrorComponent";

function App() {

    const [state, setState] = useState({
        ingredients: [],
        hasError: false,
        errorMessage: ''
    });

    useEffect(() => {
        try {
            getIngredients()
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Error load ingredients data');
                })
                .then(data => setState({...state, ingredients: data.data}))
                .catch((error) => {
                    setState({...state, hasError: true, errorMessage: error.message});
                });
        } catch (err) {}
    },[]);

    return (
        <div>
            {
                (state.hasError && state.errorMessage) ?
                <ErrorComponent text={state.errorMessage} /> :
                <div className="App">
                    <AppHeader/>
                    <AppMain ingredients={state.ingredients} />
                </div>
            }
        </div>
    );
}

export default App;
