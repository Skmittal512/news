import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import {
  FaFileAlt,
  FaLink,
  FaInfoCircle,
  FaComments,
  FaArrowUp,
  FaNotesMedical,
  FaClone,
  FaRegListAlt,
} from "react-icons/fa";

import BlogContent from "./BlogContent";
import RelatedBlogs from "./RelatedBlogs";
import ThreadDiscussion from "./Discussion/ThreadDiscussion";
import "./BlogDetailTabs.scss";

const TABS = [
  { key: "content", label: "Content", icon: <FaFileAlt /> },
  { key: "notes", label: "Notes", icon: < FaNotesMedical /> },
  { key: "related", label: "Related", icon: <FaLink /> },
  { key: "info", label: "Info", icon: <FaInfoCircle /> },
  { key: "discussion", label: "Discussion", icon: <FaComments /> },
  { key: "feedback", label: "Feedback", icon: <FaClone /> },
];

const BlogDetailTabs = ({ blog, relatedBlogs }) => {
  const [activeTab, setActiveTab] = useState("content");
  const [showTop, setShowTop] = useState(false);

  // 🔥 Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // jab naya blog load ho
    setActiveTab("content");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [blog?.id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="blog-detail-tabs-wrapper">
      <div className="tabs-card">

        {/* 🔥 STICKY HEADER */}
        <div className="tabs-header">
          <div className="category-motion">
            <Nav className="blog-category-tabs">
              {TABS.map(tab => {
                const isActive = activeTab === tab.key;

                return (
                  <Nav.Item key={tab.key}>
                    <button
                      className={`blog-category-tab ${isActive ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      <span className="icon">{tab.icon}</span>
                      <span className="label">{tab.label}</span>
                    </button>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>
        </div>

        {/* 🔥 BODY */}
        <div className="tabs-body">

          {activeTab === "content" && (
            <div className="tab-content-wrapper">
              <BlogContent content={blog.newsContent} />
              <RelatedBlogs blogs={relatedBlogs} />
            </div>
          )}



          {activeTab === "related" && (
            <div className="tab-content-wrapper">
              <RelatedBlogs
                blogs={relatedBlogs}
                variant="grid"
              />
            </div>
          )}

          {activeTab === "info" && (
            <div className="tab-content-wrapper">
              <div className="tab-placeholder">
                Info content coming soon...
              </div>
            </div>
          )}

          {activeTab === "discussion" && (
            <div className="tab-content-wrapper">
              <ThreadDiscussion
                threadID="qbqed8PKYLfoYCuu602J"
                thread={blog}
              />
            </div>
          )}

        </div>
      </div>

      {/* 🔥 BACK TO TOP BUTTON */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}

    </section>
  );
};

export default BlogDetailTabs;