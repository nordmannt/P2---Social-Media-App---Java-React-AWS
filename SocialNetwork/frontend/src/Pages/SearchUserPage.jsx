import { useState } from "react";
import SearchBar from "../Components/Search/SearchBar";
import searchService from "../Services/search.service";
import DisplaySearchUser from "../Components/Search/DisplaySearchUser";

function SearchUserPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        try {
            console.log(`Sending search request for query: ${query}`);
            const results = await searchService.searchUsers(query);
            console.log("Search results received:", results);
            setUsers(results);
            setError(null);
        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("Failed to fetch search results. Please try again.");
            setUsers([]);
        }
    };

    return (
        <div>
            <h1>Search Users</h1>
            <SearchBar onSearch={handleSearch} searchLabel={"Users"} />
            <DisplaySearchUser users={users} error={error} />
        </div>
    );
}

export default SearchUserPage;
