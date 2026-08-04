import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCartCountAPI } from "../../api/cartAPI";


const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!token;

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (isLoggedIn) {
        try {
          const response = await getCartCountAPI();
          setCartCount(response.data.count);
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }
    };

    fetchCartCount();
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ShopEase</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/wishlist">
            <FaHeart />
          </Link>
        </li>

        <li className="cart">
          <Link to="/cart">
            <FaShoppingCart />
            <span className="cart-count">{cartCount}</span>
          </Link>
        </li>

        <li>
          {isLoggedIn ? (
            <Link to="/profile">
              <FaUser /> {user?.name || "Profile"}
            </Link>
          ) : (
            <Link to="/login">
              <FaUser /> Login
            </Link>
          )}
        </li>
        
        
      </ul>
    </nav>
  );
};

export default Navbar;