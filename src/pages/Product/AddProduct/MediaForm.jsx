export default function MediaForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
        Media
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail URL
        </label>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded-sm px-4 py-3"
        />
        {errors.thumbnail && (
          <p className="text-red-500 mt-1 text-sm">{errors.thumbnail}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-sm">
          <div className="space-y-1 text-center">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload images</span>
              <input
                type="file"
                name="images"
                onChange={handleChange}
                multiple
                className="sr-only"
              />
            </label>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
