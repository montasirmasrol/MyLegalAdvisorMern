import useBlogs from "../../../Hooks/useBlogs";
import BlogCard from "../../../Pages/AllBlogs/BlogCard";
import LoadingSpinner from "../../Common/LoadingSpinner";

export default function BlogSection() {
  const [allBlogs, isLoading] = useBlogs();

  return (
    <section className="py-16 px-4 mt-32">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C19A5B] font-medium mb-2 block">
            OUR BLOG
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002626]">
            Explore Our Latest Blog
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            allBlogs
              .slice(0, 3)
              .map((blog) => <BlogCard key={blog?._id} blog={blog} />)
          )}
        </div>
      </div>
    </section>
  );
}
