import { useState, useEffect } from "react";
import imageService from "../../../Services/image.service";
import userInfoService from "../../../Services/userinfo.service";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Avatar, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./userinfo.css";
import { Close } from "@mui/icons-material";

const EditUserInfo = ({ user, userInfo, onUserInfoUpdate }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [biography, setBiography] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (userInfo?.profileImage) {
                    const url = await imageService.getPresignedUrl(userInfo.profileImage.bucketKey);
                    setImagePreviewUrl(url);
                } else {
                    setImagePreviewUrl("");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
        setFirstName(userInfo.firstName || "");
        setLastName(userInfo.lastName || "");
        setGender(userInfo.gender || "");
        setBiography(userInfo.biography || "");
        setSelectedImages([]);
    }, [userInfo, isEditOpen]);

    // selecting profile image preview
    const handleImageSelect = (file) => {
        setImagePreviewUrl(URL.createObjectURL(file));
        setSelectedImages([file]);
    };

    // remove profile image preview going back to default picture
    const handleImageRemove = () => {
        setImagePreviewUrl(null);
        setSelectedImages([]);
    };

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }
        try {
            if (selectedImages.length == 1) {
                // delete the old image
                if (userInfo.profileImage) {
                    await imageService.deleteImage(userInfo.profileImage.imageId);
                }

                const image = selectedImages[0];
                const formData = new FormData();
                formData.append("file", image);
                formData.append("fileName", image.name);
                formData.append("accountId", user.id);
                formData.append("userInfoId", userInfo.userInfoId);
                formData.append("imageType", "PROFILE");

                // Upload the image; backend handles associating the bucket key
                await imageService.uploadFile(formData);
            } else if (selectedImages.length == 0 && !imagePreviewUrl) {
                // if the user didn't select a new image and image removes the image from preview
                // delete the profile image and utilize the default image
                if (userInfo.profileImage) {
                    await imageService.deleteImage(userInfo.profileImage.imageId);
                }
            }

            // Update user info
            const updatedUserInfo = {
                ...userInfo,
                firstName,
                lastName,
                gender,
                biography,
            };
            await userInfoService.updateUserInfo(updatedUserInfo);
            await onUserInfoUpdate();
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    const handleCancel = () => {
        setIsEditOpen(false);
    };

    const validateFields = () => {
        const fieldErrors = {};
        if (!firstName.trim()) {
            fieldErrors.firstName = "First name cannot be empty.";
        }
        if (!lastName.trim()) {
            fieldErrors.lastName = "Last name cannot be empty.";
        }

        setErrors(fieldErrors);
        return Object.keys(fieldErrors).length === 0;
    };
    return (
        <>
            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                    marginTop: "1rem",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "8px 16px",
                    borderColor: "primary.main",
                    ":hover": {
                        backgroundColor: "primary.light",
                        borderColor: "primary.dark",
                    },
                }}
                onClick={() => setIsEditOpen(true)} // Opens the Edit Profile dialog
            >
                Edit Profile
            </Button>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            position: "relative",
                            width: "fit-content",
                            margin: "auto",
                        }}
                    >
                        <Avatar
                            style={{ margin: "auto", cursor: "pointer", width: 110, height: 110, marginBottom: "50px" }}
                            src={imagePreviewUrl ? imagePreviewUrl : ""}
                            onClick={() => document.getElementById("avatar-input").click()}
                            id="edit-profile-avatar"
                        >
                            {userInfo.firstName?.charAt(0) || "#"}
                        </Avatar>

                        {imagePreviewUrl && (
                            <Close
                                onClick={handleImageRemove}
                                sx={{
                                    position: "absolute",
                                    top: "0rem",
                                    left: "1.7rem",
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    display: "hidden",
                                }}
                                className="delete-avatar-icon"
                            />
                        )}
                    </Box>

                    <input
                        type="file"
                        id="avatar-input"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                handleImageSelect(file);
                            }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select label="Gender" labelId="gender-label" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Biography"
                        type="text"
                        fullWidth
                        multiline
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditUserInfo;
