import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import { RiDeleteBin2Line } from "react-icons/ri";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import { MdOutlinePageview } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Blogs = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs");
      return data;
    },
    enabled: !loading && !!user,
  });

  console.log(blogs);

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/blog/${id}`);
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "Your blog has been deleted successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/blog/${id}`, {
        isActive: true,
      });
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Blog has been approved successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
      <div className="m-2">
        <TableHeaderText text={"All Blogs"} count={blogs.length} />

        {isLoading || loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle ">
                <div className="overflow-hidden border border-slate-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100 text-cyan-600 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          <span>Title</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          <span>Author Email</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right "
                        >
                          <span>Image</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right "
                        >
                          <span>Likes Count</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          Delete
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap"
                        >
                          Approve
                        </th>

                        <th className="px-4 py-3.5 text-sm  text-center rtl:text-right whitespace-nowrap">
                          View Blog
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {blogs.map((blog) => (
                        <tr key={blog?._id}>
                          <td className="px-4 py-4 text-sm text-gray-500  w-[180px] text-center">
                            {blog?.blog_title}
                          </td>

                          <td className="px-4  py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                            {blog?.author?.email}
                          </td>

                          <td className="px-4  py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                            <img
                              src={blog?.blog_image}
                              alt={blog?.blog_title}
                              width={100}
                              height={100}
                            />
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  text-center text-pretty">
                            {blog?.like}
                          </td>

                          <td className="px-4 py-4 text-sm  whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <button
                                onClick={() => handleDelete(blog?._id)}
                                className="btn btn-sm hover:bg-red-100/80 text-red-500"
                              >
                                <RiDeleteBin2Line className="text-xl " />
                              </button>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm  whitespace-nowrap">
                            {blog?.isActive ? (
                              <div className="text-center">
                                Already Approved
                              </div>
                            ) : (
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={() => handleApprove(blog?._id)}
                                  className="btn btn-sm hover:bg-red-100/80 text-green-500"
                                >
                                  Approve
                                </button>
                              </div>
                            )}
                          </td>

                          {/* View meal btn */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <Link to={`/blogDetails/${blog?._id}`}>
                              <div className="flex justify-center  items-center">
                                <button className="btn hover:bg-cyan-100/40  px-2 btn-sm">
                                  <MdOutlinePageview className="text-3xl text-cyan-500" />
                                </button>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
