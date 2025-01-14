import { useState, useEffect } from "react";
import { Typography, Card, CardContent, Avatar, Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userService from "../Services/user.service";
import imageService from "../Services/image.service";
function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [userAvatars, setUserAvatars] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.getAllUsers();
                setUsers(fetchedUsers);

                const avatarPromises = fetchedUsers.map(async (user) => {
                    if (user.userInfo?.profileImage?.bucketKey) {
                        const avatarUrl = await imageService.getPresignedUrl(user.userInfo.profileImage.bucketKey);
                        return { [user.accountId]: avatarUrl };
                    } else {
                        return { [user.accountId]: null };
                    }
                });

                const avatarResults = await Promise.all(avatarPromises);
                const avatarMap = {};
                avatarResults.forEach((result) => {
                    Object.assign(avatarMap, result);
                });
                setUserAvatars(avatarMap);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Box sx={{ padding: "1rem", maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h5" gutterBottom>
                Discover Users
            </Typography>
            {users.length === 0 ? (
                <Typography variant="body1" align="center">
                    No users to display.
                </Typography>
            ) : (
                <Grid2 container spacing={2}>
                    {users.map((user) => (
                        <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={user.accountId}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "1rem",
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
                                        transform: "translateY(-5px)",
                                    },
                                    textAlign: "center",
                                }}
                                onClick={() => navigate(`/profile/${user.accountId}`)}
                            >
                                <Avatar src={userAvatars[user.accountId]} alt={user.username} sx={{ width: 80, height: 80, marginBottom: "0.5rem" }}>
                                    {user.username.charAt(0)}
                                </Avatar>
                                <CardContent sx={{ padding: "0" }}>
                                    <Typography variant="body1">{user.username}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Box>
    );
}

export default AllUsersPage;
