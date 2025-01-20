import { Button } from "@mui/material";
import postService from "../../../Services/post.service";


function DeletePost(props) {
    const { post, onPostDelete } = props;
    

    function hadnleClick() {
        postService.deletePost(post.postId)
            .then(() => onPostDelete())
            .catch((error) => console.log("Delete post error: ", error));
    }

    return ( 
        <Button variant="contained" color="error" onClick={() => hadnleClick()}>
            Delete
        </Button>
     );
}

export default DeletePost;