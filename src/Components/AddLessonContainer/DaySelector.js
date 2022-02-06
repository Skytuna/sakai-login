import React from 'react';
import { DAYS } from '../../Constants';
import Dropdown from '../Dropdown';

function DaySelector(props) {
    return (
        <Dropdown
            {...props}
            options={DAYS}
            isLoading={false}
            isClearable={false}
            isSearchable={false}
            placeholder='Gün seçiniz'
            noOptionsMessage='Hiçbir gün bulunamadı.'
        />
    );
}

export default DaySelector;
