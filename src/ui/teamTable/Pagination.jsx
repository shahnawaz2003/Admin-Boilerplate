import PropTypes from "prop-types";

const Pagination = ({
  setCardsPerPage,
  totalCards,
  cardsPerPage = 12, // Default value set to 12
  currentPage,
  setCurrentPage,
  siblingCount = 1,
}) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const generatePageNumbers = () => {
    const range = [];
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      range.push(1);

      if (startPage > 2) range.push("...");

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      if (endPage < totalPages - 1) range.push("...");

      range.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    }

    return range;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination mx-auto my-8 flex w-[85%] flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
      <div className="flex items-center justify-center space-x-1 md:space-x-2">
        <button
          className={`rounded px-1 py-1 text-xs sm:text-base ${
            currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers?.map((page, index) => (
          <button
            key={index}
            className={`rounded border px-2 py-1 text-xs sm:px-3 sm:text-base ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-white"
            } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`rounded border px-1 py-1 text-xs sm:px-3 sm:text-base ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-300"
              : "bg-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex justify-between">
        <div>
          <label
            htmlFor="cardsPerPage"
            className="mr-2 font-poppins font-semibold"
          >
            Cards per page:
          </label>
          <select
            id="cardsPerPage"
            value={cardsPerPage}
            onChange={(e) => setCardsPerPage(Number(e.target.value))}
            className="border border-gray-300 p-1 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={12}>12</option> {/* Added 12 as an option */}
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalCards: PropTypes.number,
  cardsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  siblingCount: PropTypes.number,
};

export default Pagination;
