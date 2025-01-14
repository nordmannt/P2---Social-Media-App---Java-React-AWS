
import AuthService from "../../Services/auth.service";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import { AppContainer, MainContent } from "../../StyledComponents/StyledComponents";

function ProtectedRoutes() {
    const user = AuthService.getCurrentUser(); 
    return user ?
            
         <AppContainer>
            <NavBar />
            <MainContent>
                <Outlet />
            </MainContent>
        </AppContainer>

        :
        
        <Navigate to="/" />;
}

export default ProtectedRoutes;