import React from 'react';
import Select from 'react-select';
import Card from './Card';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
function ClassSelector() {
    return (
        <Card>
            <Select options={options} />
        </Card>
    );
}

export default ClassSelector;
