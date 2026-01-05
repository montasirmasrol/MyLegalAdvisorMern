export default function StatsSection() {
  return (
    <section className="bg-[#F8F6F3] py-16 mt-80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
          <div className="text-center flex  justify-center items-center gap-4">
            <p className="text-[#C19A5B] text-5xl md:text-7xl font-bold mb-2">
              5k+
            </p>
            <p className=" text-[#002626] font-bold text-2xl">
              Our Happy <br /> Clients
            </p>
          </div>

          <div className="text-center flex  justify-center items-center gap-4">
            <p className="text-[#C19A5B] text-5xl md:text-7xl font-bold mb-2">
              99%
            </p>
            <p className=" text-[#002626] font-bold text-2xl">
              Success <br /> Rate
            </p>
          </div>

          <div className="text-center flex  justify-center items-center gap-4">
            <p className="text-[#C19A5B] text-5xl md:text-7xl font-bold mb-2">
              10
            </p>
            <p className=" text-[#002626] font-bold text-2xl">
              Experience
              <br /> We Have
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
