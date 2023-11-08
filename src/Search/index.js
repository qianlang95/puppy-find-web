import { useEffect, useState } from "react";
import db from "../Database"; 
import { Link } from "react-router-dom";
import axios from "axios";



function Search() {
    const breeds = db.breeds;
    const [searchInput, setSearchInput] = useState("");
    console.log(searchInput,"Input");

    const [showSearchResults, setShowSearchResults] = useState(false);
    const controller = new AbortController();
    const cat_url = `https://api.thecatapi.com/v1/breeds`;
    const dog_url = `https://api.thedogapi.com/v1/breeds`;
    // const url = `https://swapi.dev/api/people/1`;
const api_key = "DEMO_API_KEY"
const [searchResults, setSearchResults] = useState([]);
const fetchBreeds = async () => {
    if (searchInput === "dog") {
        console.log("!!!!!!!!!!!1");

        const response = await axios.get(dog_url);
        setSearchResults(response.data);
    } else if (searchInput === "cat") {
        console.log("!!!!!!!!!!!2");
        const response = await axios.get(cat_url);
        setSearchResults(response.data);
    } else {
        setSearchResults([{name:"you can only search dog or cat", id:""}]);
        console.log("!!!!!!!!!!!3");

    }
    
    

}




useEffect(() => {
    // async function getData() {
    // const response = await fetch(url);
    // const data = await response.json();
    // setSearchResults(data);
    // }

    // getData();
    fetchBreeds();
    console.log("*******************4");
    console.log(searchResults,"searchResults");
    // return () => {controller.abort();}
    
},[]);



const handleSearch = () => {
    fetchBreeds();
  };
  


    return(
        <div>
            <label for="search">Find your puppy here</label>
            <input
                id="search"
             value={searchInput}
             onChange={(e) => setSearchInput(e.target.value)}
            />

            <button className="btn btn-danger"
                    onClick={() => handleSearch()}
            >Search!</button>


{/* <pre>{JSON.stringify(searchResults, null, 2)}</pre>
{searchResults.map((breed) => (
      <div key={breed.id}>{breed.name}</div>
    ))} */}

                {/* {showSearchResults && <h1>This is the search results for you</h1> } */}

                {/* use the data from database */}
                {/* {showSearchResults &&
                <div className="list-group"> 
                    {breeds.map((breed) => ( 
                    <Link key={breed.id} to={`/detail/${breed.id}`} className="list-group-item"> 
                    {breed.id}<br/>
                    {breed.name} 
                    </Link> ))} 
                </div>
                    } */}


                     {/* use the data from third api */}

                
                <div className="list-group"> 
                    {searchResults.map((breed) => ( 
                    <Link key={breed.id} to={`/detail/${breed.id}`} className="list-group-item"> 
                    {breed.id}<br/>
                    {breed.name} 
                    </Link> ))} 
                </div>
                





                

                    {/* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}



                    



        </div>

    );
 };
 export default Search;