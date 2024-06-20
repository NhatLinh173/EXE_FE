import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/UserManagementCss.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const header = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get("http://localhost:3000/user/getAll", {
          headers: header,
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = async (userId, userRole) => {
    const token = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token}`,
    };

    if (userRole === "admin") {
      toast.error("Tài khoản không thể xóa");
      return;
    }
    console.log(userRole);
    try {
      const response = await axios.delete(
        `http://localhost:3000/user/delete/${userId}`,
        { headers: header }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-admin">
      <h2 style={{ textAlign: "center" }}>Quản Lý Người Dùng</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <p>
              <strong>ID:</strong> {user._id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            {user.role !== "admin" && (
              <>
                <p>
                  <strong>Tên:</strong> {user.name}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {user.phone}
                </p>
              </>
            )}
            <div>
              <button
                className="btn-remove"
                onClick={() => removeUser(user._id, user.role)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
