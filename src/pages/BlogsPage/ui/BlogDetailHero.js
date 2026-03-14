import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";

import "./BlogDetailHero.scss";


const BlogDetailHero = ({ blog }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!blog) return null;

  return (
    <section className="blog-detail-hero">

      {/* HERO BG */}
      <div
        className={`hero-bg ${scrolled ? "hide" : ""}`}
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.15),
              rgba(0,0,0,0.85)
            ),
            url(${blog.profilePictureLink})
          `,
        }}
      />

      {/* STICKY TITLE */}
      <div
        className={`sticky-title ${scrolled ? "show" : ""}`}
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.6),
              rgba(0,0,0,0.9)
            ),
            url(${blog.profilePictureLink})
          `,
        }}
      >
        <Container className="sticky-inner" fluid>

          <button
            className="sticky-back-btn"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack />
          </button>

          <h1>{blog.effectiveHeadline}</h1>

        </Container>
      </div>

      {/* CONTENT */}
      <div className="blog-detail-overlay">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <IoArrowBack />
            <span>Back</span>
          </button>
        </div>

        <Container fluid>
          <div className={`blog-detail-content ${scrolled ? "hide" : ""}`}>
            <h1>{blog.effectiveHeadline}</h1>
          </div>
        </Container>
      </div>

    </section>
  );
};

export default BlogDetailHero;