export default function GuidanceProcess() {
    return (
      <section className="py-16 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002139] mb-4">
              How Does The Legal Consultation Work?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the legal assistance you
              need in three simple steps
            </p>
          </div>
   
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {/* Step 1 */}
            <div className="group">
              <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
                <div className="text-[#C08D5D] font-semibold mb-4">Step 1</div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  Choose Your Lawyer
                </h3>
                <p className="text-gray-300">
                  Go to Our Expert's section and find your preferred Lawyer according to your requirements.
                </p>
              </div>
            </div>
   
            {/* Step 2 */}
            <div className="group">
              <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
                <div className="text-[#C08D5D] font-semibold mb-4">Step 2</div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  Choose Consultation Method
                </h3>
                <p className="text-gray-300">
                  Choose your preffered consultation process(Offline/Online/Request for free) among three options that we provide.
                </p>
              </div>
            </div>
   
            {/* Step 3 */}
            <div className="group">
              <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
                <div className="text-[#C08D5D] font-semibold mb-4">Step 3</div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  Final Step
                </h3>
                <p className="text-gray-300">
                  After completing the above steps you can have the best Legal Consultancy from the best Lawyers.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
              For any further query or any questions related to legal services, feel free to ask our ChatBot.
            </p>
        </div>
      </section>
    );
  }