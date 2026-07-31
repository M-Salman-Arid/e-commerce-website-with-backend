import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          🔥 Summer Sale 2026
        </span>

        <h1>
          Shop Smarter,
          <br />
          Live Better.
        </h1>

        <p>
          Discover thousands of quality products at amazing prices.
          Fast delivery, secure payments, and exclusive deals every day.
        </p>

        <div className="hero-buttons">

          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>

          <Link to="/categories" className="btn-secondary">
            Browse Categories
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700"
          alt="Shopping"
        />

      </div>

    </section>
  );
};

export default Hero;