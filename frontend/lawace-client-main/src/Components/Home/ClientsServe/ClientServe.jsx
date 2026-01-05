import Marquee from "react-fast-marquee";

function ClientServe() {
  return (
    <div className="bg-[#011c1a] mt-32 py-10 text-white ">
      <div className="w-[70%] mx-auto">
        <div className="flex justify-center items-center mb-6">
          <hr className=" w-[250px]" />
          <p className="mx-6 font-bold">
            More <span className="text-[#ddae63]">500+</span> Clients We Serve
          </p>
          <hr className=" w-[250px]" />
        </div>
        <Marquee>
          <p className="text-2xl mr-10">GlobalBank</p>
          <p className="text-2xl mr-10">LightBox</p>
          <p className="text-2xl mr-10">Acme Corp</p>
          <p className="text-2xl mr-10">Spherule</p>
          <p className="text-2xl mr-10">BoltShift</p>
          <p className="text-2xl mr-10">Nietzsche</p>
          <p className="text-2xl mr-10">GlobalBank</p>
          <p className="text-2xl mr-10">LightBox</p>
          <p className="text-2xl mr-10">Acme Corp</p>
          <p className="text-2xl mr-10">Spherule</p>
          <p className="text-2xl mr-10">BoltShift</p>
          <p className="text-2xl mr-10">Nietzsche</p>
        </Marquee>
      </div>
    </div>
  );
}

export default ClientServe;
