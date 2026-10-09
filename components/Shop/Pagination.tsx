import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, 2, total - 1, total, current]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const withEllipsis: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) withEllipsis.push("ellipsis");
    withEllipsis.push(page);
  });
  return withEllipsis;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPageList(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="w-fit mx-auto mt-16 flex items-center justify-center gap-4 border border-1px border-[#E9E9EB] rounded-md py-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#4C4C4C] transition-colors hover:bg-black/5 disabled:opacity-30"
      >
        <ChevronLeft />
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="small-sub px-1">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-dm-sans text-sm transition-colors ${
              page === currentPage
                ? " text-black"
                : "text-[#474B57] hover:bg-black/5"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#474B57] transition-colors hover:bg-black/5 disabled:opacity-30"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
