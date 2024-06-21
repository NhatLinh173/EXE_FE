import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Profile.css";
export const Profile = (props) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    password: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.put(
        "https://exe-be.onrender.com/user/update-profile",
        updateData,
        {
          headers,
        }
      );
      const response = await axios.get(
        "https://exe-be.onrender.com/user/profile",
        {
          headers,
        }
      );
      setUserData(response.data);
      setIsUpdating(false);
    } catch (error) {
      setError("Failed to load user profile");
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://exe-be.onrender.com/user/profile",
          {
            headers,
          }
        );
        setUserData(response.data);
        console.log("Data User: ", setUserData);
      } catch (error) {
        setError("Failed to load user profile");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <div className="form-profile">
        <h2 className="title-profile">Thông Tin Người Dùng</h2>
        {error && <p>{error}</p>}
        {userData && !isUpdating && (
          <div>
            <div>
              <p className="text-profile">Họ:</p>
              <input
                className="input-profile"
                type="text"
                name="first_name"
                value={userData.first_name}
                readOnly
              />
              <p className="text-profile">Tên:</p>
              <input
                className="input-profile"
                type="text"
                name="last_name"
                value={userData.last_name}
                readOnly
              />
              <p className="text-profile">Số Điện Thoại:</p>
              <input
                className="input-profile"
                type="text"
                name="phone"
                value={userData.phone}
                readOnly
              />
              <p className="text-profile">Địa Chỉ:</p>
              <input
                className="input-profile"
                type="text"
                name="address"
                value={userData.address}
                readOnly
              />
              <p className="text-profile">Email:</p>
              <input
                className="input-profile"
                type="text"
                name="email"
                value={userData.email}
                readOnly
              />
              <p className="text-profile">Password:</p>
              <input
                className="input-profile"
                type="password"
                name="password"
                value={userData.password}
                readOnly
              />
            </div>
            <button
              className="button-update"
              onClick={() => setIsUpdating(true)}
            >
              Cập Nhật Thông Tin
            </button>
          </div>
        )}
        {isUpdating && (
          <div>
            {/* Phần cập nhật thông tin người dùng */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="first_name">Họ:</label>
                <input
                  className="input-profile"
                  type="text"
                  name="first_name"
                  value={updateData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="last_name">Tên:</label>
                <input
                  className="input-profile"
                  type="text"
                  name="last_name"
                  value={updateData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Số Điện Thoại:</label>
                <input
                  className="input-profile"
                  type="text"
                  name="phone"
                  value={updateData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Địa Chỉ:</label>
                <input
                  className="input-profile"
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  className="input-profile"
                  type="password"
                  name="password"
                  value={updateData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="button-save">
                Lưu Thay Đổi
              </button>
            </form>
          </div>
        )}
        <div>
          <button className="button-profile">
            <a href="/" className="btn-back">
              Trở Về
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
