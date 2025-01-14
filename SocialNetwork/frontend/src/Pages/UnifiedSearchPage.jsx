import { useState } from "react";
import SearchBar from "../Components/Search/SearchBar";
import searchService from "../Services/search.service";
import DisplaySearchUser from "../Components/Search/DisplaySearchUser";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import { Typography, Divider } from "@mui/material";

function UnifiedSearchPage() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSearch = async (query) => {
        try {
            setError(null);
            const { users: userResults, posts: postResults } = await searchService.searchAll(query);

            setUsers(userResults);
            setPosts(postResults);
        } catch (err) {
            console.error("Error during search:", err);
            setError("Failed to fetch search results. Please try again.");
            setUsers([]);
            setPosts([]);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Search
            </Typography>
            <SearchBar onSearch={handleSearch} placeholder="Search Posts and Users" />

            {error && <Typography style={{ color: "red", textAlign: "center" }}>{error}</Typography>}

            {!error && users.length > 0 && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Users
                    </Typography>
                    <DisplaySearchUser users={users} error={null} />
                </>
            )}

            {!error && posts.length > 0 && (
                <>
                    <Divider style={{ margin: "2rem 0" }} />
                    <Typography variant="h5" gutterBottom>
                        Posts
                    </Typography>
                    <DisplayPosts posts={posts} user={user} />
                </>
            )}

            {!error && users.length === 0 && posts.length === 0 && (
                <Typography style={{ textAlign: "center", marginTop: "2rem" }}>No users or posts match your search. Please try a different query.</Typography>
            )}
        </div>
    );
}

export default UnifiedSearchPage;
