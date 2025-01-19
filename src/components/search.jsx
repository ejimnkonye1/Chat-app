import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { auth } from "../Firebase";
import { InputBase, IconButton, Paper } from "@mui/material";
const LoadingPage = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50">
    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    <p className="text-gray-700 text-xl ml-4">Logging out...</p>
  </div>
);


export const Searchs = () => {
  const darkMode = useSelector((state) => state.darkMode)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const handleInputChange = () => {
    // setSearchQuery(e.target.value)
  }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
  
      const handleLogout = async () => {
        setIsLoading(true);
        try {
          await auth.signOut();
          localStorage.removeItem('loggedInUser'); 
          setTimeout(() => {
            navigate('/');
          }, 5000);
        } catch (error) {
          console.error('Error logging out:', error);
          setIsLoading(false);
        }
      };
    
      
  return (
    <div className={`flex justify-between pt-4 relative inline-block ${darkMode ? 'bg-gray-800' : ''}`}>
      <button onClick={toggleMenu} className="text-3xl pl-3">
                {isOpen ? <HiX /> : <HiOutlineMenu />}
      </button>
      {isOpen && (
                <div className="absolute left-0 mt-10 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <ul className="py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <li>
                            <Link to="/settings" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:text-gray-900">Settings</Link>
                        </li>
                     
                        <li>
                        <div>
                            {isLoading ? (
                              <LoadingPage />
                            ) : (
                              <p
                                onClick={handleLogout}
                                className="block  px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:text-gray-900 cursor-pointer"
                              >
                                Logout
                              </p>
                            )}
                          </div>
                    </li>
                </ul>
            </div>
          )}
   <Paper
      component="form"
      className="dark:bg-white dark:text-gray-100 mx-auto"
      style={{
        display: "flex",
        alignItems: "center",
        height:'40px',
        borderRadius: "15px", 
        maxWidth: "340px", 
        width: "90%", 
        padding: "0.2rem 0.5rem", 
      }}
      elevation={2}
    >
      {/* Search Icon */}
      <IconButton type="button" aria-label="search" size="small">
        <CiSearch size={24} />
      </IconButton>

      {/* Input Field */}
      <InputBase
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleInputChange}
        style={{
          flex: 1, 
          padding: "0.3rem 0.5rem",

        }}
      />
    </Paper>
          </div>
    
  );
};

