import React from 'react';

function Card({ children, className }) {
    return <div className={`${className || 'bg-gray-200'} p-8`}>{children}</div>;
}

export default Card;
