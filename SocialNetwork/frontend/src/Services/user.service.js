import axios from "axios";

const api_url = "api/account";

//this page has been reworked.  I was getting some weird random errors with the email and username checks these changes seemed to fix.

class UserService {
    async getAllUsers() {
        try {
            const response = await axios.get(api_url);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const response = await axios.get(`${api_url}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user by ID (${id}):`, error);
            throw error;
        }
    }

    async getAccountOfComment(commentId) {
        try {
            const response = await axios.get(`${api_url}/getAccountOfComment/${commentId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching account of comment (${commentId}):`, error);
            throw error;
        }
    }

    async getAccountOfPost(postId) {
        try {
            const response = await axios.get(`${api_url}/getAccountOfPost/${postId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching account of post (${postId}):`, error);
            throw error;
        }
    }

    async getFollowers(id) {
        try {
            const response = await axios.get(`${api_url}/getFollowers/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching followers for ID (${id}):`, error);
            throw error;
        }
    }

    async getFollowing(id) {
        try {
            const response = await axios.get(`${api_url}/getFollowing/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching following for ID (${id}):`, error);
            throw error;
        }
    }

    async checkEmailExists(email) {
        try {
            const response = await axios.get(`${api_url}/existsByEmail/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Error checking if email exists (${email}):`, error);
            throw error;
        }
    }

    async checkUsernameExists(username) {
        try {
            const response = await axios.get(`${api_url}/existsByUsername/${username}`);
            return response.data;
        } catch (error) {
            console.error(`Error checking if username exists (${username}):`, error);
            throw error;
        }
    }

    getUsernameByAccountId(accountId) {
        return axios
            .get(`${api_url}/getUsername/${accountId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }
}

const userService = new UserService();
export default userService;
