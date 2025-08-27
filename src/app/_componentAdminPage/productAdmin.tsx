"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

type Size = { size: string; _id?: string };

type Product = {
  _id?: string;
  name: string;
  heading: string;
  subheading: string;
  rating: number;
  menuId: string;
  subMenuId: string;
  price: string;
  description: string;
  imageUrl: string;
  sizes: Size[];
  isTrending: boolean;
  isMainpage: boolean;
};

type FormData = {
  name: string;
  heading: string;
  subheading: string;
  rating: string;
  menuId: string;
  subMenuId: string;
  price: string;
  description: string;
  imageUrl: string;
  sizes: Size[];
  isTrending: boolean;
  isMainpage: boolean;
};

export default function AdminProductDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      _id: "1",
      name: "Cotton T-Shirt",
      heading: "Men Round Neck Cotton T-Shirt",
      subheading: "Breathable and Lightweight",
      rating: 4.3,
      menuId: "menu1",
      subMenuId: "sub1",
      price: "1299",
      description: "Soft, breathable, and perfect for everyday wear.",
      imageUrl:
        "https://res.cloudinary.com/dzrhwm7j6/image/upload/v1755882281/kvo5qjc7btvc18hpk0d0.webp",
      sizes: [{ size: "S" }, { size: "M" }, { size: "L" }],
      isTrending: true,
      isMainpage: true,
    },
    {
      _id: "2",
      name: "Elegant Saree",
      heading: "Women Traditional Silk Saree",
      subheading: "Premium Quality Silk",
      rating: 4.7,
      menuId: "menu2",
      subMenuId: "sub2",
      price: "2499",
      description: "Beautiful traditional saree made with premium silk.",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300",
      sizes: [{ size: "Free Size" }],
      isTrending: false,
      isMainpage: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrending, setFilterTrending] = useState("");
  const [filterMainpage, setFilterMainpage] = useState("");

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    heading: "",
    subheading: "",
    rating: "0",
    menuId: "",
    subMenuId: "",
    price: "",
    description: "",
    imageUrl: "",
    sizes: [{ size: "" }],
    isTrending: false,
    isMainpage: false,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      heading: "",
      subheading: "",
      rating: "0",
      menuId: "",
      subMenuId: "",
      price: "",
      description: "",
      imageUrl: "",
      sizes: [{ size: "" }],
      isTrending: false,
      isMainpage: false,
    });
  };

  const handleAddProduct = () => {
    setShowAddForm(true);
    setEditingProduct(null);
    resetForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      heading: product.heading,
      subheading: product.subheading,
      rating: product.rating.toString(),
      menuId: product.menuId,
      subMenuId: product.subMenuId,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      sizes: product.sizes.length > 0 ? product.sizes : [{ size: "" }],
      isTrending: product.isTrending,
      isMainpage: product.isMainpage,
    });
    setShowAddForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p._id !== productId));
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.heading || !formData.price || !formData.menuId) {
      alert("Please fill in all required fields");
      return;
    }

    const productData: Product = {
      ...formData,
      rating: parseFloat(formData.rating),
      sizes: formData.sizes.filter((s) => s.size.trim() !== ""),
      _id: editingProduct ? editingProduct._id : `temp_${Date.now()}`,
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p._id === editingProduct._id ? productData : p)));
    } else {
      setProducts([...products, productData]);
    }

    setShowAddForm(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleFormChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((size, i) => (i === index ? { ...size, size: value } : size)),
    }));
  };

  const addSize = () => setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, { size: "" }] }));
  const removeSize = (index: number) =>
    setFormData((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrending = !filterTrending || product.isTrending.toString() === filterTrending;
    const matchesMainpage = !filterMainpage || product.isMainpage.toString() === filterMainpage;

    return matchesSearch && matchesTrending && matchesMainpage;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterTrending}
            onChange={(e) => setFilterTrending(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Trending</option>
            <option value="true">Trending</option>
            <option value="false">Not Trending</option>
          </select>
          <select
            value={filterMainpage}
            onChange={(e) => setFilterMainpage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Mainpage</option>
            <option value="true">Show on Mainpage</option>
            <option value="false">Not on Mainpage</option>
          </select>
          <div className="flex items-center text-sm text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            {filteredProducts.length} products found
          </div>
        </div>

        {/* Product Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Heading *</label>
                      <input
                        type="text"
                        value={formData.heading}
                        onChange={(e) => handleFormChange("heading", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Menu ID *</label>
                      <input
                        type="text"
                        value={formData.menuId}
                        onChange={(e) => handleFormChange("menuId", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub Menu ID</label>
                      <input
                        type="text"
                        value={formData.subMenuId}
                        onChange={(e) => handleFormChange("subMenuId", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleFormChange("imageUrl", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 mt-2 object-cover rounded" />
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange("description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                    {formData.sizes.map((size, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <select
                          value={size.size}
                          onChange={(e) => handleSizeChange(idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Size</option>
                          {availableSizes.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {formData.sizes.length > 1 && (
                          <button type="button" onClick={() => removeSize(idx)} className="text-red-500 hover:text-red-700">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addSize} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                      <Plus className="w-4 h-4" /> Add Size
                    </button>
                  </div>

                  {/* Flags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isTrending}
                        onChange={(e) => handleFormChange("isTrending", e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">Is Trending</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isMainpage}
                        onChange={(e) => handleFormChange("isMainpage", e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">Show on Main Page</label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-medium">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Heading</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Sizes</th>
                <th className="px-4 py-2">Trending</th>
                <th className="px-4 py-2">Mainpage</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="px-4 py-2">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium">{product.name}</td>
                    <td className="px-4 py-2">{product.heading}</td>
                    <td className="px-4 py-2 font-semibold">₹{product.price}</td>
                    <td className="px-4 py-2 flex items-center gap-1 text-yellow-500">★ {product.rating}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-1">
                      {product.sizes.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                          {s.size}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">+{product.sizes.length - 3}</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded ${product.isTrending ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {product.isTrending ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded ${product.isMainpage ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                        {product.isMainpage ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded flex items-center"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id!)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
