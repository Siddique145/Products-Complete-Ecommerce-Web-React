import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryDropdown from "../components/CategoryChips";
import Header from "../components/Header";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default"); // New state for sorting
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sortParams =
      sortOption === "default" ? "" : `&sortBy=${sortOption}&order=asc`;
    const url =
      chosenCategory === "All"
        ? `https://dummyjson.com/products?${sortParams}`
        : `https://dummyjson.com/products/category/${chosenCategory}?${sortParams}`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoadingProducts(false);
      });
  }, [chosenCategory, sortOption]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
        setLoadingCategories(false);
      });
  }, []);

  if (loadingProducts || loadingCategories) {
    return (
      <div className="loader-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <style>
          {`
            .loader-container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(255, 255, 255, 0.8);
              z-index: 1000;
            }
            
            .dot {
              position: relative;
              width: 20px;
              height: 20px;
              margin: 5px;
              border-radius: 50%;
              background-color: black;
              animation: bounce 1.2s infinite ease-in-out;
            }
            
            .dot:nth-child(2) {
              animation-delay: -0.4s;
            }
            
            .dot:nth-child(3) {
              animation-delay: -0.8s;
            }
            
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-30px);
              }
              60% {
                transform: translateY(-15px);
              }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-20">
        <div className="my-4 flex h-12 gap-4">
          <CategoryDropdown
            categories={categories}
            chosenCategory={chosenCategory}
            onCategoryChange={setChosenCategory}
          />
          <div className="relative inline-block w-full max-w-xs">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full h-10 px-4 rounded-md border border-gray-300 bg-white text-black focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            >
              <option value="default">Default Sort</option>
              <option value="title">Sort by Title</option>
              <option value="price">Sort by Price</option>
              {/* Add more sorting options if needed */}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -m-4 my-4">
          {products.length > 0 ? (
            products.map((item) => <ProductCard item={item} key={item.id} />)
          ) : (
           <>
            <Header/>
            <h2 className="mt-24">No products available.</h2>
           </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
