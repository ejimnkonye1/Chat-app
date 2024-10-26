/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useState, useEffect } from "react";

export const UserChatTable = ({ onlineUsers, setSelectedUser , messages }) => {
    const [usersWithMessages, setUsersWithMessages] = useState([]);
    const [showEmails, setShowEmails] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const handleToggleChat = () => {
        setShowEmails(false);
        setShowChat(true);
    };

    const handleToggleEmail = () => {
        setShowEmails(true);
        setShowChat(false);
    };
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

                    if (existingUserIndex === -1) {
                        // Add new user with messages
                        updatedUsersWithMessages.push({
                            ...user,
                            lastMessage: lastMessage.content,
                            lastMessageType: lastMessage.senderId === user.uid ? 'sending' : 'receiving'
                        });
                    } else {
                        // Update existing user with new last message
                        updatedUsersWithMessages[existingUserIndex] = {
                            ...updatedUsersWithMessages[existingUserIndex],
                            lastMessage: lastMessage.content,
                            lastMessageType: lastMessage.senderId === user.uid ? 'sending' : 'receiving'
                        };
                    }
                }
            });

            return updatedUsersWithMessages;
        });
    }, [onlineUsers, messages]);

    return (
        <div>
            <div className="flex justify-between text-2xl py-4 px-4">
            <a  href="#">Chat</a>
            <div className="flex justify-content-end cf-text-nightowl-text ml-6">
                <HiOutlinePencilAlt onClick={handleToggleChat} style={{ cursor: 'pointer' }}/>
            </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell className="cf-text-nightowl-userText" onClick={handleToggleEmail} style={{ cursor: 'pointer' }}>User Chats</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {showEmails && usersWithMessages.map((user) => (
                        <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                            <TableCell className={user.lastMessageType}>
                                <span>{user.email}</span>
                                <br />
                                <span>{user.lastMessage}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                    {showChat && onlineUsers.map((user) => (
                        <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        
    );
};

// UserList.js


export const UserList = ({ onlineUsers, usersWithMessages, setSelectedUser  }) => {
    return (
        <>
            {onlineUsers
                .filter(user => !usersWithMessages.some(u => u.uid === user.uid)) // Filter out users with messages
                .map((user) => (
                    <TableRow key={user.uid} onClick={() => setSelectedUser (user)}>
                        <TableCell>{user.email}</TableCell>
                        console.log(`username:${user.username}`)
                        <TableCell></TableCell>
                    </TableRow>
                ))}
        </>
    );
};

