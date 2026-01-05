import PropTypes from 'prop-types'

const TableHeaderText = ({text, count}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-200">
        <h2 className="text-xl font-medium text-cyan-600 merienda">
          {text}
        </h2>
        <span className="px-2 text-md text-cyan-600 font-bold bg-[#d8f8f5] rounded-full ">
          {count}
        </span>
      </div>
    </>
  );
};

export default TableHeaderText;

TableHeaderText.propTypes = {
   text: PropTypes.string,
   count: PropTypes.number
}
