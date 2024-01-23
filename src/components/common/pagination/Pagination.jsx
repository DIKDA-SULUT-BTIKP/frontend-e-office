import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const Pagination = ({ changePage, pages, rows }) => {
  return (
    <nav
      className="flex items-center justify-between w-full"
      role="navigation"
      aria-label="pagination"
    >
      <p className="text-sm">
        Total Surat <span className="font-semibold">{rows}</span>
      </p>
      <ReactPaginate
        previousLabel={
          <>
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </>
        }
        nextLabel={
          <>
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </>
        }
        pageCount={Math.min(10, pages)}
        onPageChange={changePage}
        containerClassName={"flex items-center -space-x-px h-8 text-sm"}
        pageLinkClassName={
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }
        previousLinkClassName={
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }
        nextLinkClassName={
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }
        activeLinkClassName={"bg-red-200 "}
        disabledLinkClassName={
          "flex items-center bg-gray-200 justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        }
      />
    </nav>
  );
};

Pagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};
export default Pagination;
