import React from 'react';
import CardHeader from './CardHeader';

function Card({ children, className, header, headerClasses }) {
    return (
        <div
            className={`p-8 rounded-md min-w-[30rem]  ${header ? 'mt-10' : ''} ${
                className?.split(' ').find((c) => c?.includes('bg')) || 'bg-gray-100'
            } ${className || ''}`}>
            {header && <CardHeader title={header} className={headerClasses} />}
            {children}
        </div>
    );
}

export default Card;
