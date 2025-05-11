import React from "react";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import IconButton from "./IconButton";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageSize,
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <span>
        {start}-{end} of {totalCount}
      </span>
      <div className="flex gap-2">
        <IconButton
          aria-label="Previous Page"
          tabIndex={0}
          className="hover:bg-gray-200"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="Next Page"
          tabIndex={0}
          className="hover:bg-gray-200"
          disabled={currentPage === pageCount || pageCount === 0}
          onClick={handleNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination; 