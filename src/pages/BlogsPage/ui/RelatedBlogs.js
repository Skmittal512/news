import BlogCard from "./BlogCard";
import "./RelatedBlogs.scss";

const RelatedBlogs = ({ blogs = [], variant = "grid" }) => {
  if (!blogs.length) return null;

  return (
    <section className={`related-blogs ${variant}`}>
      <h2>Related Blogs</h2>

      <div className="related-blogs-wrapper">
        {blogs.slice(0, 5).map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
