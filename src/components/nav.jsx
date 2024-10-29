/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useState, useEffect } from "react";
import {  doc,  updateDoc, } from 'firebase/firestore';
import { firestore } from '../Firebase';


export const UserChat = ({ onlineUsers, setSelectedUser , messages, currentUserId }) => {
    const [usersWithMessages, setUsersWithMessages] = useState([]);

    useEffect(() => {
        console.log("Online Users: ", onlineUsers);
        console.log("Messages: ", messages);
        console.log("Current User ID: ", currentUserId);
        const updatedUsersWithMessages = onlineUsers.map((user) => {
            const userMessages = messages.filter(
                (msg) => msg.senderId === user.uid || msg.receiverId === user.uid
            );

            const lastMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;

            
            const unreadCount = userMessages.filter(
                msg => msg.receiverId === currentUserId && !msg.read
            ).length;

            return {
                ...user,
                lastMessage: lastMessage ? lastMessage.content : null,
                lastMessageType: lastMessage && lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                lastMessageCount: unreadCount, 
            };
        });

        setUsersWithMessages(updatedUsersWithMessages);
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
    };

    return (
        <div className="p-4 bg-white rounded-lg max-w-md mx-auto shadow-bubble font-sans">
            <Table className="w-full">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-lg text-black">Active Chats</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersWithMessages.length > 0 ? (
                        usersWithMessages.map((user) => (
                            <TableRow
                                key={user.uid}
                                onClick={() => handleUserClick(user)}
                                className="hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <TableCell className="p-4 text-gray-600 relative">
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
                                        <span className="absolute top-2 right-2 bg-blue-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                            {user.lastMessageCount}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="p-4 text-sm text-gray-600">No active chats available.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
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
