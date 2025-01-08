import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100
                   bg-white dark:bg-slate-800 shadow-lg disabled:shadow-none"
      >
        <ChevronsLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100
                   bg-white dark:bg-slate-800 shadow-lg disabled:shadow-none"
      >
        <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      <div className="flex gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 
                        ${
                          currentPage === page
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-lg"
                        }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100
                   bg-white dark:bg-slate-800 shadow-lg disabled:shadow-none"
      >
        <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100
                   bg-white dark:bg-slate-800 shadow-lg disabled:shadow-none"
      >
        <ChevronsRight className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </button>
    </div>
  );
};

export default Pagination;
