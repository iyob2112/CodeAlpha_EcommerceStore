import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataResponse = await response.json();

      setOrders(dataResponse?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // delete order
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${SummaryApi.deleteOrder.url}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleDelivered
 const handleDelivered = async (id) => {
  try {
    const response = await fetch(
      `${SummaryApi.deliveredOrder.url}/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Delivered",
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      fetchOrders();
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        All Orders
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 border"
            >
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">
                    Order ID:
                  </span>{" "}
                  {order._id}
                </p>

                <p>
                  <span className="font-semibold">
                    Customer:
                  </span>{" "}
                  {order.userId?.name || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  {order.userId?.email || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Total:
                  </span>{" "}
                  ${order.totalAmount}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </p>
              </div>

              {/* buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Details
                </button>

             <button
  onClick={() => handleDelivered(order._id)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
>
  Delivered
</button>

                <button
                  onClick={() =>
                    handleDelete(order._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-5">
              Order Details
            </h2>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">
                  Order ID:
                </span>{" "}
                {selectedOrder._id}
              </p>

              <p>
                <span className="font-semibold">
                  Customer:
                </span>{" "}
                {selectedOrder.userId?.name}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {selectedOrder.userId?.email}
              </p>

              <p>
                <span className="font-semibold">
                  Total:
                </span>{" "}
                ${selectedOrder.totalAmount}
              </p>

              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}
                {selectedOrder.status}
              </p>

              {/* products */}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Products
                </h3>

                <div className="space-y-3">
                  {selectedOrder.products?.map(
                    (product, index) => (
                      <div
                        key={index}
                        className="border p-3 rounded-lg"
                      >
                        <p>
                          <span className="font-semibold">
                            Name:
                          </span>{" "}
                          {product.name}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Price:
                          </span>{" "}
                          ${product.price}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Quantity:
                          </span>{" "}
                          {product.quantity}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;