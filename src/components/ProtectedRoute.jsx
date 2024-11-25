import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Check token in localStorage
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
