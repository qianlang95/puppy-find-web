import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import db from "../Database";

function Detail() {


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

    const [searchResults, setSearchResults] = useState();

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






useEffect(() => {

    fetchBreeds();
    console.log("*******************3");
    console.log(searchResults,"searchResults");
    // return () => {controller.abort();}
},[]);


    return(
        <div>
                
                {searchResults&& (
                  <div>
                  <h1>Details for {searchResults.name}</h1>

                  {isCat && (
                    <table class="table">
                    {/* <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                      </tr>
                    </thead> */}

                  {/* cat's detail */}

                  <img
                  src={`https://cdn2.thecatapi.com/images/${searchResults.reference_image_id}.jpg`}
                  alt={searchResults.name}
                  className="img-thumbnail"
                />

                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>temperament</td>
                        <td>{searchResults.temperament}</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>weight</td>
                        <td>{searchResults.weight.metric}</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>country_code</td>
                        <td>{searchResults.country_code}</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>origin</td>
                        <td>{searchResults.origin}</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>dog_friendly</td>
                        <td>{searchResults.dog_friendly}</td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>life_span</td>
                        <td>{searchResults.life_span}</td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>wikipedia_url</td>
                        <td>{searchResults.wikipedia_url}</td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>description</td>
                        <td>{searchResults.description}</td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td>intelligence</td>
                        <td>{searchResults.intelligence}</td>
                      </tr>
                    </tbody>
                  </table>

                  )}


                  {/* dog's detail */}
                  {!isCat && (
                  <table class="table">
                     <img
                  src={`https://cdn2.thedogapi.com/images/${searchResults.reference_image_id}.jpg`}
                  alt={searchResults.name}
                  className="img-thumbnail"
                />
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>temperament</td>
                          <td>{searchResults.temperament}</td>
                        </tr>

                        <tr>
                          <th scope="row">2</th>
                          <td>breed_group</td>
                          <td>{searchResults.breed_group}</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>weight</td>
                          <td>{searchResults.weight.metric}</td>
                        </tr>

                        <tr>
                          <th scope="row">4</th>
                          <td>height</td>
                          <td>{searchResults.height.metric}</td>
                        </tr>

                        <tr>
                          <th scope="row">5</th>
                          <td>life_span</td>
                          <td>{searchResults.life_span}</td>
                        </tr>

                        <tr>
                          <th scope="row">6</th>
                          <td>bred_for</td>
                          <td>{searchResults.bred_for}</td>
                        </tr>
                        <tr>
                          <th scope="row">9</th>
                          <td>description</td>
                          <td>{searchResults.description}</td>
                        </tr>
                        </tbody>
                  </table>

                  
                  )}
                  
                  


                    {isCheckForMore && (<pre>{JSON.stringify(searchResults, null, 2)}</pre>)}


                                        {/* <button className="btn btn-success" onClick={setCheck(true)}>
                      Check for more in Json Format</button> */}


                  </div>

                
                )
              } 


        </div>
       


    );
 };
 export default Detail;