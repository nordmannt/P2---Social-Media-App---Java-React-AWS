import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import commentService from "../../../Services/comment.service";

const CreateCommentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
    maxWidth: "600px",
    margin: "auto",
    marginBottom: "2rem",
    boxSizing: "border-box",
}));

const FullWidthTextField = styled(TextField)(() => ({
    marginBottom: "1rem",
    width: "100%",
}));

const FullWidthButton = styled(Button)(({ theme }) => ({
    width: "48%",
    "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
    },
}));

function CreateComment(props) {
    const { post, user, parentComment, fetchComments, onCancel } = props;
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const MAX_CONTENT_LENGTH = 255;

    async function handleSubmit(event) {
        event.preventDefault();

        if (!content.trim()) {
            setError("Comment content cannot be empty.");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Comment content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
            return;
        }

        const postId = post ? post.postId : null;
        const parentCommentId = parentComment ? parentComment.commentId : null;

        try {
            await commentService.createComment(content, user.id, postId, parentCommentId);
            fetchComments();
            setContent("");
            setError("");
            if (onCancel) onCancel();
        } catch (error) {
            console.log("createComment error: ", error);
            setError("Failed to post the comment. Please try again later.");
        }
    }

    return (
        <CreateCommentContainer component="form" onSubmit={handleSubmit}>
            <FullWidthTextField
                label="Add a comment"
                multiline
                value={content}
                onChange={(e) => {
                    const value = e.target.value;
                    setContent(value);

                    if (!value.trim()) {
                        setError("Comment content cannot be empty.");
                    } else if (value.length > MAX_CONTENT_LENGTH) {
                        setError(`Comment content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
                    } else {
                        setError("");
                    }
                }}
                error={!!error}
                helperText={error || `${content.length}/${MAX_CONTENT_LENGTH} characters`}
            />
            <Box display="flex" justifyContent="space-between" width="100%">
                <FullWidthButton variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </FullWidthButton>
                <FullWidthButton type="submit" variant="contained" color="primary">
                    Post Comment
                </FullWidthButton>
            </Box>
        </CreateCommentContainer>
    );
}

export default CreateComment;
