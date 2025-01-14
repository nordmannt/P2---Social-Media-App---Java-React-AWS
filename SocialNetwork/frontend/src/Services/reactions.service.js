import axios from "axios";

const api_url = "api/reactions";

class ReactionsService {
    // Post-related reactions
    getReactionByPostIdAndAccountId(postId, accountId) {
        return axios.get(`${api_url}/getReactionByPostIdAndAccountId/${postId}/${accountId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getReactionByPostIdAndAccountId: ", error);
                throw error;
            });
    }

    getLikeCountByPostId(postId) {
        return axios.get(`${api_url}/getLikeCountByPostId/${postId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getLikeCountByPostId: ", error);
                throw error;
            });
    }

    getDislikeCountByPostId(postId) {
        return axios.get(`${api_url}/getDislikeCountByPostId/${postId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getDislikeCountByPostId: ", error);
                throw error;
            });
    }

    createReaction(createReactionRequest) {
        return axios.post(api_url, createReactionRequest)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in createReaction: ", error);
                throw error;
            });
    }

    deleteReaction(reactionId) {
        return axios.delete(`${api_url}/${reactionId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in deleteReaction: ", error);
                throw error;
            });
    }

    // Comment-related reactions
    getReactionByCommentIdAndAccountId(commentId, accountId) {
        return axios.get(`${api_url}/getReactionByCommentIdAndAccountId/${commentId}/${accountId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getReactionByCommentIdAndAccountId: ", error);
                throw error;
            });
    }

    getLikeCountByCommentId(commentId) {
        return axios.get(`${api_url}/getLikeCountByCommentId/${commentId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getLikeCountByCommentId: ", error);
                throw error;
            });
    }

    getDislikeCountByCommentId(commentId) {
        return axios.get(`${api_url}/getDislikeCountByCommentId/${commentId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getDislikeCountByCommentId: ", error);
                throw error;
            });
    }

    createCommentReaction(createReactionRequest) {
        return axios.post(api_url, createReactionRequest)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in createCommentReaction: ", error);
                throw error;
            });
    }

    deleteCommentReaction(reactionId) {
        return axios.delete(`${api_url}/comment/${reactionId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in deleteCommentReaction: ", error);
                throw error;
            });
    }
    getCommentsCountByPostId(postId) {
        return axios.get(`${api_url}/getCommentsCountByPostId/${postId}`)
            .then(response => response.data)
            .catch(error => {
                console.log("Error in getCommentsCountByPostId: ", error);
                throw error;
            });
    }
    

}

const reactionsService = new ReactionsService();
export default reactionsService;
