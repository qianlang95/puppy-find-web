import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Comments({postId}) {
    console.log(postId,"!!!!!!!!!1")
    const [errorMessage, setErrorMessage] = useState(null);

    const API = "http://localhost:4002/api/comments";
    const [comment, setComment] = useState({
      userId: 8,
      userName: "Sammmm",
      description: "This is a cute puppy!",
      postId:2
      });

    const [comments, setComments] = useState([{
        userId: 1,
        userName: "Sam",
        description: "This is a cute puppy!",
        postId:1
      }]);

      const fetchCommentsByPostId = async () => {
        const response = await axios.get(`${API}/${postId}`);
        // const response = await axios.get(API);
        console.log(response,"*****************");
        setComments(response.data);
      };
      useEffect(() => {
        fetchCommentsByPostId();
      }, []);


      const postComment = async () => {
        const response = await axios.post(API, comment);
        setComments([...comments, response.data]);
      };
    

      const deleteComment = async (comment) => {
        try {
          console.log(`${API}/${comment._id}`, "delete!!!!!!!!!!!!!!!!!!!")
        const response = await axios.delete((`${API}/${comment._id}`));

        setComments(comments.filter((t) => t._id !== comment._id));
    } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
  
    }

    //   const updateComment = async () => {

    //     try {

    //     const response = await axios.put(
    //       `${API}/${comment.id}`, comment);
    //     setComments(comments.map((t) => (
    //       t.id === comment.id ? comment : t)));
    //     setComment({});
    // } catch (error) {
    //     console.log(error);
    //     setErrorMessage(error.response.data.message);
    //   }
  
    //   };
    
    
    
    
    

    return (
      <div>

        <textarea
        onChange={(e) => setComment({ ...comment,
          description: e.target.value })}
        value={comment.description} 
        type="text"
        className="form-control"
      />
        <button 
              onClick={()=> postComment()}
              className="btn btn-primary mb-2">
          Create a comment
        </button>

        <ul className="list-group">
        {comments.map((comment) => (
          
          <li key={comment.id}
              className="list-group-item">
                  <button
                    className="btn btn-danger float-end"
                    onClick={()=>deleteComment(comment)}>
                    Remove
                  </button>
            {comment.userName}
            <a href={`${comment.authorProfile}`}
            className="btn btn-success me-2">
            go to profile
            </a>
            <br/>
            {comment.description}
          </li>
        ))}
      </ul>



        
    


      </div>
    );
  }
  export default Comments;