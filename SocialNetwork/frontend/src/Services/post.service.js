import axios from "axios";
import authService from "./auth.service";

const api_url = "api/post";

class PostService {
    getAllPosts() {
        return axios.get(api_url).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);});
    }

    createPost(createPostRequest) {
        return axios.post(api_url, createPostRequest).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getPostsByAccountId(id) {
        return axios.get(`${api_url}/getPostsByAccountId/${id}`, id).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getPostById(id) {
        return axios.get(`${api_url}/posts/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    deletePost(id) {
        return axios.delete(`${api_url}/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    updatePost(post) {
        return axios.put(`${api_url}/${post.postId}`, post).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getAllPostsBesidesOwn() {
        const user = authService.getCurrentUser();
        return axios.get(`${api_url}/getPostsBesidesOwn/${user.id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getHomePosts(accountId) {
        return axios
          .get(`${api_url}/getHomePosts/${accountId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching home posts: ", error);
          });
      }
}

const postService = new PostService();
export default postService;