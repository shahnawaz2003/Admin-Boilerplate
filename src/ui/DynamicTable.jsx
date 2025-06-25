// import React, { useState } from "react";
// import { Search, Plus } from "lucide-react";

// const DynamicTable = ({
//   data,
//   onDelete,
//   onAdd,
//   onEdit,
//   onStatusChange,
//   onBanStatusChange,
//   showAddButtonIcon = true,
//   onSearch,
//   columns,
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
//   tableTitle = "All Items",
//   addButtonText = "Add New Item",
//   showAddButton = true,
//   showSearchBar = true, // New prop to control search bar visibility
//   isLoading = false,
//   onDateFilter,
//   showDateFilter = false,
//   dateFilterLabels = ["Start Date", "End Date"], // labels for dates, default 2 labels
//   showDateFields = [true, true], // boolean array, controls visibility of each date input
//   dateFilterValues = ["", ""], // optional: controlled values for date inputs
//   onDateFilterChange, // callback to send date filter values on change or on Get click
// }) => {
//   const [dateFilter, setDateFilter] = useState("");
//   const [currentPageState, setCurrentPageState] = useState(currentPage);
//   const [searchInput, setSearchInput] = useState("");
//   const itemsPerPageState = itemsPerPage;

//   const categorizeData = (data) => {
//     return data?.map((item) => {
//       if (!item.parentId) {
//         return { ...item, categoryType: "parent" };
//       } else if (item.parentId === item.id) {
//         return { ...item, categoryType: "child" };
//       } else {
//         return { ...item, categoryType: "sub-child" };
//       }
//     });
//   };

//   const categorizedData = categorizeData(data);

//   const indexOfLastItem = currentPageState * itemsPerPageState;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPageState;
//   const currentItems = data;
//   const renderToggle = (isEnabled) => (
//     <div className="flex items-center">
//       <div
//         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//           isEnabled ? "bg-blue-500" : "bg-gray-200"
//         }`}
//       >
//         <div
//           className={`${
//             isEnabled
//               ? "translate-x-6 bg-white"
//               : "translate-x-1 bg-grayTextclr"
//           } h-4 w-4 rounded-full transition-transform duration-200 ease-in-out`}
//         />
//       </div>
//     </div>
//   );
//   const [localDates, setLocalDates] = useState(["", ""]);

//   // Determine which values to show, controlled or local state
//   const dates =
//     dateFilterValues[0] !== undefined ? dateFilterValues : localDates;

//   const handleDateChange = (index, value) => {
//     if (onDateFilterChange) {
//       const updatedDates = [...dates];
//       updatedDates[index] = value;
//       onDateFilterChange(updatedDates);
//     } else {
//       // local state update
//       const updatedDates = [...localDates];
//       updatedDates[index] = value;
//       setLocalDates(updatedDates);
//     }
//   };

//   const handleGetClick = () => {
//     if (onDateFilter) {
//       onDateFilter(dates);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPageState(pageNumber);
//     onPageChange(pageNumber);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     onSearch && onSearch(searchInput);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       onSearch && onSearch(searchInput);
//     }
//   };

//   const totalPages = Math.ceil(totalItems / itemsPerPageState);

//   const handleStatusToggle = (row) => {
//     const newStatus = row.status === "Active" ? "Inactive" : "Active";
//     onStatusChange(row, newStatus);
//   };

//   const handleBanStatusToggle = (row) => {
//     const newBanStatus = row.isBanned === "Yes" ? "No" : "Yes";
//     onBanStatusChange(row, newBanStatus);
//   };

//   const renderPaginationButtons = () => {
//     const pageNumbers = [];

//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(
//           <button
//             key={i}
//             onClick={() => handlePageChange(i)}
//             className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === i ? "bg-textclr text-white" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//           >
//             {i}
//           </button>,
//         );
//       }
//       return pageNumbers;
//     }

//     pageNumbers.push(
//       <button
//         key={1}
//         onClick={() => handlePageChange(1)}
//         className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === 1 ? "bg-textclr text-white" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//       >
//         1
//       </button>,
//     );

//     let startPage = Math.max(2, currentPageState - 1);
//     let endPage = Math.min(totalPages - 1, currentPageState + 1);

//     if (currentPageState <= 3) {
//       endPage = Math.min(4, totalPages - 1);
//     } else if (currentPageState >= totalPages - 2) {
//       startPage = Math.max(totalPages - 3, 2);
//     }

//     if (startPage > 2) {
//       pageNumbers.push(
//         <span key="ellipsis1" className="px-3 py-1">
//           ...
//         </span>,
//       );
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === i ? "bg-textclr text-white" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//         >
//           {i}
//         </button>,
//       );
//     }

