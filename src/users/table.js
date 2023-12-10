import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill  } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './table.css';
import FooterNav from "../Home/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';



function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "buyer" });
  const { currentUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };


  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  
  useEffect(() => {
    // 检查用户是否是 admin
    if (!currentUser || currentUser.role !== 'admin') {
      alert("Access is restricted to admin users only.");
      navigate('/login'); // 重定向到登录页面
      return; // 退出 useEffect
    }

    // 如果用户是 admin，获取用户列表
    fetchUsers();
  }, [currentUser, navigate]);

  // 如果用户不是 admin，不渲染组件内容
  if (!currentUser || currentUser.role !== 'admin') {
    return null; // 或者可以返回一个空的 <div> 或其他标记
  }

  return (
    <div id="detail-page">
      <div className="container detail-container">
        <h1 className="my-4"><FaUserShield /> Check all the users' info here</h1>

        <div className="row">
          <div className="col">
            <form className="mb-3">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option value="buyer">Buyer</option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-info me-2"
                onClick={updateUser}
              >
                <BsFillCheckCircleFill className="me-2 fs-4" />
                Update User
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={createUser}
              >
                <BsPlusCircleFill className="me-2 fs-4" />
                Create User
              </button>
            </form>
          </div>
        </div>
        <table className="table table-striped table-hover table-responsive usertable">
          <thead>
            <tr className="text-center">
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td>
                  <Link to={`/account/${user._id}`} className="user-link">{user.username}</Link>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="text-nowrap">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => deleteUser(user)}
                  >
                    <BsTrash3Fill />
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => selectUser(user)}
                  >
                    <BsPencil />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterNav/>
    </div>
  );
}  


export default UserTable;

