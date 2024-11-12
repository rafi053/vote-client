import { FC } from 'react'
import CandidateList from './components/CandidateList/CandidateList'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import NavBar from './components/NavBar/NavBar'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'

const App:FC = () => {
  
  
  
  return (
    <div>
  <NavBar />
  <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <CandidateList />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
      <CandidateList/>
    </div>
  )
}

export default App