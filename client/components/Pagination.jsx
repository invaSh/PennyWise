import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link";

function Pagination({ totalPages, currentPage }) {
  return (
    <div className="flex justify-center items-center mt-5">
      <Link href={currentPage > 1 ? `?page=${currentPage - 1}` : `#`} passHref>
        <button
          className={`px-4 py-2 mx-1 border rounded flex items-center gap-2 ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
          Previous
        </button>
      </Link>

      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index}
          href={`?page=${index + 1}`}
          className={`px-4 py-2 mx-1 border rounded ${
            currentPage === index + 1 ? "bg-gray-200" : "bg-white"
          }`}
        >
          {index + 1}
        </Link>
      ))}

      <Link href={currentPage < totalPages ? `?page=${currentPage + 1}` : `#`} passHref>
        <button
          className={`px-4 py-2 mx-1 border rounded flex items-center gap-2 ${
            currentPage === totalPages ? "cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRight />
        </button>
      </Link>
    </div>
  );
}

export default Pagination;
