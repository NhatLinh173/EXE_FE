import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../assets/css/CartCss.css";
import { toast } from "react-toastify";
import { removeFromCart, updateQuantity } from "../utils/cartSlice";

export const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveProduct = async (productId) => {
    try {
      const userToken = localStorage.getItem("token");
      const header = {
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.delete(
        `https://exe-be.onrender.com/cart/remove/${userId}/${productId}`,
        { headers: header }
      );
      if (response.status === 200) {
        dispatch(removeFromCart(productId));
        toast.success("Đã xóa sản phẩm thành công");
      }
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
    calculateTotalPrice();

    try {
      const userToken = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      await axios.put(
        `https://exe-be.onrender.com/cart/updateQuantity/${userId}/${productId}`,
        { quantity: newQuantity },
        { headers }
      );

      toast.success("Đã cập nhật số lượng sản phẩm");
    } catch (error) {
      console.error("Error updating product quantity: ", error);
      toast.error("Có lỗi xảy ra khi cập nhật số lượng. Vui lòng thử lại.");
    }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      const productTotal = Number(item.price) * Number(item.quantity);
      return acc + productTotal;
    }, 0);
    setTotalPrice(total);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePayment = async () => {
    const generateOrderCode = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    try {
      const userToken = localStorage.getItem("token");
      const header = {
        Authorization: `Bearer ${userToken}`,
      };
      const orderCodeStatus = generateOrderCode();
      const orderData = {
        userId: userId,
        items: cartItems.map((item) => ({
          name: item.productName,
          productId: item.productId,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
        })),
        totalPrice: totalPrice,
        returnUrl: "https://exe-fe.onrender.com/success",
        cancelUrl: "https://exe-fe.onrender.com/fail",
        description: "Mô tả đơn hàng",
        orderCodeStatus: orderCodeStatus,
      };
      const response = await axios.post(
        "https://exe-be.onrender.com/order/create",
        orderData,
        { headers: header }
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.checkoutUrl &&
        response.data.data.cancelUrl &&
        response.data.data.returnUrl &&
        response.data.data.orderCodeStatus
      ) {
        const checkoutUrl = response.data.data.checkoutUrl;
        const cancelUrl = response.data.data.cancelUrl;
        const returnUrl = response.data.data.returnUrl;
        const orderCodeStatus = response.data.data.orderCodeStatus;
        history.push("/checkout", {
          checkoutUrl,
          orderData,
          cancelUrl,
          returnUrl,
          orderCodeStatus,
        });
      } else {
        console.error("Response không chứa checkoutUrl");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="cart-container">
      <h2
        className="title-cart"
        style={{ marginTop: "150px", fontSize: "28px" }}
      >
        Giỏ hàng
      </h2>
      <div className="cart-row justify-content-center">
        <div className="cart-items">
          <ul>
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.productId} className="cart-item">
                  <div className="product-column">
                    <div className="product-image">
                      <img src={item.image} alt={item.productName} />
                    </div>
                    <div className="product-details">
                      <p>{item.productName}</p>
                    </div>
                  </div>
                  <div className="price-column">
                    <p className="price">
                      {formatPrice(
                        Number(item.price) * Number(item.quantity || 1)
                      )}
                    </p>
                  </div>
                  <div className="actions-column">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveProduct(item.productId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li style={{ textAlign: "center" }}>Giỏ hàng trống</li>
            )}
          </ul>
          <div className="payment-btn">
            <button onClick={handlePayment}>Thanh Toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
