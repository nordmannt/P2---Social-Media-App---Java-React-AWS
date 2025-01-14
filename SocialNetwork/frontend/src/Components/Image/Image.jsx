import { useEffect, useState } from "react";
import imageService from "../../Services/image.service";
import { IconButton, Box, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Image({ images, deleteOption, handleImageRemove }) {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const urls = await Promise.all(
                    images.map(async (image) => {
                        const newUrl = await imageService.getPresignedUrl(image.bucketKey);
                        return newUrl;
                    })
                );
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, [images]);

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderColor: "black",
        borderWidth: "1px",
        borderStyle: "solid",
        aspectRatio: "1/1",
    };

    return (
        <Grid2 container spacing={0} sx={{ height: "auto" }}>
            {imageUrls.map((url, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                    <img src={url} alt="Post" style={imageStyle} />
                    {deleteOption && (
                        <IconButton onClick={() => handleImageRemove(index)} color="secondary" sx={{ position: "absolute", top: 0, right: 0 }}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Grid2>
    );
}

export default Image;
