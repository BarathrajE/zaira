/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getOrdersAction } from "../redux/action/order/getOrder";

type OrderStatus = "delivered" | "in_transit" | "placed" | string;

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type TrackingStep = {
  status: string;
  date: string;
  completed: boolean;
  description: string;
};

type Order = {
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  orderDate: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  items: OrderItem[];
  trackingSteps: TrackingStep[];
  shippingAddress: string;
};

export default function OrderTrackingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.login.login.data.user?._id);
  const getOrder = useSelector((state: RootState) => state.Getorders.orders);

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersAction(userId) as any);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (getOrder.orders && getOrder.orders.length > 0) {
      const transformedOrders = getOrder.orders.map((order: any) => transformOrder(order));
      setOrders(transformedOrders);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [getOrder]);

  const transformOrder = (order: any): Order => {
    return {
      orderNumber: order._id,
      status: order.status.toLowerCase(),
      customerName: "Customer Name", // Replace with actual customer name if available
      orderDate: new Date(order.createdAt).toLocaleDateString(),
      estimatedDelivery: "", // Replace with actual estimated delivery if available
      actualDelivery: "", // Replace with actual delivery date if available
      items: order.products.map((product: any) => ({
        name: product.productId.name,
        quantity: product.quantity,
        price: parseFloat(product.productId.price),
      })),
      trackingSteps: [
        {
          status: "Order Placed",
          date: new Date(order.createdAt).toLocaleString(),
          completed: true,
          description: "Your order has been placed and is being processed.",
        },
        // Add more tracking steps as needed
      ],
      shippingAddress: "Shipping Address, City, State, ZIP", // Replace with actual address if available
    };
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Header />
      <main className="bg-[#f1f5f4] p-6">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#535e51] mb-6">
            Track Your Orders
          </h1>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.orderNumber} className="bg-white p-6 rounded shadow-md">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#535e51]">
                      Order #{order.orderNumber}
                    </h2>
                    <p className="text-sm text-[#535e51]">
                      Customer: {order.customerName}
                    </p>
                    <p className="text-sm text-[#535e51]">
                      Status: {order.status.replace("_", " ")}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-[#535e51] mb-2">
                      Items:
                    </h3>
                    <ul className="space-y-2">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-[#535e51]">
                          {item.quantity} × {item.name} – ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-[#535e51] mb-2">
                      Tracking:
                    </h3>
                    <ol className="space-y-4 border-l-2 border-[#535e51] pl-4">
                      {order.trackingSteps
                        .filter((step) =>
                          [
                            "Order Placed",
                            "Shipped",
                            "In Transit",
                            "Out for Delivery",
                            "Delivered",
                          ].includes(step.status)
                        )
                        .map((step, i) => (
                          <li key={i} className="relative">
                            <div
                              className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 ${
                                step.completed
                                  ? "bg-[#535e51] border-[#535e51]"
                                  : "bg-white border-[#535e51]"
                              }`}
                            />
                            <p className="font-semibold text-[#535e51]">
                              {step.status}
                            </p>
                            <p className="text-sm text-[#535e51]">{step.date}</p>
                            <p className="text-sm text-[#535e51] italic">
                              {step.description}
                            </p>
                          </li>
                        ))}
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#535e51] mb-2">
                      Shipping Address:
                    </h3>
                    <p className="text-[#535e51]">
                      {order.shippingAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#535e51]">No orders found.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
