import { Phone, Mail, Award, Briefcase } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import useLawyer from "../../../Hooks/useLawyer";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import useRole from "../../../Hooks/useRole";

export default function Profile() {
  const { user, loading } = useAuth();
  const { lawyer, isLoading } = useLawyer();
  const [role] = useRole();

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg border overflow-hidden mt-6">
      {isLoading || loading ? (
        <LoadingSpinner smallHeight={true} />
      ) : (
        <div className="">
          <div className="mt-10">
            <img
              className={`${
                role === "admin" ? "h-[300px] w-[300px]" : "h-[400px] w-[400px]"
              }  rounded-full mx-auto  object-fill`}
              src={user?.photoURL}
              alt="User-img"
            />
            {role === "admin" && (
              <div className="text-center space-y-3 mb-10">
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {user?.displayName}
                </h1>
                <div className=" tracking-wide text-cyan-600 font-semibold">
                  Email: {user?.email}
                </div>
              </div>
            )}
          </div>
          {role === "admin" ? (
            ""
          ) : (
            <div className="p-8">
              <div className="text-center space-y-3">
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {user?.displayName}
                </h1>
                <div className="uppercase tracking-wide text-sm text-cyan-600 font-semibold">
                  {lawyer?.category} Lawyer
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-cyan-600 font-semibold">
                  Professional Info:
                </h3>
                <p className=" text-gray-600 leading-relaxed">
                  {lawyer?.professional_info}
                </p>
              </div>

              <div className="mt-6 lg:mx-20 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-cyan-600 mr-2" />
                  <span className="text-gray-700">{lawyer?.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-600 mr-2" />
                  <a
                    href="mailto:sarah.chen@legalfirm.com"
                    className="text-gray-700 hover:text-cyan-600 transition-colors"
                  >
                    {user?.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-cyan-600 mr-2" />
                  <span className="text-gray-700">{lawyer?.qualification}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-cyan-600 mr-2" />
                  <span className="text-gray-700">
                    {lawyer?.experience
                      ? `${lawyer?.experience}+ Years Experience`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
