import { useState } from "react";
import PropTypes from 'prop-types';
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";
export const Searchs = ({searchQuery,setSearchQuery}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      
  return (
    <div className="flex justify-between relative inline-block">
      <button onClick={toggleMenu} className="text-3xl pl-3">
                {isOpen ? <HiX /> : <HiOutlineMenu />}
      </button>
      {isOpen && (
                <div className="absolute left-0 mt-10 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
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
            <div className="flex relative items-center border border-gray-300 rounded-full text-left shadow-sm">
              <button className="text-xl text-gray-500 px-3" aria-label="Search Icon">
                <CiSearch />
              </button>
              <div>
              <input
                type="search"
                className="flex-grow p-2 rounded-full focus:outline-none pr-24"
                placeholder="Search..."
                aria-label="Search"
                value={searchQuery}
                onChange={handleInputChange}
              />
              </div>
            </div>
    </div>
    
  );
};

Searchs.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired, // setSearchQuery must be a function and is required
};