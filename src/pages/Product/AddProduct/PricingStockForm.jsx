export default function PricingStockForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Pricing & Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.price && (
            <p className="text-red-500 mt-1 text-sm">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount %
          </label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.1"
            placeholder="0"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.discountPercentage}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.stock && (
            <p className="text-red-500 mt-1 text-sm">{errors.stock}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Order Quantity
          </label>
          <input
            type="number"
            name="minimumOrderQuantity"
            value={formData.minimumOrderQuantity}
            onChange={handleChange}
            min="1"
            placeholder="1"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Status
          </label>
          <select
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-order">Pre-order</option>
            <option value="Backorder">Backorder</option>
          </select>
        </div>
      </div>
    </div>
  );
}
