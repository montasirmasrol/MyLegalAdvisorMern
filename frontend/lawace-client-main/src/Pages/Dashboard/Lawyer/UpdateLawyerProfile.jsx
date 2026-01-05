import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useLawyer from "../../../Hooks/useLawyer";

const UpdateLawyerProfile = () => {
  const { user } = useAuth();
  const { lawyer, isLoading } = useLawyer();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  console.log("UseLawyer is from update lawyer profile:", lawyer, isLoading);

  const handleUpdateLawyer = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = form.get("phone");
    const category = form.get("category");
    const experience = form.get("experience");
    const professional_info = form.get("proInfo");
    const qualification = form.get("qualification");

    const lawyerProfile = {
      lawyer_name: user?.displayName,
      lawyer_email: user?.email,
      lawyer_image: user?.photoURL,
      ratingCount: 0,
      totalRating: 0,
      phone,
      category,
      experience,
      professional_info,
      qualification,
    };
    console.table(lawyerProfile);

    try {
      const { data } = await axiosSecure.put(
        `/lawyer/${user?.email}`,
        lawyerProfile
      );
      console.log(data);
      if (data?.upsertedId || data?.upsertedCount > 0) {
        Swal.fire({
          title: "Lawyer Profile Created!",
          text: "You have created your lawyer profile successfully.",
          icon: "success",
        });
        e.target.reset();
        navigate("/dashboard");
      } else if (data?.modifiedCount > 0) {
        Swal.fire({
          title: "Lawyer Profile Updated!",
          text: "You have updated your lawyer profile successfully.",
          icon: "success",
        });
        e.target.reset();
        navigate("/dashboard");
      } else {
        Swal.fire({
          title: "Not Updated!",
          text: "You didn't update anything.",
          icon: "error",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="lg:w-[80%] w-full mx-auto ">
      <div className="md:p-10 p-6 my-10 rounded-lg  w-[84%]  mx-auto border-2 ">
        <div className="text-center">
          <h1 className=" md:text-3xl text-2xl coff font-bold merienda text-cyan-600">
            Update Your Lawyer Profile
          </h1>
          <hr className="md:w-[400px] w-[195px] mx-auto border-cyan-600" />
        </div>

        <div className="mt-6">
          <form onSubmit={handleUpdateLawyer}>
            {/* Field 1 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-10">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Your Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  disabled={true}
                  className="block w-full px-4 py-2 text-gray-400 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                  value={user?.displayName}
                />
              </div>

              {/* User email */}
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Your Email
                  </span>
                </label>

                <input
                  type="text"
                  name="email"
                  disabled={true}
                  className="block w-full px-4 py-2 text-gray-400 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                  value={user?.email}
                />
              </div>
            </div>

            {/* Field 2 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-10">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Phone
                  </span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  defaultValue={lawyer?.phone || ""}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                  required
                />
              </div>

              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  id="category"
                  defaultValue={lawyer?.category}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Criminal">Criminal Lawyer</option>
                  <option value="Divorce">Divorce Lawyer</option>
                  <option value="Property">Property Lawyer</option>
                  <option value="Corporate">Corporate Lawyer</option>
                  <option value="Securities">Securities Lawyer</option>
                  <option value="Family">Family Lawyer</option>
                  <option value="Civil">Civil Lawyer</option>
                </select>
              </div>
            </div>

            {/* Field 3 */}
            <div className="flex flex-col md:flex-row justify-between md:gap-10">
              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Experience
                  </span>
                </label>
                <input
                  type="text"
                  name="experience"
                  defaultValue={lawyer?.experience || ""}
                  placeholder="Enter experience in years"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                  required
                />
              </div>

              <div className="form-control md:w-1/2 w-full">
                <label className="label">
                  <span className="label-text font-bold text-cyan-600 text-lg">
                    Qualifications
                  </span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  defaultValue={lawyer?.qualification || ""}
                  placeholder="Enter your qualification"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                />
              </div>
            </div>

            {/*Short description field */}
            <div className="form-control w-">
              <label className="label">
                <span className="label-text font-bold text-cyan-600 text-lg">
                  Professional Info
                </span>
              </label>
              <textarea
                name="proInfo"
                defaultValue={lawyer?.professional_info || ""}
                className="block w-full h-[200px] px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-cyan-600 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-cyan-200"
                placeholder="Enter your professional information within 150-200 words."
              ></textarea>
            </div>

            {/*Add coffee Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn transition duration-500 text-cyan-500 hover:bg-cyan-600 hover:text-white btn-outline font-bold merienda text-xl mt-4 px-10"
              >
                UPDATE PROFILE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLawyerProfile;
