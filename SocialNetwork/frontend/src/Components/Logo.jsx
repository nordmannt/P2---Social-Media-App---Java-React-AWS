import { Typography, Box } from "@mui/material";

function Logo({ ...props }) {
    return (
        <Box {...props}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "bold",
                    color: "primary.main",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                Connect.
            </Typography>
        </Box>
    );
}

export default Logo;
