import React from "react";
import style from './NotFoundPage.module.css';

function NotFoundPage() {
    return (
        <div className={style.notFound}>
            <h1 className="text_type_main-large">(404) Page not found</h1>
            <p className={style.p + " text_type_main-medium"}>— Теория — это когда все известно, но ничего не работает. Практика — это когда все работает, но никто не знает почему. Мы же объединяем теорию и практику: ничего не работает… и никто не знает почему!</p>
            <p className={style.author + " text_type_main-medium"}>
                <i>- Альберт Энштейн</i>
            </p>
        </div>
    );
}

export default NotFoundPage