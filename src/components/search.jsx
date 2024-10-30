import { useState } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export const Searchs = () => {
  const darkMode = useSelector((state) => state.darkMode)
  const [isOpen, setIsOpen] = useState(false);
  
  const handleInputChange = () => {
    // setSearchQuery(e.target.value)
  }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      
  return (
    <div className={`flex justify-between relative inline-block ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <button onClick={toggleMenu} className="text-3xl pl-3">
                {isOpen ? <HiX /> : <HiOutlineMenu />}
      </button>
      {isOpen && (
                <div className="absolute left-0 mt-10 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <ul className="py-1">
                        <li>
                            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
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
       <div className="flex relative items-center border border-gray-300 rounded-full text-left shadow-sm w-full max-w-xs mx-auto"> {/* Added w-full and max-w-xs */}
  <button className="text-xl  px-3" aria-label="Search Icon">
    <CiSearch />
  </button>
  <div className="flex-grow"> {/* Ensure the input takes available space */}
    <input
      type="search"
      className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100  p-2 rounded-full focus:outline-none pr-10" // Changed to w-full for responsive input
      placeholder="Search..."
      aria-label="Search"
      
      onChange={handleInputChange}
    />
  </div>
</div>
    </div>
    
  );
};

