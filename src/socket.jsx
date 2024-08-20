import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000');

const Texting = () => {
    const [receivedMessages, setReceivedMessages] = useState('');
    const [sendMessages, setSendMessages] = useState('');
    const [receivedMessages2, setReceivedMessages2] = useState('');
    const [receivedMessages1, setReceivedMessages1] = useState([]);
    const handleSendMessage = () => {
        socket.emit('2message', sendMessages);
        setSendMessages('');
    
      };
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to socket server');
        });
        socket.on('2message', (message) => {
          setReceivedMessages1((prevMes) => [...prevMes, message])
        });
        socket.on('message', (message) => {
          setReceivedMessages(message);
    
        });
        socket.on('chat', (message) => {
          setReceivedMessages2(message);
       
        });

        return () => {
          socket.off('2message')
        }
      }, []);
  

    return (
        <div>
            <h1>Socket</h1>
            {/* <p>{receivedMessages1}</p> */}
            <ul >
            {receivedMessages1.map((message, index) => (
         
                <li key={index}>{message}</li>
          
            ))}
                </ul>
            <p>{receivedMessages}</p>
            <p>{receivedMessages2}</p>
            <input
        type="text"
        value={sendMessages}
        onChange={(e) => setSendMessages(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>

        </div>
    )
    
}

export default Texting