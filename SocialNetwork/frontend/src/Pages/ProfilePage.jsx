import { useEffect, useState, useCallback } from "react";
import { StyledStack, StyledCard } from "../StyledComponents/StyledComponents";
import { Typography, Divider } from "@mui/material";
import userInfoService from "../Services/userinfo.service";
import authService from "../Services/auth.service";
import postService from "../Services/post.service";
import userService from "../Services/user.service";
import UserInfoComponent from "../Components/Profile/UserInfo/UserInfoComponent";
import CreatePost from "../Components/Posts/Post/CreatePost";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import { useParams } from "react-router-dom";
import EditUserInfo from "../Components/Profile/UserInfo/EditUserInfo";

function ProfilePage() {
    const { profileUserId } = useParams();
    const user = authService.getCurrentUser();
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [username, setUsername] = useState("");

    const fetchUsername = useCallback(async () => {
        try {
            const response = await userService.getUsernameByAccountId(parseInt(profileUserId));
            setUsername(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }, [profileUserId]);

    const fetchUserInfo = useCallback(async () => {
        try {
            const response = await userInfoService.getUserInfoByAccountId(parseInt(profileUserId));
            setUserInfo(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }, [profileUserId]);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await postService.getPostsByAccountId(parseInt(profileUserId));
            setPosts(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }, [profileUserId]);

    useEffect(() => {
        setIsOwnProfile(user?.id === parseInt(profileUserId));
        const fetchData = async () => {
            await fetchUserInfo();
            await fetchPosts();
            await fetchUsername();
        };
        fetchData();
    }, [profileUserId, user?.id, fetchUserInfo, fetchPosts, fetchUsername]);

    async function refreshPostsHandler() {
        await fetchPosts();
    }

    return (
        <StyledStack>
            <Typography variant="h3" gutterBottom>
                Profile
            </Typography>
            <StyledCard
                style={{
                    backgroundColor: "#f4f9fd",
                    border: "none",
                    boxShadow: "2px 4px 6px #CAE4F6",
                }}
            >
                <UserInfoComponent user={user} userInfo={userInfo} profileId={parseInt(profileUserId)} username={username} />
                {isOwnProfile && <EditUserInfo user={user} userInfo={userInfo} onUserInfoUpdate={fetchUserInfo} />}
                <Divider sx={{ my: 2 }} />
                {isOwnProfile && <CreatePost user={user} onPostCreated={refreshPostsHandler} />}
                <DisplayPosts user={user} userInfo={userInfo} posts={posts} onPostDelete={refreshPostsHandler} onPostUpdate={refreshPostsHandler} />
            </StyledCard>
        </StyledStack>
    );
}

export default ProfilePage;
