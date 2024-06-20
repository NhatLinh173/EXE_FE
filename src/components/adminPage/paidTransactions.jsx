import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/PaidTransactionsCss.css";

const PaidTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaidTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/checkout/paid");
        setTransactions(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPaidTransactions();
  }, []);

  if (loading) {
    return <div style={{ marginTop: "150px" }}> Loading...</div>;
  }

  if (error) {
    return <div style={{ marginTop: "150px" }}>Error: {error.message}</div>;
  }

  return (
    <div className="container-order">
      <h1>Paid Transactions</h1>
      <ul className="order-list">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="order-card">
            <p>
              <strong>Order ID:</strong> {transaction._id}
            </p>
            <p>
              <strong>Name:</strong> {transaction.name}
            </p>
            <p>
              <strong>Phone:</strong> {transaction.phone}
            </p>
            <p>
              <strong>Address:</strong> {transaction.address}
            </p>
            <p>
              <strong>Email:</strong> {transaction.email}
            </p>
            <p>
              <strong>Shipping Method:</strong> {transaction.shippingMethod}
            </p>
            <p>
              <strong>Payment Method:</strong> {transaction.paymentMethod}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul>
              {transaction.items.map((item, index) => (
                <li key={index}>
                  <p>
                    <strong>Item Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {formatPrices(item.price)} VNĐ
                  </p>
                </li>
              ))}
            </ul>
            <p>
              <strong>Total Price:</strong>{" "}
              {formatPrices(transaction.totalPrice)} VNĐ
            </p>
            <p>
              <strong>Shipping Cost:</strong>{" "}
              {formatPrices(transaction.shippingCost)} VNĐ
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              {formatPrices(transaction.totalAmount)} VNĐ
            </p>
            <p>
              <strong>Status:</strong> {transaction.status}
            </p>
            <p>
              <strong>User ID:</strong> {transaction.userId}
            </p>
            <p>
              <strong>Order Code:</strong>{" "}
              {transaction.orderCodeStatus || "N/A"}
            </p>
            <p>
              <strong>Order Status:</strong> {transaction.orderStatus}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formatPrices = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default PaidTransactions;
