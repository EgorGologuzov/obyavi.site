import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

const errors = {
    "403": {name: "Forbidden", message: "Вам не доступна эта страница"},
    "404": {name: "Nor found", message: "Такой страницы нет"}
}

export default function Error() {
    const navigate = useNavigate();
    const {code} = useParams();
    const {loginedUser} = useAppContext();


    return (
        <div>
            Error: {` ${code} ${errors[code]?.name} ${errors[code]?.message}`}
            <button onClick={() => navigate(-2)}>Назад</button>
            <button onClick={() => navigate("/", {replace: true})}>На главную</button>
        </div>
    )
}
