
import AuthService from "../../Services/auth.service";
import { Outlet, Navigate } from "react-router-dom";

function UnprotectedRoutes() {
    const user = AuthService.getCurrentUser();
    return user ?
        <Navigate to= {`/profile/${user.id}`} />
        :
        <Outlet />
}

export default UnprotectedRoutes;