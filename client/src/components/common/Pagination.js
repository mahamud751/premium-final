"use client";
import { useState } from "react";

export default function Pagination({ meta = {}, onPageChange }) {
  const { current_page = 1, last_page = 1 } = meta;
  const [page, setPage] = useState(current_page);

  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (last_page <= 5) return pages;

    const start = Math.max(1, page - 2);
    const end = Math.min(last_page, page + 2);

    let visiblePages = pages.slice(start - 1, end);

    if (start > 2) visiblePages = [1, "...", ...visiblePages];
    if (end < last_page - 1) visiblePages = [...visiblePages, "...", last_page];

    return visiblePages;
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && newPage <= last_page) {
      setPage(newPage);
      onPageChange(newPage); // Trigger API call for new page
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav
        className="flex items-center justify-center gap-2 py-4"
        aria-label="Pagination"
      >
        <div
          className={`px-3 py-2 rounded-md text-sm font-medium 
            ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          aria-disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </div>

        <div className="hidden sm:flex gap-1">
          {getVisiblePages().map((p, index) => (
            <div
              key={index}
              className={`px-3 py-2 rounded-md text-sm font-medium 
                ${
                  p === page
                    ? "bg-[#16542A] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
                ${p === "..." ? "cursor-default pointer-events-none" : ""}`}
              onClick={() => p !== "..." && handlePageChange(p)}
            >
              {p}
            </div>
          ))}
        </div>

        <div className="sm:hidden text-sm font-medium text-gray-700">
          Page {page} of {last_page}
        </div>

        <div
          className={`px-3 py-2 rounded-md text-sm font-medium 
            ${
              page === last_page
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          aria-disabled={page === last_page}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </div>
      </nav>
    </div>
  );
}
