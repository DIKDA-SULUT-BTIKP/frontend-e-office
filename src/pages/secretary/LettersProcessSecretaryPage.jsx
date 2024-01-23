import SecretaryLayout from "../../layout/SecretaryLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/pagination/Pagination";

const LettersProcessPage = () => {
  const [letters, setLetters] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 10;
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const fetchLetters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/letters/process/secretary?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setLetters(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    fetchLetters();
  }, [page, keyword]);

  return (
    <SecretaryLayout>
      <div className="container px-4 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <form
            onSubmit={searchData}
            className="relative flex items-center mt-4 md:mt-0"
          >
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </form>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Nomor Surat
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Surat
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      ></th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {letters.map((item, index) => (
                      <tr key={item.No}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          {index + 1 + page * limit}
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {item.originOfLetter}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {item.status}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <Link
                            to={`/secretary/letter/process/${item.uuid}`}
                            className="p-2 text-gray-500 uppercase transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Pagination changePage={changePage} pages={pages} rows={rows} />
        </div>
      </div>
    </SecretaryLayout>
  );
};

export default LettersProcessPage;
