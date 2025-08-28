/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getOrdersAction } from "../redux/action/order/getOrder";
import { getAddressesAction } from "../redux/action/profile/addressGet";

type OrderStatus =
  | "delivered"
  | "out for delivery"
  | "shipped"
  | "placed"
  | string;

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
  const userId =
    useSelector((state: RootState) => state.login.login.data?.user?._id) ??
    null;

  const getOrder = useSelector((state: RootState) => state.Getorders.orders);
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

  console.log(addressDetails);

  useEffect(() => {
    if (userId) dispatch(getOrdersAction(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) dispatch(getAddressesAction(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (getOrder.orders && getOrder.orders.length > 0) {
      const transformedOrders = getOrder.orders.map((order: any) =>
        transformOrder(order)
      );
      setOrders(transformedOrders);
    }
    setLoading(false);
  }, [getOrder]);

  const transformOrder = (order: any): Order => {
    const lowerStatus = order.status ? order.status.toLowerCase() : "placed";

    // Normalize the status - handle "out of delivery" vs "out for delivery"
    const normalizedStatus =
      lowerStatus === "out of delivery" ? "out for delivery" : lowerStatus;

    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // Helper function to generate estimated dates for missing timestamps
    const getEstimatedDate = (baseDate: string, daysToAdd: number): string => {
      const base = new Date(baseDate);
      base.setDate(base.getDate() + daysToAdd);
      return base.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
    };

    const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // Define status hierarchy for completion logic
    const statusHierarchy = [
      "placed",
      "shipped",
      "out for delivery",
      "delivered",
    ];
    const currentStatusIndex = statusHierarchy.indexOf(normalizedStatus);

    const trackingSteps: TrackingStep[] = [
      {
        status: "placed",
        date: orderDate,
        completed: currentStatusIndex >= 0, // Always completed if we have any status
        description: "Your order has been placed.",
      },
      {
        status: "shipped",
        date: order.shippedAt
          ? new Date(order.shippedAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })
          : currentStatusIndex >= 1 // If current status is shipped or beyond
          ? getEstimatedDate(order.createdAt, 1)
          : "",
        completed: currentStatusIndex >= 1,
        description: "Your order has been shipped.",
      },
      {
        status: "out for delivery",
        date: order.outForDeliveryAt
          ? new Date(order.outForDeliveryAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })
          : currentStatusIndex >= 2 // If current status is out for delivery or beyond
          ? getEstimatedDate(order.createdAt, 2)
          : "",
        completed: currentStatusIndex >= 2,
        description: "Your order is out for delivery.",
      },
      {
        status: "delivered",
        date: order.deliveredAt
          ? new Date(order.deliveredAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })
          : "",
        completed: currentStatusIndex >= 3,
        description: "Your order has been delivered.",
      },
    ];

    console.log("Order Status:", normalizedStatus);
    console.log("Current Status Index:", currentStatusIndex);
    console.log(
      "Tracking Steps:",
      trackingSteps.map((step) => ({
        status: step.status,
        completed: step.completed,
      }))
    );

    return {
      orderNumber: order._id,
      status: normalizedStatus,
      customerName: order.user?.name || "Customer Name",
      orderDate: new Date(order.createdAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
      estimatedDelivery: order.estimatedDelivery || "",
      actualDelivery: order.deliveredAt || "",
      items: order.products.map((p: any) => ({
        name: p.productId?.name || "Cotton T-Shirt",
        quantity: p.quantity || 1,
        price: parseFloat(p.productId?.price) || 100,
      })),
      trackingSteps,
      shippingAddress: order.address,
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

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[#535e51]">Loading user data...</p>
      </div>
    );
  }

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <Header />
      <main className="bg-[#f1f5f4] p-6 min-h-screen">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#535e51] mb-6">
            Track Your Orders
          </h1>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="bg-white p-6 rounded shadow-md"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#535e51]">
                      Order #{order.orderNumber}
                    </h2>
                    {(() => {
                      const matchedAddress = addressDetails.find(
                        (a:any) => a.id === order.shippingAddress
                      );
                      return (
                        <p className="text-sm text-[#535e51]">
                          Customer:{" "}
                          {matchedAddress
                            ? matchedAddress.addressname
                            : "Unknown"}
                        </p>
                      );
                    })()}
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
                      {order.trackingSteps.map((step, i) => (
                        <li key={i} className="relative">
                          <div
                            className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 ${
                              step.completed
                                ? "bg-[#535e51] border-[#535e51]"
                                : "bg-white border-[#535e51]"
                            }`}
                          />
                          <p className="font-semibold text-[#535e51] capitalize">
                            {step.status.replace("_", " ")}
                          </p>
                          {step.date && (
                            <p className="text-sm text-[#535e51]">
                              {step.date}
                            </p>
                          )}
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
                    {(() => {
                      const matchedAddress = addressDetails.find(
                        (a: any) => a.id === order.shippingAddress
                      );
                      return matchedAddress ? (
                        <p className="text-[#535e51]">
                          {matchedAddress.addressname}, {matchedAddress.city},{" "}
                          {matchedAddress.state}, {matchedAddress.country} -{" "}
                          {matchedAddress.phone}
                        </p>
                      ) : (
                        <p className="text-[#535e51]">Address not found</p>
                      );
                    })()}
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
