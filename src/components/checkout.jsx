import React, { useState, useEffect } from "react";
import "../assets/css/CheckOutCss.css"; // Ensure to include your CSS file or any required styles
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const Checkout = () => {
  const location = useLocation();
  const { checkoutUrl } = location.state || {};
  const orderData = location.state?.orderData;
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    paymentMethod: "PayOs",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handlePaymentChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, paymentMethod: value }));
  };

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const handleCheckout = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.email ||
      !formData.phone
    ) {
      toast.warn("Vui lòng điền đầy đủ thông tin trước khi thanh toán");
      return;
    }
    if (!userId) {
      console.error("UserId is missing.");
      return;
    }

    let confirmationMessage = "";
    let status = "PENDING";
    if (formData.paymentMethod === "cash") {
      confirmationMessage = "Đơn hàng của bạn đang đợi xác nhận";
    }

    const shippingCost = shippingMethod === "express" ? 20000 : 0;
    const totalAmount = orderData.totalPrice + shippingCost;

    const checkoutData = {
      ...formData,
      shippingMethod,
      shippingCost,
      totalAmount,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      userId: userId,
      status: status,
      orderCodeStatus: orderData.orderCodeStatus,
      orderStatus: "Đợi Xác Nhận Đơn Hàng",
    };
    const orderCodeStatus = orderData.orderCodeStatus;
    localStorage.setItem("orderCodeStatus", orderCodeStatus);
    try {
      const response = await axios.post(
        "https://exe-be.onrender.com/checkout/",
        checkoutData
      );

      if (formData.paymentMethod === "cash") {
        toast.info(confirmationMessage);

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error", error);
    }
  };

  const formatPrice = (price, quantity) => {
    if (typeof price !== "number" || typeof quantity !== "number") {
      return "0.00";
    }
    const totalPrice = quantity * price;
    return totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const formatPrices = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const shippingCost = shippingMethod === "express" ? 20000 : 0;

  if (!checkoutUrl) {
    return <div>Không có dữ liệu thanh toán</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h3>Thông tin khách hàng</h3>
        <form>
          <div className="form-group-checkout">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              className="form-control-checkout"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group-checkout">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              className="form-control-checkout"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group-checkout">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              className="form-control-checkout"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group-checkout">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control-checkout"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <h3>Thông tin vận chuyển</h3>
        <div className="form-group-checkout">
          <label htmlFor="shipping">Chọn phương thức vận chuyển</label>
          <select
            id="shipping"
            className="form-control"
            value={shippingMethod}
            onChange={handleShippingChange}
          >
            <option value="standard">Standard - Miễn phí</option>
            <option value="express">Express - 20.000 VND</option>
          </select>
        </div>

        <h3>Phương thức thanh toán</h3>
        <div className="form-group-checkout">
          <label htmlFor="payment">Chọn phương thức thanh toán</label>
          <select
            id="payment"
            className="form-control-checkout"
            value={formData.paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="Payos">Thanh Toán QR PAY</option>
            <option value="cash">Thanh Toán Khi Nhận Hàng</option>
          </select>
        </div>
      </div>

      <div className="checkout-right">
        <h3>Sản phẩm đã mua</h3>
        <div className="cart-items-checkout">
          {orderData &&
            orderData.items.map((item, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  <div className="product-info">
                    <img
                      src={item.image}
                      className="img-fluid rounded-3"
                      alt="Shopping item"
                    />
                    <div className="product-details">
                      <h5>{item.name}</h5>
                    </div>
                    <div className="product-quantity">
                      <h5 className="fw-normal mb-0">{item.quantity}</h5>
                    </div>
                    <div className="product-price">
                      <h5 className="mb-0">
                        {formatPrice(item.price, item.quantity)}
                        {"  "} VND
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="summary">
          <div className="d-flex justify-content-between">
            <p className="mb-2">Tạm Tính</p>
            <p className="mb-2">
              {formatPrice(orderData ? orderData.totalPrice : 0, 1)} VND
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Phí Ship</p>
            <p className="mb-2">{formatPrices(shippingCost)} VND</p>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <p className="mb-2">Tổng cộng</p>
            <p className="mb-2">
              {formatPrice(
                orderData ? orderData.totalPrice + shippingCost : 0,
                1
              )}{" "}
              VND
            </p>
          </div>
          <button
            type="button"
            className="btn btn-info btn-block btn-lg"
            onClick={handleCheckout}
          >
            <div className="d-flex justify-content-between">
              <span>
                Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
