
import { useParams } from "react-router";
import Comments from "../Comments";

function Post() {



    // const postId = useParams();
    const postId = 2;

    return(
        <div>
          <h1>This is a Post</h1>
          <br/><br/><br/><br/><br/><br/>
          <Comments postId={postId}/>
        </div>

    );
 };
 export default Post;