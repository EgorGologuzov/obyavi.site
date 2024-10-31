import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from "../../components/Card";
import "../LayoutCard.css"

const errors = {
    "403": { name: "Forbidden", message: "Вам не доступна эта страница" },
    "404": { name: "Nor found", message: "Такой страницы нет" }
}

export default function Error({ code }) {
    const navigate = useNavigate();

    return (
        <div className="layout-card">
            <Card>
                <div>
                    Error: {` ${code} ${errors[code]?.name} ${errors[code]?.message}`}
                    <button onClick={() => navigate(-1)}>Назад</button>
                    <button onClick={() => navigate("/", { replace: true })}>На главную</button>
                </div>
            </Card>
        </div>
    )
}
