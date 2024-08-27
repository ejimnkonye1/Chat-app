/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import chatUsers from './chatUser';
import chatMessages from './chatMes';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import '../css/holder.css'
import { CiSearch } from "react-icons/ci";
import img from '../assets/IMG_2278.jpg'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setChat } from '../action';
import { setImg } from '../action';
import Search from './search';
import { io } from 'socket.io-client';
import OnlineUsersList from './online';
const Holder = () => {

  // const socket = io('http://localhost:9000')
  const [searchQuery , setSearchQuery] = useState()
  const [chating, setChatting] = useState()
  const [mes, setMes] = useState([])
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [receivedMessages1, setReceivedMessages1] = useState('');
  const [sendMessages, setSendMessages] = useState('');
    const dispatch = useDispatch()
    const chatspic = useSelector((state) => state.image)
    const chatstext = useSelector((state) => state.chat)
    const darkmode = useSelector((state)=> state.darkMode)
    const style = {
        backgroundColor : darkmode ? '#000' : "#fff",
        color: darkmode ? '#FFF' : '#000',
        transition: 'all 0.3s',
    }
    // useEffect(() => {
    //   socket.on('connect', () => {
    //     console.log('Connected to socket server');
    //   });
    //   socket.on('chat', (message) => {
    //     setReceivedMessages1((prevMes) => [...prevMes, message])
    //   });
  

    //   return () => {
    //     socket.off('2message')
    //   }
    // }, []);

const handleinputChange = (e) => {
  
  setChatting(e.target.value)
setSendMessages(e.target.value)
  console.log(value)

} 

const handledisplayuser = (message,imgSrc,index) => {
  dispatch(setChat(message))
  dispatch(setImg(imgSrc))
  console.log("User index:", index);
  setSelectedUserIndex(index)
}

const sendMes = (e) => {
  if (e.key === 'Enter') {
    setMes((prevMessages) => {
      const userMessages = prevMessages[selectedUserIndex] || [];
      return {
        ...prevMessages,
        [selectedUserIndex]: [...userMessages, chating],
      };
    });
    socket.emit('message', sendMessages);
    setChatting('');
  }
};

const sendMesBut = () => {
  if (selectedUserIndex !== null && chating.trim() !== "") {
    setMes((prevMessages) => {
      const userMessages = prevMessages[selectedUserIndex] || [];
      return {
        ...prevMessages,
        [selectedUserIndex]: [...userMessages, chating],
      };
    });
    
    setChatting("");
  }
};



const handleSearchChange = (query) => {
setSearchQuery(query)
}



const filterSearch = chatUsers.filter(({name}) => {
  if (name && 
    name.toLowerCase().includes(searchQuery)
    )
     {
   return true
  }  {
    return false
  }

})

  return (
    <section className="chat-section" style={style}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className='card mb-5'>
            {/* <OnlineUsersList /> */}
            </div>
    <div className="card" id="chat3">
          <div className="card-body">
     <div className="row">
      

                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
        <div className="p-3">
                     <Search  searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                      <div className="user-lis" >
                        {searchQuery ?(
                          <ul className="list-unstyled mb-0" >
                          {filterSearch.map((user, index) => (
                            
                           user && (
                            <li className="p-2 border-bottom" key={index} onClick={() => handledisplayuser(user.message,user.imgSrc, index)}>
                            <a href="#!" className="d-flex justify-content-between billie-link">
                              <div className="d-flex flex-row">
                                <div >
                                  
                                  <img
                                    src={user.imgSrc}
                                    alt="pic"
                                    className="d-flex align-self-center me-3 friend-pic"
                                    width="60"
                                  />
                                  <span className={`badge ${user.badgeClass} badge-dot`}></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">{user.name}</p>
                                  <p className="small text-muted" >{user.message}</p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">{user.time}</p>
                                {user.unreadCount && (
                                  <span className="badge bg-danger rounded-pill float-end">{user.unreadCount}</span>
                                )}
                              </div>
                            </a>
                          </li>
                           )
                          ))}
                        </ul>
                        ):(
     <ul className="list-unstyled mb-0">
                            {chatUsers.map((user, index) => (
                              <li className="p-2 border-bottom" key={index} onClick={() => handledisplayuser(user.message, user.imgSrc, index)}>
                                <a href="#!" className="d-flex justify-content-between billie-link">
                                  <div className="d-flex flex-row">
                                    <div>
                                      <img
                                        src={user.imgSrc}
                                        alt="pic"
                                        className="d-flex align-self-center me-3 friend-pic"
                                        width="60"
                                      />
                                      <span className={`badge ${user.badgeClass} badge-dot`}></span>
                                    </div>
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0">{user.name}</p>
                                      <p className="small text-muted">{user.message}</p>
                                    </div>
                                  </div>
                                  <div className="pt-1">
                                    <p className="small text-muted mb-1">{user.time}</p>
                                    {user.unreadCount && (
                                      <span className="badge bg-danger rounded-pill float-end">{user.unreadCount}</span>
                                    )}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                    </div>
                  </div>

  <div className="col-md-6 col-lg-7 col-xl-8 " >
  
    <div className=''>      
    <div className="chat-messages">
      {chatspic ?
        <div className="d-flex flex-row align-items-center">
        <img src={chatspic} className="message-avatar" alt="avatar" />
        <div>
          <p className={`small p-2 ms-3 mb-1 rounded-3 ${chatstext ? 'bg-body-tertiary' : ''}`}>
            {chatstext}
          </p>
          <p className={`small p-2 ms-3 mb-1 rounded-3 ${receivedMessages1 ? 'bg-body-tertiary' : ''}`}>
          <p>{receivedMessages1}</p>
          </p>
      
        </div>
      </div> : ''
    }
<div className="d-flex flex-row justify-content-end">
  {selectedUserIndex !== null && (
    <div className="d-flex flex-column justify-content-end">
      {(mes[selectedUserIndex] || []).map((msg, idx) => (
        <div key={idx} className="d-flex align-items-center mb-3">
          <img src={img} className="message-avatar me-2" alt="avatar" />
          <p className="small p-2 rounded-3 text-white bg-primary">{msg}</p>
        </div>
      ))}
    </div>
  )}
</div>

</div>


                
                          
                          <div className="message-input">
                            <img
                              src={img}
                              alt="avatar 3"
                              className="input-avatar"
                            />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="exampleFormControlInput2"
                              placeholder="Type message"
                              onChange={handleinputChange}
                              value={chating}
                              onKeyDown={sendMes}
                              
                            />
                            <a className="ms-1 text-muted" href="#!">
                              <FiPaperclip />
                            </a>
                            <a className="ms-3 text-muted" href="#!">
                              <FaRegSmile />
                            </a>
                            <a className="ms-3" onClick={sendMesBut}>
                              <FaPaperPlane />
                            </a>
                          </div>
                          </div>
                      
       </div>

  
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};





export default Holder;
