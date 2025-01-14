import { Avatar, Typography } from "@mui/material";
import { StyledLink } from "../../../StyledComponents/StyledComponents";
import "./user.css";
import { useEffect, useState } from "react";
import imageService from "../../../Services/image.service";

function User(props) {
    const { user } = props;

    const [profileImageUrl, setProfileImageUrl] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!user.userInfo.profileImage) {
                    setProfileImageUrl("");
                    return;
                }
                await imageService
                    .getPresignedUrl(user.userInfo.profileImage?.bucketKey)
                    .then((response) => {
                        console.log("response", response);
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
    });
    return (
        <>
            <StyledLink destination={`/profile/${user.accountId}`} text={user.username} />
            <div className="user-profiles">
                <Avatar src={profileImageUrl || null}>{user?.userInfo?.firstName?.charAt(0) || "#"}</Avatar>
                <Typography id="user-fullname" variant="body1" align="left" gutterBottom>
                    {" "}
                    {user.userInfo.firstName} {user.userInfo.lastName}{" "}
                </Typography>
            </div>
        </>
    );
}

export default User;
