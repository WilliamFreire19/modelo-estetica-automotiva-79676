import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as adminApi from '../services/adminApi';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any; // Define a proper user type if you have more user details
    token: string | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
    const [isLoading, setIsLoading] = useState<boolean>(true); // Check auth status on load

    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = localStorage.getItem('adminToken');
            if (storedToken) {
                setToken(storedToken);
                // Optionally, you could verify the token here by making a call to a protected backend route
                // For simplicity, we're assuming the token is valid if it exists.
                // If you store user details in localStorage, you can load them here too.
                // For now, we'll just set a placeholder user if token exists.
                // A better approach would be to fetch user details from backend using the token.
                const storedUser = localStorage.getItem('adminUser');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                     // If no user details, but token exists, you might want to fetch them
                    // or consider the user minimally authenticated.
                    // For this example, we'll set a generic user object if token is present.
                    setUser({ username: 'Admin' }); // Placeholder
                }
            }
            setIsLoading(false);
        };
        checkAuthStatus();
    }, []);

    const login = async (credentials: any) => {
        setIsLoading(true);
        try {
            const data = await adminApi.loginAdmin(credentials);
            setUser(data); // Assuming login returns user data along with token
            setToken(data.token);
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify({ _id: data._id, username: data.username })); // Store basic user info
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw error; // Rethrow to be caught by login form
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        // Optionally, redirect to login page or home page
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
