import React, { createContext, useState, useContext } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// Provider component to wrap around parts of the app where authentication is needed
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to set authentication state to logged in
    const login = () => setIsLoggedIn(true);

    // Function to set authentication state to logged out
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use authentication context in components
export function useAuth() {
    return useContext(AuthContext);
}
