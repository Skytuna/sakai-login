import React from 'react';
import { HOURS } from '../../Constants';
import Dropdown from '../Dropdown';

function HourSelector(props) {
    return (
        <Dropdown
            {...props}
            options={HOURS}
            isLoading={false}
            isClearable={false}
            isSearchable={false}
            placeholder='Saat seçiniz'
            noOptionsMessage='Hiçbir saat bulunamadı.'
        />
    );
}

export default HourSelector;
