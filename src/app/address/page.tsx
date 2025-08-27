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
  const productId = useMemo(
    () => (idsParam ? idsParam.split(",") : []),
    [idsParam]
  );

  // Ref to track if the API call has been made for the current productId
  const hasFetchedProduct = useRef(false);

  // ---- selectors ----
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

  // ---- totals ----
  const itemTotal =
    cart?.items?.reduce((total: number, item: any) => {
      const price = Number(item?.productId?.price) || 0;
      const quantity = item?.quantity || 1;
      return total + price * quantity;
    }, 0) || 0;
  const savings =
    cart?.items?.reduce((total: number, item: any) => {
      const originalPrice =
        Number(item?.productId?.originalPrice) ||
        Number(item?.productId?.price) ||
        0;
      const price = Number(item?.productId?.price) || 0;
      const quantity = item?.quantity || 1;
      return total + (originalPrice - price) * quantity;
    }, 0) || 0;
  const billTotal = itemTotal - savings;

  // ---- product totals ----
  const productTotal = productData?.price || 0;
  const productOriginal = productData?.originalPrice || productData?.price || 0;
  const productSaving = productOriginal - productTotal;
  const productBillTotal = productTotal;

  // ---- final totals based on page ----
  const finalItemTotal = productId.length > 0 ? productTotal : itemTotal;
  const finalSavings = productId.length > 0 ? productSaving : savings;
  const finalBillTotal = productId.length > 0 ? productBillTotal : billTotal;

  // ---- effects ----
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (productId.length > 0) {
      productId.forEach((id) => {
        dispatch(allProductGetAction(id) as any); // Call for each ID
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

  // ---- form handlers ----
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
    return null;
  };

  // ---- create ----
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

  // ---- edit ----
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

  // ---- update ----
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

  // ---- delete ----
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

  // ---- navigation ----
  const goTocartPage = () => router.push("/cart");

  const goToPaymentPage = () => {
    const query = new URLSearchParams({
      itemTotal: String(finalItemTotal),
      savings: String(finalSavings),
      billTotal: String(finalBillTotal),
      ...(productId.length > 0 && { id: productId.join(",") }),
    }).toString();
    router.push(`/payment?${query}`);
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
          {/* top header */}
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

          {/* add new */}
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

          {/* main grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone ?? ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: ACCENT }}
                        placeholder="e.g. +91 98765 43210"
                        autoComplete="tel"
                      />
                    </div>
                    {/* default */}
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
                  {/* actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={
                        editingAddress
                          ? handleUpdateAddress
                          : handleCreateAddress
                      }
                      disabled={submitting}
                      className="px-4 py-2 text-white rounded-md disabled:opacity-60"
                      style={{ backgroundColor: ACCENT }}
                    >
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
              <div className="space-y-4">
                {addressList.length > 0 ? (
                  addressList.map((addr: any) => (
                    <div
                      key={addr._id}
                      className="p-4 rounded-md border shadow-sm bg-white"
                      style={{ borderColor: ACCENT }}
                    >
                      <div className="flex justify-between gap-4">
                        <div className="min-w-0">
                          <div
                            className="flex flex-wrap items-center gap-2 text-lg font-medium"
                            style={{ color: ACCENT }}
                          >
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
                            onClick={() => handleEdit(addr)}
                            className="text-gray-600 hover:text-black p-2 rounded"
                            aria-label="Edit address"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(addr._id, e)}
                            className="text-red-500 hover:text-red-700 p-2 rounded"
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
                    No addresses yet. Start by adding one.
                  </div>
                )}
              </div>
            </div>

            {/* order summary */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg shadow">
                <h4 className="text-lg text-[#535e51] font-bold mb-4">
                  Order Summary
                </h4>
                <div className="flex justify-between">
                  <span className="text-[#535e51]">Item Total</span>
                  <span className="font-medium text-[#535e51]">
                    ₹{finalItemTotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#535e51]">You Saved</span>
                  <span className="font-medium text-green-600">
                    -₹{finalSavings}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg text-[#535e51] font-bold">
                      Bill Total
                    </span>
                    <span className="text-lg font-bold text-[#535e51]">
                      ₹{finalBillTotal}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[#535e51] py-3 rounded-lg text-white cursor-pointer disabled:opacity-60"
                onClick={goToPaymentPage}
                disabled={submitting}
              >
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
