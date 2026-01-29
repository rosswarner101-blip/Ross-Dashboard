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
        if (role === 'admin') {
            newUser = {
                id: 1,
                name: 'Boss Admin',
                role: 'admin',
                email: 'admin@rosswarner.com'
            };
        } else {
            newUser = {
                id: 2,
                name: 'Recruiter Jane',
                role: 'team',
                email: 'jane@rosswarner.com'
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
