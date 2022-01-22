import React, { useContext } from 'react';
import { Context } from '../../Context';
import UserInfoRow from './UserInfoRow';

function UserInputs() {
    const { userName, setUserName, password, setPassword } = useContext(Context);

    const handleUserNameChange = (e) => setUserName(e.target.value);

    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className='relative flex flex-col gap-10 -top-12'>
            <UserInfoRow title='Kullanıcı Adı' value={userName} onChange={handleUserNameChange} />
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
