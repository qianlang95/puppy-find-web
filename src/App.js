
import Search from "./Search";
import Detail from "./Detail";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
// import "dotenv/config";
import Admin from "./Admin";
import Signin from "./users/signin";
import Account from "./users/account";
import UserTable from "./users/table";
import Signup from "./users/signup";
import UserDetails from "./users/details";
import CurrentUser from "./users/currentUser";
import Home from './Home';
import Post from './Home/Detail/detail';
import store from "./users/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar/navbar";

import About from "./Home/About/about";



function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CurrentUser>
          <div>
            <Navbar/>
            <Routes>
              <Route  path='/' element={<Home/>} />
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin/users" element={<UserTable />} />
              <Route path="/account/:id" element={<Account />} />
              <Route path="/profile/:id" element={<UserDetails />} />
              <Route  path='/post/:id' element={<Post/>} />
              <Route path="/search"    element={<Search/>}/>
            <Route path="/search/:search" element={<Search />} />

            <Route path="/detail/:breedId/*"    element={<Detail/>}/>


            <Route path="/admin"    element={<Admin/>}/>
            <Route  path='/about' element={<About/>} />

              

            </Routes>
          </div>
        </CurrentUser>
      </Provider>
    </BrowserRouter>
  );
}

export default App;



