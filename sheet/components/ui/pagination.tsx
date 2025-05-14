import React from 'react';
import ChevronLeftIcon from '../icons/chevronLeft';
import ChevronRightIcon from '../icons/chevronRight';
import IconButton from './iconButton';
import { cn } from '@/lib/utils';
import Skeleton from './skeleton';
interface PaginationProps {
  totalCount: number;
  pageSize: number;
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showSkeleton?: boolean;
  customEnd?: number; // 因應作業需求，提供自定義的結束筆數，若提供為 0 則會顯示 0-0
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageSize,
  pageCount,
  currentPage,
  onPageChange,
  className,
  showSkeleton,
  customEnd,
}) => {
  const start = totalCount === 0 || customEnd === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end =
    typeof customEnd === 'number' ? customEnd : Math.min(currentPage * pageSize, totalCount);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  };

  return (
    <div
      className={cn('flex items-center justify-end mt-4 text-sm text-gray-500 gap-4', className)}
    >
      <span>
        {showSkeleton ? (
          <Skeleton className="w-12 h-4 rounded-full" />
        ) : (
          <>
            {start}-{end} of {totalCount}
          </>
        )}
      </span>
      <div className="flex gap-4">
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
