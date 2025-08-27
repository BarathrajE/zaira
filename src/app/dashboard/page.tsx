"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  LogOut,
} from "lucide-react";
import OrderManagement from "../_componentAdminPage/page";
import AdminProductDashboard from "../_componentAdminPage/productAdmin";
import { toast } from "sonner";

/* ---------------- Login Component ---------------- */
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "zaira@example.com" && password === "password123") {
      localStorage.setItem("adminId", "ZAIRA001");
      localStorage.setItem("adminEmail", email);
      toast.success("Login Successful! Redirecting...");
      setTimeout(() => onLogin(), 1000); // Delay for smooth effect
    } else {
      toast.error("Invalid credentials. Please try again!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

/* ---------------- Admin Panel ---------------- */
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      setIsLoggedIn(true);
    }
  }, []);

  // Sample data
  const stats = {
    totalUsers: 1247,
    totalOrders: 892,
    totalProducts: 156,
    totalRevenue: 45780,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="flex items-center space-x-1">
          {change > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {value.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change={stats.monthlyGrowth}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={8.2}
          icon={ShoppingBag}
          color="green"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          change={-2.1}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.monthlyGrowth}
          icon={DollarSign}
          color="yellow"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <AdminProductDashboard />;
      case "orders":
        return <OrderManagement />;
      default:
        return <Dashboard />;
    }
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900">Zaira</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => {
              localStorage.removeItem("adminId");
              localStorage.removeItem("adminEmail");
              window.location.reload();
            }}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {activeTab}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-600">
                    {localStorage.getItem("adminEmail")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminPanel;
