interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-yellow-100 text-black rounded-l-lg hover:bg-gray-400 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
  
        <span className="px-4 py-2 text-xl text-black dark:text-yellow-100">
          Page {currentPage} of {totalPages}
        </span>
  
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-yellow-100 text-black rounded-r-lg hover:bg-gray-400 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  