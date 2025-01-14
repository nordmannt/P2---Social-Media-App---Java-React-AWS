import { FormControl, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import postService from "../../../Services/post.service";
import imageService from "../../../Services/image.service";
import SelectImage from "../../Image/SelectImage";
import { useState } from "react";

function CreatePost({ user, onPostCreated }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [content, setContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState("");

    const MAX_CONTENT_LENGTH = 255;

    const handleImageSelect = (file) => {
        setSelectedImages((selectedImages) => [...selectedImages, file]);
    };

    const handleImageRemove = (index) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newSelectedImages);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) {
            setError("Post content cannot be empty.");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Post content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
            return;
        }

        try {
            const uploadedImageIds = [];
            for (const image of selectedImages) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("fileName", image.name);
                formData.append("accountId", user.id);
                formData.append("imageType", "POST");

                const response = await imageService.uploadFile(formData);
                uploadedImageIds.push(response.imageId);
            }

            const createPostRequest = {
                accountId: user.id,
                content,
                imageIds: uploadedImageIds,
            };

            await postService.createPost(createPostRequest);
            onPostCreated();
            setContent("");
            setSelectedImages([]);
            setError("");
            setIsDialogOpen(false);
        } catch (error) {
            console.error("createPost error: ", error);
        }
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setError("");
        setContent("");
        setSelectedImages([]);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
                size={"large"}
                sx={{
                    marginBottom: 2,
                    borderRadius: "10px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleDialogOpen()}
            >
                Create Post
            </Button>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label="Content"
                                multiline
                                rows={4}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    setError("");
                                }}
                                variant="outlined"
                                error={!!error}
                                helperText={error || `${content.length}/${MAX_CONTENT_LENGTH} characters`}
                            />
                        </FormControl>
                        <SelectImage onImageSelect={handleImageSelect} selectedImages={selectedImages} handleImageRemove={handleImageRemove} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreatePost;
