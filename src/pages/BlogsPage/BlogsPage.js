import { useEffect, useState } from "react";
import BlogsHero from "./ui/BlogsHero";
import CategoryTabs from "./ui/CategoryTabs";
import BlogsGrid from "./ui/BlogsGrid";

import { ArrowUp } from "lucide-react";

// 🔥 ALGOLIA
import {
  getBlogsFromAlgolia,
  getCategoriesFromAlgolia,
} from "./services/blogs.algolia.service";

// 🔥 FIRESTORE
import {
  getNewsByCategoryFromFirestore,
} from "./services/blogs.service";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [scrolled, setScrolled] = useState(false);

  // 🔥 BACK TO TOP STATE
  const [showTop, setShowTop] = useState(false);

  // 🔥 FETCH CATEGORIES
  useEffect(() => {
    getCategoriesFromAlgolia().then((cats) =>
      setCategories(["All", ...cats])
    );
  }, []);

  useEffect(() => {
    console.log("ACTIVE CATEGORY:", activeCategory);
  }, [activeCategory]);

  // 🔥 FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ALL BLOGS → ALGOLIA
        if (activeCategory === "All") {
          const res = await getBlogsFromAlgolia({
            page: currentPage - 1,
            hitsPerPage: 18,
          });

          setBlogs(res.blogs);
          setTotalPages(res.totalPages);
          return;
        }

        // CATEGORY BLOGS → FIRESTORE
        const res = await getNewsByCategoryFromFirestore(activeCategory);

        setBlogs(res);
        setTotalPages(1);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [activeCategory, currentPage]);

  // 🔥 RESET PAGE WHEN CATEGORY CHANGES
  useEffect(() => {
    if (activeCategory !== "All") {
      setCurrentPage(1);
    }
  }, [activeCategory]);

  // 🔥 SCROLL LOGIC
  useEffect(() => {
    let unlockTimer = null;

    const onScroll = () => {
      const y = window.scrollY;

      // BACK TO TOP VISIBILITY
      if (y > 200) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }

      setScrolled((prev) => {
        if (y > 5 && !prev) {
          clearTimeout(unlockTimer);

          unlockTimer = setTimeout(() => {}, 1500);

          return true;
        }

        if (y < 5 && prev) {
          clearTimeout(unlockTimer);

          unlockTimer = setTimeout(() => {
            setScrolled(false);
          }, 1500);

          return prev;
        }

        return prev;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 SCROLL TO TOP
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {blogs.length > 0 && (
        <BlogsHero blogs={blogs.slice(0, 5)} scrolled={scrolled} />
      )}

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        scrolled={scrolled}
      />

      <BlogsGrid
        blogs={blogs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* 🔥 BACK TO TOP BUTTON */}
      {showTop && (
        <button className="backToTop" onClick={scrollToTop}>
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
};

export default BlogPage;