/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Check,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useRouter, useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createAddressAction } from "../redux/action/profile/address";
import { getAddressesAction } from "../redux/action/profile/addressGet";
import { updateAddressAction } from "../redux/action/profile/addressPut";
import { deleteAddressAction } from "../redux/action/profile/addressDelete";
import { fetchCart } from "../redux/action/cart/getCart";
import { allProductGetAction } from "../redux/action/product/allProduct";
import LoadingOverlay from "@/_components/LoadingOverlay";

interface FormData {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const ACCENT = "#535e51";
const BG = "#f1f5f4";

export default function ShippingAddressManager() {
  const [bootLoading, setBootLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
    isDefault: false,
  });

  const dispatch = useDispatch<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("id");
  const idsParams = searchParams.get("ids");
  const selectedSize = searchParams.get("size") || "";
  const quantity = searchParams.get("quantity");
  const selectsize = searchParams.get("sizes");

  const productId = useMemo(() => {
    const rawIds = idsParam || idsParams;
    return rawIds
      ? rawIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : [];
  }, [idsParam, idsParams]);

  // ---- Selectors ----
  const addressesSlice = useSelector((state: RootState) => state.AddressGet);
  const addressesRaw = (addressesSlice as any)?.addresses;
  const addressList: any[] = Array.isArray(addressesRaw) ? addressesRaw : [];
  const userId = useSelector(
    (state: RootState) => state.login?.login?.data?.user?._id
  );
  const cart = useSelector((state: RootState) => state.getcart.cart);
  const productData = useSelector(
    (state: RootState) => state.allProduct.product
  );

  // ---- FIXED CALCULATION LOGIC ----
  
  // Parse quantity from URL (for direct product purchase)
  const urlQuantity = useMemo(() => {
    const qty = Number(quantity);
    return isNaN(qty) || qty < 1 ? 1 : qty;
  }, [quantity]);

  // Determine if this is a direct product purchase or cart checkout
  const isDirectProductPurchase = productId.length > 0;

  // Cart-based calculations
  const cartCalculations = useMemo(() => {
    if (!cart?.items?.length) {
      return {
        itemTotal: 0,
        savings: 0,
        billTotal: 0
      };
    }

    const itemTotal = cart.items.reduce((total: number, item: any) => {
      const price = Number(item?.productId?.price) || 0;
      const quantity = item?.quantity || 1;
      return total + (price * quantity);
    }, 0);

    const savings = cart.items.reduce((total: number, item: any) => {
      const originalPrice = Number(item?.productId?.originalPrice) || Number(item?.productId?.price) || 0;
      const currentPrice = Number(item?.productId?.price) || 0;
      const quantity = item?.quantity || 1;
      const itemSavings = (originalPrice - currentPrice) * quantity;
      return total + Math.max(0, itemSavings); // Ensure savings isn't negative
    }, 0);

    return {
      itemTotal,
      savings,
      billTotal: itemTotal - savings
    };
  }, [cart]);

  // Product-based calculations (direct purchase)
  const productCalculations = useMemo(() => {
    if (!productData || !isDirectProductPurchase) {
      return {
        itemTotal: 0,
        savings: 0,
        billTotal: 0
      };
    }

    const price = Number(productData.price) || 0;
    const originalPrice = Number(productData.originalPrice) || price;
    const itemTotal = price * urlQuantity;
    const savings = Math.max(0, (originalPrice - price) * urlQuantity);

    return {
      itemTotal,
      savings,
      billTotal: itemTotal - savings
    };
  }, [productData, urlQuantity, isDirectProductPurchase]);

  // Final calculations based on context
  const finalCalculations = useMemo(() => {
    if (isDirectProductPurchase) {
      return productCalculations;
    } else {
      // Fallback to cart.totalPrice if available and cart calculations seem incorrect
      const cartTotal = Number(cart?.totalPrice) || 0;
      if (cartTotal > 0 && cartCalculations.itemTotal === 0) {
        return {
          itemTotal: cartTotal,
          savings: 0,
          billTotal: cartTotal
        };
      }
      return cartCalculations;
    }
  }, [isDirectProductPurchase, productCalculations, cartCalculations, cart?.totalPrice]);

