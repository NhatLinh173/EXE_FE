import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const SuccessPage = () => {
  const history = useHistory();

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  const handleReturnClick = () => {
    const orderCodeStatus = localStorage.getItem("orderCodeStatus");

    axios
      .put("https://exe-be.onrender.com/checkout/order/update-status", {
        orderCodeStatus,
        status,
      })
      .then((response) => {
        console.log("Order update: ", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the order: ", error);
      });

    history.push("/");
  };
  return (
    <div className="main-box" style={{ marginTop: "150px" }}>
      <h4 className="payment-title">
        Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!
      </h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
        <a href="mailto:support@payos.vn">support@payos.vn</a>
      </p>
      <a
        onClick={handleReturnClick}
        id="return-page-btn"
        style={{ width: "90px", textAlign: "center" }}
      >
        Trở về
      </a>
    </div>
  );
};
