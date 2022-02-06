import React from 'react';

function IconContainer({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className='bg-white p-2 shadow-md rounded-full hover:scale-110 cursor-pointer'>
            {children}
        </div>
    );
}

export default IconContainer;
