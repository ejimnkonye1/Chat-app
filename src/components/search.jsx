import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";
export const Searchs = () => {
  
  const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
      
  return (
    <div className="flex justify-between relative inline-block">
      <button onClick={toggleMenu} className="text-3xl pl-3">
                {isOpen ? <HiX /> : <HiOutlineMenu />}
      </button>
      {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <ul className="py-1">
                        <li>
                            <a href="#settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
                        </li>
                        <li>
                            <a href="#profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User Profile</a>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    console.log("Logout clicked");
                                    // Add your logout logic here
                                }}
                                className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm ">
      <input
        type="search"
        className="flex-grow p-2 rounded-l-md focus:outline-none "
        placeholder="Search..."
        aria-label="Search"
      />
      <button className="text-2xl bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition duration-200">
        <CiSearch />
      </button>
    </div>
    </div>
    
  );
};