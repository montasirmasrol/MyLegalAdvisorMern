import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useLawyers = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: lawyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-lawyers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/lawyers");
      if (res.status === 204) {
        return []; // Return empty array if no content
      }
      return res.data;
    },
    enabled: true, // Always fetch regardless of filters
  });

  return [lawyers, isLoading, refetch];
};

export default useLawyers;
