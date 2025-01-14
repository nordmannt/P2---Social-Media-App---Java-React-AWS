import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

if (localStorage.getItem("user") != null) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
