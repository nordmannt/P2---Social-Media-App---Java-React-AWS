import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import userService from "../../../Services/user.service";
import PostReactions from "../PostReactions";
import CreateComment from "./CreateComment";
import PostHeader from "../PostHeader";
import PostContent from "../PostContent";
const CommentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.primary,
    width: "100%",
    marginBottom: "1rem",
    boxSizing: "border-box",
}));

const RepliesContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "calc(100% - 1rem)",
    marginLeft: "1rem",
    marginTop: "0.5rem",
}));

function Comment({ user, comment, fetchComments }) {
    const [commentOwner, setCommentOwner] = useState({});
    const [canManageComment, setCanManageComment] = useState(false);
    const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);

    useEffect(() => {
        userService
            .getAccountOfComment(comment.commentId)
            .then((response) => {
                setCommentOwner(response);
                if (response.username === user.username) {
                    setCanManageComment(true);
                }
            })
            .catch((error) => {
                console.error("Error fetching comment owner:", error);
            });
    }, [comment.commentId, user.username]);

    const handleAddCommentClick = () => {
        setIsCommentInputVisible((prev) => !prev);
    };

    const handleCancelComment = () => {
        setIsCommentInputVisible(false);
    };

    return (
        <CommentContainer style={{ backgroundColor: "#f4f9fd", boxShadow: "none" }}>
            <PostHeader
                entityOwner={commentOwner}
                entity={comment}
                canManage={canManageComment}
                onEntityUpdate={fetchComments}
                onEntityDelete={fetchComments}
                entityType="comment"
            />
            <PostContent entity={comment} />
            <PostReactions entityId={comment.commentId} entityType="comment" user={user} comments={comment.replies} onAddCommentClick={handleAddCommentClick} />
            {isCommentInputVisible && <CreateComment user={user} parentComment={comment} fetchComments={fetchComments} onCancel={handleCancelComment} />}

            <RepliesContainer>
                {comment.replies && comment.replies.map((reply) => <Comment key={reply.commentId} user={user} comment={reply} fetchComments={fetchComments} />)}
            </RepliesContainer>
        </CommentContainer>
    );
}

export default Comment;
