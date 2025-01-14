import axios from 'axios';

const api_url = "api/userinfo";

class UserInfoService {

    getUserInfoByAccountId(id) {
        return axios.get(api_url + "/getByAccountId/" + id).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    updateUserInfo(userInfo) {
        return axios.put(`${api_url}/${userInfo.userInfoId}`, userInfo).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }


}

const userInfoService = new UserInfoService();
export default userInfoService;