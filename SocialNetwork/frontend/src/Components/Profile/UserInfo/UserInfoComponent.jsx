import { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import Friendship from "../Friendship/Friendship";
import { StandardContainer } from "../../../StyledComponents/StyledComponents";
import imageService from "../../../Services/image.service";
const UserInfoComponent = (props) => {
    const { user, userInfo, profileId, username } = props;

    const [profileImageUrl, setProfileImageUrl] = useState("");
    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!userInfo.profileImage) {
                    setProfileImageUrl("");
                    return;
                }
                await imageService
                    .getPresignedUrl(userInfo.profileImage?.bucketKey)
                    .then((response) => {
                        setProfileImageUrl(response);
                    })
                    .catch((error) => {
                        console.error("Error fetching images:", error);
                    });
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, [userInfo]);

    return (
        <StandardContainer
            sx={{
                textAlign: "center",
                padding: "20px",
                marginBottom: "20px",
            }}
        >
            <Avatar src={profileImageUrl || ""} sx={{ width: 180, height: 180 }}>
                {userInfo.firstName?.charAt(0) || "#"}
            </Avatar>
            <Typography variant="h5">
                {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                @{username}
            </Typography>

            <Typography variant="body1" gutterBottom>
                {userInfo.biography}
            </Typography>

            <Friendship user={user} profileId={profileId} />
        </StandardContainer>
    );
};

export default UserInfoComponent;
