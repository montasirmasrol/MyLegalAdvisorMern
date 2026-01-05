import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function ContactUs() {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    try {
      const { data } = await axiosPublic.post("/contact", formData);
      if (data.success) {
        toast.success("Your message has been sent successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "What areas of law do you specialize in?",
      answer:
        "We specialize in various areas including corporate law, civil litigation, family law, real estate law, and intellectual property. Our team of experienced attorneys can handle a wide range of legal matters with expertise and dedication.",
    },
    {
      question: "How much does an initial consultation cost?",
      answer:
        "We offer a free initial consultation to all new clients. This allows us to understand your case and provide preliminary guidance without any financial commitment from your side.",
    },
    {
      question: "How long does it typically take to resolve a case?",
      answer:
        "The duration varies depending on the complexity of your case and the specific area of law involved. During your initial consultation, we can provide a more accurate timeline based on your specific situation.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment plans to accommodate our clients' needs. We can discuss payment options during your initial consultation and work out a plan that suits your budget.",
    },
    {
      question: "Can I schedule an appointment outside of business hours?",
      answer:
        "Yes, we understand that many clients have busy schedules. We offer flexible appointment times, including evenings and weekends, to accommodate your needs.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule your appointment up to 24 hours in advance. Visit your account dashboard or contact us to modify your booking.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, MasterCard, American Express) and digital wallets like PayPal and Apple Pay.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use a trusted third-party payment processor to handle all transactions securely. Your payment details are encrypted and not stored on our servers.",
    },
    {
      question: "How do I upload my documents?",
      answer:
        "You can upload your documents securely via the 'Document Upload' section in your account. Accepted formats include PDF, JPG, and PNG.",
    },
  ];
 
 



  return (
    <div className="container  mx-auto px-4 py-12 max-w-7xl">
      <div className="my-32">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#C08D5D] font-medium">CONTACT US</h3>
              <h1 className="text-4xl md:text-5xl font-bold text-[#002139]">
                Get In Touch Now
              </h1>
            </div>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Location</h3>
                  <p className="text-gray-600">
                    BRAC University, Merul Badda, Dhaka
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Email Address</h3>
                  <p className="text-gray-600">info@mylegaladvisor.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#C08D5D] rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Phone No.</h3>
                  <p className="text-gray-600">01912345678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <p className="text-gray-600 mb-8">
              * Call us 24/7 at 16221 or fill out the form below to receive
              a free and confidential initial consultation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No.*"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Message..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C08D5D] focus:border-transparent"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#C08D5D] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#A77B4F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SENDING..." : "SUBMIT NOW"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

 
   {/* FAQ Section */}
      <div className="py-16 mb-20 bg-[#fcfbfb] mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002139] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#925f2f]  max-w-2xl mx-auto font-semibold">
              Find answers to common questions about our services and legal
              consultation process.
            </p>
          </div>
 
          <div className="max-w-3xl mx-auto">
            <div className="join join-vertical w-full">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow join-item border border-[#f2ebe5] mb-4"
                >
                  <input
                    type="radio"
                    name="my-accordion-4"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title text-xl font-medium bg-[#ffeedd]">
                    {faq.question}
                  </div>
                  <div className="collapse-content bg-[#fdf5ed] pt-4">
                    <p className="text-slate-700  ">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
