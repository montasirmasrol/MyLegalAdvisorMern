import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useLawyer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lawyer = {}, isLoading } = useQuery({
    queryKey: ["lawyer-profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/lawyer/${user?.email}`);
      return data;
    },
    enabled: !loading && !!user?.email,
  });

  //   Fetch user info using logged in user email
  return { lawyer, isLoading };
};

export default useLawyer;
