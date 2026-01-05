import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/images/favicon.png";
import useRole from "../../Hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  console.log("Role from navbar:", role);

  const navLinks = (
    <div className="flex flex-col  lg:flex-row gap-4 ">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg rounded-none border-b-2 font-bold flex justify-center border-black text-black"
              : "font-bold text-lg flex justify-center rounded-none text-black"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg rounded-none border-b-2 font-bold flex justify-center border-black text-black"
              : "font-bold text-lg flex justify-center rounded-none text-black"
          }
          to="/allBlogs"
        >
          All Blogs
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg rounded-none border-b-2 font-bold flex justify-center border-black text-black"
              : "font-bold text-lg flex justify-center rounded-none text-black"
          }
          to="/contactUs"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg rounded-none border-b-2 font-bold flex justify-center border-black text-black"
              : "font-bold text-lg flex justify-center rounded-none text-black"
          }
          to="/expertLawyers"
        >
          Expert Lawyers
        </NavLink>
      </li>
    </div>
  );

  return (
    <div className=" bg-[#f4ede7]  w-full z-10 fixed border-b py-2">
      <div className=" max-w-[2400px] mx-auto">
        <div className="navbar lg:w-[80%] p-0  w-[95%] mx-auto">
          <div className="navbar-start lg:w-[50%] w-full">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn rounded-none flex btn-sm px-1 btn-ghost lg:hidden "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-8 md:w-8 h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-blue-500 rounded-none bg-opacity-50 w-52"
              >
                {navLinks}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <img src={logo} alt="" className="w-8 rounded-full mr-1" />
              <Link
                to="/"
                className="md:text-2xl text-xl font-extrabold merienda flex items-center"
              >
                My <span className="text-yellow-600">Legal</span> Advisor
              </Link>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>

          {user ? (
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="user image" src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-1.5 z-[1] p-2 shadow menu menu-sm dropdown-content  rounded-none bg-opacity-50 bg-[#ddd9cf] w-52 space-y-3 font-semibold"
                >
                  <p className="text-center">{user?.displayName} </p>
                  {role === "lawyer" || role === "admin" ? (
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex justify-center text-center bg-gradient-to-tl from-[#e9ca96] to-[#d39f4c] hover:from-yellow-700 hover:text-blue-800 text-black rounded-none"
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <Link
                      onClick={logOut}
                      className="flex justify-center text-center bg-gradient-to-tl from-[#e9ca96] to-[#d39f4c] hover:from-yellow-700 hover:text-blue-800 text-black rounded-none"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="navbar-end lg:w-[50%] w-[30%]">
              <Link
                to="/login"
                className="font-bold md:text-xl border-x-2 border-black rounded-none md:px-3 px-1 border-y-0 text-black text-sm  hover:text-black"
              >
                Join Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
