import React, { useState } from 'react';
import UserInfoRow from './UserInfoRow';

function UserInfoContainer() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='flex flex-col bg-gray-200 gap-4 p-8 rounded w-12/12'>
            <UserInfoRow title='Kullanıcı Adı:' value={userName} onChange={handleUserNameChange} />
            <UserInfoRow
                title='Şifre:'
                value={password}
                onChange={handlePasswordChange}
                isPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
        </div>
    );
}

export default UserInfoContainer;
