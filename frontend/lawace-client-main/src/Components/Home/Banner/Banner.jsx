import "animate.css";
import { GoArrowRight } from "react-icons/go";
import bannerImg from "../../../assets/images/banner-img.png";
import lawyer from "../../../assets/images/lawyer.png";
import legal from "../../../assets/images/legal.png";
import court from "../../../assets/images/court.png";
import global from "../../../assets/images/global.png";

export default function Banner() {
  const services = [
    {
      img: <img src={lawyer} className="w-8 h-8" />,
      title: "Lawyer Advice",
      subtitle: "Get a Free",
    },
    {
      img: <img src={legal} className="w-8 h-8" />,
      title: "Legal Counsel",
      subtitle: "Best Advice",
    },
    {
      img: <img src={court} className="w-8 h-8" />,
      title: "Court Performance",
      subtitle: "Case Study",
    },
    {
      img: <img src={global} className="w-8 h-8" />,
      title: "Global Lawyer",
      subtitle: "Best For All Law",
    },
  ];

  return (
    <div>
      {/* Main Banner Section */}
      <div className="container mx-auto p-16 pb-0 pt-36 w-[70%]">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 mt-10">
            <span className="text-[#C19A5B] font-semibold text-2xl">
              Welcome To My Legal Advisor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#002626] leading-tight">
              We Are The Best
              <br />
              Legal System
            </h1>
            <p className="text-gray-600 max-w-lg text-lg">
            We are committed to providing the most effective and efficient legal solutions tailored to your needs. 
            With our expertise and dedication, we ensure the best possible outcomes for every client.
            </p>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-[#C19A5B] text-white px-6 py-3 rounded-full hover:bg-[#020101] transition duration-500">
                GET APPOINTMENT
                <GoArrowRight className="w-4 h-4" />
              </button>

              <button className="flex items-center gap-2 bg-[#C19A5B] text-white px-6 py-3 rounded-full hover:bg-[#A88347] transition-colors">
                DISCOVER MORE
                <GoArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Content - Image with Circle */}
          <div className="relative">
            {/* image */}
            <div className="z-10">
              <img src={bannerImg} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`flex items-center gap-4 p-6 ${
              index % 2 === 0 ? "bg-[#002626]" : "bg-[#003737]"
            } text-white hover:bg-[#C19A5B] transition-colors cursor-pointer`}
          >
            <div className="text-[#C19A5B] group-hover:text-white">
              {service.img}
            </div>
            <div>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-300">{service.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// https://i.ibb.co/ftYMq2T/hostel-banner.jpg
//https://i.ibb.co/ZfGKrzp/hostel-mess.jpg
// https://i.ibb.co/wRFSgqt/dinning.jpg
// https://i.ibb.co/C0VgqRf/meal-together.png
