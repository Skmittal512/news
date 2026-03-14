import ReactMarkdown from "react-markdown";

import "./BlogContent.scss"

const BlogContent = ({ content }) => {
  if (!content) return null;

  return (
    <div className="blog-content-wrapper">
      <div className="blog-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogContent;
