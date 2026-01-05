import { Link, useRouteError } from "react-router-dom";
import error_img from '../assets/images/error-img.png'

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center border-2 md:m-10 m-4 p-4 border-sky-300">
      <img src={error_img} alt="" />
      <h1 className="lg::text-9xl md:text-7xl text-5xl text-indigo-600 font-extrabold mb-2 play">
        Opps!
      </h1>

      <p className="text-red-600 text-xl font-semibold my-2">
        {error.status} - Page {error.statusText}
      </p>
      <p className="md:w-1/2 w- md:text-lg textarea-xs play mb-3npm">
        You are lost! The page you are looking for might have been removed or
        temporarily unavailable.
      </p>
      <Link to='/'>
        <button className="btn btn-sm btn-primary my-4 rounded-none text-blue-500 btn-outline">Go to Home</button>
      </Link>
      <p>Or</p>
      <Link to='/dashboard'>
        <button className="btn btn-sm btn-primary my-4 rounded-none text-blue-500 btn-outline">Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default ErrorPage;