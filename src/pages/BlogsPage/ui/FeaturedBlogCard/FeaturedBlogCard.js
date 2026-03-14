import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

import "./FeaturedBlogCard.scss";

const FeaturedBlogCard = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const maxLength = 180;

  const content = expanded
    ? blog.newsContent
    : blog.newsContent.slice(0, maxLength) + "...";

  return (
    <div className="featured-blog-card">

      <div className="featured-header">
        <div className="tag">
          <Sparkles size={16} />
          Blog Description
        </div>
      </div>

      <h3 className="headline">
        <BookOpen size={20} />
        {blog.effectiveHeadline}
      </h3>

      <div className="content-box">
        <ReactMarkdown>{content}</ReactMarkdown>

        {blog.newsContent.length > maxLength && (
          <button
            className="show-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show More <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
};

export default FeaturedBlogCard;