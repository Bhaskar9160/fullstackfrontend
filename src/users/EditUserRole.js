import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUserRole() {
  let navigate = useNavigate();

  const { roleId } = useParams();

  const [userRole, setUserRole] = useState({
    
    userName: "",
    userType: "",
  });

  const {  userName, userType } = userRole;

  const onInputChange = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUserRole();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8090/userrole/${roleId}`, userRole);
    navigate("/");
  };

  const loadUserRole = async () => {
    const result = await axios.get(`http://localhost:8090/userrole/${roleId}`);
    setUserRole(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User Role</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="roleId" className="form-label">
                RoleId
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="roleId"
                value={roleId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="UserType" className="form-label">
                UserType
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your User Type"
                name="userType"
                value={userType}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
