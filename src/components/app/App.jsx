import React, {useEffect} from 'react';
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import { useDispatch } from "react-redux";
import {loadIngredients} from "../../services/actions/ingredient";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    },[dispatch]);

    return (
        <div>
            <AppHeader/>
            <AppMain/>
        </div>
    );
}

export default App;