import { HiOutlinePencilAlt } from "react-icons/hi";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from "react";

export const Nav = () => {
    return (
        <nav className="navbar">
            <a className="navbar-brand" href="#">Chat</a>
            <div className="d-flex justify-content-end">
                <HiOutlinePencilAlt />
            </div>
        </nav>
    );
};

export const UserChatTable = ({ onlineUsers, setSelectedUser, messages }) => {
    const [showEmails, setShowEmails] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [usersWithMessages, setUsersWithMessages] = useState([]);

    const handleToggleEmail = () => {
        setShowEmails(true);
        setShowChat(false);
    };

    const handleToggleChat = () => {
        setShowEmails(false);
        setShowChat(true);
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={handleToggleEmail} style={{ cursor: 'pointer' }}>User Chats</TableCell>
                        <TableCell onClick={handleToggleChat} style={{ cursor: 'pointer' }}>User List</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showEmails && (
                        usersWithMessages.map((user) => (
                            <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                                <TableCell className={user.lastMessageType}>
                                    <span>{user.email}</span>
                                    <br />
                                    <span>{user.lastMessage}</span>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    )}

                    {showChat && (
                        onlineUsers.map((user) => (
                            <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
