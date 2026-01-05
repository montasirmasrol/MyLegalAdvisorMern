import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: [user?.email, "profile"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      console.log("User Profile:", data);
      return data;
    },
    enabled: !!user?.email,
  });

  return { profile, isLoading };
};

export default useProfile;
