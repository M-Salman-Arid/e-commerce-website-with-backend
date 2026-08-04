import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../../api/productAPI";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        getProducts(),
                        getCategories()
                    ]);     

                setProducts(productsResponse.products || []);
                setCategories(categoriesResponse.categories || []);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, []);

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            (product.title || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All"
                ? true
                : product.category_id === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    return (
        <>
            <Navbar />

            <section className="products-page">

                <div className="products-heading">
                    <h1>Our Products</h1>
                    <p>Find the best products at the best prices.</p>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="category-buttons">

                    <button
                        className={selectedCategory === "All" ? "active" : ""}
                        onClick={() => setSelectedCategory("All")}
                    >
                        All
                    </button>

                    {categories.map(category => (

                        <button
                            key={category.id}
                            className={
                                selectedCategory === category.id
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </button>

                    ))}

                </div>

                {loading ? (
                    <div className="loading">
                        Loading products...
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        No products found.
                    </div>
                )}

            </section>

            <Footer />
        </>
    );
};

export default Products;