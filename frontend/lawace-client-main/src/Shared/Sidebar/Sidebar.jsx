import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineReviews } from "react-icons/md";
import { PiGitPullRequestBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import useRole from "../../Hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [role, isLoading] = useRole();
  console.log("From Sidebar:", role);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-blue-50 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <p className="text-xl font-bold">
                My<span className="text-yellow-600">Legal</span>Advisor
              </p>
            </Link>
          </div>
        </div>

        <button onClick={handleToggle} className="p-4">
          <FaBars
            className={`h-5 w-5 transition-opacity transform duration-1000 text-cyan-600 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue-50  w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="flex justify-between gap-2">
            <div className="w-full  flex px-4 py-2 shadow-lg  justify-center items-center bg-gradient-to-tr  from-cyan-50 to-cyan-200 mx-auto">
              <Link to="/">
                <p className="text-xl font-bold">
                  My<span className="text-yellow-600">Legal</span>Advisor
                </p>
              </Link>
            </div>
            <button onClick={handleToggle} className="block md:hidden">
              <RxCross2
                className={`text-2xl transition-opacity transform duration-1000 mr-1 text-cyan-600 ${
                  !isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              />
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Profile Menu */}
              {isLoading ? (
                <LoadingSpinner />
              ) : role === "admin" ? (
                <>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-100   hover:text-cyan-600 ${
                        isActive
                          ? "bg-blue-100  text-cyan-600"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdManageAccounts className="w-6 h-6" />

                    <span className="mx-2 font-medium">Admin Profile</span>
                  </NavLink>

                  <NavLink
                    to="allBlogs"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-100   hover:text-cyan-600 ${
                        isActive
                          ? "bg-blue-100  text-cyan-600"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineReviews className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Blogs</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-100   hover:text-cyan-600 ${
                        isActive
                          ? "bg-blue-100  text-cyan-600"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdManageAccounts className="w-6 h-6" />

                    <span className="mx-2 font-medium">My Profile</span>
                  </NavLink>

                  {/* Statistics */}
                  <NavLink
                    to="updateLawyerProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-100  hover:text-cyan-600 ${
                        isActive
                          ? "bg-blue-100  text-cyan-600"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <PiGitPullRequestBold className="w-5 h-5" />
                    <span className="mx-4 font-medium">
                      Update Lawyer Profile
                    </span>
                  </NavLink>

                  {/* Add Room */}
                  <NavLink
                    to="allAppointments"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-blue-100   hover:text-cyan-600 ${
                        isActive
                          ? "bg-blue-100  text-cyan-600"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineReviews className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Appointments</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={() => {
              logOut();
              navigate("/");
            }}
            className="flex w-full items-center px-4 py-2 mt-5 text-red-500 hover:bg-blue-100   hover:text-red-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
