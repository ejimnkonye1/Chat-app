import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const Texting = () => {
    const [receivedMessages, setReceivedMessages] = useState('');
    const [sendMessages, setSendMessages] = useState('');

    const handleSendMessage = () => {
        socket.emit('message', sendMessages);
        setSendMessages('');
    
      };
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to socket server');
        });
    
        socket.on('message', (message) => {
          setReceivedMessages(message);
        socket.emit()  
        });
      }, []);

    return (
        <div>
            <h1>Socket</h1>
            <p>{receivedMessages}</p>
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