import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageHeader from "../../Components/Common/PageHeader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegCalendarAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
// import LoadingSpinner from "./LoadingSpinner";
// import { AiOutlineLike } from "react-icons/ai";
// import { IoStarOutline } from "react-icons/io5";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import useAuth from "../../Hooks/useAuth";
// import ReviewModal from "../Modals/ReviewModal";
// import useProfile from "../../Hooks/useProfile";
// import useRole from "../../Hooks/useRole";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [liked, setLiked] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const [liked, setLiked] = useState(false);
  // const { profile } = useProfile();
  // console.log(profile);
  // const [role] = useRole();

  // fetch blog info by id//
  const {
    data: blog = {},
    isLoading: isBlogLoading,
    refetch: refetchBlog,
  } = useQuery({
    queryKey: ["blog-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/blog/${id}`);
      return data;
    },
    enabled: !!id,
  });

  // Fetch all comments of users //
  const {
    data: comments = [],
    isLoading: isCommentLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["all-comments", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments/${id}`);
      return data;
    },
    enabled: !!id,
  });

  console.log("Comments", comments);

  const { _id, author, blog_title, blog_image, description, date, like } = blog;
  console.log(blog);

  // const {
  //   _id,
  //   title,
  //   post_time,
  //   image,
  //   price,
  //   category,
  //   rating,
  //   description,
  //   likes,
  //   reviews,
  //   ingredients,
  //   admin,
  // } = mealInfo;
  // // console.log(mealInfo);

  // const time = new Date(post_time).toLocaleTimeString();
  // const date = new Date(post_time).toLocaleDateString();
  // // console.log(time, date);

  // // Reviews Data fetching  for specific meal

  // const {
  //   data: allReviews = [],
  //   isLoading: areReviewsLoading,
  //   refetch: refetchReviews,
  // } = useQuery({
  //   queryKey: ["all-reviews", _id],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`/reviews/${_id}`);
  //     return data;
  //   },
  //   enabled: !!_id,
  // });

  // // console.log(allReviews);

  // Handle like button method//
  const handleLike = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosSecure.patch(`/blog/${id}`);
      console.log(data);
      setLiked(true);
      refetchBlog();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  // const handleMealRequest = async () => {
  //   if (role == "admin") return toast.error("Action can not be permitted!");

  //   if (profile?.badge == "Bronze")
  //     return toast.error("You have to purchase a package.");

  //   const mealData = {
  //     title,
  //     likes,
  //     reviews,
  //     status: "Pending",
  //     userInfo: { name: user?.displayName, email: user?.email },
  //   };
  //   console.log(mealData);

  //   try {
  //     const { data } = await axiosSecure.post("/requestMeal", mealData);
  //     console.log(data);
  //     if (data.acknowledged) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Your meal request has been sent successfully.",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     toast.error(err.message);
  //   }
  // };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    console.log(comment);

    if (comment.length > 200)
      return toast.error("Your character limit exceeds");
    const date = new Date(Date.now()).toLocaleDateString();

    const commentInfo = {
      blogId: _id,
      commenter: {
        name: user?.displayName,
        image: user?.photoURL,
      },
      comment,
      date,
    };

    console.table(commentInfo);

    try {
      const { data } = await axiosSecure.post("/comment", commentInfo);
      console.log(data);
      if (data.acknowledged) {
        toast.success("You commented successfully!");
        refetchComments();
        // form.reset();
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  // const handleClose = () => {
  //   document.getElementById("review_modal").close();
  // };

  return (
    <div>
      <PageHeader
        title={"Blog Details"}
        track={"Home > All Blogs > Blog Details"}
      />

      <div className="flex flex-col lg:flex-row justify-between gap-20 p-2 mt-32 mb-48 w-[80%] mx-auto">
        {/* Blog Details */}
        <div className="lg:w-[60%] ">
          <article className="mx-auto overflow-hidden rounded-3xl bg-white">
            <div className="relative">
              <img
                src={blog_image}
                alt="Legal professional working at desk with scales of justice"
                className="w-full h-[500px] object-cover"
              />
              <time className="absolute bottom-0 left-0 text-sm rounded-tr-2xl bg-white text-gray-700 p-2 flex items-center gap-2">
                <FaRegCalendarAlt />
                {date}
              </time>
            </div>

            <div className="mt-5">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                {blog_title}
              </h2>

              <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
                <p>{description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 gap-4 pt-4 border-t">
              <div className="flex items-center  gap-4">
                <div className="h-12 w-12">
                  <img
                    src={author?.image}
                    className="rounded-full"
                    alt="Author"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Author: {author?.name}
                  </h3>
                  <h3 className="text-gray-500">Email: {author?.email}</h3>
                </div>
              </div>
              <p className="flex items-center gap-2 font-semibold text-lg">
                <button disabled={liked} onClick={() => handleLike(_id)}>
                  <AiOutlineLike
                    className={`text-3xl ${liked && "text-blue-400"} `}
                  />
                </button>
                <span className="bg-[#f4ede7] px-3 rounded-full py-1 mr-4">
                  {" "}
                  {like}
                </span>
              </p>
            </div>
          </article>
        </div>

        {/*Comment section  */}
        <div className="lg:w-[40%] lg:mt-0 mt-20">
          <div className="border-2 rounded-lg border-slate-300 p-2 rounded-b-none shadow-xl">
            {/* User Count and Button */}
            <div className="flex justify-between items-center  rounded-md p-1 rounded-b-none">
              <p className="text-center text-xl font-bold  text-gray-600 merienda">
                Comments:{" "}
                <span className="bg-[#f4ede7] text-yellow-500 px-2 rounded-full">
                  {comments.length}
                </span>
              </p>
            </div>

            {/* Users comment section */}
            <div className="space-y-2">
              {isCommentLoading ? (
                <LoadingSpinner smallHeight={true} />
              ) : (
                <>
                  {comments.map((comment) => (
                    <div
                      key={comment?._id}
                      className="border-2 bg-gradient-to-tr from-slate-50 to-[#fff9f4] mt-2 p-1 flex items-center gap-2"
                    >
                      <img
                        src={comment?.commenter?.image}
                        className="w-16 h-16 rounded-md border-2  border-[#f4ede7]"
                        alt="user-img"
                      />
                      <div className="w-[90%]">
                        <div className="flex justify-between items-center">
                          <h1 className="font-bold text-gray-600">
                            {comment?.commenter?.name}
                          </h1>
                          <p className="flex items-center gap-1 text-xs">
                            {" "}
                            <FaRegCalendarAlt /> {comment?.date}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600">
                          {" "}
                          <span className="font-semibold"> </span>
                          {comment?.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="mt-20">
            <p className="text-[#bd7d45] text-xl">WRITE COMMENT</p>
            <form onSubmit={handleCommentSubmit}>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text font-semibold">
                    Leave A Comment
                  </span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Comment here..."
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  h-[150px]  focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                  required
                ></textarea>
              </div>
              <div type="submit" className="form-control mt-6">
                <button className="btn btn-outline text-[#ce8a4f] hover:bg-[#af7745] text-lg font-bold rounded-t-none w-[200px]">
                  POST COMMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
