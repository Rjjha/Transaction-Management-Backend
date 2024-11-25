import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Filters from "../components/Filters";
import TableSection from "../components/TableSection";
import api from "../services/api"; // Axios instance

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    slug: "",
    userId: "",
    userName: "",
    startDate: "",
    endDate: "",
    minAmount: 0,
    maxAmount: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async () => {
    try {
      const queryParams = {
        page: currentPage,
        userId: filters.userId,
        userName: filters.userName,
        startDate: filters.startDate,
        endDate: filters.endDate,
        sortAmount: filters.sortAmount, // Sorting by amount
        sortDate: filters.sortDate, // Sorting by date
      };

      const bodyParams = {
        description: filters.slug,
        minAmount: filters.minAmount,
        maxAmount: filters.maxAmount,
      };

      // Combine GET query parameters and POST body for the request
      const response = await api.post(`/transaction/search`, bodyParams, {
        params: queryParams,
      });

      // Update state with response data
      setTransactions(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch transactions when `filters` or `currentPage` change
  useEffect(() => {
    fetchTransactions();
    console.log(filters);
  }, [currentPage, filters]);

  return (
    <div>
      {/* Navbar */}
      <DashboardNavbar />

      <div className="flex flex-1">
        {/* Filters Section */}
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Table Section */}
        <TableSection
          transactions={transactions}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </div>
    </div>
  );
};

export default Dashboard;
