import '../css/header.css'
import { CiDark } from "react-icons/ci";
import { setMode } from '../action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CiLight } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
// import 'bootstrap/dist/css/bootstrap.min.css';
export const Head = () => {
    const darkMode = useSelector((state)=> state.darkMode)
const dispatch = useDispatch();
    const handleMode = () => {
        dispatch(setMode(true));
    }
    const lightMode = () => {
        dispatch(setMode(false));
    }
    const style = {
        backgroundColor : darkMode ? '#000' : "#fff",
        color: darkMode ? '#FFF' : '#000',
        transition: 'all 0.4s',
    }
    return(
      <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : "bg-body-tertiary"}`}>
      <div className="container-fluid">
        <a className="navbar-brand text-primary" href="#">ChatApp</a>
        <span className="nav-link text-secondary">Logged in as Billie</span>
        <div className="d-flex align-items-center">
          <span className="d-lg-none ms-2 mt-2 mr-2">
            {darkMode ? (
              <CiLight onClick={lightMode} className='circle-icon1' />
            ) : (
              <CiDark onClick={handleMode} className='circle-icon1' />
            )}
          </span>
          {/* <span className="navbar-toggler navbar-toggler-icon" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></span> */}
          <span className="d-lg-none ms-2 mt-2">
          <IoMdLogOut className="circle-icon" />
          </span>
        </div>
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-between">
            <li className="nav-item d-none d-lg-flex align-items-center p-2">
              {darkMode ? (
                <CiLight onClick={lightMode} />
              ) : (
                <CiDark onClick={handleMode} />
              )}
            </li>
            <li className="nav-item d-none d-lg-flex align-items-center">
              <form className="">
                <button className="btn btn-outline-primary" type="submit">Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    
  
    )
}