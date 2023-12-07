import Signin from "./users/signin";
import Account from "./users/account";
import UserTable from "./users/table";
import Signup from "./users/signup";
import UserDetails from "./users/details";
import CurrentUser from "./users/currentUser";
import store from "./users/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CurrentUser>
          <div>
            <Routes>
              <Route path="/"         element={<Navigate to="/login"/>}/>
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin/users" element={<UserTable />} />
              <Route path="/account/:id" element={<Account />} />
              <Route path="/profile/:id" element={<UserDetails />} />
              

            </Routes>
          </div>
        </CurrentUser>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
