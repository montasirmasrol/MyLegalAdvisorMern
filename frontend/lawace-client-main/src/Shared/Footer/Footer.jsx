import { ImFacebook, ImInstagram, ImLinkedin } from "react-icons/im";
import { Link } from "react-router-dom";
import logo from "../../assets/images/favicon.png";

export default function Footer() {
  return (
    <footer className="bg-[#002626] text-white">
      <div className="container  px-4 py-12  w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* About Us */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold pb-2">About Us</h2>
              <hr className="w-16 border-yellow-600" />
            </div>
            <p className="text-gray-300">
            We are a legal platform connecting clients with trusted lawyers, 
            offering secure tools for seamless legal management and accessibility.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <ImFacebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <ImInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <ImLinkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Our Links */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold pb-2">Our Links</h2>
              <hr className="w-16 border-yellow-600" />
            </div>
            <ul className="space-y-2">
              {[
                "Home",
                "About Us",
                "Services",
                "Case Study",
                "Blog",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold pb-2">Our Services</h2>
              <hr className="w-16 border-yellow-600" />
            </div>
            <ul className="space-y-2">
              {[
                "Professional Advice",
                "Employment Law",
                "Competitive Pricing",
                "Education Law",
                "Top Legal Experts",
                "Car Accident Law",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold pb-2">Contact Us</h2>
              <hr className="w-16 border-yellow-600" />
            </div>
            <div className="space-y-4 text-gray-300">
              <p>BRAC University, Merul Badda, Dhaka</p>
              <p>info@mylegaladvisor.com</p>
              <p>[email protected]</p>
              <p>01912345678</p>
              <p>01921201719</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-[#060c0c] p-6 rounded-xl pb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <img src={logo} alt="" className="w-8 rounded-full mr-1" />
            </div>
            <span className="text-xl font-bold">
              My<span className="text-yellow-600">Legal</span>Advisor
            </span>
          </div>
          <div className="text-gray-300 text-sm">
            Copyright © 2025. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
