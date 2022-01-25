import React, { useContext, useState } from 'react';
import RememberMe from './RememberMe';
import Button from '../Button';
import { Context } from '../../Context';
const { ipcRenderer } = window.require('electron');

function ConfirmationRow() {
    const [rememberMe, setRememberMe] = useState(false);
    const { username, password } = useContext(Context);

    const handleConfirm = () => {
        if (rememberMe) {
        }

        ipcRenderer.send('login-event', { username, password });
    };

    const toggleRememberMe = () => {
        setRememberMe((prevS) => !prevS);
    };

    return (
        <div className='flex flex-row justify-between items-center'>
            <RememberMe toggleRememberMe={toggleRememberMe} rememberMe={rememberMe} />
            <Button
                id='login-btn'
                title='ONAYLA'
                onClick={handleConfirm}
                className='relative self-end bg-white hover:bg-gray-100'
            />
        </div>
    );
}

export default ConfirmationRow;
