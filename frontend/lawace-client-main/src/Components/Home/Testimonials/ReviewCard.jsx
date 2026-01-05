import PropTypes from "prop-types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import qoute from "../../../assets/images/Quote.svg";

const ReviewCard = ({ card }) => {
  const { user_name, user_image, user_review, rating } = card;

  return (
    <div className="md:mx-10 mx-4 mb-4 md:w-full w-[300px]">
      <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg border-2 border-orange-300">
        <div className="flex justify-center -mt-16">
          <img
            className="object-cover w-32 h-32 border-2 border-orange-500 p-1.5 rounded-full"
            alt="Testimonial avatar"
            src={user_image}
          />
        </div>

        <div className="relative">
          <p className="text-xl text-center font-semibold text-blue-600 merienda mt-4">
            {user_name}
          </p>
          <img
            src={qoute}
            className="absolute bottom-10 right-0 w-10 h-10"
            alt=""
          />
        </div>

        <p className="mt-2 text-sm  ">{user_review}</p>

        <div className="flex items-center justify-center my-4">
          <p className="flex gap-1 text-orange-500">
            <Rating value={rating} style={{ maxWidth: 120 }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

ReviewCard.propTypes = {
  card: PropTypes.object,
};
