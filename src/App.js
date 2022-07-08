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
import { useState } from 'react'

function App() {

    const [ Alert, setAlert ] = useState(null)
    const [ SlideUp, setSlideUp ] = useState(null)

    const setOverlay = (type, value = null) => {

        if (type === 0) {
            setAlert(value)
        } 

        if (type === 1) {
            setAlert(value)
        }
    }

    return (
        <>
            {
                Alert !== null &&
                <Alert
                    desc={ Alert.desc }
                    setFunc={ Alert.setFunc }
                    alertBuffer={ setOverlay }
                    btns={ Alert.btns }
                />
            }
            {
                SlideUp !== null &&
                <SlideUp />
            }
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<WelcomePage />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="New-Buys" element={<NewBuys setOverlay={ setOverlay } />} />
                    <Route path="News" element={<News />} />
                    <Route path="Restocks" element={<AppFeed />} />
                    <Route path="Users" element={<UsersPage />} />
                    <Route path="Analytics" element={<Analytics />} />
                    <Route path="Settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
