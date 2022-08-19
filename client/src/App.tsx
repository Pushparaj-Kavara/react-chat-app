import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './startup/Login'
import Register from './startup/Register'
import NotFound from './pages/NotFound'
import MainScreen from './pages/MainScreen'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='chat-screen' element={<MainScreen />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
