import { useState, useEffect, useCallback } from "react";
import reactionsService from "../../../Services/reactions.service";
import styled from "@emotion/styled";
import { IconButton, Box, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, ThumbDown, ThumbDownOffAlt, AddComment } from '@mui/icons-material';
import commentService from "../../../Services/comment.service";

const ReactionsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
}));


const ReactionIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[500],
    '&.active': {
        color: theme.palette.primary.main,
    },
    '&:hover': {
        color: theme.palette.grey[700],
        '&.active': {
            color: theme.palette.primary.dark,
        },
    },
}));

const IndentedTypography = styled(Typography)(({ theme }) => ({
    marginLeft: '0.5rem',
}));

function DisplayReactions({ entityId, entityType, user, onAddCommentClick }) {
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);
    const [numComments, setNumComments] = useState(0);
    const [reaction, setReaction] = useState(null);

    const serviceMap = {
        post: {
            getLikeCount: () => reactionsService.getLikeCountByPostId(entityId),
            getDislikeCount: () => reactionsService.getDislikeCountByPostId(entityId),
            getReaction: () => reactionsService.getReactionByPostIdAndAccountId(entityId, user.id),
            createReaction: (type) => reactionsService.createReaction({
                reactionType: type, 
                postId: entityId, 
                accountId: user.id
            }),
            deleteReaction: (reactionId) => reactionsService.deleteReaction(reactionId),
            getCommentCount: () => commentService.getCommentsCountByPostId(entityId),
        },
        comment: {
            getLikeCount: () => reactionsService.getLikeCountByCommentId(entityId),
            getDislikeCount: () => reactionsService.getDislikeCountByCommentId(entityId),
            getReaction: () => reactionsService.getReactionByCommentIdAndAccountId(entityId, user.id),
            createReaction: (type) => reactionsService.createCommentReaction({
                reactionType: type, 
                commentId: entityId, 
                accountId: user.id
            }),
            deleteReaction: (reactionId) => reactionsService.deleteCommentReaction(reactionId),
            getCommentCount: () => Promise.resolve(0), // Update if replies are added
        },
    };

    const fetchData = useCallback(() => {
        if (!serviceMap[entityType]) {
            console.error(`Invalid entityType: ${entityType}`);
            return;
        }

        const service = serviceMap[entityType];
        service.getLikeCount().then(setNumLikes);
        service.getDislikeCount().then(setNumDislikes);
        service.getReaction().then(setReaction);
        service.getCommentCount().then(setNumComments);
    }, [entityId, entityType, user.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleReactionClick = (type) => {
        const service = serviceMap[entityType];
        if (reaction?.reactionType === type) {
            service.deleteReaction(reaction.reactionId).then(fetchData);
        } else {
            service.createReaction(type).then(fetchData);
        }
    };

    return (
        <ReactionsContainer>
            <Box display="flex" alignItems="center">
                <ReactionIconButton
                    className={reaction?.reactionType === "LIKE" ? 'active' : ''}
                    onClick={() => handleReactionClick("LIKE")}
                >
                    {reaction?.reactionType === "LIKE" ? <Favorite /> : <FavoriteBorder />}
                    <IndentedTypography variant="body2">{numLikes}</IndentedTypography>
                </ReactionIconButton>
            </Box>
            <Box display="flex" alignItems="center">
                <ReactionIconButton
                    className={reaction?.reactionType === "DISLIKE" ? 'active' : ''}
                    onClick={() => handleReactionClick("DISLIKE")}
                >
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

export default DisplayReactions;

