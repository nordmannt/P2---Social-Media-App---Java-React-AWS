import axios from "axios";

const api_url = "api/friendship";

class FriendshipService {
    canFollow(accountId, friendId) {
        return axios.get(`${api_url}/isFollowing/${accountId}/${friendId}`).then(response => {
            return !response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    follow(accountId, friendId) {
        const createFriendshipRequest = {
            accountId: accountId,
            friendId: friendId
        }
        return axios.post(`${api_url}`, createFriendshipRequest).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    unfollow(accountId, friendId) {
        return axios.delete(`${api_url}/deleteFriendshipByAccountIdAndFriendId/${accountId}/${friendId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

}

const friendshipService = new FriendshipService();
export default friendshipService;