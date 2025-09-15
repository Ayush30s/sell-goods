import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { convertToBase64 } from "../../utils/FileToBase64";

import BasicInfoForm from "./AddProduct/BasicInfoForm";
import PricingStockForm from "./AddProduct/PricingStockForm";
import ShippingReturnsForm from "./AddProduct/ShippingReturnsForm";
import MediaForm from "./AddProduct/MediaForm";
import Navbar from "../../components/Navbar";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    brand: "",
    condition: "",
    price: "",
    discountPercentage: "",
    discount: "",
    stock: "",
    rating: "",
    description: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
    minimumOrderQuantity: "",
    weight: "",
    dimensions: { width: "", height: "", depth: "" },
    sku: "",
    meta: { barcode: "", qrCode: "" },
    freeShipping: false,
    returnable: false,
    returnDays: "",
    active: true,
    thumbnail: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subcategory)
      newErrors.subcategory = "Subcategory is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand name is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100)
      newErrors.discountPercentage = "Discount % must be 0-100";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Stock must be 0 or greater";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (
      !formData.thumbnail.trim() ||
      !/^https?:\/\/.+\..+/.test(formData.thumbnail)
    )
      newErrors.thumbnail = "Valid thumbnail URL required";
    if (
      formData.returnable &&
      (!formData.returnDays || formData.returnDays <= 0)
    )
      newErrors.returnDays = "Enter valid return days";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith("dimensions.")) {
      const dimKey = name.split(".")[1];
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [dimKey]: value },
      });
    } else if (name.startsWith("meta.")) {
      const metaKey = name.split(".")[1];
      setFormData({
        ...formData,
        meta: { ...formData.meta, [metaKey]: value },
      });
    } else if (name === "images") {
      setFormData({ ...formData, images: files });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix errors before submitting!");
      return;
    }

    try {
      const updatedFormData = { ...formData };

      // ✅ Convert thumbnail if it's a File
      if (formData.thumbnail instanceof File) {
        updatedFormData.thumbnail = await convertToBase64(formData.thumbnail);
      }

      // ✅ Convert images array
      if (Array.isArray(formData.images) && formData.images.length > 0) {
        const base64Images = await Promise.all(
          formData.images.map(async (img) =>
            img instanceof File ? await convertToBase64(img) : img
          )
        );
        updatedFormData.images = base64Images;
      }

      console.log("Product Data (Base64 Images):", updatedFormData);
      toast.success("Product submitted successfully!");

      // Reset form
      setFormData({
        category: "",
        subcategory: "",
        title: "",
        brand: "",
        condition: "",
        price: "",
        discountPercentage: "",
        discount: "",
        stock: "",
        rating: "",
        description: "",
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "In Stock",
        returnPolicy: "",
        minimumOrderQuantity: "",
        weight: "",
        dimensions: { width: "", height: "", depth: "" },
        sku: "",
        meta: { barcode: "", qrCode: "" },
        freeShipping: false,
        returnable: false,
        returnDays: "",
        active: true,
        thumbnail: "",
        images: [],
      });

      setErrors({});
      setActiveTab("basic");
    } catch (err) {
      console.error("Image conversion failed:", err);
      toast.error("Error while processing images!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative border rounded-sm overflow-hidden">
            {/* Header */}
            <div className="relative bg-blue-600 px-8 py-6 text-white">
              <h1 className="text-2xl font-bold">Add New Product</h1>
              <p className="text-blue-100">
                Fill in the details below to add a new product to your store
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex px-8 -mb-px">
                {["basic", "pricing", "shipping", "media"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "basic" && "Basic Info"}
                    {tab === "pricing" && "Pricing & Stock"}
                    {tab === "shipping" && "Shipping & Returns"}
                    {tab === "media" && "Media"}
                  </button>
                ))}
              </nav>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8">
              {activeTab === "basic" && (
                <BasicInfoForm
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}
              {activeTab === "pricing" && (
                <PricingStockForm
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}
              {activeTab === "shipping" && (
                <ShippingReturnsForm
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}
              {activeTab === "media" && (
                <MediaForm
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    const tabs = ["basic", "pricing", "shipping", "media"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>

                {activeTab !== "media" ? (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ["basic", "pricing", "shipping", "media"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1)
                        setActiveTab(tabs[currentIndex + 1]);
                    }}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-green-600 text-white rounded-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Submit Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
