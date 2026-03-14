import { Container, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./BlogsHero.scss";
import ReactMarkdown from "react-markdown";

const truncateWords = (text = "", limit = 20) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const BlogsHero = ({ blogs = [], scrolled }) => {
  const navigate = useNavigate();

  if (!blogs.length) return null;

  return (
    <section className={`blogs-hero ${scrolled ? "scrolled" : ""}`}>
      <Carousel
        fade
        controls={!scrolled}
        indicators={false}
        interval={3000}
        pause={false}
      >
        {blogs.map((blog, index) => (
          <Carousel.Item key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${blog.profilePictureLink})`,
              }}
            >
              <div className="blogs-hero-overlay">

                {/* TOPBAR */}
                <div className="hero-topbar">

                  <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                  >
                    <IoArrowBack className="back-icon" />
                    {!scrolled && <span>Back</span>}
                  </button>

                  {scrolled && <h1>{blog.effectiveHeadline}</h1>}
                </div>

                {/* HERO CONTENT */}
                {!scrolled && (
                  <Container className="hero-content">
                    <span className="category">
                      {blog.newsArticleCategory}
                    </span>

                    <h1>{blog.effectiveHeadline}</h1>

                    <ReactMarkdown>
                      {truncateWords(blog.newsContent, 20)}
                    </ReactMarkdown>
                  </Container>
                )}

              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default BlogsHero;