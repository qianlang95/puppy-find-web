import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./index.css";

function Detail() {
  const { currentUser } = useSelector((state) => state.userReducer);

  const [user, setUser] = useState(
    );


  const [like, setLike] = useState(
    {
      "userId" : currentUser._id,
      "userName" : currentUser.username
    }

  )
  const [numberOfLikes, setNumberOfLikes] = useState();



  const [postsForBreed, setPostsForBreed] = useState();

  


  // const api_key = "live_VhxuToewoxo0lvQyDgnvHuMaP5ZxMBKt5kqWZ1qKkvjuVMcTwGUaQfWxCdRwJtcV"
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key,"**************************apikey1")

    const { breedId } = useParams();
    // const breed = db.breeds.find((breed) => breed.id === breedId);

    const [isCat, setIsCat] = useState();
    const [isCheckForMore, setCheck] = useState(true);
    const [imgId, setImgId] = useState("");
    const cat_url = `https://api.thecatapi.com/v1/breeds/${breedId}`;
    const dog_url = `https://api.thedogapi.com/v1/breeds/${breedId}`;

    // for deploy
    // const API_BASE = process.env.PUPPY_NODE_API_BASE;

    //for local
    const API_BASE = "http://localhost:4000";


    // const puppy_server_url = 'http://localhost:4002/api';
    const puppy_server_url = `${API_BASE}/api`

    const [searchResults, setSearchResults] = useState();


    const [fun1, setFun1] = useState();

    const [fun2, setFun2] = useState();
    const [fun3, setFun3] = useState();
    const [noFun, setNoFun] = useState();
    const [usersLikes, setUsersLikes] = useState([]);

    const fetchBreeds = async () => {
    if (isIntegerString(breedId)){

        const response = await axios.get(dog_url, {headers: {
          'x-api-key': api_key
        }});
        setSearchResults(response.data);
        setIsCat(false);
    }
    else {
        const response = await axios.get(cat_url, {headers: {
          'x-api-key': api_key
        }});
        setSearchResults(response.data);
        setIsCat(true);
    }


}



const fetchLikes = async () => {
  

      const response = await axios.get(`${puppy_server_url}/likes/${breedId}`);
      setUsersLikes(response.data)

      const numberOfLikes = response.data.length;
      setNumberOfLikes(numberOfLikes);
      console.log("numberOfLikes########", numberOfLikes);
}



const isIntegerString = (str) => {
    // Trim the string
    str = str.trim();
  
    // Check for non-numeric characters
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (isNaN(char)) {
        return false;
      }
    }
  
    // Handle empty strings
    if (str.length === 0) {
      return false;
    }
  
    // Convert to number
    const num = parseInt(str);
    if (isNaN(num)) {
      return false;
    }
  
    return true;
  }


  const getFunFacts = async () => {
  

    if (isIntegerString(breedId)){

      const response = await axios.get(`${puppy_server_url}/dogs/${breedId}`);

      setFun1(response.data.funFact1);
      setFun2(response.data.funFact2);
      setFun3(response.data.funFact3);

      if(!response.data.funFact1) {
        setNoFun("oppps!no fun yet!")
      }

  }
  else {
    const response = await axios.get(`${puppy_server_url}/cats/${breedId}`);
    setFun1(response.data.funFact1);
    setFun2(response.data.funFact2);
    setFun3(response.data.funFact3);
    if(!response.data.funFact1) {
      setNoFun("oppps!no fun yet!")
    }

  

  }
  

}

const likeReady = async () => {
  const newLike = {...like, "breedId":breedId}
  console.log("***********like!!!!!", newLike);
  setLike(newLike);
}



const giveThumpUp = async () => {
  console.log("***********press like1!!!!!");
  const response = await axios.post(`${puppy_server_url}/like`, like);
}


const fetchPost = async () => {
  const response = await axios.get(`${puppy_server_url}/posts/breed/${breedId}`);
  setPostsForBreed(response.data);
}







