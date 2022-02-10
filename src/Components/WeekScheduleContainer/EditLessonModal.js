import React, { useContext, useState } from 'react';
import ModalContent from '../ModalContent';
import Modal from 'react-modal';
import { Context } from '../../Context';
import UserInfoRow from '../UserInfoContainer/UserInfoRow';

function EditLessonModal() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const { showModal, setShowModal, setSchedule, selectedCell, setSelectedCell } =
        useContext(Context);

    const handleConfirm = () => {
        setSchedule((prevState) => {
            let newState = [...prevState];
            const { id, hour } = selectedCell;
            const hourObjIndex = prevState.findIndex((o) => o.hour === hour);
            const oldCells = newState[hourObjIndex].cells;
            const cellIndex = oldCells.findIndex((c) => c.id === id);
            const oldCell = oldCells[cellIndex];

            const newCell = { ...oldCell, name, code };
            oldCells[cellIndex] = newCell;

            newState[hourObjIndex].cells = oldCells;
            return newState;
        });
        toggleModal();
        setName('');
        setCode('');
        setSelectedCell({ id: null, hour: null });
    };

    const toggleModal = () => {
        setShowModal((prevS) => !prevS);
    };

    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const codeHandler = (e) => {
        setCode(e.target.value);
    };

    const inputClasses = 'bg-gray-50 border-gray-200 text-black h-12 w-full';
    const titleClasses = 'text-black text-base';
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
            closeTimeoutMS={300}>
            <ModalContent
                header='Bir Atamayı Düzenleyiniz'
                onClose={toggleModal}
                onConfirm={handleConfirm}>
                <div className='flex flex-col w-full px-4 gap-4 pb-2 pt-6'>
                    <UserInfoRow
                        title='Ders İsmi'
                        value={name}
                        onChange={nameHandler}
                        inputClasses={inputClasses}
                        titleClasses={titleClasses}
                    />
                    <UserInfoRow
                        title='Ders Kodu'
                        value={code}
                        onChange={codeHandler}
                        inputClasses={inputClasses}
                        titleClasses={titleClasses}
                    />
                </div>
            </ModalContent>
        </Modal>
    );
}

export default EditLessonModal;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(4px)',
    },
};
