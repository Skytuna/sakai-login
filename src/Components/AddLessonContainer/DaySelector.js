import React from 'react';
import Dropdown from '../Dropdown';

function DaySelector({ onDayChange }) {
    return (
        <Dropdown
            options={DAYS}
            onChange={onDayChange}
            isLoading={false}
            isClearable={false}
            isSearchable={false}
            placeholder='Gün seçiniz...'
            noOptionsMessage='Hiçbir gün bulunamadı.'
        />
    );
}

export default DaySelector;

const DAYS = [
    {
        label: 'Pazartesi',
        value: 'Pazartesi',
    },
    {
        label: 'Salı',
        value: 'Salı',
    },
    {
        label: 'Çarşamba',
        value: 'Çarşamba',
    },
    {
        label: 'Perşembe',
        value: 'Perşembe',
    },
    {
        label: 'Cuma',
        value: 'Cuma',
    },
];
