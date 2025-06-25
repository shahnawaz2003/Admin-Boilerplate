import React from "react";
const Tabs = ({ setCurrentCategory, currentCategory, categories }) => {
  return (
    <>
      <div className="flex justify-start items-center gap-1 mb-4">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`px-4 py-2 rounded-md  ${
              currentCategory.id === category.id
                ? "bg-blue-900 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>
    </>
  );
};
export default Tabs;
