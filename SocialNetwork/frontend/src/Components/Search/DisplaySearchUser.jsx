import { useState, useEffect } from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import imageService from "../../Services/image.service";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.dark,
    },
}));

function DisplaySearchUser({ users, error }) {
    const [userAvatars, setUserAvatars] = useState("");
    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarPromises = users.map(async (user) => {
                if (user?.userInfo?.profileImage) {
                    try {
                        const url = await imageService.getPresignedUrl(user.userInfo.profileImage.bucketKey);
                        return { accountId: user.accountId, avatarUrl: url };
                    } catch (err) {
                        console.error(`Error fetching avatar for user ${user.accountId}:`, err);
                    }
                }
                return { accountId: user.accountId, avatarUrl: null };
            });

            const avatarResults = await Promise.all(avatarPromises);
            const avatarsMap = avatarResults.reduce((acc, { accountId, avatarUrl }) => {
                if (accountId) acc[accountId] = avatarUrl;
                return acc;
            }, {});
            setUserAvatars(avatarsMap);
        };

        if (users.length > 0) {
            fetchAvatars();
        }
    }, [users]);

    return (
        <Box>
            {error && <Typography style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</Typography>}

            {users.length > 0
                ? users.map((user) => (
                      <Box
                          key={user.accountId}
                          style={{
                              border: "1px solid #ccc",
                              padding: "1rem",
                              marginBottom: "1rem",
                              borderRadius: "8px",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                          }}
                      >
                          <Avatar src={userAvatars[user.accountId] || null}>{user?.userInfo?.firstName?.charAt(0) || "#"}</Avatar>
                          <StyledNavLink to={`/profile/${user.accountId}`}>
                              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                                  {user.username}
                              </Typography>
                          </StyledNavLink>

                          <Typography variant="body1">
                              Name: {user.userInfo.firstName} {user.userInfo.lastName}
                          </Typography>
                          <Typography variant="body2" style={{ marginTop: "5px" }}>
                              Email: {user.email}
                          </Typography>
                          <Typography variant="body2" style={{ marginTop: "5px" }}>
                              Gender: {user.userInfo.gender}
                          </Typography>
                          <Typography variant="body2" style={{ marginTop: "5px" }}>
                              Biography: {user.userInfo.biography}
                          </Typography>

                          <Divider style={{ margin: "1rem 0" }} />

                          <Typography variant="body2">Following: {user.following.length} users</Typography>
                          <Typography variant="body2">Followers: {user.followers.length} users</Typography>
                          <Typography variant="body2">Total Posts: {user.posts.length}</Typography>
                      </Box>
                  ))
                : !error && <Typography style={{ textAlign: "center", marginTop: "2rem" }}>No users found. Try a different query.</Typography>}
        </Box>
    );
}

export default DisplaySearchUser;
