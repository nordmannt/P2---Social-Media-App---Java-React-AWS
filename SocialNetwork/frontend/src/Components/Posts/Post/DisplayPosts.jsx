import { useState, useEffect } from "react";
import Post from "./Post";
import { Box, FormControl, Select, MenuItem, Typography } from "@mui/material";

function DisplayPosts(props) {
    const { posts, user, userInfo, onPostDelete, onPostUpdate } = props;
    const [sortOrder, setSortOrder] = useState("newToOld");
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        if (!posts || posts.length === 0) {
            setSortedPosts([]);
            return;
        }
        const sorted = [...posts].sort((a, b) =>
            sortOrder === "newToOld" ? new Date(b.dateCreated) - new Date(a.dateCreated) : new Date(a.dateCreated) - new Date(b.dateCreated)
        );
        setSortedPosts(sorted);
    }, [posts, sortOrder]);

    if (!sortedPosts || sortedPosts.length === 0) {
        return <Typography>No posts to display</Typography>;
    }

    return (
        <>
            <Box display="flex" alignItems="center" mb={2} style={{ width: "100%" }}>
                <FormControl size="small" style={{ marginLeft: "auto" }}>
                    <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} displayEmpty>
                        <MenuItem value="newToOld">Newest to Oldest</MenuItem>
                        <MenuItem value="oldToNew">Oldest to Newest</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {sortedPosts.map((post) => (
                <Post key={post.postId} post={post} user={user} userInfo={userInfo} onPostDelete={onPostDelete} onPostUpdate={onPostUpdate} />
            ))}
        </>
    );
}

export default DisplayPosts;
