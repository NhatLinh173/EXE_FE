import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../assets/css/SearchCss.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const Category = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [noResults, setNoResults] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [addedToCartMap, setAddedToCartMap] = useState({});
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
    if (userId) {
      fetchProducts();
    }
  }, [searchKeyword, userId]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      try {
        const parsedCartItems = JSON.parse(cartItems);
        const newAddedToCartMap = {};
        parsedCartItems.forEach((item) => {
          newAddedToCartMap[item.productId] = true;
        });
        setAddedToCartMap(newAddedToCartMap);
      } catch (error) {
        console.error("Error parsing cart items: ", error);
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://exe-be.onrender.com/product/");
      let filteredProducts = response.data;
      if (searchKeyword) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      setProducts(filteredProducts);
      setDisplayedProducts(
        filteredProducts.slice(0, numberOfDisplayedProducts)
      );
      setNoResults(filteredProducts.length === 0);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    let cartItems = localStorage.getItem("cartItems");
    let updatedCartItems = [];

    if (cartItems) {
      try {
        updatedCartItems = JSON.parse(cartItems);
      } catch (error) {
        console.error("Error parsing cart items: ", error);
        updatedCartItems = [];
      }
    }

    const existingCartItemIndex = updatedCartItems.findIndex(
      (item) => item.productId === product._id
    );

    if (existingCartItemIndex > -1) {
      updatedCartItems[existingCartItemIndex].quality += 1;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quality: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    try {
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

      addToCart(product);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      setAddedToCartMap((prevMap) => ({
        ...prevMap,
        [product._id]: true,
      }));
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

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
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
          <button type="submit" id="search-button" onClick={fetchProducts}>
            <i className="fa fa-search"></i>
          </button>
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
                    disabled={role === "admin" || addedToCartMap[product._id]}
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
