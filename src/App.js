import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


import Home from './Home';





function App(){


  return(
    <HashRouter>
      <div>
        {/* <h1>hello</h1> */}
        <Routes>
          {/* <Route path='/'  /> */}

          <Route  path='/' element={<Home/>} />

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;




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
