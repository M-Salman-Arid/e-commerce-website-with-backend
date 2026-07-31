import "./Categories.css";
import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaBook,
  FaGamepad,
  FaClock,
  FaBasketballBall,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: <FaLaptop />,
  },
  {
    id: 2,
    name: "Mobiles",
    icon: <FaMobileAlt />,
  },
  {
    id: 3,
    name: "Fashion",
    icon: <FaTshirt />,
  },
  {
    id: 4,
    name: "Furniture",
    icon: <FaCouch />,
  },
  {
    id: 5,
    name: "Books",
    icon: <FaBook />,
  },
  {
    id: 6,
    name: "Gaming",
    icon: <FaGamepad />,
  },
  {
    id: 7,
    name: "Watches",
    icon: <FaClock />,
  },
  {
    id: 8,
    name: "Sports",
    icon: <FaBasketballBall />,
  },
];

const Categories = () => {
  return (
    <section className="categories">

      <div className="section-title">
        <h2>Shop by Category</h2>
        <p>Find everything you need in one place.</p>
      </div>

      <div className="categories-grid">

        {categories.map((category) => (
          <div className="category-card" key={category.id}>

            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;