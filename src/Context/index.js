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

    const [schedule, setSchedule] = useState(data);

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

const data = [
    {
        hour: '09:00',
        cells: [
            {
                day: 'Pazartesi',
                color: 'green',
                name: 'Algoritma',
                fullname: 'CME 1251 - Algorithm and Programming',
                code: 1251,
            },
            {
                day: 'Salı',
                color: 'yellow',
                name: 'Physics',
                fullname: 'PHY 101 - Algorithm and Programming',
                code: 101,
            },
            {
                day: 'Cuma',
                color: 'cyan',
                name: 'Calculus',
                fullname: 'CALC 101 - Algorithm and Programming',
                code: 101,
            },
        ],
    },
    {
        hour: '14:00',
        cells: [
            {
                day: 'Salı',
                color: 'lightgreen',
                name: 'Project',
                fullname: 'CME 1251 - Algorithm and Programming',
                code: 1224,
            },
            {
                day: 'Çarşamba',
                color: 'white',
                name: 'Discrete',
                fullname: 'PHY 101 - Algorithm and Programming',
                code: 1203,
            },
            {
                day: 'Cuma',
                color: 'orange',
                name: 'Calculus',
                fullname: 'CALC 101 - Algorithm and Programming',
                code: 101,
            },
        ],
    },
    {
        hour: '16:00',
        cells: [
            {
                day: 'Pazartesi',
                color: 'green',
                name: 'Algoritma',
                fullname: 'CME 1251 - Algorithm and Programming',
                code: 1251,
            },
            {
                day: 'Salı',
                color: 'yellow',
                name: 'Physics',
                fullname: 'PHY 101 - Algorithm and Programming',
                code: 101,
            },
            {
                day: 'Cuma',
                color: 'cyan',
                name: 'Calculus',
                fullname: 'CALC 101 - Algorithm and Programming',
                code: 101,
            },
        ],
    },
];
