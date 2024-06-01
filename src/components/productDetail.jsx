import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/ProductDetails.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  const [addedToCartMap, setAddedToCartMap] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details: ", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
    }
  }, [userId]);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      const initialAddedToCartMap = parsedCartItems.reduce((acc, item) => {
        acc[item.productId] = true;
        return acc;
      }, {});
      setAddedToCartMap(initialAddedToCartMap);
    }
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (event) => {
    const newQuantityValue = parseInt(event.target.value);
    setQuantity(newQuantityValue);
    setTotalPrice(product.price * newQuantityValue);
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (addedToCartMap[product._id]) {
      toast.warning("Sản phẩm đã có trong giỏ hàng");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/cart/addToCart",
        {
          userId: userId,
          productId: productId,
          productName: product.name,
          price: product.price,
          image: product.image,
          quality: quantity,
        },
        { headers }
      );
      addToCart(product);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      setAddedToCartMap((prevMap) => ({
        ...prevMap,
        [product._id]: true,
      }));
      setAddedToCart(true);

      let cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        try {
          cartItems = JSON.parse(cartItems);
        } catch (error) {
          console.error("Error parsing cart items: ", error);
          cartItems = [];
        }
      } else {
        cartItems = [];
      }
      const updateCartItems = [...cartItems, { productId: product._id }];
      localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      console.log(error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };
  return (
    <div className="product-detail-container">
      <h2>Chi Tiết Sản Phẩm </h2>
      <div className="product-detail-content">
        <div className="product-detail-img">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p>Giá Tiền: {formatPrice(totalPrice)} VND</p>
          <p>Chi Tiết: {product.description}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="addToCardDetail"
            disabled={addedToCartMap[product._id]}
          >
            {addedToCartMap[product._id] ? (
              <p className="in-cart-message">Đã có trong giỏ hàng</p>
            ) : (
              <FontAwesomeIcon icon={faCartPlus} />
            )}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
