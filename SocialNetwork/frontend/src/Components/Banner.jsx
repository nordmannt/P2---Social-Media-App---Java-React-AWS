import React from "react";
import { Box } from "@mui/material";
import Logo from "./Logo";

function Banner(props) {
    return (
        <Box
            {...props}
            sx={{
                position: "fixed",
                top: 0,
                width: "100%",
                backgroundColor: "background.paper",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                zIndex: 1000,
                textAlign: "center",
                py: 1,
            }}
        >
            <Logo sx={{ mx: "auto" }} />
        </Box>
    );
}

export default Banner;