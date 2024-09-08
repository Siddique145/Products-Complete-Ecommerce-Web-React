import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Sample data for carousel items
const carouselItems = [
  {
    id: 1,
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1709765693-screen-shot-2024-03-06-at-5-54-32-pm-65e8f42dbb518.png?crop=0.723xw:1.00xh;0.139xw,0&resize=980:*",
    title: "Sale 50% OFF",
    description: "Best Out Standard Glasses",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/61K0OVd--3L._AC_UL480_FMwebp_QL65_.jpg",
    title: "Sale 30% OFF",
    description: "Best way to be Attractive",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/51T1YXiCe7L._AC_UL480_FMwebp_QL65_.jpg",
    title: "Sale 20% OFF",
    description: "Protection from Sunlight",
  },
  // Add more slides as needed
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="relative mt-20 mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={carouselItems[currentIndex].image}
          alt={carouselItems[currentIndex].title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded-lg">
          <h2 className="text-white text-2xl font-semibold">{carouselItems[currentIndex].title}</h2>
          <p className="text-white mt-2">{carouselItems[currentIndex].description}</p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-2xl"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-2xl"
        >
          <FaArrowRight />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
