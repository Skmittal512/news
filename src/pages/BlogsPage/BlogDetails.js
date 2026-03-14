import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import BlogDetailHero from "./ui/BlogDetailHero";
import BlogDetailTabs from "./ui/BlogDetailTabs";
import BlogActionBar from "./ui/BlogActionBar";

// 🔥 FIRESTORE SERVICES
import {
  getNewsById,
  getRelatedNewsFromFirestore,
} from "./services/blogs.service";

import "./BlogDetail.scss";
import FeaturedBlogCard from "./ui/FeaturedBlogCard/FeaturedBlogCard";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      const currentBlog = await getNewsById(id);
      if (!currentBlog) return;

      setBlog(currentBlog);

      const blogs = await getRelatedNewsFromFirestore(
        currentBlog.newsArticleCategory
      );

      setRelatedBlogs(
        blogs.filter((b) => b.id !== currentBlog.id)
      );
    };

    fetchBlogAndRelated();
  }, [id]);

  if (!blog) return null;

  return (
    <>
      {/* 🔥 HERO */}
      <BlogDetailHero blog={blog} />

      {/* 🔥 BELOW HERO ROW */}
      <section className="blog-detail-row">

        {/* RIGHT – CATEGORY + STARS */}
        <div className="blog-detail-right">
          
          <div className="category-rating-pill">
            <FeaturedBlogCard blog={blog}/>
            {/* <div className="category">
              {blog.newsArticleCategory}
            </div>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} />
              ))}
            </div> */}
          </div>
        </div>

        {/* CENTER – TABS */}
        <div className="blog-detail-center">
          <BlogDetailTabs
            key={blog.id}
            blog={blog}
            relatedBlogs={relatedBlogs}
          />
        </div>

        {/* LEFT – ACTION BAR */}
        <div className="blog-detail-left">
          <BlogActionBar />
        </div>

      </section>
    </>
  );
};

export default BlogDetail;