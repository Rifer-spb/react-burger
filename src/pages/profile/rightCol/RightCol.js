import React from "react";
import { Routes, Route, Outlet } from "react-router";
import ProfileForm from "./profileForm/ProfileForm";
import Orders from "./orders/Orders";

function RightCol(props) {

    console.log(props);

    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default RightCol;