import './App.css';
import './index.css';
import UserInfoContainer from './Components/UserInfoContainer';
import { ContextProvider } from './Context';
import AddLessonContainer from './Components/AddLessonContainer';

function App() {
    return (
        <ContextProvider>
            <div className='white w-screen h-screen flex flex-row bg-primary-500 gap-4 p-8'>
                <div className='w-1/4 flex flex-col gap-6'>
                    <UserInfoContainer />
                    <AddLessonContainer />
                </div>
                {/* <div className='w-3/4 flex flex-col justify-between gap-6'>
                    <WeekScheduleContainer />
                </div> */}
            </div>
        </ContextProvider>
    );
}

export default App;
