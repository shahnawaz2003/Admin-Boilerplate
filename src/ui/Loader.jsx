import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
    </div>
  );
};

export default Loader;
