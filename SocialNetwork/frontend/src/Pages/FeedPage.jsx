import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
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

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const fetchHomePosts = useCallback(async () => {
        try {
            const response = await postService.getHomePosts(user.id);
            setPosts(response);
            if (response.length === 0) {
                setOpenDialog(true);
            }
        } catch (error) {
            console.error("Error fetching feed posts: ", error);
        }
    }, [user.id]);

    useEffect(() => {
        fetchHomePosts();
    }, [fetchHomePosts]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleExplore = () => {
        navigate("/allposts");
    };

    return (
        <StyledStack>
            {posts.length === 0 ? (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>It’s a bit quiet here...</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" gutterBottom>
                            It seems like you haven’t followed anyone yet.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Explore our community and start connecting with others to see their posts here.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Stay Here
                        </Button>
                        <Button onClick={handleExplore} variant="contained" color="primary">
                            Go Explore
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <PostsContainer>
                    <DisplayPosts posts={posts} user={user} />
                </PostsContainer>
            )}
        </StyledStack>
    );
}

export default FeedPage;
