/* eslint-disable react/prop-types */

import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import {  doc,  updateDoc, } from 'firebase/firestore';
import { firestore } from '../Firebase';
import pop from '../audio/pop.mp3'
import { CircleImage } from './userimg';

export const UserChat = ({ onlineUsers, setSelectedUser , messages, currentUserId ,setShowChatArea}) => {
    const darkMode = useSelector((state) => state.darkMode)
    const [usersWithMessages, setUsersWithMessages] = useState([]);
    const playpop = useRef(new Audio(pop))

    useEffect(()=> {
const storedchat = localStorage.getItem('chatHistory')
if (storedchat){
    setUsersWithMessages(JSON.parse(storedchat))
}
    },[])
    useEffect(() => {
        // Start with the existing state and make a copy to update
        setUsersWithMessages(prevUsersWithMessages => {
            const updatedUsersWithMessages = [...prevUsersWithMessages];

            onlineUsers.forEach(user => {
                const userMessages = messages.filter(msg =>
                    msg.senderId === user.uid || msg.receiverId === user.uid
                );

                if (userMessages.length > 0) {
                    const lastMessage = userMessages[userMessages.length - 1];
                    const existingUserIndex = updatedUsersWithMessages.findIndex(u => u.uid === user.uid);
     const unreadCount = userMessages.filter(
                msg => msg.receiverId === currentUserId && !msg.read
            ).length;
                if (unreadCount> 0){
            playpop.current.play()
        }
                    if (existingUserIndex === -1) {
                        // Add new user with messages
                        updatedUsersWithMessages.push({
                            ...user,
                            lastMessage:  lastMessage ? lastMessage.content : null,
                            lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessagetime: lastMessage?lastMessage.timestamp : null,
                            lastMessageCount: unreadCount,
                        }); 
                    } else {
                        // Update existing user with new last message
                        updatedUsersWithMessages[existingUserIndex] = {
                            ...updatedUsersWithMessages[existingUserIndex],
                            lastMessage:  lastMessage ? lastMessage.content : null,
                            lastMessageCount: unreadCount,
                            lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessagetime: lastMessage?lastMessage.timestamp: null
                        };
                    }
                }
            });
            localStorage.setItem('chatHistory',JSON.stringify(updatedUsersWithMessages))

            return updatedUsersWithMessages;
        });
    }, [onlineUsers, messages, currentUserId]);

    const handleUserClick = async (user) => {
        setSelectedUser (user);
      
        // Mark unread messages as read in Firestore
        const unreadMessagesToMarkRead = messages.filter(
            (msg) => msg.senderId === user.uid && msg.receiverId === currentUserId && !msg.read
        );

        try {
            const updatePromises = unreadMessagesToMarkRead.map((msg) =>
                updateDoc(doc(firestore, 'messages', msg.id), { read: true })
            );

            // Wait for all updates to complete
            await Promise.all(updatePromises);
        } catch (error) {
            console.error("Error updating message read status:", error);
        }
        if (window.innerWidth < 768) {
            setShowChatArea(true);
        }
    };
    const formatTime = (timestamp) => {
        if (!timestamp || typeof timestamp.toDate !== 'function') return ''; // Check for null or invalid timestamp
        const time = timestamp.toDate();
        return time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    };
    return (
        <div className="dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-md mx-auto font-sans w-full">
        <div className='overflow-y-auto h-[410px]'>
            {usersWithMessages.length > 0 ? (
                usersWithMessages.map((user) => (
                    <div
                        key={user.uid}
                        onClick={() => handleUserClick(user)}
                        className="cursor-pointer transition-colors p-4 border-b border-gray-200 relative flex items-center"
                    >
                        <CircleImage email={user.email} />
                        <div className="ml-4 flex-1"> {/* Added ml-4 for spacing and flex-1 to take the remaining space */}
                            <div>
                                <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {user.username}
                                </p>
                            </div>
                            <div
                                className={`${
                                    user.lastMessageType === 'sending '
                                        ? 'text-black'
                                        : 'text-gray-400'
                                } text-sm mt-1`}
                            >
                                {user.lastMessage
                                    ? user.lastMessage.length > 15
                                        ? `${user.lastMessage.substring(0, 15)}...`
                                        : user.lastMessage
                                    : ""}
                            </div>
                        </div>
                        {user.lastMessageCount > 0 && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {user.lastMessageCount}
                            </div>
                        )}
                    <div className='absolute top-10 text-sm right-2'>
                    {formatTime(user.lastMessagetime)}
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-4 text-sm text-gray-900 dark:text-gray-100">No active chats available.</div>
            )}
        </div>
    </div>
    );
};





// Head Component

export const Head = ({ onlineUsers, setSelectedUser,setShowChatArea  }) => {
    const darkMode = useSelector((state) => state.darkMode)
    const [showChat, setShowChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
        setShowChat(true);
    };

    const handleUserSelect = (user) => {
        setSelectedUser (user);
        setIsOpen(false); 
        if (window.innerWidth < 768) {
            setShowChatArea(true);
        }
    };

    return (
        <div className={`flex justify-between text-gray-900 dark:text-gray-100  text-2xl py-4 px-4 font-sans ${darkMode ? 'bg-gray-800' : ''}`}>
        <p className='font-bold '>Chat</p>
        <div className="relative inline-block text-left">
            {isOpen && (
                <div className="z-10 absolute   left-0 mt-10 bg-white rounded-lg shadow-lg w-56 max-h-80 overflow-y-auto ring-1 ring-black ring-opacity-5">
                    <ul className=" text-sm text-gray-700">
                        {showChat && onlineUsers.length > 0 ? (
                            onlineUsers.map((user) => (
                                <li
                                    key={user.uid}
                                    onClick={() => handleUserSelect(user)}
                                    className={`px-4 py-2 cursor-pointer  transition-colors border-b border-gray-200 last:border-none ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                                >
                                    <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{user.username}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 px-4 py-2">No user found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
        <div className="flex justify-end text-gray-800 ml-6">
            <HiOutlinePencilAlt
                onClick={toggleDropdown}
                className="cursor-pointer text-2xl text-gray-900 dark:text-gray-100 hover:text-gray-500 transition-colors"
            />
        </div>
    </div>

    );
};



  
 
  
