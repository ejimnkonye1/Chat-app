import { CiSearch } from "react-icons/ci";

export const Searchs = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
      <input
        type="search"
        className="flex-grow p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search..."
        aria-label="Search"
      />
      <button className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition duration-200">
        <CiSearch />
      </button>
    </div>
  );
};