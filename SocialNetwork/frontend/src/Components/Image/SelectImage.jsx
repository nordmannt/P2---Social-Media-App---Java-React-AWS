import { Box, IconButton, Button, Grid2, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function SelectImage({ selectedImages, onImageSelect, handleImageRemove }) {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    onImageSelect(file);
                };
                reader.readAsDataURL(file);
            });
        }
        event.target.value = null;
    };

    return (
        <Box>
            {selectedImages.length > 0 && (
                <Typography variant="body2" color="textSecondary">
                    Images to Upload
                </Typography>
            )}
            <Grid2 container spacing={2}>
                {selectedImages.map((image, index) => (
                    <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                        <Box sx={{ position: "relative" }}>
                            <img src={URL.createObjectURL(image)} alt="Selected" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                            <IconButton onClick={() => handleImageRemove(index)} color="secondary" sx={{ position: "absolute", top: 0, right: 0 }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>
            <Button component="label" variant="outline" color="primary" startIcon={<UploadFileIcon />}>
                Upload Images
                <input type="file" accept="image/*" hidden multiple onChange={handleFileChange} />
            </Button>
        </Box>
    );
}

export default SelectImage;
