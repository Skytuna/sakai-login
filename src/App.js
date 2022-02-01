import './App.css';
import './index.css';
import UserInfoContainer from './Components/UserInfoContainer';
import { ContextProvider } from './Context';
import AddLessonContainer from './Components/AddLessonContainer';
import WeekScheduleContainer from './Components/WeekScheduleContainer';

function App() {
    return (
        <ContextProvider>
            <div className='white w-screen h-screen flex flex-row bg-primary-500 gap-4 p-8 justify-between'>
                <div className='w-3/12 flex flex-col gap-6 justify-between'>
                    <UserInfoContainer />
                    <AddLessonContainer />
                </div>
                <div className='w-7/12 grid gap-6 auto-rows-fr mr-10 mb-20'>
                    <WeekScheduleContainer />
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
