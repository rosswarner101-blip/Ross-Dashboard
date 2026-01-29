import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('ross_warner_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (role) => {
        // Mock login logic
        let newUser;
        if (role === 'master') {
            newUser = {
                id: 1,
                name: 'Master Admin',
                role: 'master',
                email: 'master@rosswarner.com'
            };
        } else if (role === 'manager') {
            newUser = {
                id: 2,
                name: 'Manager',
                role: 'manager',
                email: 'manager@rosswarner.com'
            };
        } else if (role === 'recruiter') {
            newUser = {
                id: 3,
                name: 'Recruiter',
                role: 'recruiter',
                email: 'recruiter@rosswarner.com'
            };
        } else {
            // Fallback
            newUser = {
                id: 4,
                name: 'Team Member',
                role: 'team',
                email: 'team@rosswarner.com'
            };
        }

        setUser(newUser);
        localStorage.setItem('ross_warner_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ross_warner_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
