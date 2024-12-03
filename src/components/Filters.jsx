import React from "react";

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitize the slug field
    const sanitizedValue = name === "slug" ? value.replace(/\s+/g, "-") : value;

    setFilters((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric input or empty values
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? "" : parseInt(value, 10),
    }));
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`fixed md:relative top-0 left-0 z-10 bg-gray-100 p-4 h-full w-2/3 md:w-1/3 md:flex md:flex-col transition-transform duration-300 ${
        showFilters ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Close button for smaller screens */}
      <button
        onClick={() => setShowFilters(false)}
        className="md:hidden bg-red-500 px-3 py-1 text-white rounded-md self-end mb-4"
      >
        Close
      </button>

      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Filter Fields */}
      <div className="space-y-4">
        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug (Search Query)
          </label>
          <input
            type="text"
            name="slug"
            value={filters.slug?.replace(/-/g, " ")}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "slug",
                  value: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* User ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={filters.userId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            value={filters.userName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Amount Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount Range
          </label>
          <div className="flex gap-2">
            <input
              type="text" 
              name="minAmount"
              value={filters.minAmount || ""}
              onChange={handleAmountChange}
              placeholder="Min Amount"
              inputMode="numeric" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text" 
              name="maxAmount"
              value={filters.maxAmount || ""}
              onChange={handleAmountChange}
              placeholder="Max Amount"
              inputMode="numeric" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Sorting */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort by Amount
          </label>
          <select
            name="sortAmount"
            value={filters.sortAmount || ""}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">None</option>
            <option value="0">Ascending</option>
            <option value="1">Descending</option>
          </select>
        </div>

        
      </div>
    </div>
  );
};

export default Filters;
