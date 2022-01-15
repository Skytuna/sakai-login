import React from 'react';
import EyeIcon from '../Icons/eye-outline.svg';
import EyeOffIcon from '../Icons/eye-off-outline.svg';

function UserInfoRow({ title, value, onChange, isPassword, showPassword, setShowPassword }) {
    const handleHidePasswordIcon = () => {
        setShowPassword(false);
    };

    const handleShowPasswordIcon = () => {
        setShowPassword(true);
    };

    return (
        <div className='flex flex-row items-center box-border'>
            <h5 className='text-2xl text-gray-800 font-body mr-4 w-3/12'>{title}</h5>
            <input
                className='bg-gray-300 rounded-sm flex-grow px-3 py-2 border border-gray-300
                focus:outline-none focus:border-gray-500 focus:border text-gray-900 font-normal text-lg'
                type={isPassword && !showPassword ? 'password' : 'text'}
                name={title}
                value={value}
                onChange={onChange}></input>
            {isPassword ? (
                showPassword ? (
                    <img
                        src={EyeIcon}
                        style={iconStyle}
                        alt='Şifreyi göster'
                        onClick={handleHidePasswordIcon}
                    />
                ) : (
                    <img
                        src={EyeOffIcon}
                        style={iconStyle}
                        className='ml-7'
                        alt='Şifreyi gizle'
                        onClick={handleShowPasswordIcon}
                    />
                )
            ) : null}
        </div>
    );
}

export default UserInfoRow;

const iconStyle = {
    width: 24,
    height: 24,
    marginInline: 8,
    position: 'absolute',
    right: 72,
};
