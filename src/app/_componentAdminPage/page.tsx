/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllOrdersAction } from "../redux/action/order/allUserOrder";
import { updateOrderAction } from "../redux/action/order/updateOrder";
import { getAddressesAction } from "../redux/action/profile/addressGet";

type OrderStatus = "Placed" | "Shipped" | "Out of Delivery" | "Delivered";

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
  address: string;
  size: string;
}

type ModalType = "create" | "edit" | "view";

const OrderManagement: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("create");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Omit<Order, "id" | "date">>({
    customer: "",
    email: "",
    total: 0,
    status: "Placed",
    items: 0,
    address: "",
    size: "",
  });

  const statusTypes: OrderStatus[] = [
    "Placed",
    "Shipped",
    "Out of Delivery",
    "Delivered",
  ];

  const dispatch = useDispatch<AppDispatch>();
  const allorder = useSelector(
    (state: RootState) => state.getAllorders.orders.orders
  );

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(allorder)) {
      setLocalOrders(
        allorder.map((order: any) => {
          // Extract size for each product in the order
          const productSizes = order.products.map((product: any) => {
            const sizeObj = product.productId.sizes.find(
              (s: any) => s._id === product.size
            );
            return sizeObj ? sizeObj.size : "N/A";
          });

          return {
            id: order._id,
            customer: order.userId || "Guest",
            email: order.userEmail || "N/A",
            status: normalizeStatus(order.status),
            total: order.totalAmount,
            items: order.products.length,
            date: new Date(order.createdAt).toLocaleDateString(),
            address: order.address || "N/A",
            size: productSizes.join(", "), // Join sizes if there are multiple products
          };
        })
      );
    }
  }, [allorder]);

  useEffect(() => {
    let result = [...localOrders];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchLower) ||
          order.email.toLowerCase().includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower) ||
          order.address.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, localOrders]);

  // Initialize filteredOrders
  useEffect(() => {
    setFilteredOrders(localOrders);
  }, [localOrders]);

  const normalizeStatus = (status: string): OrderStatus => {
    const statusMap: Record<string, OrderStatus> = {
      placed: "Placed",
      shipped: "Shipped",
      "out of delivery": "Out of Delivery",
      delivered: "Delivered",
      delevered: "Delivered",
    };
    return statusMap[status.toLowerCase().trim()] || "Placed";
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Placed":
        return <Clock className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Out of Delivery":
        return <Package className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Placed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Out of Delivery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const userId =
    useSelector((state: RootState) => state.login.login.data?.user?._id) ??
    null;
  const addressgetID = useSelector(
    (state: RootState) => state.AddressGet.addresses
  );

  const addressDetails = addressgetID.map((address: any) => ({
    id: address._id,
    addressname: address.name,
    city: address.city,
    state: address.state,
    country: address.country,
    phone: address.phone,
    userId: address.userId,
  }));

  useEffect(() => {
    if (userId) dispatch(getAddressesAction(userId) as any);
  }, [dispatch, userId]);

  const statusCounts = localOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);

  const openModal = (type: ModalType, order: Order | null = null) => {
    if (order) {
      const normalizedOrder = {
        ...order,
        status: normalizeStatus(order.status),
      };
      setSelectedOrder(normalizedOrder);
    } else {
      setSelectedOrder(null);
    }
    setModalType(type);
    setShowModal(true);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof Omit<Order, "id" | "date">,
    isNew: boolean
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    if (isNew) {
      setNewOrder({ ...newOrder, [field]: value });
    } else if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, [field]: value });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLocalOrders(localOrders.filter((order) => order.id !== orderId));
    }
  };

  const handleCreateOrder = () => {
    setShowModal(false);
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder?.id) {
      console.error("No valid order ID found");
      return;
    }
    try {
      await dispatch(
        updateOrderAction({
          orderId: selectedOrder.id,
          status: selectedOrder.status,
        }) as any
      );
      // Refetch orders
      await dispatch(getAllOrdersAction());
      setShowModal(false);
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Order update failed:", error);
      alert("Failed to update order. Please try again.");
    }
  };
  const matchedAddress = addressDetails.find(
    (a: any) => a.id === selectedOrder?.address
  );

  return (
    <div className="p-4 bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">
            Manage all customer orders with complete control
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statusTypes.map((status) => (
            <div key={status} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {status === "Placed" ? "Order Placed" : status}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statusCounts[status] || 0}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as OrderStatus | "All")
                  }
                >
                  <option value="All">All Status</option>
                  {statusTypes.map((status) => (
                    <option key={status} value={status}>
                      {status === "Placed" ? "Order Placed" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>{order.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-2 py-1 text-sm border rounded ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span>
                          {order.status === "Placed"
                            ? "Order Placed"
                            : order.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">₹ {order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openModal("view", order)}
                          className="text-blue-500 hover:text-blue-700"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openModal("edit", order)}
                          className="text-green-500 hover:text-green-700"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {modalType === "create" && "Create New Order"}
                {modalType === "edit" && "Edit Order"}
                {modalType === "view" && "Order Details"}
              </h2>
              {modalType === "view" ? (
                <div className="space-y-4">
                  <div>
                    <strong>Order ID:</strong> {selectedOrder?.id}
                  </div>
                  <div>
                    <strong>Customer:</strong> {selectedOrder?.customer}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    {selectedOrder?.status === "Placed"
                      ? "Order Placed"
                      : selectedOrder?.status}
                  </div>
                  <div>
                    <strong>Size:</strong> {selectedOrder?.size}
                  </div>
                  <div>
                    <strong>Total:</strong> ₹{selectedOrder?.total.toFixed(2)}
                  </div>
                  <div>
                    <strong>Items:</strong> {selectedOrder?.items}
                  </div>
                  <div>
                    <strong>Date:</strong> {selectedOrder?.date}
                  </div>
                  <div>
                    <strong>Address: </strong>
                    {matchedAddress ? (
                      <>
                        {matchedAddress.addressname}, {matchedAddress.city},{" "}
                        {matchedAddress.state}, {matchedAddress.country} -{" "}
                        {matchedAddress.phone}
                      </>
                    ) : (
                      "Unknown"
                    )}
                  </div>
                </div>
              ) : modalType === "edit" ? (
                <div className="space-y-4">
                  <div>
                    <strong>Order ID:</strong> {selectedOrder?.id}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={selectedOrder?.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder!,
                          status: e.target.value as OrderStatus,
                        })
                      }
                    >
                      {statusTypes.map((status) => (
                        <option key={status} value={status}>
                          {status === "Placed" ? "Order Placed" : status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <strong>Customer:</strong> {selectedOrder?.customer}
                  </div>
                  <div>
                    <strong>Total:</strong> ₹{selectedOrder?.total.toFixed(2)}
                  </div>
                  <div>
                    <strong>Items:</strong> {selectedOrder?.items}
                  </div>
                  <div>
                    <strong>Date:</strong> {selectedOrder?.date}
                  </div>
                  <div>
                    <strong>Address:</strong> {selectedOrder?.address}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newOrder.customer}
                    onChange={(e) => handleInputChange(e, "customer", true)}
                  />
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newOrder.status}
                    onChange={(e) => handleInputChange(e, "status", true)}
                  >
                    {statusTypes.map((status) => (
                      <option key={status} value={status}>
                        {status === "Placed" ? "Order Placed" : status}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Total Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newOrder.total}
                    onChange={(e) => handleInputChange(e, "total", true)}
                  />
                  <input
                    type="number"
                    placeholder="Number of Items"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newOrder.items}
                    onChange={(e) => handleInputChange(e, "items", true)}
                  />
                  <textarea
                    placeholder="Delivery Address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newOrder.address}
                    onChange={(e) => handleInputChange(e, "address", true)}
                  />
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {modalType === "view" ? "Close" : "Cancel"}
                </button>
                {modalType !== "view" && (
                  <button
                    onClick={
                      modalType === "create"
                        ? handleCreateOrder
                        : handleUpdateOrder
                    }
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {modalType === "create" ? "Create Order" : "Update Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
