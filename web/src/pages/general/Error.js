import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from "../../components/Card";
import Header from "../../components/Header";
import Button from "../../components/Button";
import "./Error.css"
import Paragraf from '../../components/Paragraf';
import Grid from '../../components/Grid';

const errors = {
    "403": { name: "Forbidden", message: "Вам не доступна эта страница" },
    "404": { name: "Nor found", message: "Такой страницы нет" }
}

export default function Error({ code }) {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <Card>
                <Header level="1" color="warning">Error: {` ${code} ${errors[code]?.name}`}</Header>
                <Paragraf>{errors[code]?.message}</Paragraf>
                <Grid desktopColumns="2" mobileColumns="1">
                    <Button onClick={() => navigate(-1)} color="primary">Назад</Button>
                    <Button onClick={() => navigate("/", { replace: true })} color="secondary">На главную</Button>
                </Grid>
            </Card>
        </div>
    )
}
