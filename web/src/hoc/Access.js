import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"

export default function Access({ children, role }) {
    const appContext = useAppContext();
    const location = useLocation();

    if (!appContext.loginedUser) {
        return <Navigate to="/auth" state={{from: location}} />
    }
    else if (appContext.loginedUser?.role !== role) {
        return <Navigate to="/error/403" state={{from: location}} />
    }

    return children
}
