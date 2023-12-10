import Signin from "./users/signin";
import Account from "./users/account";
import UserTable from "./users/table";
import Signup from "./users/signup";
import UserDetails from "./users/details";
import CurrentUser from "./users/currentUser";
import Home from './Home';
// import Detail from './Home/Detail/detail';
import Postd from "./Home/Detail/post";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Detail from './Home/Detail/detail';
import Post from './Home/Detail/post';
import About from './Home/About/about';
import store from "./users/store"
import { Provider } from 'react-redux';




function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CurrentUser>
          <div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin/users" element={<UserTable />} />
              <Route path="/account/:id" element={<Account />} />
              <Route path="/profile/:id" element={<UserDetails />} />
              <Route path='/detail/:id' element={<Postd/>} />

          {/* //change to postiD */}
          <Route  path='/post/:id' element={<Post/>} />
          <Route  path='/about' element={<About/>} />

              


            </Routes>
          </div>
        </CurrentUser>
      </Provider>
    </BrowserRouter>

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
