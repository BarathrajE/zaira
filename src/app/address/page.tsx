/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Check, ArrowLeft } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useRouter } from "next/navigation";

const accentColor = "#535e51";
const backgroundColor = "#f1f5f4";

export default function ShippingAddressManager() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      company: "",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      company: "Tech Corp",
      address1: "456 Business Ave",
      address2: "Suite 200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    resetForm();
  };

  const handleEdit = (address: any) => {
    setEditingId(address.id);
    setIsAddingNew(false);
    setFormData(address);
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isAddingNew) {
      const newAddress = {
        ...formData,
        id: Math.max(...addresses.map((a) => a.id)) + 1,
      };

      if (newAddress.isDefault) {
        setAddresses((prev) =>
          prev.map((addr) => ({ ...addr, isDefault: false }))
        );
      }

      setAddresses((prev) => [...prev, newAddress]);
    } else {
      if (formData.isDefault) {
        setAddresses((prev) =>
          prev.map((addr) => ({ ...addr, isDefault: false }))
        );
      }

      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr
        )
      );
    }

    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const isFormVisible = isAddingNew || editingId !== null;
  const router = useRouter();
  const goTocartPage = () => {
    router.push("/cart");
  };
  return (
    <>
      <Header />
      <section className="bg-[#f1f5f4]">
        <div className="max-w-7xl   mx-auto p-6 " style={{ backgroundColor }}>
          <div className="mb-8">
            <div
              className="text-3xl font-bold mb-1 flex  gap-5 items-center"
              style={{ color: accentColor }}
            >
              <ArrowLeft onClick={goTocartPage}  className="cursor-pointer"/>

              <span> Shipping Addresses</span>
            </div>
          </div>
          {!isFormVisible && (
            <button
              onClick={handleAddNew}
              className="mb-6 flex items-center gap-2 px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {isFormVisible && (
                <div
                  className="mb-8 p-6 rounded-md border"
                  style={{ backgroundColor: "#fff" }}
                >
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: accentColor }}
                  >
                    {isAddingNew ? "Add New Address" : "Edit Address"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name *", name: "name" },
                      { label: "Company", name: "company" },
                      { label: "Address Line 1 *", name: "address1" },
                      { label: "Address Line 2", name: "address2" },
                      { label: "City *", name: "city" },
                      { label: "State *", name: "state" },
                      { label: "ZIP Code *", name: "zipCode" },
                    ].map(({ label, name }, idx) => (
                      <div
                        key={idx}
                        className={`${
                          name === "address1" || name === "address2"
                            ? "col-span-2"
                            : ""
                        }`}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          name={name}
                          value={(formData as any)[name]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: accentColor }}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: accentColor }}
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: accentColor }}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={formData.isDefault}
                          onChange={handleInputChange}
                          className="rounded border"
                          style={{ borderColor: accentColor }}
                        />
                        Set as default address
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-white rounded-md"
                      style={{ backgroundColor: accentColor }}
                    >
                      Save Address
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border rounded-md text-gray-700"
                      style={{ borderColor: accentColor }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address Cards */}
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-md border shadow-sm transition-all ${
                      address.isDefault ? "bg-white border" : "bg-white"
                    }`}
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div
                          className="flex items-center gap-2 text-lg font-medium"
                          style={{ color: accentColor }}
                        >
                          <MapPin className="w-4 h-4" />
                          {address.name}
                          {address.isDefault && (
                            <span className="text-xs bg-[#e5eae9] px-2 py-1 rounded-full flex items-center gap-1 text-[#3d4f4b]">
                              <Check className="w-3 h-3" />
                              Default
                            </span>
                          )}
                        </div>
                        {address.company && (
                          <p className="text-sm text-gray-600">
                            {address.company}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.address1}, {address.address2}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.country}
                        </p>
                        {address.phone && (
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="text-xs border px-2 py-1 rounded-md"
                            style={{
                              borderColor: accentColor,
                              color: accentColor,
                            }}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(address)}
                          className="text-gray-600 hover:text-black"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {addresses.length === 0 && (
                <div className="text-center mt-12 text-gray-600">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  No addresses yet. Start by adding one.
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg text-[#535e51] font-bold mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">Item Total</span>
                    <span className="font-medium text-[#535e51]">₹45,092</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">You Saved</span>
                    <span className="font-medium text-green-600">-₹1343</span>
                  </div>
                  {/* <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div> */}
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg text-[#535e51] font-bold">
                        Bill Total
                      </span>
                      <span className="text-lg font-bold text-[#535e51]">
                        ₹43,749
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#535e51]  py-3 rounded-lg text-white ">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
