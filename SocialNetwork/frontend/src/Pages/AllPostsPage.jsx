import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import postService from "../Services/post.service";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import { StyledStack } from "../StyledComponents/StyledComponents";

const PostsContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
}));

function AllPostsPage() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await postService.getAllPosts();
            setPosts(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <StyledStack>
            <Typography variant="h4" gutterBottom>
                All Posts
            </Typography>
            {posts.length === 0 ? (
                <Typography variant="body1" align="center">
                    No posts available.
                </Typography>
            ) : (
                <PostsContainer>
                    <DisplayPosts posts={posts} user={user} />
                </PostsContainer>
            )}
        </StyledStack>
    );
}

export default AllPostsPage;
