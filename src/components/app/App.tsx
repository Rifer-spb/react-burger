import React, {useState, useEffect} from 'react';
import { getIngredients } from "../api/api";
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';

function App() {

    const [state, setState] = useState({
        ingredients: []
    });

    useEffect(() => {
        getIngredients()
            .then(response => response.json())
            .then(data => setState({ingredients: data.data}))
            .catch((error) => {
                console.log(error.message);
                alert('Request error!')
            });
    },[]);

    return (
        <div className="App">
            <AppHeader/>
            <AppMain ingredients={state.ingredients} />
        </div>
    );
}

export default App;
