import { createContext, useState } from 'react';

export const Context = createContext({
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
    showPassword: false,
    setShowPassword: () => {},
});

export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Context.Provider
            value={{
                username,
                setUsername,
                password,
                setPassword,
                showPassword,
                setShowPassword,
            }}>
            {children}
        </Context.Provider>
    );
};
