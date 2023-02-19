import React, {useState, useEffect} from 'react';
import { getIngredients } from "../api/api";
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import ErrorComponent from "../common/error/ErrorComponent";
import { DataContext, SelectedContext } from '../services/ingredientsContext';

function App() {

    const [data, setData] = useState([]);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ''
    });
    const [selected, setSelected] = useState([
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733cc',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733cf',
        '60d3b41abdacab0026a733d4'
    ]);

    useEffect(() => {
        getIngredients()
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error load ingredients data');
            })
            .then(data => setData(data.data))
            .catch((error) =>
                setError({hasError: true, errorMessage: error.message})
            );
    },[]);

    return (
        <div>
            {
                (error.hasError && error.errorMessage) ?
                <ErrorComponent text={error.errorMessage} /> :
                <div className="App">
                    <AppHeader/>
                    <DataContext.Provider value={{data, setData}}>
                        <SelectedContext.Provider value={{selected, setSelected}}>
                            <AppMain />
                        </SelectedContext.Provider>
                    </DataContext.Provider>
                </div>
            }
        </div>
    );
}

export default App;