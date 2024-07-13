import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/ProductManagerCss.css";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    quantity: "",
    image: "",
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://exe-be.onrender.com/product/");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    try {
      const response = await axios.post(
        "https://exe-be.onrender.com/product/create",
        newProduct
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        type: "",
        price: "",
        description: "",
        quantity: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-manager">
      <div className="add-product">
        <h1>Add Product</h1>
        <div className="product-form">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type"
            value={newProduct.type}
            onChange={(e) =>
              setNewProduct({ ...newProduct, type: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity: parseInt(e.target.value),
              })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button onClick={addProduct}>Add Product</button>
        </div>
      </div>
      <div className="product-list">
        <h1>Product List</h1>
        <ul className="list">
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <p>
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Type:</strong> {product.type}
              </p>
              <p>
                <strong>Price:</strong> {product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p>
                <img src={product.image} alt="" />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManager;
