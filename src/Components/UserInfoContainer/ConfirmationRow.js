import React, { useContext, useState } from 'react';
import RememberMe from './RememberMe';
import Button from '../Button';
import { Context } from '../../Context';

function ConfirmationRow() {
    const [rememberMe, setRememberMe] = useState(false);
    const { userName, password } = useContext(Context);

    const handleConfirm = () => {};

    const toggleRememberMe = () => {
        setRememberMe((prevS) => !prevS);
    };
    return (
        <div className='flex flex-row justify-between items-center'>
            <RememberMe toggleRememberMe={toggleRememberMe} rememberMe={rememberMe} />
            <Button
                title='ONAYLA'
                onClick={handleConfirm}
                className='relative self-end bg-white hover:bg-gray-100'
            />
        </div>
    );
}

export default ConfirmationRow;
