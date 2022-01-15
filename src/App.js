import './App.css';
import './index.css';
import UserInfoContainer from './Components/UserInfoContainer';
import Card from './Components/Card';
import ClassSelector from './Components/ClassSelector';

function App() {
    return (
        <Card className='bg-gray-100 w-screen h-screen flex flex-col gap-4'>
            <UserInfoContainer />
            <ClassSelector />
        </Card>
    );
}

export default App;
