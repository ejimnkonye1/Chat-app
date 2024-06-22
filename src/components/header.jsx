import '../css/header.css'
import { CiDark } from "react-icons/ci";
import { setMode } from '../action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CiLight } from "react-icons/ci";
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
        transition: 'all 0.3s',
    }
    return(
        <nav class={`navbar navbar-expand-lg ${darkMode? "bg-dark" : "bg-body-tertiary"}`} >
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ChatApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
     aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="center-items">
 <h6 className='text-secondary'>Logged in as Billie</h6>
        </div>
 
      <div >
      {darkMode? (
       
       <CiLight onClick={lightMode} />
      ) : (
        < CiDark onClick={handleMode} /> 
      )}
      
      </div>
      <form class="d-flex flex-row right-but">
        
        <button class="btn btn-outline-success" type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>
    )
}