import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userRoles , setUserRoles] =useState([]);

  const { id } = useParams();

  const { roleId } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadUserRoles();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8090/users");
    setUsers(result.data);
  };

  

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8090/user/${id}`);
    loadUsers();
  };

  const loadUserRoles = async () => {
    const result = await axios.get("http://localhost:8090/userroles");
    setUserRoles(result.data);
  };

  

  const deleteUserRole = async (roleId) => {
    await axios.delete(`http://localhost:8090/userrole/${roleId}`);
    loadUserRoles();
  };


  return (
    <div className="container">
      <div className="py-4">
        <h1>User's Details</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr >

           
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br/>
        <br/>
        <h1>User Roles Detail's</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">RoleId</th>
              <th scope="col">Username</th>
              <th scope="col">UserType</th>
              <th scope="col">Action</th>
            </tr >
          </thead>
            <tbody>
            {userRoles.map((userRole, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{userRole.roleId}</td>
                <td>{userRole.userName}</td>
                <td>{userRole.userType}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuserrole/${userRole.roleId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituserrole/${userRole.roleId}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUserRole(userRole.roleId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
           
          
        </table>
      </div>
    </div>
  );
}
