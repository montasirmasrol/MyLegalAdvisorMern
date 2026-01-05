import TableHeaderText from "../../../Components/Dashboard/TableHeaderText";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

function Appointments() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: appointments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/appointments/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleApprove = async (id, app) => {
    console.log({ id, app });

    try {
      const { data } = await axiosSecure.patch(`/appointment/${id}`, app);
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have approved appointment successfully!.",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFileView = (url) => {
    // Check file extension to determine display method
    if (!url) return null;
    const fileExt = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png"].includes(fileExt)) {
      return (
        <img
          src={`${import.meta.env.VITE_AXIOS_API}${url}`}
          alt="Uploaded document"
          className="max-w-[200px]"
        />
      );
    } else if (fileExt === "pdf") {
      return (
        <a
          href={`${import.meta.env.VITE_AXIOS_API}${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View PDF Document
        </a>
      );
    } else {
      return (
        <a
          href={`${import.meta.env.VITE_AXIOS_API}${url}`}
          download
          className="text-blue-600 hover:underline"
        >
          Download Document
        </a>
      );
    }
  };

  console.log(appointments);

  return (
    <div>
      {" "}
      <div className="min-h-[calc(100vh-80px)] border-2 border-cyan-300 space-y-7">
        <div className="m-2">
          <TableHeaderText
            text={"All Appointments"}
            count={appointments.length}
          />

          {isLoading || loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-6">
              <div className=" overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle ">
                  {appointments.map((app, indx) => (
                    <div
                      key={app?._id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
                    >
                      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                          <h1 className="text-white text-xl md:text-2xl font-bold">
                            Consultation Request {indx + 1}
                          </h1>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 space-y-6">
                          {/* User Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-gray-500 font-medium">
                                Name
                              </p>
                              <p className="text-gray-800 font-semibold">
                                {app?.userName}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-gray-500 font-medium">
                                Email
                              </p>
                              <p className="text-gray-800 font-semibold">
                                {app?.userEmail}
                              </p>
                            </div>
                          </div>

                          {/* Subject & Message */}
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-500 font-medium">
                              Subject
                            </p>
                            <p className="text-gray-800 font-semibold">
                              {app?.subject}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-500 font-medium">
                              Message
                            </label>
                            <p className="text-gray-700 bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
                              {app?.message}
                            </p>
                          </div>

                          {/* Additional Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-gray-500 font-medium">
                                Consultation Type
                              </p>
                              <p className="text-gray-800 font-semibold">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  {app?.consultationType}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-gray-500 font-medium">
                                Status
                              </p>
                              <p className="text-gray-800 font-semibold">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                  {app?.status}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Document Section */}
                          <div className="space-y-3">
                            <p className="text-sm text-gray-500 font-medium">
                              Attached Document
                            </p>
                            {getFileView(app?.documentUrl)}
                          </div>
                        </div>

                        {/* Footer Section */}
                        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-end">
                          <button
                            onClick={() => handleApprove(app?._id, app)}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 
                                    text-white font-medium rounded-lg transition-all duration-200 
                                    transform hover:scale-105 active:scale-100"
                          >
                            Give Approval
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
