import React, { useEffect, useState } from "react";
import "../assets/css/CancelCss.css";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
export const FailurePage = () => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");

  const handleReturnClick = () => {
    history.push("/");
  };

  // useEffect(() => {
  //   const tokenFromLocalStorage = localStorage.getItem("token");
  //   console.log(tokenFromLocalStorage);
  //   if (tokenFromLocalStorage) {
  //     const decodedToken = jwtDecode(tokenFromLocalStorage);
  //     setUserId(decodedToken.id_user);
  //     setToken(tokenFromLocalStorage);
  //   }
  //   console.log(userId);
  // }, [token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderCode = params.get("orderCode");
    const status = params.get("status");

    if (orderCode && status) {
      console.log("Updating order with:", { orderCode, status, userId });
      axios
        .put("http://localhost:3000/checkout/update-order", {
          orderCode,
          status,
        })
        .then((response) => {
          console.log("Order update: ", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the order: ", error);
        });
    }
  }, []);

  return (
    <div className="main-box" style={{ marginTop: "150px" }}>
      <h4 className="payment-title">Thanh toán thất bại</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
        <a href="mailto:support@payos.vn">support@payos.vn</a>
      </p>
      <button id="return-page-btn" onClick={handleReturnClick}>
        Trở về{" "}
      </button>
    </div>
  );
};
