import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Image from "../Image/Image";

const StyledPostContent = styled(Typography)(() => ({
    textAlign: "left",
    marginBottom: "1rem",
    width: "100%",
    border: "none",
    boxShadow: "none",
}));

function PostContent({ entity }) {
    return (
        <>
            <StyledPostContent variant="body1">{entity.content}</StyledPostContent>
            <Image images={entity.images} />
        </>
    );
}

export default PostContent;
