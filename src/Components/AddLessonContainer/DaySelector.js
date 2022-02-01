import React from 'react';
import { DAYS } from '../../Constants';
import Dropdown from '../Dropdown';

function DaySelector({ onDayChange }) {
    return (
        <Dropdown
            options={DAYS}
            onChange={onDayChange}
            isLoading={false}
            isClearable={false}
            isSearchable={false}
            placeholder='Gün seçiniz'
            noOptionsMessage='Hiçbir gün bulunamadı.'
        />
    );
}

export default DaySelector;

