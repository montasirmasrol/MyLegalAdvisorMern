import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";

const BlogModal = ({ handleBlogSubmit, handleClose }) => {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <dialog id="blog_modal" className="modal">
          <div className="modal-box min-w-[600px] p-8">
            <form onSubmit={handleBlogSubmit} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  disabled={true}
                  name="name"
                  className="input input-bordered  font-semibold"
                />
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text font-semibold">Your Email</span>
                </label>
                <input
                  type="text"
                  value={user?.email}
                  disabled={true}
                  name="name"
                  className="input input-bordered font-semibold"
                />
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-600 "
                  htmlFor="title"
                >
                  Blog Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter blog title"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#ce8a4f]focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#dfa878]"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-600 "
                  htmlFor="image"
                >
                  Blog Image
                </label>
                <input
                  id="image"
                  autoComplete="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#ce8a4f]focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#dfa878]"
                  required
                />
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text font-semibold">
                    Blog Description
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Give your blog description about item within 200  words."
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  h-[200px]  focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-outline text-[#ce8a4f] hover:bg-[#af7745] text-lg font-bold rounded-t-none">
                  POST BLOG
                </button>
              </div>
            </form>
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default BlogModal;

BlogModal.propTypes = {
  handleBlogSubmit: PropTypes.func,
  handleClose: PropTypes.func,
};
