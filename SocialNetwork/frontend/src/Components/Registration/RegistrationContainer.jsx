import { Box, Typography, Link } from "@mui/material";
import { StyledCard, StyledStack } from "../../StyledComponents/StyledComponents";
import RegistrationForm from "./RegistrationForm";
import Logo from "../Logo";

function RegistrationContainer() {
    return (
        <StyledStack>
            <StyledCard>
                <Logo sx={{ marginBottom: "0.5rem" }} />

                <Typography variant="h5">Sign up</Typography>

                <RegistrationForm />
                <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
                    <Typography variant="body1" sx={{ display: "inline", marginRight: "0.5rem" }}>
                        Already have an account?
                    </Typography>
                    <Link
                        href="/login"
                        sx={{
                            textDecoration: "none",
                            color: "primary.main",
                            fontWeight: "bold",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Login
                    </Link>
                </Box>
            </StyledCard>
        </StyledStack>
    );
}

export default RegistrationContainer;
