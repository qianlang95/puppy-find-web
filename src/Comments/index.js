import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";


function Comments({postId}) {
  const { currentUser } = useSelector((state) => state.userReducer);

    console.log(postId,"!!!!!!!!!1")
    const [errorMessage, setErrorMessage] = useState(null);



    // for deploy
    // const API_BASE = process.env.PUPPY_NODE_API_BASE;

    //for local
    const API_BASE = "http://localhost:4000";

    // const API = "http://localhost:4002/api/comments";
    // const API_ID = "http://localhost:4002/api/comment";
    const API = `${API_BASE}/api/comments`;

    const [comment, setComment] = useState({
"description":"",
"userId": currentUser._id,
"userName":currentUser.username,
"postId":postId
    });

//     const [comment, setComment] = useState({
// "description":"",
// "userId": "",
// "userName":"",
// "postId":postId
//     });

    const [comments, setComments] = useState([]);

      const fetchCommentsByPostId = async () => {
        const response = await axios.get(`${API}/${postId}`);
        // const response = await axios.get(API);
        console.log(response,"*****************");
        setComments(response.data);
      };
      useEffect(() => {
        console.log(postId,"fetchCommentsByPostId1#########")
        fetchCommentsByPostId();
        console.log(postId,"fetchCommentsByPostId1#########2")
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
    const selectComment = async (comment) => {
      // try {
        // console.log("@@@@@select comment1", `${API_ID}/${comment._id}`);
        // const comment = await axios.get(`${API_ID}/${comment._id}`);
        console.log("@@@@@select comment2", comment);
        setComment(comment);
      // } catch (err) {
      //   console.log(err);
      // }
    };

    const updateComment = async () => {
      try {
        const status = await axios.put(`${API}/${comment._id}`, comment);
        setComments(comments.map((u) => (u._id === comment._id ? comment : u)));
      } catch (err) {
        console.log(err);
      }
    };
    
    
    
    

    return (
      <div className="container mt-4">
         {currentUser && (
      
      
                <div>



                    <div>
                    {currentUser.role === "buyer" && (
                      <textarea
                        onChange={(e) => setComment({ ...comment, description: e.target.value })}
                        placeholder="Create your comment here..."
                        value={comment.description}
                        type="text"
                        className="form-control mb-3"
                        rows={7} // Adjust the number of rows as needed
                        style={{ width: '100%' }} // Set the width to 100% for responsiveness
                      />)}


                      {currentUser.role === "buyer" && (

                      <button
                        onClick={() => postComment()}
                        className="btn btn-primary mb-2 me-2">
                        Create a comment
                      </button>
                      )}

                      {currentUser.role === "buyer" && (

                      <button
                        onClick={() => updateComment()}
                        className="btn btn-info mb-2">
                        Update a comment
                      </button>)}
                      
                    </div>


                    <div>


                              <ul className="list-group">
                              {comments.map((comment) => (
                                
                                <li key={comment.id}
                                    className="list-group-item">
                                      {(comment.userId === currentUser._id || currentUser.role === "admin")&&(
                                        <button
                                          className="btn btn-danger btn-sm float-end"
                                          onClick={()=>deleteComment(comment)}>
                                          Remove
                                        </button>
                                      )}

                                        {currentUser.role === "buyer" && comment.userId === currentUser._id &&(

                                        <button className="btn btn-warning me-2 float-end btn-sm" onClick={() => selectComment(comment)}>
                                          select comment
                                        </button>
                                        )}
                                        <div>
                                        <span className="me-2 custom-font-size" >{comment.userName}</span>
                          <a  href={
                             `/profile/${comment.userId}`
                        } 
                        
                          className="btn btn-success btn-sm me-2 ml-2">
                            Go to Profile
                          </a>

                        {/* <a  href={
                          comment.userId === currentUser._id
                            ? `/account/${comment.userId}`
                            : `/profile/${comment.userId}`
                        } 
                        
                          className="btn btn-success btn-sm me-2 ml-2">
                            Go to Profile
                          </a> */}
                          
                        </div>
                                  <br/>
                                  {comment.description}
                                </li>
                              ))}
                            </ul>

                </div>

                </div>)}

                </div>
    );
  }
  export default Comments;