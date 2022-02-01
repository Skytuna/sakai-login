import React from 'react';
import { HOURS } from '../../Constants';
import Dropdown from '../Dropdown';

function HourSelector({ onHourChange }) {
    return (
        <Dropdown
            options={HOURS}
            onChange={onHourChange}
            isLoading={false}
            isClearable={false}
            isSearchable={false}
            placeholder='Saat seçiniz'
            noOptionsMessage='Hiçbir saat bulunamadı.'
        />
    );
}

export default HourSelector;
