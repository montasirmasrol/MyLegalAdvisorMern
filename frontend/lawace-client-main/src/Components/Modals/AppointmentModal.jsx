import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AppointmentModal = ({
  isOpen,
  onClose,
  lawyerEmail,
  lawyerName,
  userName,
  userEmail,
}) => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    documents: null,
    consultationType: "free",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("consultationType", formData.consultationType);
      data.append("subject", formData.subject);
      data.append("message", formData.message);
      if (formData.documents) {
        data.append("documents", formData.documents);
      }
      data.append("lawyerEmail", lawyerEmail);
      data.append("lawyerName", lawyerName);
      data.append("userName", userName);
      data.append("userEmail", userEmail);

      const response = await axiosSecure.post("/appointments", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Appointment request sent successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Appointment creation error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Request Appointment
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Consultation Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="consultationType"
                    value="free"
                    checked={formData.consultationType === "free"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Free Consultation</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="consultationType"
                    value="online"
                    checked={formData.consultationType === "online"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Online Consultation</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="consultationType"
                    value="offline"
                    checked={formData.consultationType === "offline"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Offline Consultation</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter your message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Documents (Optional)
              </label>
              <input
                type="file"
                name="documents"
                onChange={handleChange}
                className="mt-1 block w-full"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppointmentModal;
