import { Link } from "react-router-dom";
import lawyer1 from "../../../assets/images/lawyer1.jpg";
import lawyer2 from "../../../assets/images/lawyer2.jpg";
import lawyer3 from "../../../assets/images/lawyer3.jpg";
import useLawyers from "../../../Hooks/useLawyers";
import LawyerCard from "../../../Pages/ExpertLawyers/LawyerCard";

function TeamSection() {
  const [lawyers, isloading] = useLawyers();

  return (
    <div className=" bg-[#f4ede7] py-32 pb-52 relative">
      <div className="flex gap-4 justify-center items-center w-[70%] mx-auto">
        {/* Left Section */}
        <div className=" w-[30%]">
          <p className="text-[#c49241] text-2xl font-bold">SPECIAL TEAM</p>
          <h3 className="text-6xl font-semibold mt-4">
            Our Best <br /> Experts
          </h3>
          <p className="w-[80%] mt-10">
          Our best legal experts are here to provide you with professional advice, 
          seamless communication, and tailored solutions for all your legal needs.
          </p>
          <Link
            href="#"
            className="inline-flex items-center text-[#C19A5B] hover:text-[#916011] font-medium border-b hover:border-[#916011] text-sm mt-3"
          >
            DISCOVER MORE SERVICES →
          </Link>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-3 gap-6">
          {lawyers.slice(0, 3).map((lawyer) => (
            <LawyerCard lawyer={lawyer} />
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-[#011c1a] w-[70%] mx-auto absolute  top-[650px] right-[280px] text-white flex flex-col justify-center items-center py-16 p-10 rounded-3xl">
        <p className="text-xl">SUBSCRIBE FOR UPDATE</p>
        <h3 className="text-4xl font-bold mt-2 mb-8">
          Get Latest Legal Advice Now!
        </h3>

        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-bordered input-warning w-full rounded-full"
          />
          <button className=" bg-[#b68c5a] text-white btn  py-3 rounded-full hover:bg-[#000000] transition-colors font-semibold">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
