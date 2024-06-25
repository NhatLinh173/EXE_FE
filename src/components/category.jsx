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
export const Category = ({ items, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [noResults, setNoResults] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [addedToCartMap, setAddedToCartMap] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (userId) {
      fetchProduct();
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id_user);
      setRole(decodedToken.role);
    }
    fetchProduct();
  }, [searchKeyword]);

  // const handleAddToCart = async (product) => {
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   if (addedToCartMap[product._id]) {
  //     toast.warning("Sản phẩm đã có trong giỏ hàng.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "https://exe-be.onrender.com/cart/addToCart",
  //       {
  //         userId: userId,
  //         productId: product._id,
  //         productName: product.name,
  //         price: product.price,
  //         image: product.image,
  //         quality: 1,
  //       },
  //       { headers }
  //     );
  //     addToCart(product);
  //     toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  //     setAddedToCartMap((prevMap) => ({
  //       ...prevMap,
  //       [product._id]: true,
  //     }));
  //     setAddedToCart(true);

  //     let cartItems = localStorage.getItem("cartItems");
  //     if (cartItems) {
  //       try {
  //         cartItems = JSON.parse(cartItems);
  //       } catch (error) {
  //         console.error("Error parsing cart items: ", error);
  //         cartItems = [];
  //       }
  //     } else {
  //       cartItems = [];
  //     }
  //     const updateCartItems = [...cartItems, { productId: product._id }];
  //     localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
  //   } catch (error) {
  //     console.error("Error adding product to cart: ", error);
  //     console.log(error);
  //     toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
  //   }
  // };
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
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

      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
      const existingCartItemIndex = updatedCartItems.findIndex(
        (item) => item.productId === product._id
      );

      if (existingCartItemIndex > -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        updatedCartItems[existingCartItemIndex].quality += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới
        updatedCartItems.push({
          productId: product._id,
          quality: 1,
        });
      }

      // Cập nhật localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Gửi yêu cầu đến server để cập nhật giỏ hàng
      const response = await axios.post(
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

      // Thêm sản phẩm vào cart state (nếu cần thiết cho giao diện)
      addToCart(product);

      // Hiển thị thông báo thành công
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");

      // Cập nhật trạng thái sản phẩm đã có trong giỏ hàng
      setAddedToCartMap((prevMap) => ({
        ...prevMap,
        [product._id]: true,
      }));
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://exe-be.onrender.com/product/");

      let filteredProducts = response.data;
      if (searchKeyword) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      setDisplayedProducts(
        filteredProducts.slice(0, numberOfDisplayedProducts)
      );

      setProducts(filteredProducts);

      if (filteredProducts.length > 0) {
        setDisplayedProducts(
          filteredProducts.slice(0, numberOfDisplayedProducts)
        );
        setNoResults(false);
      } else {
        setDisplayedProducts([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching products", error);
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

  useEffect(() => {
    displayedProducts.forEach((product) => {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        try {
          const parsedCartItems = JSON.parse(cartItems);
          const found = parsedCartItems.some(
            (item) => item.productId === product._id
          );
          if (found) {
            setAddedToCart(true);
          }
        } catch (error) {
          console.error("Error parsing cart items: ", error);
        }
      }
    });
  }, [displayedProducts]);

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
          <button type="submit" id="search-button" onClick={fetchProduct}>
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
                    {addedToCartMap[product._id] ? (
                      <p className="in-cart-message">Đã có trong giỏ hàng</p>
                    ) : (
                      <FontAwesomeIcon icon={faCartPlus} />
                    )}
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
