// function CategoryChips({ category, isChosen, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center h-10 px-4 rounded-md cursor-pointer border 
//         ${isChosen ? "bg-purple-500 text-white" : "bg-white text-black"} 
//         hover:bg-purple-500 hover:text-white transition-colors duration-300`}
//     >
//       {category.name}
//       {category.all}
//     </div>
//   );
// }

// export default CategoryChips;
import React from 'react';

function CategoryDropdown({ categories, chosenCategory, onCategoryChange }) {
  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        value={chosenCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="block w-full h-10 px-4 rounded-md border border-gray-300 bg-white text-black focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
