import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Order = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchOrderData = async () => {
        try {
          const response = await axios.get(
            `https://exe-be.onrender.com/checkout/order/${userId}`
          );
          setOrderData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderData();
    }, 2000); // Delay of 2000 milliseconds (2 seconds)

    // Cleanup function to clear the timeout if userId changes or component unmounts
    return () => clearTimeout(timeoutId);
  }, [userId]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ marginTop: "150px", padding: "0 50px" }}>
      <h1 style={{ textAlign: "center" }}>Chi Tiết Đơn Hàng</h1>
      <div>
        {orderData && orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                padding: "15px 50px",
              }}
            >
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ margin: "10px 0" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div>
                    <strong>Tên Sản Phẩm:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Số Lương:</strong> {item.quantity}
                  </div>
                  <div>
                    <strong>Giá Tiền Sản Phẩm:</strong>{" "}
                    {formatPrice(item.price)} VND
                  </div>
                </div>
              ))}
              <div>
                --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div>
                <strong>Tổng tiền:</strong> {formatPrice(order.totalAmount)} VND
              </div>
              <div>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {order.paymentMethod === "cash"
                  ? "Chưa Thanh Toán"
                  : "Đã Thanh Toán"}
              </div>
              <div>
                <strong>Trạng thái đơn hàng:</strong> {order.status}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              margin: "40px 0 40px 0",
              fontSize: "15px",
            }}
          >
            Không tìm thấy đơn hàng nào
          </div>
        )}
      </div>
    </div>
  );
};
