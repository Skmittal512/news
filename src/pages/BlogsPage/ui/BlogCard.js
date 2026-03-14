import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const truncateWords = (text = "", limit = 20) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      className="blog-card"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      <div className="blog-card-image">
        <img
          src={blog.profilePictureLink}
          alt={blog.effectiveHeadline}
        />
      </div>

      <div className="blog-card-content">
        <span className="category">
          {blog.newsArticleCategory}
        </span>

        <h3>{blog.effectiveHeadline}</h3>

        <ReactMarkdown>
          {truncateWords(blog.newsContent, 20)}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogCard;