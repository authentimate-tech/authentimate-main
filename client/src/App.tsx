import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import UserMain from './pages/users/UserMain'

function App() {

  return (
    <Routes>
        <Route path='/sign-in'  element={<AuthPage mode='SIGN_IN'/>}/>
        <Route path="/sign-up" element={<AuthPage mode='SIGN_UP'/>} />
        <Route path="/user/*" element={<UserMain/>} />
        
        <Route path="/*" element={<Navigate to="sign-in"/>} />
    </Routes>
  )
}

export default App