useEffect(() => {

    fetchBreeds();
   
    likeReady();
    if (isIntegerString(breedId))
    {fetchPost();
      }
      fetchLikes();
    
    console.log("*******************3");
    console.log(searchResults,"searchResults");
},[]);


    return(
        <div className="container mt-4">
          

          
                {searchResults&& (
                  <div>
                  <h1>Details for {searchResults.name}</h1>

                  {isCat && (
                    <table class="table table-striped">


                  

<div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <img
          src={`https://cdn2.thecatapi.com/images/${searchResults.reference_image_id}.jpg`}
          alt={searchResults.name}
          class="custom-image-cat"
        />
      </div>
      <div class="col-md-6 btn-container">
        <button onClick={getFunFacts} className="btn btn-success">Check Fun Fact</button>
     
        {fun1 && <h7>{fun1}</h7>}
        {fun2 && <h7>{fun2}</h7>}
        {fun3 && <h7>{fun3}</h7>}
        {noFun && <h7>{noFun}</h7>}
      </div>
    </div>



                      </div>
                    <tbody>
                      <tr>
                        {/* <th scope="row">1</th> */}
                        <td>temperament</td>
                        <td>{searchResults.temperament}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">2</th> */}
                        <td>weight</td>
                        <td>{searchResults.weight.metric}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">3</th> */}
                        <td>country_code</td>
                        <td>{searchResults.country_code}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">4</th> */}
                        <td>origin</td>
                        <td>{searchResults.origin}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">5</th> */}
                        <td>dog_friendly</td>
                        <td>{searchResults.dog_friendly}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">6</th> */}
                        <td>life_span</td>
                        <td>{searchResults.life_span}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">7</th> */}
                        <td>wikipedia_url</td>
                        <td>{searchResults.wikipedia_url}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">8</th> */}
                        <td>description</td>
                        <td>{searchResults.description}</td>
                      </tr>
                      <tr>
                        {/* <th scope="row">9</th> */}
                        <td>intelligence</td>
                        <td>{searchResults.intelligence}</td>
                      </tr>
                    </tbody>
                  </table>

                  )}


                  {/* dog's detail */}
                  {!isCat && (
                  <table class="table table-striped">
                    


 <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <img
          src={`https://cdn2.thedogapi.com/images/${searchResults.reference_image_id}.jpg`}
          alt={searchResults.name}
          class="custom-image-cat"
        />
      </div>
      <div class="col-md-6 btn-container">
        <button onClick={getFunFacts} className="btn btn-success">Check Fun Fact</button>

        {fun1 && <h7>{fun1}</h7>}
        {fun2 && <h7>{fun2}</h7>}
        {fun3 && <h7>{fun3}</h7>}
        {noFun && <h7>{noFun}</h7>}
      </div>
    </div>
  </div>

                      <tbody>
                        <tr>
                          {/* <th scope="row">1</th> */}
                          <td>temperament</td>
                          <td>{searchResults.temperament}</td>
                        </tr>

                        <tr>
                          {/* <th scope="row">2</th> */}
                          <td>breed_group</td>
                          <td>{searchResults.breed_group}</td>
                        </tr>
                        <tr>
                          {/* <th scope="row">3</th> */}
                          <td>weight</td>
                          <td>{searchResults.weight.metric}</td>
                        </tr>

                        <tr>
                          {/* <th scope="row">4</th> */}
                          <td>height</td>
                          <td>{searchResults.height.metric}</td>
                        </tr>

                        <tr>
                          {/* <th scope="row">5</th> */}
                          <td>life_span</td>
                          <td>{searchResults.life_span}</td>
                        </tr>

                        <tr>
                          {/* <th scope="row">6</th> */}
                          <td>bred_for</td>
                          <td>{searchResults.bred_for}</td>
                        </tr>
                        <tr>
                          {/* <th scope="row">9</th> */}
                          <td>description</td>
                          <td>{searchResults.description}</td>
                        </tr>
                        </tbody>
                  </table>

                  
                  )
                  
                  
                  }
                  
                  
                      
                      <br/>
                      
                      <div>
                      {currentUser && (
                      <button className="btn"><FaHeart style={{ marginRight: '10px', fontSize: '75px', color: 'pink' }}
                      onClick={giveThumpUp}></FaHeart></button>)}
                      {currentUser && ( <p> {numberOfLikes} likes</p>
                      )}


                        {currentUser && usersLikes && (
                          
                          <div className="likes-list">
                            <p>Likes are from users:</p>
                            {usersLikes.map((like) => (
                              <Link key={like._id} to={
                                `/profile/${like.userId}`
                                
                                } className="list-group-item">
                                {like.userName}
                              </Link>
                            ))}
                          </div>
                        )}

                        <br/>

                      {postsForBreed && !isCat&& (
                          
                          <div className="list-group">
                            <p>These are the posts for this breed:</p>
                            {postsForBreed.map((post) => (
                              <Link key={post._id} to={`/post/${post._id}`} className="list-group-item">
                                Post for Puppy: {post.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        
                       </div>

                        {/* <pre>{JSON.stringify(postsForBreed, null, 2)}</pre> */}

  

                  </div>           
                )
              } 


        </div>
       


    );
 };
 export default Detail;