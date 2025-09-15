export default function ShippingReturnsForm({
  formData,
  handleChange,
  errors,
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Shipping & Returns
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions (cm)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              name="dimensions.width"
              value={formData.dimensions.width}
              onChange={handleChange}
              placeholder="Width"
              className="w-full border border-gray-300 rounded-sm px-4 py-3"
            />
            <input
              type="number"
              name="dimensions.height"
              value={formData.dimensions.height}
              onChange={handleChange}
              placeholder="Height"
              className="w-full border border-gray-300 rounded-sm px-4 py-3"
            />
            <input
              type="number"
              name="dimensions.depth"
              value={formData.dimensions.depth}
              onChange={handleChange}
              placeholder="Depth"
              className="w-full border border-gray-300 rounded-sm px-4 py-3"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="freeShipping"
            checked={formData.freeShipping}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Free Shipping
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="returnable"
            checked={formData.returnable}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Returnable</label>
        </div>
      </div>

      {formData.returnable && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Return Policy (Days)
          </label>
          <input
            type="number"
            name="returnDays"
            value={formData.returnDays}
            onChange={handleChange}
            min="0"
            placeholder="30"
            className="w-full border border-gray-300 rounded-sm px-4 py-3"
          />
          {errors.returnDays && (
            <p className="text-red-500 mt-1 text-sm">{errors.returnDays}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Information
        </label>
        <textarea
          name="shippingInformation"
          value={formData.shippingInformation}
          onChange={handleChange}
          rows="3"
          placeholder="Shipping details and timelines"
          className="w-full border border-gray-300 rounded-sm px-4 py-3"
        />
      </div>
    </div>
  );
}
