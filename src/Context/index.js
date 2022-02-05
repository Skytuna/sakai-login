import { createContext, useState } from 'react';

export const Context = createContext({
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
    showPassword: false,
    setShowPassword: () => {},
    schedule: [],
    setSchedule: () => {},
});

export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [schedule, setSchedule] = useState([]);

    return (
        <Context.Provider
            value={{
                username,
                setUsername,
                password,
                setPassword,
                showPassword,
                setShowPassword,
                schedule,
                setSchedule,
            }}>
            {children}
        </Context.Provider>
    );
};