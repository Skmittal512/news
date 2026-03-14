import { Nav } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaThLarge,
  FaUsers,
  FaLeaf,
  FaLaptopCode,
} from "react-icons/fa";
import "./CategoryTabs.scss";

const CATEGORY_ICON_MAP = {
  All: <FaThLarge />,
  "Community and social impact": <FaUsers />,
  "Education and Sustainability": <FaLeaf />,
  "Technology in Education": <FaLaptopCode />,
};

const CategoryTabs = ({
  categories = [],
  activeCategory,
  setActiveCategory,
  scrolled,
}) => {
  if (!categories.length) return null;

  return (
    <div className={`category-sticky ${scrolled ? "active" : ""}`}>
      <motion.div
        className="category-motion"
        initial={false}
        animate={{ scale: scrolled ? 0.96 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Nav className="category-tabs">
          {categories.map(category => {
            const isActive = activeCategory === category;

            return (
              <Nav.Item key={category}>
                <button
                  type="button"
                  className={`category-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="icon">
                    {CATEGORY_ICON_MAP[category] || <FaThLarge />}
                  </span>

                  <span className="label">{category}</span>
                </button>
              </Nav.Item>
            );
          })}
        </Nav>
      </motion.div>
    </div>
  );
};

export default CategoryTabs;
