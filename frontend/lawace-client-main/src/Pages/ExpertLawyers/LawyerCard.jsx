import { Link } from "react-router-dom";

function LawyerCard({ lawyer }) {
  return (
    <div>
      <Link to={`/lawyer/${lawyer?._id}`}>
        <div className="space-y-2 hover:border rounded-t-xl transition hover:scale-105 duration-500">
          <div>
            <img
              className="rounded-xl h-[300px] w-full border"
              src={lawyer?.lawyer_image}
              alt=""
            />
          </div>
          <div className="pl-2 pb-2">
            <p className="text-gray-500 uppercase">{lawyer?.category} Lawyer</p>
            <h3 className="text-2xl font-bold">{lawyer?.lawyer_name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default LawyerCard;
