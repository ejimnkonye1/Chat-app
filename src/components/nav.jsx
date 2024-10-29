/* eslint-disable react/prop-types */

import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useState, useEffect, useRef } from "react";
import {  doc,  updateDoc, } from 'firebase/firestore';
import { firestore } from '../Firebase';
import pop from '../audio/pop.mp3'

export const UserChat = ({ onlineUsers, setSelectedUser , messages, currentUserId }) => {
    const [usersWithMessages, setUsersWithMessages] = useState([]);
  const playpop = useRef(new Audio(pop))
    // useEffect(() => {
    //     
    //     const updatedUsersWithMessages = onlineUsers.map((user) => {
    //         const userMessages = messages.filter(
    //             (msg) => msg.senderId === user.uid || msg.receiverId === user.uid
    //         );

    //         const lastMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;

            
    //         const unreadCount = userMessages.filter(
    //             msg => msg.receiverId === currentUserId && !msg.read
    //         ).length;
    //             if (unreadCount){
    //         playpop.current.play()
    //     }

    //         return {
    //             ...user,
    //             lastMessage: lastMessage ? lastMessage.content : null,
    //             lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
    //             lastMessageCount: unreadCount, 
                
    //         };
    //     });
    
    //     setUsersWithMessages(updatedUsersWithMessages);
    // }, [onlineUsers, messages, currentUserId]);


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
                if (unreadCount){
            playpop.current.play()
        }
                    if (existingUserIndex === -1) {
                        // Add new user with messages
                        updatedUsersWithMessages.push({
                            ...user,
                            lastMessage:  lastMessage ? lastMessage.content : null,
                            lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessagedate: lastMessage.timestamp,
                            lastMessageCount: unreadCount,
                        }); 
                    } else {
                        // Update existing user with new last message
                        updatedUsersWithMessages[existingUserIndex] = {
                            ...updatedUsersWithMessages[existingUserIndex],
                            lastMessage:  lastMessage ? lastMessage.content : null,
                            lastMessageCount: unreadCount,
                            lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessagedate: lastMessage.timestamp
                        };
                    }
                }
            });

            return updatedUsersWithMessages;
        });
    }, [onlineUsers, messages]);

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
    };

    return (
        <div className="bg-white rounded-lg max-w-md mx-auto font-sans w-full ">
        <div className='overflow-y-auto h-[400px]'>
            {usersWithMessages.length > 0 ? (
                usersWithMessages.map((user) => (
                    <div
                        key={user.uid}
                        onClick={() => handleUserClick(user)}
                        className="hover:bg-gray-100 cursor-pointer transition-colors p-4 border-b border-gray-200 relative"
                    >
                        <div className="font-bold text-black">{user.username}</div>
                        <div
                            className={`${
                                user.lastMessageType === 'sending'
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
                        {user.lastMessageCount > 0 && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {user.lastMessageCount}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="p-4 text-sm text-gray-600">No active chats available.</div>
            )}
        </div>
    </div>
    );
};





// Head Component
export const Head = ({ onlineUsers, setSelectedUser, searchQuery }) => {
    const [showChat, setShowChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
        setShowChat(true);
    };

    const filteredUsers = onlineUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex justify-between text-2xl py-4 px-4 font-sans">
            <a href="#" className="text-black">Chat</a>
            <div className="relative inline-block text-left">
                {isOpen && (
                    <div className="z-10 absolute left-0 mt-10 bg-white rounded-lg shadow-lg w-56 max-h-80 overflow-y-auto ring-1 ring-black ring-opacity-5">
                        <ul className="py-2 text-sm text-gray-700">
                            {showChat && (searchQuery ? filteredUsers : onlineUsers).length > 0 ? (
                                (searchQuery ? filteredUsers : onlineUsers).map((user) => (
                                    <div
                                        key={user.uid}
                                        onClick={() => setSelectedUser(user)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none"
                                    >
                                        <span className="font-medium text-black">{user.username}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 px-4 py-2">No name found</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex justify-content-end text-gray-800 ml-6">
                <HiOutlinePencilAlt
                    onClick={toggleDropdown}
                    className="cursor-pointer text-2xl hover:text-gray-500 transition-colors"
                />
            </div>
        </div>
    );
};
