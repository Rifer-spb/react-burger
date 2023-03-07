import React from "react";
import { Outlet } from "react-router";
import style from './ColumnLayout.module.css';

function ColumnLayout({ sideBar }) {

    return (
        <section className={style.columnLayout}>
            <div className={style.cols}>
                <div>
                    {sideBar}
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </section>
    );
}

export default ColumnLayout