import React from 'react';
import Card from '../Card';
import ConfirmationRow from './ConfirmationRow';
import UserInfoCard from './UserInfoCard';
import UserInputs from './UserInputs';

function UserInfoContainer() {
    return (
        <Card className='flex flex-col bg-primary-400 mt-10 rounded w-3/12 min-w-min'>
            <UserInfoCard />
            <UserInputs />
            <ConfirmationRow />
        </Card>
    );
}

export default UserInfoContainer;
