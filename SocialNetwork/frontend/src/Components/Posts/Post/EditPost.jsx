import { useEffect, useState } from "react";
import postService from "../../../Services/post.service";
import imageService from "../../../Services/image.service";
import authService from "../../../Services/auth.service";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography } from "@mui/material";
import SelectImage from "../../Image/SelectImage";
import Image from "../../Image/Image";
function EditPost({ post, onPostUpdate, onClose }) {
    const user = authService.getCurrentUser();
    const [content, setContent] = useState(post.content);
    const [error, setError] = useState("");
    const [existingImages, setExistingImages] = useState(post.images || []);
    const [selectedImages, setSelectedImages] = useState([]);

    const MAX_CONTENT_LENGTH = 255;

    useEffect(() => {
        setContent(post.content);
        setExistingImages(post.images || []);
        setSelectedImages([]);
    }, [post]);

    const handleImageSelect = (file) => {
        setSelectedImages((selectedImages) => [...selectedImages, file]);
    };

    const handleImageRemove = (index) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newSelectedImages);
    };
    const handleExistingImageRemove = (index) => {
        setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        onClose();
        setSelectedImages([]);
        setContent(post.content || "");
        setError("");
    };

    const handleSave = async () => {
        if (!user || !user.id) {
            setError("Error: User is not authenticated.");
            console.error("Error: User is undefined or missing ID.");
            return;
        }

        if (!content.trim()) {
            setError("Post content cannot be empty.");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Post content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
            return;
        }

        try {
            // handle content and imageIds didn't change and cancel edit if necessary
            if (content === post.content && selectedImages.length === 0 && existingImages.length === post.images.length) {
                handleClose();
                return;
            }
            const newImageIds = [];
            for (const image of selectedImages) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("fileName", image.name);
                formData.append("accountId", user.id);
                formData.append("imageType", "POST");
                const imageResponse = await imageService.uploadFile(formData);
                newImageIds.push(imageResponse.imageId);
            }

            const allImageIds = [...existingImages.map((img) => img.imageId), ...newImageIds];

            const updatePostRequest = {
                postId: post.postId,
                accountId: user.accountId,
                content: content,
                imageIds: allImageIds,
            };

            await postService.updatePost(updatePostRequest);
            onPostUpdate();
            handleClose();
        } catch (error) {
            console.error("Error updating post: ", error);
            setError("Failed to update the post. Please try again later.");
        }
    };

    return (
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        width: "80%",
                        maxWidth: "800px",
                    },
                }}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={content}
                        onChange={(event) => {
                            const value = event.target.value;
                            setContent(value);

                            if (!value.trim()) {
                                setError("Post content cannot be empty.");
                            } else if (value.length > MAX_CONTENT_LENGTH) {
                                setError(`Post content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
                            } else {
                                setError("");
                            }
                        }}
                        error={!!error}
                        helperText={error || `${content.length}/${MAX_CONTENT_LENGTH} characters`}
                    />

                    {existingImages.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Existing Images
                            </Typography>
                            <Image images={existingImages} deleteOption={true} handleImageRemove={handleExistingImageRemove} />
                        </Box>
                    )}
                    <SelectImage onImageSelect={handleImageSelect} selectedImages={selectedImages} handleImageRemove={handleImageRemove} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPost;
