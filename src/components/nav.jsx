/* eslint-disable react/prop-types */
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from "react";
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from "../Firebase";
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
export const UserChatTable = ({ onlineUsers, setSelectedUser, messages, showEmails, setShowEmails, showChat, setShowChat, senderId }) => {
    const [usersWithMessages, setUsersWithMessages] = useState([]);

    const handleToggleEmail = () => {
        setShowEmails(true);
        setShowChat(false);
    };

    const handleToggleChat = () => {
        setShowEmails(false);
        setShowChat(true);
    };

    const markMessageAsRead = async (user) => {
        const lastUserMessage = messages.find(msg => 
             msg.receiverId === msg.receiverId &&
            msg.status === false // Only consider unread messages
        );

        if (lastUserMessage) {
            // Update message status to read in Firestore
            try {
                const messageDocRef = doc(firestore, 'messages', lastUserMessage.id); // Assuming lastUserMessage has an 'id' field
                await updateDoc(messageDocRef, { status: true }); // Set status to true
            } catch (error) {
                console.error("Error updating message status: ", error);
            }
        }

        // Optionally, trigger a state update to reflect the change in usersWithMessages
        setUsersWithMessages(prevUsers => {
            return prevUsers.map(u => {
                if (u.uid === user.uid) {
                    return { ...u, lastMessageStatus: true }; // Update status in local state
                }
                return u;
            });
        });
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
                            lastMessageType: lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessageStatus: lastMessage.status,
                            lastMessagedate: lastMessage.timestamp,
                            lastMessageCount: userMessages.filter(msg => msg.status === false && msg.receiverId === msg.receiverId ).length,
                        }); 
                    } else {
                        // Update existing user with new last message
                        updatedUsersWithMessages[existingUserIndex] = {
                            ...updatedUsersWithMessages[existingUserIndex],
                            lastMessage: lastMessage.content,
                            lastMessageCount: userMessages.filter(msg => msg.status === false && msg.receiverId === msg.receiverId ).length,
                            lastMessageType: lastMessage.senderId === user.uid ? 'sending' : 'receiving',
                            lastMessageStatus: lastMessage.status,
                            lastMessagedate: lastMessage.timestamp
                        };
                    }
                }
            });

            return updatedUsersWithMessages;
        });
    }, [onlineUsers, messages]);
    const formatTime = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      };
    return (
        <div className="">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={handleToggleChat} style={{ cursor: 'pointer' }}>User Chats</TableCell>
                        <TableCell onClick={handleToggleEmail} style={{ cursor: 'pointer' }}>User List</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody className="" sx={{ maxHeight: 400, overflowY: 'auto' }}  >
 
 
                    {showChat && (
                        usersWithMessages.map((user) => (
                            <TableRow key={user.uid} onClick={() => { 
                                setSelectedUser(user); 
                                markMessageAsRead(user); // Mark messages as read
                            }} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                <TableCell className={user.lastMessageType}>
                                <div style={emailstyles.inlineContainer}>
  <CircleImage email={user.email} />
  <div className="pt-1" style={emailstyles.emailContainer}>
    <div style={{ display: 'flex', justifyContent: 'space-between',position:'relative' }}>
      <span className="fw-bold mb-0" style={emailstyles.emailText2}>{user.email}</span>
      <div style={emailstyles.date}>
      <span>{formatTime(user.lastMessagedate.toDate())}</span>
      
      </div>
     
    
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <p className="small text-muted">{user.lastMessage}</p>
    <div style={emailstyles.date}>
    {/* {user.lastMessageType === 'receiving' && user.lastMessageCount > 0 ? (
  <span className={`badge bg-warning badge-dot`}>{user.lastMessageCount}</span>
) : (
  <div>Read</div>
)} */}
</div>
    </div>
    
  </div>
</div>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    )}

                    {showEmails && (
                        onlineUsers.map((user) => (
                            <TableRow key={user.uid} onClick={() => setSelectedUser(user)}>
                                <TableCell>
                                    <div className="user">
                                    <div style={emailstyles.inlineContainer} className="">
                                        <CircleImage email={user.email} />
                                        <span style={emailstyles.emailText}>{user.email}</span>
                                    </div>
                                   
                                    </div>
                                 
                                </TableCell>                                       
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    )}
                    
                    
                </TableBody>
               

            </Table>
        </div>
    );
};

const emailstyles = {
    inlineContainer: {
      display: 'inline-flex'
    },
    emailText: {
      padding: '10px'
    },
    emailText2: {
      padding: ''
    },
    emailContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10px'
    },
    date:{
        position :'relative',
        left:'40%'
    }
  }
const styles = {
    circle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    circles:{
        width: '48px',
        height: '40px',
        borderRadius: '50%',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
    }
  };

    // Utility function to generate a random color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
    export const CircleImage = ({ email }) => {
   

      // Extract the first and second letters from the email
      const letters = email.substring(0, 2).toUpperCase();
    
      // Generate a random background color
      const backgroundColor = getRandomColor();
    
      return (
        <div style={{ ...styles.circle, backgroundColor }}>
          {letters}
        </div>
      );
    }
    export const UserImage = ({ email }) => {
   

        // Extract the first and second letters from the email
        const letters = email.substring(0, 2).toUpperCase();
      
        // Generate a random background color
        const backgroundColor = 'black';
      
        return (
          <div style={{ ...styles.circles, backgroundColor }}>
            {letters}
          </div>
        );
      }
    
   
    


    


