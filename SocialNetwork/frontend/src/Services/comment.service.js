import axios from "axios";

const api_url = "api/comment";

class CommentService {
    getCommentsByPostId(postId) {
        return axios
            .get(`${api_url}/getCommentsByPostId/${postId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    //
    createComment(content, accountId, postId, parentCommentId) {
        const commentRequest = {
            content: content,
            accountId: accountId,
        };
        if (postId) {
            commentRequest.postId = postId;
        } else {
            commentRequest.parentCommentId = parentCommentId;
        }
        return axios
            .post(api_url, commentRequest)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    deleteComment(commentId) {
        return axios
            .delete(`${api_url}/${commentId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    updateComment(comment) {
        return axios
            .put(`${api_url}/${comment.commentId}`, comment)
            .then((response) => {
                console.log("patch response: ", response);
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    getCommentsCountByPostId(postId) {
        return axios
            .get(`${api_url}/getCommentCountByPostId/${postId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    getCommentsCountByCommentId(commentId) {
        return axios
            .get(`${api_url}/getCommentCountByCommentId/${commentId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }
}

const commentService = new CommentService();
export default commentService;
