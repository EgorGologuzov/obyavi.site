import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import "./LayoutCard.css"

export default function LayoutGuest() {
    return (
        <div className="layout-card">
            <Card>
                <Outlet />
            </Card>
        </div>
    )
}
