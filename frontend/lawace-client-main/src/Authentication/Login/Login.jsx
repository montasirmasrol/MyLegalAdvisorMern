// import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../Hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import loginImg from "../../assets/images/loginImg.jpg";
// import { ImSpinner9 } from "react-icons/im";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

// const Login = () => {
//   const { user, loginUser, loading, setLoading, loginWithGoogle } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosPublic = useAxiosPublic();
//   console.log(location);
//   const gotoThere = location.state || "/";

//   useEffect(() => {
//     if (user) {
//       navigate(gotoThere);
//     }
//   }, [user]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     console.log({ email, password });

//     try {
//       await loginUser(email, password);
//       toast.success("Successfully logged in!");
//       navigate(gotoThere, { replace: true });
//     } catch (err) {
//       console.log(err.message);
//       toast.error(err.message);
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const { user } = await loginWithGoogle();

//       const userInfo = {
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//         role: "user",
//       };

//       const { data } = await axiosPublic.post("/users", userInfo);
//       console.log(data);
//       toast.success("Successfully logged in with google!");
//       navigate(gotoThere, { replace: true });
//     } catch (err) {
//       console.error(err.message);
//       toast.error(err.message);
//       setLoading(false);
//     }
//   };

//   if (user) return;

//   return (
//     <div className="flex justify-center items-center">
//       <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl my-32 border-2 border-[#fddec3]">
//         <div
//           className="hidden bg-cover bg-center lg:block lg:w-1/2"
//           style={{
//             backgroundImage: `url('${loginImg}')`,
//           }}
//         ></div>

//         <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
//           <p className="mt-3 text-2xl text-center text-gray-600 font-extrabold merienda">
//             Welcome back!
//           </p>

//           <div
//             onClick={handleGoogleLogin}
//             className="flex cursor-pointer items-center justify-center gap-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 px-4 py-3 "
//           >
//             <FcGoogle className="text-xl" />
//             Sign in with Google
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>

//             <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
//               or login with email
//             </div>

//             <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin}>
//             <div className="mt-4">
//               <label
//                 className="block mb-2 text-sm font-semibold text-gray-600 "
//                 htmlFor="LoggingEmailAddress"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 autoComplete="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
//                 type="email"
//                 required
//               />
//             </div>

//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label
//                   className="block mb-2 text-sm font-semibold text-gray-600 "
//                   htmlFor="loggingPassword"
//                 >
//                   Password
//                 </label>
//               </div>

//               <input
//                 id="loggingPassword"
//                 autoComplete="current-password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-[#af7745] focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-[#ce8a4f]"
//                 type="password"
//                 required
//               />
//             </div>
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-6 py-2 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 "
//               >
//                 {loading ? (
//                   <ImSpinner9 className="animate-spin m-auto" />
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="flex items-center justify-between mt-4">
//             <span className="w-1/5 border-b dark:border-gray-400  md:w-1/4"></span>

//             <Link
//               to="/register"
//               className="text-xs text-gray-500 uppercase  hover:underline"
//             >
//               or register
//             </Link>

//             <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




























import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import loginImg from "../../assets/images/loginImg.jpg";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
  const { user, loginUser, loading, setLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const gotoThere = location.state?.from || "/";

  useEffect(() => {
    if (user) navigate(gotoThere, { replace: true });
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      toast.success("Logged in successfully!");
      navigate(gotoThere, { replace: true });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await loginWithGoogle();

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "user",
      };

      await axiosPublic.post("/users", userInfo);
      toast.success("Logged in with Google!");
      navigate(gotoThere, { replace: true });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl my-32 border-2 border-[#fddec3]">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{ backgroundImage: `url('${loginImg}')` }}
        ></div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-3 text-2xl text-center text-gray-600 font-extrabold merienda">
            Welcome back!
          </p>

          <div
            onClick={handleGoogleLogin}
            className="flex cursor-pointer items-center justify-center gap-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 px-4 py-3"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase hover:underline">
              or login with email
            </div>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#af7745] focus:ring focus:ring-[#ce8a4f] focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#af7745] focus:ring focus:ring-[#ce8a4f] focus:outline-none"
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {loading ? <ImSpinner9 className="animate-spin m-auto" /> : "Login"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
            <Link to="/register" className="text-xs text-gray-500 uppercase hover:underline">
              or register
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
