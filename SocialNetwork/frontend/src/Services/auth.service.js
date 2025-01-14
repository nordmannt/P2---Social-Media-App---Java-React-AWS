import axios from "axios";

const api_url = "auth";

class AuthService {
  login(loginRequest) {
    return axios
      .post(api_url + "/login", loginRequest)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.accessToken;
        }
        return response.data;
      })
      .catch((error) => {
        console.log("login error: ", error);
        throw error;
      });
  }
  logout() {
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  }

  async register(registerRequest) {
    try {
      const response = await axios.post(api_url + "/register", registerRequest);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      alert(errorMessage);
      throw error;
    }
  }

    getCurrentUser() {
        const user = localStorage.getItem("user");
        if (!user) {
            // console.error("No user found in localStorage.");
            return null;
        }
        try {
            const parsedUser = JSON.parse(user);
            if (!parsedUser.id) {
                console.error("User object is missing ID:", parsedUser);
                return null;
            }
            return parsedUser;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    }

}

const authService = new AuthService();
export default authService;
