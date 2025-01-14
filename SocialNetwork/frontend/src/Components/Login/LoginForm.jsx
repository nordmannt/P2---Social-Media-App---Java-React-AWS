import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import authService from "../../Services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = {
            username: username,
            password: password,
        };

        authService
            .login(loginRequest)
            .then(() => {
                setErrorMessage("");
                navigate(`/feed`);
            })
            .catch((error) => {
                console.log("login error: ", error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage("Invalid username or password. Please try again.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again later.");
                }
            });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: "400px", margin: "auto" }}
        >
            {errorMessage && (
                <Typography color="error" sx={{ textAlign: "center" }}>
                    {errorMessage}
                </Typography>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        required
                        fullWidth
                        placeholder="Username"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LockIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        required
                        fullWidth
                        placeholder="Password"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            </Box>

            <Button type="submit" variant="contained" color="primary" sx={{ width: "60%", alignSelf: "center", mt: 1 }}>
                Log in
            </Button>
        </Box>
    );
}

export default LoginForm;
