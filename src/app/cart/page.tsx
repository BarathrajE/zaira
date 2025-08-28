/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";
import Header from "@/header/pages";
import Footer from "@/footer/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/action/cart/getCart";
import { RootState } from "../redux/store";
import { updateCartAction } from "../redux/action/cart/putcart";

interface CartProduct {
  _id: string;
  productId: {
    _id: string;
    name: string;
    heading?: string;
    price?: number;
    imageUrl?: string;
    sizes?: Array<{ _id: string; size: string }>;
  };
  quantity: number;
  color?: string;
  size?: string;
}

const CheckoutComponent = () => {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<string[]>([]);

  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootState) => state.login.login.data.user?._id
  );
  const getcartdata = useSelector((state: RootState) => state.getcart.cart);

  const productsPayload: { productId: string; quantity: number }[] =
    getcartdata?.items?.map((item: CartProduct) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    })) || [];

  useEffect(() => {
    if (getcartdata?.items) {
      const initialSizes = getcartdata.items.reduce((acc: any, item: any) => {
        acc[item.productId._id] = item.size || "";
        return acc;
      }, {} as Record<string, string>);
      setSelectedSizes(initialSizes);
    }
  }, [getcartdata?.items]);

  // Fetch cart on page load if userId exists
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId) as any);
  }, [dispatch, userId]);

  // Simulate page load overlay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  if (loading) return <LoadingOverlay />;

  // Calculate total price locally
  const calculateTotalPrice = (items: CartProduct[]) => {
    return items.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  // Update quantity handler
  const handleQtyChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const newQty = parseInt(e.target.value);
    if (newQty < 1) return;

    if (userId && getcartdata?.items) {
      setUpdatingItems((prev) => [...prev, productId]);
      try {
        const updatedItems = getcartdata.items.map((item: CartProduct) => {
          if (item.productId._id === productId) {
            return {
              productId: item.productId._id,
              quantity: newQty,
              color: item.color,
              size: item.size,
            };
          }
          return {
            productId: item.productId._id,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          };
        });

        await dispatch(updateCartAction(userId, updatedItems) as any);
        await dispatch(fetchCart(userId) as any);
      } catch (error) {
        console.error("Error updating quantity:", error);
      } finally {
        setUpdatingItems((prev) => prev.filter((id) => id !== productId));
      }
    }
  };

  // Remove item handler
  const handleRemoveItem = async (productId: string) => {
    if (!userId || !productId || !getcartdata?.items) return;

    setUpdatingItems((prev) => [...prev, productId]);
    try {
      const filteredItems = getcartdata.items.filter(
        (item: CartProduct) => item.productId._id !== productId
      );

      const updatedItems = filteredItems.map((item: CartProduct) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));

      await dispatch(updateCartAction(userId, updatedItems) as any);
      await dispatch(fetchCart(userId) as any);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    } finally {
      setUpdatingItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Navigate to address page
  const goToAddressPage = () => {
    if (Array.isArray(productsPayload) && productsPayload.length > 0) {
      const ids = productsPayload
        .map((p) => encodeURIComponent(p.productId))
        .join(",");

      const sizes = Object.entries(selectedSizes)
        .map(([size]) => `${encodeURIComponent(size)}`)
        .join("|");

      // Extract quantity mapping (productId:quantity)
      const quantityParam = productsPayload
        .map((p) => `${encodeURIComponent(p.productId)}:${p.quantity}`)
        .join("|");

      router.push(
        `/address?ids=${ids}&sizes=${sizes}&quantity=${quantityParam}`
      );
    } else {
      router.push("/address");
    }
  };

  // Calculate current total price
  const currentTotalPrice =
    getcartdata?.items?.length > 0
      ? calculateTotalPrice(getcartdata.items)
      : getcartdata?.totalPrice || 0;

  return (
    <section className="bg-[#f1f5f4] min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {getcartdata?.items?.length > 0 ? (
            getcartdata.items.map((item: CartProduct, index: number) => {
              const isUpdating = updatingItems.includes(item.productId._id);
              return (
                <div
                  key={item.productId._id || index}
                  className="p-4 bg-white rounded-lg shadow relative"
                >
                  {isUpdating && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                      <Loader2 className="w-6 h-6 animate-spin text-[#535e51]" />
                    </div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="w-40 h-40 rounded-lg overflow-hidden">
                      <Image
                        src={item.productId?.imageUrl || "/placeholder.png"}
                        alt={item.productId?.name || "Product Image"}
                        width={500}
                        height={400}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between flex-wrap gap-4">
                        {/* Product Info */}
                        <div className="flex flex-col gap-2">
                          <h3 className="text-xl font-semibold text-[#535e51]">
                            {item.productId?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Colour: <strong>{item.color || "N/A"}</strong>
                          </p>
                          <div className="mt-1">
                            <span className="text-lg font-bold text-[#535e51]">
                              ₹{item.productId?.price?.toLocaleString()}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-sm text-gray-500 ml-2">
                                (₹
                                {(
                                  (item.productId?.price || 0) * item.quantity
                                ).toLocaleString()}{" "}
                                total)
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Controls: Size, Qty, Remove */}
                        <div className="flex items-start gap-4">
                          <div>
                            <label
                              htmlFor={`size-${index}`}
                              className="block text-sm text-gray-600 mb-1"
                            >
                              Size
                            </label>
                            <select
                              id={`size-${index}`}
                              className="rounded-md px-2 py-1 text-sm border border-gray-300"
                              value={
                                selectedSizes[item.productId._id] ||
                                item.size ||
                                ""
                              }
                              onChange={(e) =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.productId._id]: e.target.value,
                                }))
                              }
                              disabled={isUpdating}
                            >
                              {item.productId?.sizes?.map((s) => (
                                <option key={s._id} value={s.size}>
                                  {s.size}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor={`qty-${index}`}
                              className="block text-sm text-gray-600 mb-1"
                            >
                              Qty
                            </label>
                            <input
                              id={`qty-${index}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              className="w-16 rounded-md px-2 py-1 text-sm border border-gray-300"
                              onChange={(e) =>
                                handleQtyChange(e, item.productId._id)
                              }
                              disabled={isUpdating}
                            />
                          </div>
                          <button
                            className={`text-red-500 hover:text-red-700 mt-6 ${
                              isUpdating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={() => handleRemoveItem(item.productId._id)}
                            disabled={isUpdating}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h4 className="text-lg text-[#535e51] font-bold mb-4">
              Order Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#535e51]">Item Total</span>
                <span className="font-medium text-[#535e51]">
                  ₹{currentTotalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({getcartdata?.items?.length || 0})</span>
                <span>
                  {getcartdata?.items?.reduce(
                    (total: number, item: CartProduct) =>
                      total + (item.quantity || 1),
                    0
                  )}{" "}
                  units
                </span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg text-[#535e51] font-bold">
                    Bill Total
                  </span>
                  <span className="text-lg font-bold text-[#535e51]">
                    ₹{currentTotalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              className={`w-full py-3 rounded-lg text-white mt-4 ${
                getcartdata?.items?.length > 0
                  ? "bg-[#535e51] hover:bg-[#434d41]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={goToAddressPage}
              disabled={!getcartdata?.items?.length}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CheckoutComponent;
