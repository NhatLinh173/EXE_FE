import React from "react";
import "../../assets/css/AdminCss.css";
export const AdminPage = () => {
  return (
    <div className="container-admin" style={{ marginTop: "150px" }}>
      <h1>Quản Lý</h1>
      <button className="btn-admin">
        <a href="admin-product">Quản Lý Sản Phẩm</a>
      </button>
      <button className="btn-admin">
        <a href="admin-user">Quản Lý User</a>
      </button>
      <button className="btn-admin">
        <a href="admin-order">Quản Lý Order</a>
      </button>
      <button className="btn-admin">
        <a href="https://my.payos.vn/1f05593c166b11ef915f0242ac110002/dashboard">
          Đơn Hàng Đã Thanh Toán
        </a>
      </button>
    </div>
  );
};
