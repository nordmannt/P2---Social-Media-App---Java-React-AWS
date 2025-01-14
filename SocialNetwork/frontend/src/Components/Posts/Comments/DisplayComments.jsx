import { Box, Typography, Divider } from "@mui/material";
import styled from "@emotion/styled";
import Comment from "./Comment";

const CommentsContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    width: "100%",
    boxSizing: "border-box",
}));

function DisplayComments({ fetchComments = () => {}, user = {}, comments = [] }) {
    if (!Array.isArray(comments) || comments.length === 0) {
        return (
            <CommentsContainer>
                <Typography variant="body1" align="center">
                    No comments yet
                </Typography>
            </CommentsContainer>
        );
    }

    return (
        <CommentsContainer>
            <Divider textAlign="left">Replies</Divider>
            {comments.map((comment) => (
                <Comment key={comment.commentId} user={user} comment={comment} fetchComments={fetchComments} />
            ))}
        </CommentsContainer>
    );
}

export default DisplayComments;
