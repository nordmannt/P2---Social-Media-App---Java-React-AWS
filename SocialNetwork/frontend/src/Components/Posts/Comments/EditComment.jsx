import { useState } from "react";
import commentService from "../../../Services/comment.service";
import authService from "../../../Services/auth.service";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

function EditComment({ comment, onCommentUpdate, onClose }) {
    const user = authService.getCurrentUser();
    const [content, setContent] = useState(comment.content || "");
    const [error, setError] = useState("");

    const MAX_CONTENT_LENGTH = 255;

    const handleSave = async () => {
        if (!user || !user.id) {
            setError("Error: User is not authenticated.");
            console.error("Error: User is undefined or missing ID.");
            return;
        }

        if (!content.trim()) {
            setError("Comment content cannot be empty.");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Comment content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
            return;
        }

        try {
            const updatedComment = { ...comment, content };
            await commentService.updateComment(updatedComment);
            onCommentUpdate();

            handleClose();
        } catch (error) {
            console.error("Error updating comment: ", error);
            setError("Failed to update the comment. Please try again later.");
        }
    };

    const handleClose = () => {
        onClose();
        setError("");
        setContent(comment.content || "");
    };

    return (
        <>
            <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditComment;
