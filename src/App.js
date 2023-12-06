// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import Search from "./Search";
import Detail from "./Detail";
import Post from "./Post";
import Comments from "./Comments";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
// import "dotenv/config";
import Admin from "./Admin";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
            <Route path="/"         element={<Navigate to="/search"/>}/>

            <Route path="/search"    element={<Search/>}/>
            <Route path="/search/:search" element={<Search />} />

            <Route path="/detail/:breedId/*"    element={<Detail/>}/>

            <Route path="/post"    element={<Post/>}/>

            <Route path="/admin"    element={<Admin/>}/>

           
        </Routes>

      </div>
    </HashRouter>
    

  );
}
export default App;