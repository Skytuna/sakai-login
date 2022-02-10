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
    showModal: false,
    setShowModal: () => {},
    selectedCell: { id: null, hour: null },
    setSelectedCell: () => {},
});

export const ContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCell, setSelectedCell] = useState({ id: null, hour: null });

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
                showModal,
                setShowModal,
                selectedCell,
                setSelectedCell,
            }}>
            {children}
        </Context.Provider>
    );
};
