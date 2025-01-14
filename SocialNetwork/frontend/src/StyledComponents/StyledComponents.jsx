import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";
import { Stack, CardContent, Divider, Typography, Box, Button } from "@mui/material";





export const StyledStack = styled(Stack)(() => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100vw",
    margin: "auto",
    padding: "1rem",
    boxSizing: "border-box",
    backgroundColor: "transparent",
}));

export const StyledCard = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
}));

export const StandardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.primary,
    width: "100%",
    margin: "auto",
    boxSizing: "border-box",
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    // color: "#1976d2",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "color 0.3s ease, text-shadow 0.3s ease",
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.primary,
    "&:hover": {
        color: "#f1356d",
        textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    },
    "&.active > div": {
        backgroundColor: theme.palette.action.selected,
    },
}));

export function StyledLink({ destination, text }) {
    return (
        <Button
            component={Link}
            to={destination}
            color="third"
            variant="contained"
            sx={{
                textTransform: "none",
                fontSize: "1rem",
                padding: "0.5rem 1.5rem",
                borderRadius: "12px",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                margin: "5px",
                "&:hover": {
                    backgroundColor: "#1E8EAB",
                    color: "white",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            {text}
        </Button>
    );
}

export const StyledTypography = styled(Typography)({
    fontSize: "1.2rem",
    color: "#333",
});

export const StyledDivider = styled(Divider)({
    margin: "1rem 0",
    width: "100%",
});

export const StyledButton = styled(Button)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
}));

export const AppContainer = styled.div`
    display: flex;
    min-height: 100vh;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const MainContent = styled.div`
    flex-grow: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px) {
        padding: 1rem;
    }
`;
