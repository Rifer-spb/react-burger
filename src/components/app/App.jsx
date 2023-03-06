import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import { useDispatch } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    },[dispatch]);

    return (
        <Router>
            <AppHeader/>
            <AppMain/>
        </Router>
    );
}

export default App;