//     if (endPage < totalPages - 1) {
//       pageNumbers.push(
//         <span key="ellipsis2" className="px-3 py-1">
//           ...
//         </span>,
//       );
//     }

//     if (totalPages > 1) {
//       pageNumbers.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === totalPages ? "bg-textclr text-white" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//         >
//           {totalPages}
//         </button>,
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <>
//       <div className="w-full p-4 bg-white rounded-lg shadow-sm">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2 md:gap-1 text-xs">
//           {/* Left: Title */}
//           <div className="text-base me-2 text-secondaryclr font-semibold mb-1 md:mb-0 flex-shrink-0">
//             {tableTitle}
//           </div>

//           {/* Right: Date Filters + Search + Add Button */}
//           <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap w-full md:w-auto justify-end">
//             {/* Date Filters */}
//             {showDateFilter && (
//               <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-start md:justify-start flex-grow max-w-full md:max-w-none">
//                 {showDateFields[0] && (
//                   <div className="flex items-center gap-1 min-w-[110px] max-w-[160px] flex-shrink-0">
//                     <label className="text-[10px] text-grayTextclr whitespace-nowrap">
//                       {dateFilterLabels[0]}
//                     </label>
//                     <input
//                       type="date"
//                       value={dates[0]}
//                       onChange={(e) => handleDateChange(0, e.target.value)}
//                       className="border border-gray-300 rounded-md h-6 px-1.5 w-full max-w-[110px] text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 )}

//                 {showDateFields[1] && (
//                   <div className="flex items-center gap-1 min-w-[110px] max-w-[160px] flex-shrink-0">
//                     <label className="text-[10px] text-grayTextclr whitespace-nowrap">
//                       {dateFilterLabels[1]}
//                     </label>
//                     <input
//                       type="date"
//                       value={dates[1]}
//                       onChange={(e) => handleDateChange(1, e.target.value)}
//                       className="border border-gray-300 rounded-md h-6 px-1.5 w-full max-w-[110px] text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 )}

//                 <button
//                   className="flex items-center gap-1 bg-[#007DFF] hover:bg-[#0069E0] text-white px-2 py-0.5 rounded-md font-semibold min-w-[65px] justify-center text-[10px] flex-shrink-0"
//                   onClick={handleGetClick}
//                 >
//                   <Search className="h-3 w-3" />
//                   <span>Get</span>
//                 </button>
//               </div>
//             )}

//             {/* Search + Add Button */}
//             <div className="flex flex-col md:flex-row gap-1 items-center w-full md:w-auto mt-1 md:mt-0">
//               {showSearchBar && onSearch && (
//                 <div className="relative w-full md:w-48">
//                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
//                   <input
//                     type="text"
//                     placeholder="Search here..."
//                     className="pl-7 w-full h-7 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[10px]"
//                     value={searchInput}
//                     onChange={handleSearchInputChange}
//                     onKeyPress={handleKeyPress}
//                   />
//                   <button
//                     className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#007DFF] text-white px-1.5 py-0.5 rounded-md text-[10px]"
//                     onClick={handleSearchSubmit}
//                   >
//                     Search
//                   </button>
//                 </div>
//               )}

//               {showAddButton && onAdd && (
//                 <button
//                   onClick={onAdd}
//                   className="bg-[#007DFF] hover:bg-[#007DFF] text-white px-2 py-1 rounded-md flex items-center gap-1 transition-colors duration-200 w-full md:w-auto text-[10px]"
//                 >
//                   {showAddButtonIcon && (
//                     <Plus className="hidden md:block h-3 w-3" />
//                   )}
//                   {addButtonText}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           {isLoading ? (
//             <div className="flex justify-center items-center py-10">
//               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-textclr"></div>
//             </div>
//           ) : (
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-50">
//                   {columns?.map((column, index) => (
//                     <th
//                       key={index}
//                       className="px-4 py-3 text-left text-xs font-medium text-grayTextclr uppercase tracking-wider border-b border-gray-200"
//                     >
//                       {column.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentItems?.length > 0 ? (
//                   currentItems.map((row, rowIndex) => (
//                     <tr
//                       key={rowIndex}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       {columns.map((column) => (
//                         <td
//                           key={column.key}
//                           className="px-4 py-3 text-sm text-gray-700"
//                         >
//                           {column.key === "status" && column.toggleable ? (
//                             <div
//                               onClick={() => handleStatusToggle(row)}
//                               className="cursor-pointer"
//                             >
//                               {renderToggle(row.status === "Active")}
//                             </div>
//                           ) : column.key === "isBanned" && column.toggleable ? (
//                             <div
//                               onClick={() => handleBanStatusToggle(row)}
//                               className="cursor-pointer"
//                             >
//                               {renderToggle(row.isBanned === "Yes")}
//                             </div>
//                           ) : (
//                             row[column.key]
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={columns.length}
//                       className="px-4 py-8 text-center text-grayTextclr"
//                     >
//                       No records found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination Controls with Ellipsis */}
//         {!isLoading && totalPages > 0 && (
//           <div className="flex justify-between items-center mt-4">
//             <div>
//               Showing {currentItems?.length} of {totalItems} entries
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(currentPageState - 1)}
//                 disabled={currentPageState === 1}
//                 className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === 1 ? "text-gray-400 cursor-not-allowed" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//               >
//                 &lt; {/* Left Arrow */}
//               </button>

