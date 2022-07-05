import './App.scss'
import WelcomePage from './pages/welcome-page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersPage from './pages/users-page'
import AppFeed from './pages/Restocks'
import Login from './pages/Login'
import Settings from './pages/Settings'
import NewBuys from './pages/NewBuys'
import News from './pages/News'
import Analytics from './pages/Analytics'

function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="" element={<WelcomePage />} />
                <Route path="Login" element={<Login />} />
                <Route path="New-Buys" element={<NewBuys />} />
                <Route path="News" element={<News />} />
                <Route path="Restocks" element={<AppFeed />} />
                <Route path="Users" element={<UsersPage />} />
                <Route path="Analytics" element={<Analytics />} />
                <Route path="Settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
