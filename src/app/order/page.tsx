"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";

type OrderStatus = "delivered" | "in_transit";

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
  estimatedDelivery: string;
  actualDelivery?: string;
  items: OrderItem[];
  trackingSteps: TrackingStep[];
  shippingAddress: string;
};

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleOrders: Record<string, Order> = {
    ORD123456: {
      orderNumber: "ORD123456",
      status: "delivered",
      customerName: "John Smith",
      orderDate: "2025-08-01",
      estimatedDelivery: "2025-08-05",
      actualDelivery: "2025-08-05",
      items: [
        { name: "Premium Coffee Beans", quantity: 2, price: 24.99 },
        { name: "Organic Tea Collection", quantity: 1, price: 18.5 },
      ],
      trackingSteps: [
        {
          status: "Order Placed",
          date: "2025-08-01 09:30 AM",
          completed: true,
          description: "Order received",
        },
        {
          status: "Processing",
          date: "2025-08-01 02:15 PM",
          completed: true,
          description: "Preparing shipment",
        },
        {
          status: "Shipped",
          date: "2025-08-02 11:45 AM",
          completed: true,
          description: "Left facility",
        },
        {
          status: "In Transit",
          date: "2025-08-03 08:20 AM",
          completed: true,
          description: "On the way",
        },
        {
          status: "Delivered",
          date: "2025-08-05 03:30 PM",
          completed: true,
          description: "Delivered",
        },
      ],
      shippingAddress: "123 Main Street, Anytown, ST 12345",
    },
    ORD789012: {
      orderNumber: "ORD789012",
      status: "in_transit",
      customerName: "Sarah Johnson",
      orderDate: "2025-08-03",
      estimatedDelivery: "2025-08-07",
      items: [
        { name: "Chocolate Assortment", quantity: 1, price: 32.0 },
        { name: "Honey Variety Pack", quantity: 3, price: 21.75 },
      ],
      trackingSteps: [
        {
          status: "Order Placed",
          date: "2025-08-03 10:00 AM",
          completed: true,
          description: "Order received",
        },
        {
          status: "Processing",
          date: "2025-08-03 03:10 PM",
          completed: true,
          description: "Packing items",
        },
        {
          status: "Shipped",
          date: "2025-08-04 01:20 PM",
          completed: true,
          description: "Shipped via local courier",
        },
        {
          status: "In Transit",
          date: "2025-08-05 06:50 AM",
          completed: false,
          description: "Expected delivery soon",
        },
        {
          status: "Delivered",
          date: "",
          completed: false,
          description: "Not yet delivered",
        },
      ],
      shippingAddress: "456 Oak Avenue, Smalltown, ST 67890",
    },
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchedOrder(sampleOrders[trackingNumber.toUpperCase()] || null);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className=" bg-[#f1f5f4] p-6">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#535e51] mb-6">
            Track Your Order
          </h1>
          <p>DEV ONLY: Remove this line before deploying to production</p>
          <p>
            Default tracking ID: <strong>ORD123456</strong>
          </p>

          <div className="flex items-center gap-4 mb-8">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter Order Number"
              className="flex-1 p-3 border border-[#d1d5db] rounded text-[#535e51] focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#535e51] text-white px-5 py-2 rounded hover:opacity-90"
            >
              <Search className="w-8 h-9" />
            </button>
          </div>

          {isLoading && <p className="text-[#535e51]">Searching...</p>}

          {searchedOrder ? (
            <div className="bg-white p-6 rounded shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#535e51]">
                  Order #{searchedOrder.orderNumber}
                </h2>
                <p className="text-sm text-[#535e51]">
                  Customer: {searchedOrder.customerName}
                </p>
                <p className="text-sm text-[#535e51]">
                  Status: {searchedOrder.status.replace("_", " ")}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#535e51] mb-2">
                  Items:
                </h3>
                <ul className="space-y-2">
                  {searchedOrder.items.map((item, i) => (
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
                  {searchedOrder.trackingSteps.map((step, i) => (
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
                  {searchedOrder.shippingAddress}
                </p>
              </div>
            </div>
          ) : (
            !isLoading &&
            trackingNumber !== "ORD123456" &&
            !searchedOrder && (
              <p className="text-[#535e51]">
                No order found for {trackingNumber}
              </p>
            )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
