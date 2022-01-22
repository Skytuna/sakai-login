import React from 'react';

function Card({ children, className }) {
    return (
        <div
            className={`p-8 rounded-md ${
                className?.split(' ').find((c) => c?.includes('bg')) || 'bg-gray-100'
            } ${className || ''}`}>
            {children}
        </div>
    );
}

export default Card;
