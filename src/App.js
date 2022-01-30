import './App.css';
import './index.css';
import UserInfoContainer from './Components/UserInfoContainer';
import LessonSelector from './Components/LessonSelector';
import { ContextProvider } from './Context';

function App() {
    return (
        <ContextProvider>
            <div className='white w-screen h-screen flex flex-col bg-primary-500 gap-4 p-8'>
                <div className='w-1/4 flex flex-col gap-4'>
                    <UserInfoContainer />
                    <LessonSelector />
                </div>
            </div>
        </ContextProvider>
    );
}

export default App;
