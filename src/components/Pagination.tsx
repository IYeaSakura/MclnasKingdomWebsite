import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxPageNumbers = 5,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const half = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= half) {
        for (let i = 1; i <= maxPageNumbers; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - half) {
        for (let i = totalPages - maxPageNumbers + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - half; i <= currentPage + half; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-10 h-10"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {showPageNumbers && (
        <>
          {getPageNumbers().map((page, index, array) => {
            const showEllipsisBefore = index > 0 && page > array[index - 1] + 1;
            const showEllipsisAfter = index < array.length - 1 && page < array[index + 1] - 1;

            return (
              <div key={page} className="flex items-center gap-1">
                {showEllipsisBefore && (
                  <span className="text-gray-400 px-2">...</span>
                )}
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => onPageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
                {showEllipsisAfter && (
                  <span className="text-gray-400 px-2">...</span>
                )}
              </div>
            );
          })}
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="w-10 h-10"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
