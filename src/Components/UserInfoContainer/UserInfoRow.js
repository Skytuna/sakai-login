import React, { useContext } from 'react';
import { Context } from '../../Context';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function UserInfoRow({ title, value, onChange, isPassword }) {
    const { showPassword, setShowPassword } = useContext(Context);

    const togglePasswordIcon = () => {
        setShowPassword((prevS) => !prevS);
    };

    return (
        <div
            className={`flex flex-row items-center box-border relative ${
                isPassword ? 'mt-2' : 'mt-6'
            }`}>
            <label
                className='text-sm text-gray-50 font-body absolute mb-20 select-none'
                htmlFor={title}>
                {title}
            </label>
            <input
                className='bg-primary-500 rounded flex-grow w-1/2 px-3 py-2 border border-primary-500 hover:border-red-300
                focus:outline-none focus:border-red-200 focus:border text-white font-normal text-base'
                type={isPassword && !showPassword ? 'password' : 'text'}
                id={title}
                name={title}
                value={value}
                onChange={onChange}></input>
            {isPassword ? (
                showPassword ? (
                    <FiEye onClick={togglePasswordIcon} style={iconStyle} color='#ffffff' />
                ) : (
                    <FiEyeOff onClick={togglePasswordIcon} style={iconStyle} color='#ffffff' />
                )
            ) : null}
        </div>
    );
}

export default UserInfoRow;

const iconStyle = {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 12,
    cursor: 'pointer',
    // fill: '#ffffff',
};
