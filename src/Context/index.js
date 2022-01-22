import { createContext, useState } from 'react';

export const Context = createContext({
    userName: '',
    setUserName: () => {},
    password: '',
    setPassword: () => {},
    showPassword: false,
    showPassword: () => {},
});

export const ContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Context.Provider
            value={{
                userName,
                setUserName,
                password,
                setPassword,
                showPassword,
                setShowPassword,
            }}>
            {children}
        </Context.Provider>
    );
};
