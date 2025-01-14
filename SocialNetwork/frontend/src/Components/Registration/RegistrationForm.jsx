import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, TextField, Button, MenuItem } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import authService from "../../Services/auth.service";
import userService from "../../Services/user.service";

function RegistrationForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const emailTimeoutRef = useRef(null);
    const usernameTimeoutRef = useRef(null);

    useEffect(() => {
        setButtonDisabled(
            !email ||
                !password ||
                !confirmPassword ||
                !username ||
                !firstName ||
                !lastName ||
                !gender ||
                emailError ||
                usernameError ||
                passwordError ||
                password !== confirmPassword
        );
    }, [email, password, confirmPassword, username, firstName, lastName, gender, emailError, usernameError, passwordError]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const registrationRequest = {
            email,
            password,
            username,
            firstName,
            lastName,
            gender,
        };

        try {
            const response = await authService.register(registrationRequest);
            if (response.accountId) {
                navigate("/registration-confirmation");
            } else {
                alert(response.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.response?.data?.message || error.message || "An unexpected error occurred. Please try again.");
        }
    };

    const handleEmailValidation = (email) => {
        clearTimeout(emailTimeoutRef.current);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setEmailErrorMessage("Invalid email format");
            return;
        }

        emailTimeoutRef.current = setTimeout(async () => {
            try {
                const exists = await userService.checkEmailExists(email);
                if (exists) {
                    setEmailError(true);
                    setEmailErrorMessage("Email already exists");
                } else {
                    setEmailError(false);
                    setEmailErrorMessage("");
                }
            } catch (error) {
                console.error("Error checking email:", error);
                setEmailError(true);
                setEmailErrorMessage("Unable to validate email");
            }
        }, 500);
    };

    const handleUsernameValidation = (username) => {
        clearTimeout(usernameTimeoutRef.current);

        usernameTimeoutRef.current = setTimeout(async () => {
            try {
                const exists = await userService.checkUsernameExists(username);
                if (exists) {
                    setUsernameError(true);
                    setUsernameErrorMessage("Username not available");
                } else {
                    setUsernameError(false);
                    setUsernameErrorMessage("");
                }
            } catch (error) {
                console.error("Error checking username:", error);
                setUsernameError(true);
                setUsernameErrorMessage("Unable to validate username");
            }
        }, 500);
    };

    const handlePasswordValidation = (password) => {
        if (password.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must be at least 8 characters long");
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        placeholder="Email"
                        size="small"
                        value={email}
                        error={emailError}
                        helperText={emailErrorMessage}
                        onBlur={(e) => handleEmailValidation(e.target.value)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Box>

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
                        error={usernameError}
                        helperText={usernameErrorMessage}
                        onBlur={(e) => handleUsernameValidation(e.target.value)}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                    <PersonIcon fontSize="small" />
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            label="First Name"
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            fullWidth
                            placeholder="First Name"
                            size="small"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            label="Last Name"
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            fullWidth
                            placeholder="Last Name"
                            size="small"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WcIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Gender"
                        id="gender"
                        name="gender"
                        select
                        required
                        fullWidth
                        placeholder="Gender"
                        size="small"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </TextField>
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
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            handlePasswordValidation(e.target.value);
                        }}
                    />
                </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LockIcon fontSize="small" />
                <FormControl sx={{ flex: 1 }}>
                    <TextField
                        label="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        fullWidth
                        placeholder="Confirm Password"
                        size="small"
                        value={confirmPassword}
                        error={password !== confirmPassword}
                        helperText={password !== confirmPassword ? "Passwords do not match" : ""}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </FormControl>
            </Box>

            <Button type="submit" variant="contained" color="primary" disabled={buttonDisabled} sx={{ width: "60%", alignSelf: "center", mt: 1 }}>
                Register
            </Button>
        </Box>
    );
}

export default RegistrationForm;
