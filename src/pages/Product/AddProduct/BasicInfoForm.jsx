import { categories } from "../../../utils/Rawdata";

export default function BasicInfoForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory
          </label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            disabled={!formData.category}
            className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select Subcategory</option>
            {formData.category &&
              categories
                .find((cat) => cat.name === formData.category)
                .subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>
          {errors.subcategory && (
            <p className="text-red-500 mt-1 text-sm">{errors.subcategory}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.brand && (
            <p className="text-red-500 mt-1 text-sm">{errors.brand}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Product description"
          className="w-full border border-gray-300 rounded-sm px-4 py-3"
        />
        {errors.description && (
          <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
          {errors.condition && (
            <p className="text-red-500 mt-1 text-sm">{errors.condition}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Product SKU"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}
