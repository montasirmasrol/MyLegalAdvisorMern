import PropTypes from 'prop-types';
 
const HeadingPart = ({heading, subHeading, para}) => {
  return (
    <div>
        <div className="text-center">
          <p className="text-sm font-bold text-blue-500"> {subHeading}
          </p>
          <hr className="w-20  mx-auto border-blue-500 flex justify-end" />
         
          <h1 className="lg:text-5xl text-3xl merienda font-bold my-4">{heading}</h1>
          <p className="text-gray-500  w-[90%] md:w-[70%] lg:w-[60%] mx-auto">
         {para}
          </p>
      </div>
    </div>
  );
};

export default HeadingPart;

HeadingPart.propTypes ={
   heading: PropTypes.string,
   subHeading:PropTypes.string,
   para:PropTypes.string
}