//               {renderPaginationButtons()}

//               <button
//                 onClick={() => handlePageChange(currentPageState + 1)}
//                 disabled={currentPageState === totalPages}
//                 className={`px-3 py-1 rounded-md border border-gray-300 ${currentPageState === totalPages ? "text-gray-400 cursor-not-allowed" : "text-secondaryclr hover:bg-[#007DFF]"}`}
//               >
//                 &gt; {/* Right Arrow */}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DynamicTable;

import React, { useState, useEffect } from "react";
import { Search, Plus, AlertCircle } from "lucide-react";

const DynamicTable = ({
  data,
  onDelete,
  onAdd,
  onEdit,
  onStatusChange,
  onBanStatusChange,
  showAddButtonIcon = true,
  onSearch,
  columns,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  tableTitle = "All Items",
  addButtonText = "Add New Item",
  showAddButton = true,
  showSearchBar = true,
  isLoading = false,
  onDateFilter,
  showDateFilter = false,
  dateFilterLabels = ["Start Date", "End Date"],
  showDateFields = [true, true],
  dateFilterValues = ["", ""],
  onDateFilterChange,
  validateDateRange = true, // New prop for date validation
}) => {
  // Sync with external currentPage prop
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [searchInput, setSearchInput] = useState("");
  const [dateError, setDateError] = useState("");

  // Sync currentPageState when currentPage prop changes
  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

  // Use local state only if controlled props are not provided
  const [localDates, setLocalDates] = useState(dateFilterValues || ["", ""]);

  // Decide which date values to display: controlled or local
  // Check if dateFilterValues is actually being controlled (not just default empty array)
  const isControlled = onDateFilterChange && dateFilterValues && Array.isArray(dateFilterValues);
  const dates = isControlled ? dateFilterValues : localDates;

  // Date validation function
  const validateDates = (startDate, endDate) => {
    if (!validateDateRange) return true;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        setDateError("Start date must be before end date");
        return false;
      }
    }
    
    setDateError("");
    return true;
  };

  const handleDateChange = (index, value) => {
    if (isControlled) {
      // Controlled: call parent handler with updated values
      const updatedDates = [...dates];
      updatedDates[index] = value;
      onDateFilterChange(updatedDates);
    } else {
      // Uncontrolled: update local state
      const updatedDates = [...localDates];
      updatedDates[index] = value;
      setLocalDates(updatedDates);
      
      // Validate dates after local update
      validateDates(updatedDates[0], updatedDates[1]);
    }
  };

  const handleGetClick = () => {
    // Validate dates before filtering
    if (!validateDates(dates[0], dates[1])) {
      return;
    }

    // Check if at least one date is provided
    if (!dates[0] && !dates[1]) {
      setDateError("Please select at least one date");
      return;
    }

    if (onDateFilter) {
      onDateFilter(dates);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    setCurrentPageState(pageNumber);
    if (onPageChange) onPageChange(pageNumber);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchInput.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) onSearch(searchInput.trim());
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleStatusToggle = (row) => {
    if (!onStatusChange) return;
    const newStatus = row.status === "Active" ? "Inactive" : "Active";
    onStatusChange(row, newStatus);
  };

  const handleBanStatusToggle = (row) => {
    if (!onBanStatusChange) return;
    const newBanStatus = row.isBanned === "Yes" ? "No" : "Yes";
    onBanStatusChange(row, newBanStatus);
  };

  const renderToggle = (isEnabled) => (
    <div className="flex items-center">
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`${
            isEnabled
              ? "translate-x-6 bg-white"
              : "translate-x-1 bg-gray-400"
          } h-4 w-4 rounded-full transition-transform duration-200 ease-in-out`}
        />
      </div>
    </div>
  );

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
              currentPageState === i
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
            }`}
          >
            {i}
          </button>,
        );
      }
      return pageNumbers;
    }

    // First page
    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
          currentPageState === 1
            ? "bg-blue-600 text-white border-blue-600"
            : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
        }`}
      >
        1
      </button>,
    );

    let startPage = Math.max(2, currentPageState - 1);
    let endPage = Math.min(totalPages - 1, currentPageState + 1);

    if (currentPageState <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPageState >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    if (startPage > 2) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-3 py-1 text-gray-400">
          ...
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
            currentPageState === i
              ? "bg-blue-600 text-white border-blue-600"
              : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-3 py-1 text-gray-400">
          ...
        </span>,
      );
    }

    // Last page
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
            currentPageState === totalPages
              ? "bg-blue-600 text-white border-blue-600"
              : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  const currentItems = data;
  
  // Calculate display range for pagination info
  const startItem = totalItems > 0 ? (currentPageState - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPageState * itemsPerPage, totalItems);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2 md:gap-1 text-xs">
        {/* Left: Title */}
        <div className="text-base me-2 text-[#2B3674] font-bold mb-1 md:mb-0 flex-shrink-0">
          {tableTitle}
        </div>

        {/* Right: Date Filters + Search + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap w-full md:w-auto justify-end">
          {/* Date Filters */}
          {showDateFilter && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-start md:justify-start flex-grow max-w-full md:max-w-none">
                {showDateFields[0] && (
                  <div className="flex items-center gap-1 min-w-[110px] max-w-[160px] flex-shrink-0">
                    <label className="text-[11px] text-gray-500 whitespace-nowrap">
                      {dateFilterLabels[0]}
                    </label>
                    <input
                      type="date"
                      value={dates[0]}
                      onChange={(e) => handleDateChange(0, e.target.value)}
                      className={`border rounded-md h-8 px-1.5 w-[110px] text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        dateError ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                )}

                {showDateFields[1] && (
                  <div className="flex items-center gap-1 min-w-[110px] max-w-[160px] flex-shrink-0">
                    <label className="text-[11px] text-gray-500 whitespace-nowrap">
                      {dateFilterLabels[1]}
                    </label>
                    <input
                      type="date"
                      value={dates[1]}
                      onChange={(e) => handleDateChange(1, e.target.value)}
                      className={`border rounded-md h-8 px-1.5 w-[110px] text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        dateError ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleGetClick}
                  disabled={!!dateError}
                  className={`flex items-center gap-1 px-2 py-2 rounded-md font-semibold min-w-[60px] justify-center text-[12px] flex-shrink-0 transition-colors ${
                    dateError 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Get</span>
                </button>
              </div>
              
              {/* Date Error Message */}
              {dateError && (
                <div className="flex items-center gap-1 text-red-600 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{dateError}</span>
                </div>
              )}
            </div>
          )}

          {/* Search + Add Button */}
          <div className="flex flex-col md:flex-row gap-1 items-center w-full md:w-auto mt-1 md:mt-0">
            {showSearchBar && onSearch && (
              <div className="relative w-full md:w-48">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="pl-7 w-full h-9 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[10px]"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-1.5 py-1 rounded-md text-[10px] hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </div>
            )}

            {showAddButton && onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2.5 rounded-md flex items-center gap-1 transition-colors duration-200 w-full md:w-auto text-[10px]"
              >
                {showAddButtonIcon && (
                  <Plus className="hidden md:block h-3 w-3" />
                )}
                {addButtonText}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {columns?.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems?.length > 0 ? (
                currentItems.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        {column.render ? (
                          column.render(row[column.key], row)
                        ) : column.key === "status" && column.toggleable ? (
                          <div
                            onClick={() => handleStatusToggle(row)}
                            className="cursor-pointer"
                          >
                            {renderToggle(row.status === "Active")}
                          </div>
                        ) : column.key === "isBanned" && column.toggleable ? (
                          <div
                            onClick={() => handleBanStatusToggle(row)}
                            className="cursor-pointer"
                          >
                            {renderToggle(row.isBanned === "Yes")}
                          </div>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {totalItems} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPageState - 1)}
              disabled={currentPageState === 1}
              className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
                currentPageState === 1
                  ? "text-gray-400 cursor-not-allowed bg-gray-100"
                  : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              ‹ Previous
            </button>

            {renderPaginationButtons()}

            <button
              onClick={() => handlePageChange(currentPageState + 1)}
              disabled={currentPageState === totalPages}
              className={`px-3 py-1 rounded-md border border-gray-300 transition-colors ${
                currentPageState === totalPages
                  ? "text-gray-400 cursor-not-allowed bg-gray-100"
                  : "text-blue-600 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;