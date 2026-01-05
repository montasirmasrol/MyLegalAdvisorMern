import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Common/LoadingSpinner";
import useRole from "../Hooks/useRole";

const LawyerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { user, loading } = useAuth();

  if (isLoading || loading) return <LoadingSpinner />;
  if (user && role == "lawyer") return children;
  return <Navigate to="/dashboard" />;
};

export default LawyerRoute;

LawyerRoute.propTypes = {
  children: PropTypes.element,
};
