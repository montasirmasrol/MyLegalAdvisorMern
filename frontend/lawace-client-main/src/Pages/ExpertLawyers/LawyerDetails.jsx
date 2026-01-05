import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, Scale, ScrollText, Star } from "lucide-react";
import PageHeader from "../../Components/Common/PageHeader";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import { useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import AppointmentModal from "../../Components/Modals/AppointmentModal";

function LawyerDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isRatingGiven, setIsRatingGiven] = useState(true);
  const [givenRating, setGivenRating] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  useEffect(() => {
    const checkRatingStatus = async () => {
      if (!user) {
        setIsRatingGiven(true);
        return;
      }

      try {
        const { data } = await axiosSecure.get(`/ratings/${id}/${user.email}`);
        setIsRatingGiven(data.hasRated);
        setGivenRating(data.rating);
      } catch (error) {
        console.error("Error checking rating status:", error);
      }
    };

    checkRatingStatus();
  }, [id, user, axiosSecure]);

  const {
    data: lawyer = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lawyer-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/lawyers/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const {
    lawyer_image,
    lawyer_email,
    lawyer_name,
    category,
    phone,
    professional_info,
    qualification,
    ratingCount,
    totalRating,
    experience,
  } = lawyer;

  const avgRating =
    ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;

  console.log({ id, lawyer, user });

  const handleRating = async (_givenRating) => {
    try {
      await axiosSecure.post("/ratings", {
        lawyerId: id,
        userId: user?.email,
        rating: _givenRating,
      });

      setGivenRating(_givenRating);
      setIsRatingGiven(true);

      refetch();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div>
      <PageHeader
        title={"Lawyer Details"}
        track={"Home > Expert Lawyers > Lawyer Details"}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-6xl  mx-auto p-6">
          <div className="flex flex-col md:flex-row my-32 gap-8">
            {/* Profile Image Section */}
            <div className="md:w-1/3 relative">
              <img
                src={lawyer_image}
                alt="lawyer_image"
                className="w-full rounded-2xl object-cover aspect-[3/4]"
              />
              <div className="absolute bottom-4 right-4 bg-white text-[#B08968]  rounded-lg  hover:bg-[#003B4F] flex items-center px-3 gap-1  transition-colors">
                <Star /> <p className="text-2xl font-semibold">{avgRating}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3">
              <div className="space-y-4">
                <h2 className="text-[#B08968] font-medium tracking-wide uppercase">
                  {category} Lawyer
                </h2>

                <h1 className="text-4xl md:text-5xl font-bold text-[#002B3B]">
                  {lawyer_name}
                </h1>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>{professional_info}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone :</p>
                      <p className="font-medium text-[#002B3B]">{phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email :</p>
                      <p className="font-medium text-[#002B3B]">
                        [ {lawyer_email} ]
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience :</p>
                      <p className="font-medium text-[#002B3B]">
                        {experience} Years
                      </p>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B08968] p-4 rounded-lg">
                      <ScrollText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Qualification :</p>
                      <p className="font-medium text-[#002B3B]">
                        {qualification}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:!mt-16 flex flex-row-reverse justify-between items-center">
                  {/* rating */}
                  <div className="flex flex-col gap-1">
                    <span>Give the lawyer a rating!</span>

                    {/* <div className="rating rating-md">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <input
                          key={value}
                          type="radio"
                          name="rating"
                          className="mask mask-star-2 bg-[#B08968]"
                          value={value}
                          onChange={handleRating}
                          disabled={isRatingGiven}
                        />
                      ))}
                    </div> */}
                    <Rating
                      style={{ maxWidth: 130 }}
                      value={givenRating}
                      onChange={handleRating}
                      isDisabled={isRatingGiven}
                    />
                  </div>

                  {/* Get appointment button */}
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Request Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        lawyerEmail={lawyer?.lawyer_email}
        lawyerName={lawyer?.lawyer_name}
        userName={user?.displayName}
        userEmail={user?.email}
      />
    </div>
  );
}

export default LawyerDetails;
