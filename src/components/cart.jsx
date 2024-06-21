import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../assets/css/CartCss.css";
import { toast } from "react-toastify";

export const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productPrices, setProductPrices] = useState({});
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, []);

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const header = {
          Authorization: `Bearer ${userToken}`,
        };
        const response = await axios.get(
          `https://exe-be.onrender.com/cart/cartItem/${userId}`,
          { headers: header }
        );

        if (Array.isArray(response.data)) {
          const defaultQuantityItems = response.data.map((item) => ({
            ...item,
            quantity: item.quality,
          }));
          setCartItem(defaultQuantityItems);
          calculateTotalPrice(defaultQuantityItems);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user cart: ", error);
        console.log("Error:", error);
      }
    };
    if (userId) {
      getUserCart();
    }
  }, [userId]);

  const handleRemoveProduct = async (productId) => {
    try {
      const userToken = localStorage.getItem("token");
      console.log("test remove", productId);
      const header = {
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.delete(
        `https://exe-be.onrender.com/cart/remove/${userId}/${productId}`,
        { headers: header }
      );
      if (response.status === 200) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const updateCartItems = cartItems.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
        toast.success("Đã xóa sản phẩm thành công");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error removing product from cart: ", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);
    const updatedCart = cartItem.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItem(updatedCart);
    calculateTotalPrice(updatedCart);

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
      console.log(error);
      toast.error("Có lỗi xảy ra khi cập nhật số lượng. Vui lòng thử lại.");
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const productTotal = item.price * item.quantity;
      setProductPrices((prevState) => ({
        ...prevState,
        [item._id]: productTotal,
      }));
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
        items: cartItem.map((item) => ({
          name: item.productName,
          productId: item._id,
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
        console.log("Checkout URL:", checkoutUrl);
        console.log("Order Data: ", orderData);
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
            {cartItem.map((item) => (
              <li key={item._id}>
                <div className="product-info">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="product-details">
                    <p>{item.productName} </p>
                    <p className="price">
                      {formatPrice(productPrices[item._id] || 0)}
                    </p>
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
                  </div>
                  <div className="product-action">
                    <button onClick={() => handleRemoveProduct(item.productId)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <div className="total-price">
            <p>Tổng số tiền: {formatPrice(totalPrice)} </p>
          </div> */}
          <div className="payment-btn">
            <button onClick={handlePayment}>Thanh Toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
