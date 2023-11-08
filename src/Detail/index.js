import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import db from "../Database";

function Detail() {

    const { breedId } = useParams();
    // const breed = db.breeds.find((breed) => breed.id === breedId);


    const controller = new AbortController();
    const cat_url = `https://api.thecatapi.com/v1/breeds/${breedId}`;
    const dog_url = `https://api.thedogapi.com/v1/breeds/${breedId}`;
    const [searchResults, setSearchResults] = useState();
    const fetchBreeds = async () => {
    if (isIntegerString(breedId)){

        const response = await axios.get(dog_url);
        setSearchResults(response.data);
    }

    else {
        const response = await axios.get(cat_url);
        setSearchResults(response.data);
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
                {/* use the data from database */}
            {/* // <div>
            //     <h1>Detail for {breed.name}</h1>
            //     <pre>{JSON.stringify(breed, null, 2)}</pre>
            //     <h1>All Posts for {breed.name}</h1>

            // </div> */}

            {/* use the data from api */}
            <div>
                {/* <h1>Detail for {searchResults.name}</h1> */}
                <pre>{JSON.stringify(searchResults, null, 2)}</pre>
                {/* <h1>All Posts for {searchResults.name}</h1> */}

            </div>

        </div>
       


    );
 };
 export default Detail;