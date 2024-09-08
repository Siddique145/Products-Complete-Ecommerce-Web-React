import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { CartContext } from "./CartContext";
import { FaShoppingCart } from "react-icons/fa";

function ProductCard({ item }) {
  const { thumbnail, price, category, title, id } = item;
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  // Check if the item is in the cart
  const isInCart = cart.items.some((cartItem) => cartItem.id === id);

  // Handler to add item to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling up to the Link
    if (isInCart) {
      removeItemFromCart(id); // Remove item if already in cart
    } else {
      addItemToCart(item); // Add item if not in cart
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div
          className="relative bg-white rounded-lg shadow-lg overflow-hidden group transition-shadow duration-300 ease-in-out w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
          style={{ cursor: "pointer" }}
        >
          <Link
            to={`/products/${id}`}
            className="block relative w-full h-3/5 rounded-t-lg overflow-hidden group"
          >
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
              src={thumbnail}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          </Link>
          <div className="p-4 h-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm text-gray-500 tracking-widest uppercase mb-1">
                {category}
              </h3>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-lg font-medium text-gray-700">${price}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-lg font-semibold text-white transition-colors duration-300 flex items-center justify-center gap-2 ${
                isInCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              <FaShoppingCart />
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
