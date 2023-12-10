import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



function Admin() {

  const { currentUser } = useSelector((state) => state.userReducer);

    const [breeds, setBreeds] = useState([]);
    const [breedNum, setBreedNum] = useState([]);
    const [usersNum, setUserNum] = useState([]);
    const [commentNum, setCommentNum] = useState([]);
    const [postNum, setPostNum] = useState([]);
        // for deploy
    // const API_BASE = process.env.PUPPY_NODE_API_BASE;

    //for local
    // const API_BASE = "http://localhost:4000";
    const API_BASE = process.env.REACT_APP_BASE_API_URL;


    // const API_DOMAIN = "http://localhost:4002/api"
    const API_DOMAIN = `${API_BASE}/api`

    const fetchBreeds = async () => {
        const response = await axios.get(`${API_DOMAIN}/breedsLimit`);
        console.log("*****",response.data);
        

        setBreeds(response.data);
    }


    const fetchBreedNumber = async () => {
        const response = await axios.get(`${API_DOMAIN}/breeds`);
        setBreedNum(response.data.length);
        setUserNum(response.data.length);
    }



    const fetchUsersNumber = async () => {
        const response = await axios.get(`${API_DOMAIN}/users`);

        setUserNum(response.data.length);
    }

    const fetchCommentNumber = async () => {
        const response = await axios.get(`${API_DOMAIN}/comments`);

        setCommentNum(response.data.length);
    }


    const fetchPostNumber = async () => {
        const response = await axios.get(`${API_DOMAIN}/pets`);

        setPostNum(response.data.length);
    }











    useEffect(() => {
        fetchBreeds();
        fetchCommentNumber();

        fetchBreedNumber();
        fetchUsersNumber();
        fetchPostNumber();
        }, []);   
        
        
    return(


<div className="container mt-4">
<div >

            <div>
  
                    <h1 className="mb-4 text-primary">Hello Admin!</h1>
                    <h2 className="mb-4 text-info">In the Puppy Find, we have: </h2>

                    {/* Displaying Total Users, Posts, Comments, and Breeds */}
                    <div className="row">
                      <div className="col-md-3 mb-4">
                        <div className="bg-light p-3 text-center">
                          <h3 className="text-success mb-3">Total Users</h3>
                          <p className="mb-0" style={{ whiteSpace: 'nowrap' }}>{usersNum}</p>

                          {/* <Link to={`/users`} className="btn btn-link">Check all users</Link> */}
                        </div>
                      </div>
                      <div className="col-md-3 mb-4">
                        <div className="bg-light p-3 text-center">
                          <h3 className="text-warning mb-3">Total Posts</h3>
                          <p className="mb-0" style={{ whiteSpace: 'nowrap' }}>{postNum}</p>

                        </div>
                      </div>
                      <div className="col-md-3 mb-4">
                        <div className="bg-light p-3 text-center">
                          <h3 className="text-danger mb-3">Total Comments</h3>
                          <p className="mb-0" style={{ whiteSpace: 'nowrap' }}>{commentNum}</p>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4">
                        <div className="bg-light p-3 text-center">
                          <h3 className="text-primary mb-3">Total Breeds</h3>
                          <p className="mb-0" style={{ whiteSpace: 'nowrap' }}>{breedNum}</p>
                        </div>
                      </div>
                    </div>

              </div>


              <div>

                {/* Manage Fun Facts for Breeds */}
              <h2 className="mt-4 text-success">Manage Fun Facts for Breeds here:</h2>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Breed ID</th>
                    <th scope="col">Breed Name</th>
                    <th scope="col">Fun Fact</th>
                    <th scope="col">Link to Breed Detail Page</th>
                  </tr>
                </thead>
                <tbody>
                  {breeds.map((breed) => (
                    <tr key={breed._id}>
                      <td>{breed.breedId}</td>
                      <td>{breed.name}</td>
                      <td>{breed.funFact1}</td>
                      <td>
                        <Link to={`/detail/${breed.breedId}`} className="btn btn-primary">
                          Check Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              </div>
</div>
</div>


    );
 };
 export default Admin;