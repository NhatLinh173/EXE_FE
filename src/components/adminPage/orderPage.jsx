import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/OrderPageCss.css";
import { toast } from "react-toastify";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Đợi Xác Nhận Đơn Hàng");
  const [tempStatus, setTempStatus] = useState({});
  const [tempOrderStatus, setTempOrderStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (orderStatus) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/checkout/orders/status/${orderStatus}`
          );
          console.log(response.data);
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching orders:", error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [orderStatus]);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/checkout/remove/${orderId}`);
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      setError(error);
    }
  };

  const handleUpdate = async (orderCodeStatus) => {
    const order = orders.find(
      (order) => order.orderCodeStatus === orderCodeStatus
    );

    if (order.status === "PAID" && order.orderStatus === "Đã Giao") {
      toast.error("Cannot update order");
      return;
    }

    const newStatus = tempStatus[orderCodeStatus];
    const newOrderStatus = tempOrderStatus[orderCodeStatus];

    const updatePayload = {
      orderCodeStatus,
      status: newStatus !== undefined ? newStatus : order.status,
      orderStatus:
        newOrderStatus !== undefined ? newOrderStatus : order.orderStatus,
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/checkout/order/update-status",
        updatePayload
      );

      const updatedOrders = orders.map((order) =>
        order.orderCodeStatus === orderCodeStatus
          ? {
              ...order,
              status: updatePayload.status,
              orderStatus: updatePayload.orderStatus,
            }
          : order
      );
      setOrders(updatedOrders);
      setTempStatus((prevTempStatus) => ({
        ...prevTempStatus,
        [orderCodeStatus]: undefined,
      }));
      setTempOrderStatus((prevTempOrderStatus) => ({
        ...prevTempOrderStatus,
        [orderCodeStatus]: undefined,
      }));

      toast.success("Update successful!");

      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(error);
    }
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setOrderStatus(selectedStatus);
  };

  const handleStatusDropdownChange = (event, orderCodeStatus) => {
    const selectedStatus = event.target.value;
    setTempStatus((prevTempStatus) => ({
      ...prevTempStatus,
      [orderCodeStatus]: selectedStatus,
    }));
  };

  const handleOrderStatusDropdownChange = (event, orderCodeStatus) => {
    const selectedOrderStatus = event.target.value;
    setTempOrderStatus((prevTempOrderStatus) => ({
      ...prevTempOrderStatus,
      [orderCodeStatus]: selectedOrderStatus,
    }));
  };

  const formatPrices = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) {
    return <div style={{ marginTop: "150px" }}>Loading ....</div>;
  }

  if (error) {
    return <div style={{ marginTop: "150px" }}>Error: {error.message}</div>;
  }

  return (
    <div className="container-order">
      <h1 style={{ marginTop: "100px" }}>
        Các đơn hàng có trạng thái: {orderStatus}
      </h1>
      <div>
        <select value={orderStatus} onChange={handleStatusChange}>
          <option value="Đợi Xác Nhận Đơn Hàng">Đợi Xác Nhận Đơn Hàng</option>
          <option value="Đã Xác Nhận">Đã Xác Nhận</option>
          <option value="Đang Giao">Đang Giao</option>
          <option value="Đã Giao">Đã Giao</option>
        </select>
      </div>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-card">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Shipping Method:</strong> {order.shippingMethod}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul>
              {order.items.map((item, index) => (
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
              <strong>Total Price:</strong> {formatPrices(order.totalPrice)} VNĐ
            </p>
            <p>
              <strong>Shipping Cost:</strong> {formatPrices(order.shippingCost)}{" "}
              VNĐ
            </p>
            <p>
              <strong>Total Amount:</strong> {formatPrices(order.totalAmount)}{" "}
              VNĐ
            </p>
            <p>
              <strong>Status:</strong>
              <select
                value={
                  tempStatus[order.orderCodeStatus] !== undefined
                    ? tempStatus[order.orderCodeStatus]
                    : order.status
                }
                onChange={(e) =>
                  handleStatusDropdownChange(e, order.orderCodeStatus)
                }
                disabled={order.status === "PAID"}
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </p>
            <p>
              <strong>User ID:</strong> {order.userId}
            </p>
            <p>
              <strong>Order Code:</strong> {order.orderCode || "N/A"}
            </p>
            <p>
              <strong>Order Status:</strong>
              <select
                value={
                  tempOrderStatus[order.orderCodeStatus] !== undefined
                    ? tempOrderStatus[order.orderCodeStatus]
                    : order.orderStatus
                }
                onChange={(e) =>
                  handleOrderStatusDropdownChange(e, order.orderCodeStatus)
                }
                disabled={order.orderStatus === "Đã Giao"}
              >
                <option value="Đợi Xác Nhận Đơn Hàng">
                  Đợi Xác Nhận Đơn Hàng
                </option>
                <option value="Đã Xác Nhận">Đã Xác Nhận</option>
                <option value="Đang Giao">Đang Giao</option>
                <option value="Đã Giao">Đã Giao</option>
              </select>
            </p>
            <p>
              <strong>Order Code Status:</strong> {order.orderCodeStatus}
            </p>
            <div className="btn-order">
              <button
                onClick={() => handleUpdate(order.orderCodeStatus)}
                className="btn-order-update"
                disabled={
                  order.orderStatus === "Đã Giao" || order.status === "PAID"
                }
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="btn-order-delete"
                disabled={
                  order.orderStatus === "Đã Giao" || order.status === "PAID"
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
