"use client";

import React, { useState, MouseEvent } from "react";
import { Package, LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function HeaderWithButtons() {
  const [isLoggingOut] = useState<boolean>(false);

  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");

    router.push("/");
  };
  const orderpage = () => {
    router.push("/order");
  };
  const handleContinueShopping = (): void => {
    alert("Redirecting to home page...");
  };

 

  const handleMouseEnter = (
    e: MouseEvent<HTMLButtonElement>,
    color: string
  ): void => {
    e.currentTarget.style.backgroundColor = color;
  };

  const handleMouseLeave = (
    e: MouseEvent<HTMLButtonElement>,
    color: string
  ): void => {
    e.currentTarget.style.backgroundColor = color;
  };

  const handleOpacityEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.opacity = "0.8";
  };

  const handleOpacityLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1f5f4" }}>
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "#535e51" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8" style={{ color: "#535e51" }} />
              <span
                className="ml-2 text-xl font-bold"
                style={{ color: "#535e51" }}
              >
                ZAIRA
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200"
                style={{
                  backgroundColor: "#535e51",
                  opacity: isLoggingOut ? 0.5 : 1,
                  cursor: isLoggingOut ? "not-allowed" : "pointer",
                }}
                onMouseEnter={isLoggingOut ? undefined : handleOpacityEnter}
                onMouseLeave={isLoggingOut ? undefined : handleOpacityLeave}
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          style={{
            borderColor: "#535e51",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContinueShopping}
              className="inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-lg transition-colors duration-200"
              style={{
                borderColor: "#535e51",
                color: "#535e51",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => handleMouseEnter(e, "#f1f5f4")}
              onMouseLeave={(e) => handleMouseLeave(e, "white")}
            >
              <Home className="h-5 w-5 mr-2" style={{ color: "#535e51" }} />
              Continue Shopping
            </button>

            <button
              onClick={orderpage}
              className="inline-flex items-center justify-center px-6 py-3 border-transparent text-base font-medium rounded-lg text-white transition-colors duration-200"
              style={{
                backgroundColor: "#535e51",
              }}
              onMouseEnter={handleOpacityEnter}
              onMouseLeave={handleOpacityLeave}
            >
              <Package className="h-5 w-5 mr-2" />
              View My Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
