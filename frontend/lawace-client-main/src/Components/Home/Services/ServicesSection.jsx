import { GoBriefcase } from "react-icons/go";
import { IoScale } from "react-icons/io5";
import { RiGraduationCapFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import bgService from "../../../assets/images/service-list-bg-shape.svg";

export default function ServicesSection() {
  const services = [
    {
      icon: <IoScale className="w-8 h-8" />,
      title: "Professional Advice",
      description:
        "Receive expert legal guidance tailored to your unique needs from our team of experienced lawyers.",
    },
    {
      icon: <GoBriefcase className="w-8 h-8" />,
      title: "Employment Law",
      description:
        "Navigate workplace challenges with our specialized services in employment contracts, disputes, and compliance.",
    },
    {
      icon: <RiMoneyDollarBoxFill className="w-8 h-8" />,
      title: "Competitive Pricing",
      description:
        "Access high-quality legal services at fair and transparent rates to suit your budget.",
    },
    {
      icon: <RiGraduationCapFill className="w-8 h-8" />,
      title: "Education Law",
      description:
        " Get support with legal matters related to schools, universities, and educational policies.",
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${bgService})`,
        backgroundSize: "cover",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#F8F6F3] relative py-32 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-[#C19A5B] font-semibold mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002626] mb-4">
              The Best Lawyer
              <br />
              Solution
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
            We provide a platform to hire experienced lawyers, check their availability, and securely manage legal payments. 
            Additionally, users can upload and organize legal documents with complete confidentiality.
            </p>
            <Link
              href="#"
              className="inline-flex items-center text-[#C19A5B] hover:text-[#A88347] transition-colors font-medium"
            >
              DISCOVER MORE SERVICES →
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg hover:scale-105 duration-500 transition-all"
            >
              <div className="text-[#C19A5B] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#002626] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
