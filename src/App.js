import './App.css';
import './index.css';
import UserInfoContainer from './Components/UserInfoContainer';
import { ContextProvider } from './Context';
import AddLessonContainer from './Components/AddLessonContainer';
import WeekScheduleContainer from './Components/WeekScheduleContainer';

function App() {
    return (
        <ContextProvider>
            <div className='w-full h-full min-h-screen flex flex-col bg-primary-500 gap-4 p-8 justify-between xl:flex-row'>
                <div className='w-3/12 flex flex-row gap-6 justify-between xl:flex-col'>
                    <UserInfoContainer />
                    <AddLessonContainer />
                </div>
                <div className='w-7/12 grid gap-6 auto-rows-fr mr-10 mb-16'>
                    <WeekScheduleContainer />
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
