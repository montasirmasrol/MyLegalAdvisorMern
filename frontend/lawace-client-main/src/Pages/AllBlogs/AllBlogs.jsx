import { useState } from "react";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import EmptyStateText from "../../Components/Common/EmptyStateText";
import PageHeader from "../../Components/Common/PageHeader";
import { CiSearch } from "react-icons/ci";
import { ImSpinner3 } from "react-icons/im";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import BlogModal from "../../Components/Modals/BlogModal";
import imageUpload from "../../Utils/ImageUpload";
import useBlogs from "../../Hooks/useBlogs";
import Swal from "sweetalert2";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [_allBlogs, isLoading, refetch] = useBlogs(search);
  const allBlogs = _allBlogs?.filter(e => e.isActive);
  console.log("All Blogs:", allBlogs);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearch(searchValue);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const blog_title = form.title.value;
    const image = form.image.files[0];
    const description = form.description.value;

    if (description.length > 1000)
      return toast.error("Your character limit exceeds");

    let blog_image = "";
    if (image) {
      blog_image = await imageUpload(image);
    }

    const date = new Date(Date.now()).toLocaleDateString();

    console.table({ blog_title, blog_image, description });

    const blogInfo = {
      author: {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      },
      blog_title,
      blog_image,
      description,
      like: 0,
      date,
    };

    console.log(blogInfo);

    try {
      const { data } = await axiosSecure.post("/blog", blogInfo);
      console.log(data);
      if (data.acknowledged) {
        Swal.fire({
          title: "Blog Posted!",
          text: "You have posted blog successfully.",
          icon: "success",
        });
        document.getElementById("blog_modal").close();
        form.reset();
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClose = () => {
    document.getElementById("blog_modal").close();
  };

  return (
    <div className="mb-32">
      <PageHeader title={"All Blogs"} track={"Home > All Blogs"} />
      <div className="w-[80%] mx-auto py-12 space-y-16">
        <div className="flex justify-between items-center">
          {/* Create Blog */}
          <button
            onClick={() => document.getElementById("blog_modal").showModal()}
            className="btn hover:bg-[#a57246] btn-outline px-10 text-lg transition-all duration-500"
          >
            Create Blog <span className="text-xl">+</span>
          </button>

          {/*Search Field  */}
          <form onSubmit={handleSearch}>
            <div className="flex justify-center items-center w-[400px] mx-auto">
              <input
                type="text"
                placeholder="Search blog here..."
                name="search"
                className="block w-full rounded-r-none rtl:rounded-r-lg rtl:rounded-l-none  rounded-lg border bg-white px-5 lg:py-2.5 py-1.5 focus:outline-none focus:ring focus:border-[#d3ac8a] focus:ring-[#faddc4] focus:ring-opacity-40"
              />
              <button
                type="submit"
                className="lg:py-3 py-2  px-3 text-white bg-[#d18a4d]  border border-r-0 rtl:rounded-r-lg  rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-r-lg font-bold"
              >
                {isLoading ? (
                  <ImSpinner3 className="text-2xl animate-spin" />
                ) : (
                  <CiSearch className="text-2xl" />
                )}
              </button>
            </div>
          </form>
        </div>

        {isLoading ? (
          <div>
            <LoadingSpinner smallHeight={true} />
          </div>
        ) : allBlogs.length === 0 ? (
          <EmptyStateText text={"You have to try more..."} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {allBlogs.map((blog) => (
              <BlogCard key={blog?._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
      <BlogModal
        handleBlogSubmit={handleBlogSubmit}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AllBlogs;
