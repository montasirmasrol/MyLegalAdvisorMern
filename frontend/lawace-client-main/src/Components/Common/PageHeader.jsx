import PropTypes from "prop-types";

function PageHeader({ title, track }) {
  return (
    <div className="bg-[#f4ede7] relative p-20 text-center pt-32">
      <h3 className=" text-5xl font-bold">{title}</h3>
      <p className="bg-[#c58b59] w-[340px] mb-[-98px] mx-auto  py-3 mt-10 rounded-3xl text-white font-semibold">
        {track}
      </p>
    </div>
  );
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string,
  track: PropTypes.string,
};
