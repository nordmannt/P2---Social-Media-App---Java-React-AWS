import { useState, useEffect, useCallback, useMemo } from "react";
import reactionsService from "../../Services/reactions.service";
import styled from "@emotion/styled";
import { IconButton, Box, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, ThumbDown, ThumbDownOffAlt, AddComment } from "@mui/icons-material";
import commentService from "../../Services/comment.service";

const ReactionsContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
}));

const ReactionIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[500],
    "&.active": {
        color: theme.palette.primary.main,
    },
    "&:hover": {
        color: theme.palette.grey[700],
        "&.active": {
            color: theme.palette.primary.dark,
        },
    },
}));

const IndentedTypography = styled(Typography)(() => ({
    marginLeft: "0.5rem",
}));

function PostReactions({ entityId, entityType, user, comments, onAddCommentClick }) {
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);
    const [numComments, setNumComments] = useState(0);
    const [reaction, setReaction] = useState(null);

    const serviceMap = useMemo(() => {
        if (entityType === "post") {
            return {
                getLikeCount: () => reactionsService.getLikeCountByPostId(entityId),
                getDislikeCount: () => reactionsService.getDislikeCountByPostId(entityId),
                getReaction: () => reactionsService.getReactionByPostIdAndAccountId(entityId, user.id),
                createReaction: (type) =>
                    reactionsService.createReaction({
                        reactionType: type,
                        postId: entityId,
                        accountId: user.id,
                    }),
                deleteReaction: (reactionId) => reactionsService.deleteReaction(reactionId),
                getCommentCount: () => commentService.getCommentsCountByPostId(entityId),
            };
        } else if (entityType === "comment") {
            return {
                getLikeCount: () => reactionsService.getLikeCountByCommentId(entityId),
                getDislikeCount: () => reactionsService.getDislikeCountByCommentId(entityId),
                getReaction: () => reactionsService.getReactionByCommentIdAndAccountId(entityId, user.id),
                createReaction: (type) =>
                    reactionsService.createCommentReaction({
                        reactionType: type,
                        commentId: entityId,
                        accountId: user.id,
                    }),
                deleteReaction: (reactionId) => reactionsService.deleteCommentReaction(reactionId),
                getCommentCount: () => commentService.getCommentsCountByCommentId(entityId),
            };
        } else {
            console.log("Invalid entityType:", entityType);
            return {};
        }
    }, [entityType, entityId, user.id]);

    const fetchData = useCallback(() => {
        serviceMap.getLikeCount().then(setNumLikes);
        serviceMap.getDislikeCount().then(setNumDislikes);
        serviceMap.getReaction().then(setReaction);
        serviceMap.getCommentCount().then(setNumComments);
    }, [serviceMap]);

    useEffect(() => {
        fetchData();
    }, [fetchData, comments]);

    const handleReactionClick = (type) => {
        if (reaction?.reactionType === type) {
            serviceMap.deleteReaction(reaction.reactionId).then(fetchData);
        } else {
            serviceMap.createReaction(type).then(fetchData);
        }
    };

    return (
        <ReactionsContainer>
            <Box display="flex" alignItems="center">
                <ReactionIconButton className={reaction?.reactionType === "LIKE" ? "active" : ""} onClick={() => handleReactionClick("LIKE")}>
                    {reaction?.reactionType === "LIKE" ? <Favorite /> : <FavoriteBorder />}
                    <IndentedTypography variant="body2">{numLikes}</IndentedTypography>
                </ReactionIconButton>
            </Box>
            <Box display="flex" alignItems="center">
                <ReactionIconButton className={reaction?.reactionType === "DISLIKE" ? "active" : ""} onClick={() => handleReactionClick("DISLIKE")}>
                    {reaction?.reactionType === "DISLIKE" ? <ThumbDown /> : <ThumbDownOffAlt />}
                    <IndentedTypography variant="body2">{numDislikes}</IndentedTypography>
                </ReactionIconButton>
            </Box>
            {onAddCommentClick && (
                <Box display="flex" alignItems="center">
                    <ReactionIconButton onClick={onAddCommentClick} color="primary">
                        <AddComment />
                        <IndentedTypography variant="body2">{numComments}</IndentedTypography>
                    </ReactionIconButton>
                </Box>
            )}
        </ReactionsContainer>
    );
}

export default PostReactions;
