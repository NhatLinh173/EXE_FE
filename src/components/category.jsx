// src/components/Category.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "../assets/css/SearchCss.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { addToCart, setCartItems } from "../utils/cartSlice";

export const Category = () => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [noResults, setNoResults] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
      setRole(decodedToken.role);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      try {
        const parsedCartItems = JSON.parse(cartItems);
        dispatch(setCartItems(parsedCartItems));
      } catch (error) {
        console.error("Error parsing cart items: ", error);
      }
    }
  }, [dispatch]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://exe-be.onrender.com/product/");
      setProducts(response.data);
      filterProducts(response.data, searchKeyword);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const filterProducts = (allProducts, keyword) => {
    let filteredProducts = allProducts;
    if (keyword) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setDisplayedProducts(filteredProducts.slice(0, numberOfDisplayedProducts));
    setNoResults(filteredProducts.length === 0);
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    filterProducts(products, searchKeyword);
  }, [searchKeyword, products]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // Gửi yêu cầu đến backend để thêm sản phẩm vào giỏ hàng
      await axios.post(
        "https://exe-be.onrender.com/cart/addToCart",
        {
          userId: userId,
          productId: product._id,
          productName: product.name,
          price: product.price,
          image: product.image,
          quality: 1,
        },
        { headers }
      );

      // Cập nhật giỏ hàng trong Redux
      dispatch(
        addToCart({
          productId: product._id,
          productName: product.name,
          price: product.price,
          image: product.image,
          quality: 1,
        })
      );

      // Thông báo thành công
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  const loadMoreProducts = () => {
    const newNumberOfDisplayedProducts = numberOfDisplayedProducts + 9;
    setNumberOfDisplayedProducts(newNumberOfDisplayedProducts);
    setDisplayedProducts(products.slice(0, newNumberOfDisplayedProducts));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div id="category" className="text-center" style={{ paddingTop: "150px" }}>
      <div className="container">
        <div className="section-title">
          <h2>Danh Sách Sản Phẩm</h2>
          <p></p>
        </div>
        <div className="search-container">
          <input
            type="text"
            id="search-bar"
            value={searchKeyword}
            onChange={handleSearchInputChange}
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
        {noResults && (
          <div className="no-results">Không có sản phẩm phù hợp.</div>
        )}
        <div className="row">
          {displayedProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="portfolio-items product-item">
                <img src={product.image} alt="" />
                <h3>{product.name}</h3>
                <p>{formatPrice(product.price)} VND</p>
                <div className="button-container-category">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="addToCard"
                    disabled={role === "admin"}
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                  </button>{" "}
                  <Link to={`/productdetail/${product._id}`}>
                    <button className="addToCard">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {numberOfDisplayedProducts < products.length && (
          <div className="btn-load-more">
            <button onClick={loadMoreProducts} className="button-load-more">
              Xem Thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
