/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useState, useEffect } from "react";

export const UserChat = ({ onlineUsers, setSelectedUser , messages }) => {
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
          
            <Table>
                <TableHead>
                    <TableRow>

                    </TableRow>
                </TableHead>
                <TableBody>
                { usersWithMessages.map((user) => (
                        <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                            <TableCell className={user.lastMessageType}>
                                <span>{user.username}</span>
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






export const Head = ({ onlineUsers, setSelectedUser ,  }) => {
    const [showChat, setShowChat] = useState(false);
    

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(prevState => !prevState);
      setShowChat(true);

    };
    return(
        <div className="flex justify-between text-2xl py-4 px-4">
        <a  href="#">Chat</a>
        <div className="relative inline-block text-left">
  {isOpen && (
    <div className="z-10 absolute left-0 mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        <li>
       
              
                    {showChat && onlineUsers.map((user) => (
                        <div key={user.uid} onClick={() => setSelectedUser(user)}>
<div className='text-sm border-b p-1 px-4 cursor-pointer border-gray-300 mb-2' onClick={() => setShowChat(false)}>{user.username}</div>
                        </div>
                    ))}
        </li>
       
      </ul>
    </div>
  )}
</div>
        <div className="flex justify-content-end cf-text-nightowl-text ml-6">
            <HiOutlinePencilAlt onClick={toggleDropdown} style={{ cursor: 'pointer' }}/>
        </div>
        </div>
    )
}