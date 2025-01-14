import axios from "axios";

const api_url = "api/post";
const api_url_user = "api/account";

class SearchService {
    searchPosts(query) {
        return axios
            .get(`${api_url}/searchPosts?query=${encodeURIComponent(query)}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.error(`Search error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    console.error("Search request error:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
                throw error;
            });
    }

    searchUsers(query) {
        return axios
            .get(`${api_url_user}/searchUser?query=${encodeURIComponent(query)}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error during user search:", error);
                throw error;
            });
    }

    async searchAll(query) {
        try {
            const [users, posts] = await Promise.all([
                this.searchUsers(query),
                this.searchPosts(query),
            ]);
            return {users, posts};
        } catch (error) {
            console.error("Error during unified search:", error);
            throw error;
        }
    }
}

const searchService = new SearchService();
export default searchService;
