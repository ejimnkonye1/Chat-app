import React from 'react';
import chatUsers from './chatUser';
import chatMessages from './chatMes';
import { FiPaperclip } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import '../css/holder.css'
import { CiSearch } from "react-icons/ci";
import img from '../assets/IMG_2278.jpg'
const Holder = () => {
  return (
    <section className="chat-section">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
    <div className="card" id="chat3">
          <div className="card-body">
     <div className="row">

                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
        <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span className="input-group-text border-0" id="search-addon">
                        <CiSearch />

                        </span>
                      </div>
                      <div className="user-list">
                        <ul className="list-unstyled mb-0">
                          {chatUsers.map((user, index) => (
                            <li className="p-2 border-bottom" key={index}>
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
                      </div>
                    </div>
                  </div>

  <div className="col-md-6 col-lg-7 col-xl-8">
               
         <div className="chat-messages">
                      {chatMessages.map((msg, index) => (
                        <div
                          className={`d-flex flex-row justify-content-${msg.align}`}
                          key={index}
                        >
                          <img
                            src={msg.imgSrc}

                            alt="avatar 1"
                            className="message-avatar"
                          />
                          <div>
                            <p
                              className={`small p-2 ms-3 mb-1 rounded-3 ${
                                msg.align === 'end' ? 'text-white bg-primary' : 'bg-body-tertiary'
                              }`}
                            >
                              {msg.text}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
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
                      />
                      <a className="ms-1 text-muted" href="#!">
                        <FiPaperclip />
                      </a>
                      <a className="ms-3 text-muted" href="#!">
                        <FaRegSmile />
                      </a>
                      <a className="ms-3" href="#!">
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
    </section>
  );
};





export default Holder;
