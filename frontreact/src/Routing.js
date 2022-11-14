import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EventScreen from './components/Events/EventScreen';
import EventDetailsScreen from './components/Events/EventDetailsScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen.js';
import ChatScreen from './components/Chat/ChatScreen';

function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<EventScreen/>}/>
                <Route path={"/login"} element={<LoginScreen/>}/>
                <Route path={"/signup"} element={<SignupScreen/>}/>
                <Route path={"/:id"} element={<EventDetailsScreen/>}/>
                <Route path={"/chat/:id"} element={<ChatScreen/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;