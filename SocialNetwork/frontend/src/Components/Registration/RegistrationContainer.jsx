import { Box, Typography, Link } from "@mui/material";
import { StyledCard, StyledStack } from "../../StyledComponents/StyledComponents";
import RegistrationForm from "./RegistrationForm";

function RegistrationContainer() {
    return (
        <StyledStack>
            <StyledCard>
                <Typography variant="h4">Join Us</Typography>

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