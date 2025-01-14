import { useState } from "react";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import SearchBar from "../Components/Search/SearchBar";
import searchService from "../Services/search.service";

function SearchPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSearch = async (query) => {
        console.log(`Searching for: ${query}`);
        try {
            const results = await searchService.searchPosts(query);
            console.log("Search results:", results);
            setPosts(results);
            setError(null);
        } catch (err) {
            console.error("Error during search:", err);
            setError("Failed to fetch search results. Please try again.");
        }
    };

    return (
        <div>
            <h1>Search Posts</h1>
            <SearchBar onSearch={handleSearch} searchLabel={"Posts"} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <DisplayPosts posts={posts} user={user} />
        </div>
    );
}

export default SearchPage;
