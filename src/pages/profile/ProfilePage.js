import React from "react";
import style from './ProfilePage.module.css';
import LeftCol from "./leftCol/LeftCol";
import RightCol from "./rightCol/RightCol";

function ProfilePage() {
    return(
        <section className={style.profile}>
            <div className={style.cols}>
                <LeftCol/>
                <RightCol/>
            </div>
        </section>
    );
}

export default ProfilePage