import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Admin";
  const [cronEnabled, setCronEnabled] = useState(
    localStorage.getItem("cronEnabled") === "true"
  );

  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let intervalId;

    const checkCronStatus = async () => {
      try {
        const cronEndpoint = "program/status";
        const cronStatus = await api.get(cronEndpoint);
        const isRunning = cronStatus.data.isRunning;

        setCronEnabled(isRunning);
        localStorage.setItem("cronEnabled", isRunning);
      } catch (error) {
        console.error("Error checking Cron job status:", error.message);
      }
    };

    if (cronEnabled) {
      intervalId = setInterval(checkCronStatus, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cronEnabled]);

  // Handle Cron Toggle
  const handleCronToggle = async () => {
    const newState = !cronEnabled;
    try {
      const response = await api.get("/program", {
        params: { program: newState ? 1 : 0 },
      });

      if (response.status !== 200) {
        console.error("Unexpected response:", response);
        throw new Error("Server returned an unexpected status");
      }

      setCronEnabled(newState);
      localStorage.setItem("cronEnabled", newState);
    } catch (error) {
      console.error(
        "Error toggling Cron job:",
        error.response?.data || error.message
      );
      alert("Failed to update Cron job state. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("cronEnabled");
    navigate("/login", { replace: true });
  };

  // Handle Report Download
  const handleDownloadReport = async () => {
    try {
      const response = await api.get(`/transaction/report`, {
        params: {
          dateTimeStart: startDate,
          dateTimeEnd: endDate,
        },
      });

      if (response.data?.success && response.data.report?.transactions) {
        const transactions = response.data.report.transactions;

        const csvRows = [
          ["Transaction ID", "Amount", "Description", "Date & Time"],
          ...transactions.map((txn) => [
            txn.transactionID,
            txn.amount,
            txn.description,
            new Date(txn.dateTime).toLocaleString(),
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvRows], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setShowPopup(false);
        setStartDate("");
        setEndDate("");
      } else {
        alert("No transactions found for the selected date range.");
      }
    } catch (error) {
      console.error(
        "Error downloading report:",
        error.response?.data || error.message
      );
      alert("Failed to download the report. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md">
      {/* Title */}
      <h1 className="text-lg font-bold">Transactions Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Cron Job Toggle */}
        <div className="flex items-center gap-2">
          <label htmlFor="cron-toggle" className="text-sm">
            Cron Job:
          </label>
          <button
            id="cron-toggle"
            className={`px-4 py-2 rounded-lg text-sm ${
              cronEnabled
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={handleCronToggle}
          >
            {cronEnabled ? "Turn off" : "Turn on"}
          </button>
        </div>

        {/* Generate Report Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          onClick={() => setShowPopup(true)}
        >
          Generate Report
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <span className="text-sm">{userName}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4 text-gray-600">
              Download Report
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date:
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date:
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleDownloadReport}
                disabled={!startDate || !endDate}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
