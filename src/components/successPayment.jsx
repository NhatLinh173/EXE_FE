import React from "react";

export const SuccessPage = () => {
  return (
    <div className="main-box" style={{ marginTop: "150px" }}>
      <h4 className="payment-title">
        Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!
      </h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
        <a href="mailto:support@payos.vn">support@payos.vn</a>
      </p>
      <a href="/" id="return-page-btn" style={{ width: "90px" , textAlign : "center" }}>
        Trở về
      </a>
    </div>
  );
};
