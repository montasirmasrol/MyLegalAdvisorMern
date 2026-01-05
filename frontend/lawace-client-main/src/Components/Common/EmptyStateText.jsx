import PropTypes from 'prop-types'

const EmptyStateText = ({text}) => {
  return (
    <div>
        <div className="flex flex-col justify-center items-center h-[300px]">
           <h1 className="text-red-500 font-bold lg:text-4xl text-3xl">No Data Founds!</h1>
           <p className="text-blue-500 mt-4 lg:text-xl text-lg font-semibold">{text}</p>
        </div>
    </div>
  );
};

export default EmptyStateText;

EmptyStateText.propTypes ={
   text:PropTypes.string
}