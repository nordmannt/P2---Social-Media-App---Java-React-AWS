import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ onSearch, placeholder }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Box display="flex" gap={2} marginBottom={2}>
            <TextField
                label={placeholder || "Search"}
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
}

export default SearchBar;
