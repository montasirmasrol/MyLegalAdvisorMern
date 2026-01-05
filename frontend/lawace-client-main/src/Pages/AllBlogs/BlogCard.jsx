import { FaRegCalendarAlt } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const { _id, blog_title, blog_image, date, description } = blog;

  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden group">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden">
          <img
            src={blog_image}
            alt={blog_title}
            className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105 "
          />

          <time className="absolute bottom-0 left-0 text-sm rounded-tr-2xl bg-white text-gray-700 p-2 flex items-center gap-2">
            <FaRegCalendarAlt />
            {date}
          </time>
        </div>

        {/* Content */}
        <div className="space-y-3 mt-3">
          <h3 className="text-xl font-bold text-[#002626] line-clamp-2">
            {blog_title}
          </h3>

          <p className="text-gray-600 line-clamp-3">{description}</p>

          <Link
            to={`/blogDetails/${_id}`}
            className="inline-flex items-center text-[#C19A5B] hover:text-[#A88347] transition-colors group"
          >
            <span className="font-medium">DISCOVER MORE</span>
            <GoArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
