import Marquee from "react-fast-marquee";
import testBg from "../../../assets/images/testimonial-bg.svg";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const Testimonials = () => {
  const [cards, setCards] = useState([]);
  // const axiosSecure = useAxiosSecure();

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  };

  console.log("Tes", cards);

  return (
    <div className="space-y-16 my-32 relative">
      <img className="absolute" src={testBg} alt="" />
      <div className="text-center">
        <p className="text-xl font-bold text-[#ddb169]">Testimonials</p>
        <hr className="w-[110px]  mx-auto border-[#ddb169] flex justify-end" />

        <h1 className="lg:text-5xl font-bold text-3xl merienda mt-4 mx-2">
          What Our Client Say
        </h1>

        {/* <hr className="lg:w-[650px] w-[430px] border-orange-500 mx-auto mt-2"/> */}
      </div>

      <div className="lg:w-[70%] w-[80%] mx-auto">
        <Marquee style={{}} pauseOnHover={true} speed={40}>
          {cards.map((card) => (
            <ReviewCard card={card} key={card._id} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
