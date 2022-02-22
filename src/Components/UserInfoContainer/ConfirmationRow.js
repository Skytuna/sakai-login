import React, { useContext, useState, useEffect } from 'react';
import RememberMe from './RememberMe';
import Button from '../Button';
import { Context } from '../../Context';
import { LOGIN_EVENT } from '../../Constants';
const { ipcRenderer } = window.require('electron');

function ConfirmationRow() {
    const [rememberMe, setRememberMe] = useState(false);
    const { username, password, setUsername, setPassword } = useContext(Context);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (user?.rememberMe) {
            setUsername(user.username);
            setPassword(user.password);
            setRememberMe(user.rememberMe);
            ipcRenderer.send(LOGIN_EVENT, { username: user.username, password: user.password });
        }

        return () => {
            window.localStorage.setItem('isAuthorized', JSON.stringify(false));
        };
    }, []);

    useEffect(() => {
        const isAuthorized = JSON.parse(window.localStorage.getItem('isAuthorized'));
        const user = JSON.parse(window.localStorage.getItem('user'));

        if (!isAuthorized) {
            ipcRenderer.send(LOGIN_EVENT, { username: user.username, password: user.password });
        }
    }, [JSON.parse(window.localStorage.getItem('isAuthorized'))]);

    const handleConfirm = () => {
        if (rememberMe) {
            window.localStorage.setItem('user', JSON.stringify({ username, password, rememberMe }));
        } else {
            window.localStorage.setItem(
                'user',
                JSON.stringify({ username: '', password: '', rememberMe }),
            );
        }

        ipcRenderer.send(LOGIN_EVENT, { username, password });
    };

    const toggleRememberMe = () => {
        setRememberMe((prevS) => !prevS);
    };

    return (
        <div className='flex flex-row justify-between items-center'>
            <RememberMe toggleRememberMe={toggleRememberMe} rememberMe={rememberMe} />
            <Button
                title='ONAYLA'
                onClick={handleConfirm}
                className='relative self-end bg-white hover:bg-gray-100 border-b-2 active:border-primary-400 active:scale-95 border-gray-300'
            />
        </div>
    );
}

export default ConfirmationRow;
