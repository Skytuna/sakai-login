import React from 'react';
import Card from '../Card';
import ConfirmationRow from './ConfirmationRow';
import UserInputs from './UserInputs';

function UserInfoContainer() {
    return (
        <Card className='flex flex-col bg-primary-400' header='KULLANICI BİLGİLERİ'>
            <UserInputs />
            <ConfirmationRow />
        </Card>
    );
}

export default UserInfoContainer;
