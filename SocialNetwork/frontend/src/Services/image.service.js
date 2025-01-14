import axios from "axios";

const api_url = "api/image";

class ImageService {
    uploadFile(uploadFileRequest) {
        return axios
            .post(api_url, uploadFileRequest, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }
    deleteImage(imageId) {
        return axios
            .delete(`${api_url}/${imageId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }
    getPresignedUrl(key) {
        return axios
            .get(`${api_url}/getPresignedUrl/${key}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    updateImage(imageId, updateImageRequest) {
        return axios
            .put(`${api_url}/${imageId}`, updateImageRequest)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }
}

const imageService = new ImageService();
export default imageService;
