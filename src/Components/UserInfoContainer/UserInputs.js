import React, { useContext } from 'react';
import { Context } from '../../Context';
import UserInfoRow from './UserInfoRow';

function UserInputs() {
    const { username, setUsername, password, setPassword } = useContext(Context);

    const handleUserNameChange = (e) => setUsername(e.target.value);

    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className='flex flex-col gap-10 relative -top-6'>
            <UserInfoRow title='Kullanıcı Adı' value={username} onChange={handleUserNameChange} />
            <UserInfoRow
                title='Şifre'
                value={password}
                onChange={handlePasswordChange}
                isPassword
            />
        </div>
    );
}

export default UserInputs;
