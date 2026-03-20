import ReactMarkdown from "react-markdown";
import { BookOpen, Sparkles } from "lucide-react";

import "./FeaturedBlogCard.scss";

const FeaturedBlogCard = ({ blog }) => {
  return (
    <div className="featured-blog-card">
      <div className="featured-header">
        <div className="tag">
          <Sparkles size={16} />
          Blog Description
        </div>
      </div>

      <h3 className="headline">
        <BookOpen size={22} />
        <span>{blog.effectiveHeadline}</span>
      </h3>

      <div className="content-box">
        <ReactMarkdown>{blog.newsContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;