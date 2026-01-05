import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useBlogs from "../../Hooks/useBlogs";
import toast from "react-hot-toast";
import PageHeader from "../../Components/Common/PageHeader";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import BlogCard from "../AllBlogs/BlogCard";
import useLawyers from "../../Hooks/useLawyers";
import LawyerCard from "./LawyerCard";

const ExpertLawyers = () => {
  const [lawyers, isLoading, refetch] = useLawyers();
  console.log(lawyers);

  return (
    <div className="mb-32 ">
      <PageHeader title={"Expert Lawyers"} track={"Home > Expert Lawyers"} />
      <div className="w-[70%] mx-auto py-12 mt-16 space-y-16">
        {isLoading ? (
          <div>
            <LoadingSpinner smallHeight={true} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer?._id} lawyer={lawyer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertLawyers;
