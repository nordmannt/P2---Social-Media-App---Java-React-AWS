import { Typography, Box, Link } from "@mui/material";
import { StyledCard, StyledStack } from "../../StyledComponents/StyledComponents";
import LoginForm from "./LoginForm";

function LoginContainer() {
    return (
        <StyledStack>
            <StyledCard>
                <Typography variant="h4">Login</Typography>
                <LoginForm />
                <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
                    <Typography variant="body1" sx={{ display: "inline", marginRight: "0.5rem" }}>
                        Don&apos;t have an account?
                    </Typography>
                    <Link
                        href="/register"
                        sx={{
                            textDecoration: "none",
                            color: "primary.main",
                            fontWeight: "bold",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Sign up
                    </Link>
                </Box>
            </StyledCard>
        </StyledStack>
    );
}

export default LoginContainer;