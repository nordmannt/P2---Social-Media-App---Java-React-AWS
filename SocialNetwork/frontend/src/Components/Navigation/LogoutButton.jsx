import { Button } from "@mui/material";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        authService.logout();
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
