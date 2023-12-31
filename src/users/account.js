import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './Account.css';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import FooterNav from "../Home/Footer";


function Account() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [editAccount, setEditAccount] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAccount = async () => {
    const accountData = await client.account();
    setAccount(accountData);
    setEditAccount(accountData); 
  };

  const save = async () => {
    await client.updateUser(editAccount);
    setAccount(editAccount);
    setIsEditMode(false);
  };
  
  

  const findUserById = async (userId) => {
    if (currentUser.role === 'admin') {
      const user = await client.findUserById(userId);
      setAccount(user);
      setEditAccount(user);
    } else {
      alert("You do not have permission to perform this action.");
      navigate("/login");
    }
  };

  const signout = async () => {
    const status = await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/login");
  };

  const canEdit = () => {
    return currentUser && (currentUser.id === account.id || currentUser.role === 'admin');
  };

  const editModeHandler = () => {
    if (canEdit()) {
      setIsEditMode(true);
    }
  };

  const cancelEdit = () => {
    setEditAccount(account); 
    setIsEditMode(false); 
  };

  useEffect(() => {
    const loadAccountData = async () => {
      if (!currentUser) {
        alert("Please log in to view this page.");
        navigate("/login");
      } else {
        if (id && currentUser.role !== 'admin' && id !== currentUser.id) {
          alert("You do not have permission to view this page.");
          navigate("/login");
        } else if (id) {
          await findUserById(id);
        } else {
          await fetchAccount();
        }
      }
    };
  
    loadAccountData();
  }, [currentUser, id, navigate]);


  return (
    <div id="account-page">

    <div className=" container-fluid mt-5 account-container">
    <h1 className="mb-4 account-header">🫧 {account ? account.username : 'Loading...'}'s Account 🫧</h1>
    {account && (
      <div className="card p-4 account-card">
        {isEditMode ? (
          <form>
            
            <div className="form-group mb-3 account-form-group">
              <label>Username</label>
              <input 
                className="form-control"
                type="text"
                value={editAccount.username}
                onChange={(e) => setEditAccount({ ...editAccount, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mb-3 account-form-group">
              <label>Password</label>
              <input 
                className="form-control"
                type="password"
                value={editAccount.password}
                onChange={(e) => setEditAccount({ ...editAccount, password: e.target.value })}
                placeholder="Enter password"
              />
              </div>
              <div className="form-group mb-3 account-form-group">
                <label>First Name</label>
                <input 
                  className="form-control"
                  value={editAccount.firstName}
                  onChange={(e) => setEditAccount({ ...editAccount, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group mb-3 account-form-group">
                <label>Last Name</label>
                <input 
                  className="form-control"
                  value={editAccount.lastName}
                  onChange={(e) => setEditAccount({ ...editAccount, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
              <div className="form-group mb-3 account-form-group">
                <label>Date of Birth</label>
                <input 
                  className="form-control"
                  type="date" 
                  value={editAccount.dob} 
                  onChange={(e) => setEditAccount({ ...editAccount, dob: e.target.value })}
                />
              </div>
              <div className="form-group mb-3 account-form-group">
                <label>Email</label>
                <input 
                  className="form-control"
                  value={editAccount.email}
                  onChange={(e) => setEditAccount({ ...editAccount, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mb-4 account-form-group">
                <label>Role</label>
                <select 
                  className="form-control"
                  value={editAccount.role}
                  onChange={(e) => setEditAccount({ ...editAccount, role: e.target.value })}
                >
                  {account.role === 'admin' ? (
                    <>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                    </>
                  ) : (
                    <>
                      <option value="seller">Seller</option>
                      <option value="buyer">Buyer</option>
                    </>
                  )}
                </select>

              </div>
  
              <button className="btn btn-primary mr-2 account-button" onClick={save}>Save</button>
              <button className="btn btn-secondary ms-2 account-button" onClick={cancelEdit}>Cancel</button>
            </form>
          ) : (
            <div>
               
               <p><strong>Username:</strong> {account.username || 'Not Provided'}</p>
                <p><strong>First Name:</strong> {account.firstName || 'Not Provided'}</p>
                <p><strong>Last Name:</strong> {account.lastName || 'Not Provided'}</p>
                <p><strong>Date of Birth:</strong> {account.dob || 'Not Provided'}</p>
                <p><strong>Email:</strong> {account.email || 'Not Provided'}</p>
                <p><strong>Role:</strong> {account.role || 'Not Provided'}</p>

              
              {canEdit() && (
                <button className="btn btn-info account-button" onClick={editModeHandler}>Edit</button>
              )}

              {
                account.role === 'admin' && (
                  <>
                    <Link to="/admin/users" className="btn btn-warning ms-2 account-button">
                      All the Users
                    </Link>

                    <Link to="/admin" className="btn btn-warning ms-2 account-button">
                      Admin Report
                    </Link>
                  </>
                )
              }


          <Link to={`/profile/${account.id}`} className="btn btn-primary ms-2 account-button">
                  Go to Profile
          </Link>

          <button onClick={signout} className="btn btn-danger ms-2 account-button">
            Sign Out
          </button>
            </div>

          )}

        </div>
      )}
    </div>
    <FooterNav/>
    </div>
  );
}  
  
export default Account;

