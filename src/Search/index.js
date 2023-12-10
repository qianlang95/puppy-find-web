import { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {BsSearch, BsFillCheckCircleFill, BsTrash3Fill, BsPlusCircleFill, BsPencil}
  from "react-icons/bs";


function Search() {
    const { search } = useParams();
    const [searchInput, setSearchInput] = useState(search || "");
    console.log(searchInput,"Input");
    const navigate = useNavigate();

    const [showSearchResults, setShowSearchResults] = useState(false);
    const controller = new AbortController();
    const cat_url = `https://api.thecatapi.com/v1/breeds`;
    const dog_url = `https://api.thedogapi.com/v1/breeds`;
    // const url = `https://swapi.dev/api/people/1`;
const api_key = "DEMO_API_KEY"
const [searchResults, setSearchResults] = useState([]);
const fetchBreeds = async () => {
    if (search === "dog") {
        console.log("!!!!!!!!!!!1");

        const response = await axios.get(dog_url);
        setSearchResults(response.data);
        setSearchInput(search);
    } else if (search === "cat") {
        console.log("!!!!!!!!!!!2");
        const response = await axios.get(cat_url);
        setSearchResults(response.data);
        setSearchInput(search);
    } else {
        setSearchResults([{name:"you can only search dog or cat", id:""}]);
        setSearchInput(search);
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
    if (search) {
    fetchBreeds();
    console.log("*******************4");
    console.log(searchResults,"searchResults");
    // return () => {controller.abort();}
    }

    
},[search]);



const handleSearch = () => {
    fetchBreeds();
  };
  


    return(
        <div className="container mt-4">


        <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
            <BsSearch style={{ marginRight: '10px' }} />
            <label htmlFor="search" style={{ marginRight: '10px' }}>Explore breeds:</label>
            <input
                id="search"
                value={searchInput}
                placeholder="Enter cat or dog here"
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control w-50"  
            />
            
            <button
                className="btn btn-danger me-2"
                onClick={() => navigate(`/search/${searchInput}`)}
                style={{ marginLeft: '10px' }}  
            >
                Search
            </button>
        </div>
            

            


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
                    {/* {breed.id}<br/> */}
                    {breed.name} 
                    </Link> ))} 
                </div>
                





                

                    {/* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}



                    



        </div>

    );
 };
 export default Search;