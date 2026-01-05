import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Common/LoadingSpinner";
import useRole from "../Hooks/useRole";
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { user, loading } = useAuth();

  if (isLoading || loading) return <LoadingSpinner />;
  if (user && role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
