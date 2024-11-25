import React from "react";

const TableSection = ({
  transactions,
  currentPage,
  totalPages,
  setCurrentPage,
  showFilters,
  setShowFilters,
}) => {
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // console.log("afj")
    }
  };

  return (
    <div className="flex-1 bg-white p-4 lg:p-8">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* Open Filters Button for Smaller Screens */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden bg-blue-500 px-4 py-2 rounded-md text-sm mb-4"
      >
        Filters
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2">User id</th>
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {txn.transactionID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {txn.userId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {txn.userName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {txn.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {txn.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(txn.dateTime).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange("next")}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableSection;
