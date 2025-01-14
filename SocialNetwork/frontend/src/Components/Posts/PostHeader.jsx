import { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledNavLink } from "../../StyledComponents/StyledComponents";
import EditPost from "./Post/EditPost";
import { Edit, Delete } from "@mui/icons-material";
import postService from "../../Services/post.service";
import commentService from "../../Services/comment.service";
import EditComment from "./Comments/EditComment";
import imageService from "../../Services/image.service";

function PostHeader({ entityOwner, entity, canManage, onEntityUpdate, onEntityDelete, entityType }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [profileImageUrl, setProfileImageUrl] = useState("");
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (!entityOwner?.userInfo?.profileImage) {
                    setProfileImageUrl("");
                    return;
                }
                const url = await imageService.getPresignedUrl(entityOwner.userInfo.profileImage.bucketKey);
                setProfileImageUrl(url);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchProfileImage();
    }, [entityOwner?.userInfo?.profileImage]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setIsEditOpen(true);
        handleMenuClose();
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
    };

    const handleDeleteClick = () => {
        if (entityType === "post") {
            postService
                .deletePost(entity.postId)
                .then(() => onEntityDelete())
                .catch((error) => console.log("Delete post error: ", error));
            handleMenuClose();
        } else if (entityType === "comment") {
            commentService
                .deleteComment(entity.commentId)
                .then(() => onEntityDelete())
                .catch((error) => console.log("Delete comment error: ", error));
        } else {
            console.error("Invalid entity type for deletion: ", entityType);
        }
    };
    return (
        <>
            <Box style={{ display: "flex", flexDirection: "row" }} width={"100%"} justifyContent={"space-between"} marginBottom={"1rem"}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={profileImageUrl || null} sx={{ marginRight: "0.5rem" }}>
                        {entityOwner?.userInfo?.firstName?.charAt(0) || "#"}
                    </Avatar>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        <StyledNavLink to={`/profile/${entityOwner.accountId || ""}`}>
                            <Typography variant="h6">{entityOwner.username || "Unknown User"}</Typography>
                        </StyledNavLink>
                        <Typography variant="caption">
                            {entity.dateCreated
                                ? new Intl.DateTimeFormat("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }).format(new Date(entity.dateCreated))
                                : "No timestamp available"}
                        </Typography>{" "}
                    </Box>
                </Box>
                <Box style={{ alignSelf: "flex-end" }}>
                    {canManage && (
                        <IconButton onClick={handleMenuOpen} style={{ marginLeft: "auto" }}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleEditClick}>
                            <ListItemIcon>
                                <Edit color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Edit" />
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <ListItemIcon>
                                <Delete color="error" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            {isEditOpen &&
                (entityType === "post" ? (
                    <EditPost post={entity} onPostUpdate={onEntityUpdate} onClose={handleEditClose} />
                ) : (
                    <EditComment comment={entity} onCommentUpdate={onEntityUpdate} onClose={handleEditClose} />
                ))}
        </>
    );
}

export default PostHeader;
