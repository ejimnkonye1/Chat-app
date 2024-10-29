import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
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
    const [backgroundColor, setBackgroundColor] = useState('');
    useEffect(() => {
        setBackgroundColor(getRandomColor());
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
            style={{ backgroundColor }} 
        >
            {letters}
        </div>
    );
}

