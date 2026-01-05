import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import RegisterImg from "../../assets/images/RegisterImg.png";
import imageUpload from "../../Utils/ImageUpload";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const { user, setUser, createUser, updateUserProfile, loading, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const role = form.role.value;
    const email = form.email.value;
    const password = form.password.value;

    // console.log({ name, role, image, email, password });

    try {
      setLoading(true);

      let image_url = "";
      if (image) {
        image_url = await imageUpload(image);
        console.table({ name, image_url, email, password });
      }

      // Created user by this method
      const result = await createUser(email, password);

      // Updated user profile by this method
      await updateUserProfile(name, image_url);
      console.log(result?.user);
      // Show user info without refresh
      setUser({ ...result?.user, displayName: name, photoURL: image_url });

      const userInfo = {
        name,
        email,
        image: image_url,
        role,
      };

      const { data } = await axiosPublic.post("/users", userInfo);
      if (data.insertedId) {
        toast.success("Registered successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return;

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl my-32 border-2 border-[#fddec3]">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-3 text-2xl text-center text-gray-600 font-extrabold merienda">
            Get Your Free Account Now.
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
              Get registered with email
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          {/* Form of register */}
          <form onSubmit={handleRegister}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-600 "
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                placeholder="Enter your name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                type="text"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-600 "
                htmlFor="image"
              >
                Upload Photo
              </label>
              <input
                id="image"
                autoComplete="image"
                name="image"
                type="file"
                accept="image/*"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Register As
              </label>

              <select
                className="block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-lg   focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                name="role"
                id="role"
              >
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                placeholder="Enter your email address"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                type="email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                placeholder="Enter unique password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
                type="password"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#cf9058] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin m-auto" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>

            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase  hover:underline"
            >
              or Login
            </Link>

            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('${RegisterImg}')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
