import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, initilizeUser);
        return unSubscribe;
    }, []);

    async function initializeUser(user) {
        if(user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }
    const value = {
            currentUser,
            useerLoggedIn,
            loading
        }

        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )
}