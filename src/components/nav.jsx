/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from "react";

export const UserChatTable = ({ onlineUsers, setSelectedUser , messages }) => {
    const [usersWithMessages, setUsersWithMessages] = useState([]);
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
            <a className="navbar-brand" href="#">Chat</a>
            <div className="d-flex justify-content-end cf-text-nightowl-text">
                <HiOutlinePencilAlt  onClick={handleToggleChat} style={{ cursor: 'pointer' }}/>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User Chats</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersWithMessages.map((user) => (
                        <TableRow key={user.uid} onClick={() => setSelectedUser (user)}>
                            <TableCell className={user.lastMessageType}>
                                <span>{user.email}</span>
                                <br />
                                <span>{user.lastMessage}</span>
                            </TableCell>
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
                        <TableCell></TableCell>
                    </TableRow>
                ))}
        </>
    );
};