  // ---- Effects ----
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (productId.length > 0) {
      productId.forEach((id) => {
        dispatch(allProductGetAction(id) as any);
      });
    }
  }, [dispatch, productId]);

  useEffect(() => {
    const timer = setTimeout(() => setBootLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userId) dispatch(getAddressesAction(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Calculation Debug:", {
      isDirectProductPurchase,
      urlQuantity,
      productData: productData ? {
        price: productData.price,
        originalPrice: productData.originalPrice
      } : null,
      cartItems: cart?.items?.length || 0,
      cartTotalPrice: cart?.totalPrice,
      finalCalculations
    });
  }, [isDirectProductPurchase, urlQuantity, productData, cart, finalCalculations]);

  useEffect(() => {
    const selectedAddress = addressList.find(
      (addr) => addr._id === selectedAddressId
    );
    if (selectedAddress) {
      console.log("Selected Address Details:", {
        id: selectedAddress._id,
        name: selectedAddress.name,
        address: selectedAddress.address1,
        city: selectedAddress.city,
        isDefault: selectedAddress.isDefault,
      });
    }
  }, [selectedAddressId, addressList]);

  // ---- Form Handlers ----
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

  const resetForm = () => {
    setFormData({
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      phone: "",
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const validateRequired = () => {
    if (!formData.name?.trim()) return "Full Name is required";
    if (!formData.address1?.trim()) return "Address Line 1 is required";
    if (!formData.city?.trim()) return "City is required";
    if (!formData.state?.trim()) return "State is required";
    if (!formData.zipCode?.trim()) return "ZIP Code is required";
    if (!formData.phone?.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone))
      return "Phone number must be 10 digits";
    return null;
  };

  // ---- Create ----
  const handleCreateAddress = async () => {
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }
    const err = validateRequired();
    if (err) {
      toast.error(err);
      return;
    }
    try {
      setSubmitting(true);
      await dispatch(createAddressAction(userId, formData));
      toast.success("Address created successfully!");
      resetForm();
      setIsAddingNew(false);
      await dispatch(getAddressesAction(userId));
    } catch (error: any) {
      toast.error(
        `Failed to save address: ${error?.message || "Unknown error"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Edit ----
  const handleEdit = (address: any) => {
    if (!address) {
      toast.error("Address not found");
      return;
    }
    setFormData({
      name: address.name ?? "",
      address1: address.address1 ?? "",
      address2: address.address2 ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      zipCode: address.zipCode ?? "",
      country: address.country ?? "India",
      phone: address.phone ?? "",
      isDefault: !!address.isDefault,
    });
    setEditingAddress(address);
    setIsAddingNew(true);
  };

  // ---- Update ----
  const handleUpdateAddress = async () => {
    if (!editingAddress) {
      toast.error("No address selected");
      return;
    }
    const err = validateRequired();
    if (err) {
      toast.error(err);
      return;
    }
    try {
      setSubmitting(true);
      await dispatch(updateAddressAction(editingAddress._id, formData));
      toast.success("Address updated successfully!");
      resetForm();
      setIsAddingNew(false);
      if (userId) await dispatch(getAddressesAction(userId));
    } catch (error: any) {
      toast.error(
        `Failed to update address: ${error?.message || "Unknown error"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Delete ----
  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      setSubmitting(true);
      await dispatch(deleteAddressAction(id));
      toast.success("Address deleted");
      if (userId) await dispatch(getAddressesAction(userId));
    } catch (err: any) {
      toast.error(`Failed to delete address: ${err?.message || "Unknown"}`);
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Navigation ----
  const goToPaymentPage = () => {
    if (!userId) {
      toast.error("Please login to proceed");
      return;
    }

    // Only check for size if it's a direct product purchase
    if (isDirectProductPurchase && !selectedSize && !selectsize) {
      toast.error("No size selected for the product");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }

    const selectedAddress = addressList.find(
      (addr) => addr._id === selectedAddressId
    );
    console.log("Proceeding to payment with:", {
      addressId: selectedAddressId,
      addressName: selectedAddress?.name,
      calculations: finalCalculations,
      isDirectPurchase: isDirectProductPurchase
    });

    // Build parameters for payment page
    const params: Record<string, string> = {
      itemTotal: String(finalCalculations.itemTotal),
      savings: String(finalCalculations.savings),
      billTotal: String(finalCalculations.billTotal),
      addressId: selectedAddressId,
    };

    // Add product-specific parameters if it's a direct purchase
    if (isDirectProductPurchase) {
      if (productId.length > 1) {
        params.ids = productId.join(",");
      } else {
        params.id = productId.join(",");
      }
      params.sizeId = selectedSize || selectsize || "";
      params.quantity = String(urlQuantity);
    }

    router.push(`/payment?${new URLSearchParams(params).toString()}`);
  };

  const goTocartPage = () => {
    router.push("/cart");
  };

  if (bootLoading) return <LoadingOverlay />;

  return (
    <>
      <Header />
      <section className="bg-[#f1f5f4]">
        <div
          className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
          style={{ backgroundColor: BG }}
        >
          {/* Top Header */}
          <div className="mb-6 sm:mb-8">
            <div
              className="text-2xl sm:text-3xl font-bold flex gap-4 items-center"
              style={{ color: ACCENT }}
            >
              <ArrowLeft
                onClick={goTocartPage}
                className="cursor-pointer shrink-0"
              />
              <span className="truncate">Shipping Addresses</span>
            </div>
          </div>

          {/* Add New Button */}
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-md text-white disabled:opacity-60"
              style={{ backgroundColor: ACCENT }}
              disabled={submitting}
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address List */}
            <div className="md:col-span-2 space-y-6">
              {isAddingNew && (
                <div className="p-4 sm:p-6 rounded-md border bg-white">
                  <h2
                    className="text-lg sm:text-xl font-semibold mb-4"
                    style={{ color: ACCENT }}
                  >
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name *", name: "name" },
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
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          name={name}
                          value={(formData as any)[name] ?? ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: ACCENT }}
                          autoComplete="off"
                          placeholder={label.replace("*", "").trim()}
                        />
                      </div>
                    ))}

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country ?? ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: ACCENT }}
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone ?? ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: ACCENT }}
                        placeholder="e.g. 9876543210"
                        autoComplete="tel"
                      />
                    </div>

                    {/* Default */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={!!formData.isDefault}
                          onChange={handleInputChange}
                          className="rounded border"
                          style={{ borderColor: ACCENT }}
                        />
                        Set as default address
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={
                        editingAddress
                          ? handleUpdateAddress
                          : handleCreateAddress
                      }
                      disabled={submitting}
                      className="px-4 py-2 text-white rounded-md disabled:opacity-60 flex items-center gap-2"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      {submitting
                        ? "Saving..."
                        : editingAddress
                        ? "Update Address"
                        : "Save Address"}
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingNew(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border rounded-md text-gray-700"
                      style={{ borderColor: ACCENT }}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address Cards */}
              <div className="space-y-4">
                {addressList.length > 0 ? (
                  addressList.map((addr: any) => (
                    <div
                      key={addr._id}
                      className={`p-4 rounded-md border shadow-sm bg-white cursor-pointer transition-all ${
                        selectedAddressId === addr._id
                          ? "ring-2 ring-[#535e51] border-[#535e51]"
                          : "hover:border-[#535e51]"
                      }`}
                      onClick={() => setSelectedAddressId(addr._id)}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === addr._id}
                          onChange={() => setSelectedAddressId(addr._id)}
                          className="mt-1 h-4 w-4 text-[#535e51] focus:ring-[#535e51]"
                        />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-lg font-medium">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{addr?.name}</span>
                            {addr?.isDefault && (
                              <span className="text-xs bg-[#e5eae9] px-2 py-1 rounded-full inline-flex items-center gap-1 text-[#3d4f4b]">
                                <Check className="w-3 h-3" />
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 break-words">
                            {[addr?.address1, addr?.address2]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          <p className="text-sm text-gray-600 break-words">
                            {[addr?.city, addr?.state, addr?.zipCode]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          {addr?.country && (
                            <p className="text-sm text-gray-600">
                              {addr.country}
                            </p>
                          )}
                          {addr?.phone && (
                            <p className="text-sm text-gray-600">
                              {addr.phone}
                            </p>
                          )}
                        </div>
                        <div className="flex items-start gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(addr);
                            }}
                            className="text-gray-600 hover:text-black p-2 rounded transition-colors"
                            aria-label="Edit address"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(addr._id, e);
                            }}
                            className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                            aria-label="Delete address"
                            title="Delete"
                            disabled={submitting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-10 text-gray-600">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p>No addresses yet. Start by adding one.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow border">
                <h4 className="text-lg text-[#535e51] font-bold mb-4">
                  Order Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#535e51]">Item Total</span>
                    <span className="font-medium text-[#535e51]">
                      ₹{finalCalculations.itemTotal.toFixed(2)}
                    </span>
                  </div>
                  {finalCalculations.savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#535e51]">You Saved</span>
                      <span className="font-medium text-green-600">
                        -₹{finalCalculations.savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg text-[#535e51] font-bold">
                        Bill Total
                      </span>
                      <span className="text-lg font-bold text-[#535e51]">
                        ₹{finalCalculations.billTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[#535e51] py-3 rounded-lg text-white font-medium transition-all hover:bg-[#454e47] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={goToPaymentPage}
                disabled={!selectedAddressId || submitting || finalCalculations.itemTotal === 0}
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}