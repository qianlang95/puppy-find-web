import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home';
import Detail from './Home/Detail/detail';
import Signin from './users/signin';
import Account from './users/account';
import Signup from './users/signup';
import UserDetails from './users/details';
import store from "./users/store"
import { Provider } from 'react-redux';








function App(){


  return(
    <Provider store={store}>

    <HashRouter>
      <div>
        {/* <h1>hello</h1> */}
        {/* test test test */}
        <Routes>

          <Route  path='/' element={<Home/>} />
          <Route  path='/signin' element={<Signin/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route  path='/account' element={<Account/>} />
          <Route  path='/profile/:id' element={<UserDetails/>} />
          {/* //change to postiD */}
          <Route  path='/detail/:id' element={<Detail/>} />



          {/* <Route path='/'  /> */}


        </Routes>
      </div>
    </HashRouter>
    </Provider>
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
