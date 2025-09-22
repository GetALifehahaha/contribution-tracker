import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// import from barrel file from index.jsx
import { Home, Login, NotFound, Register } from './pages'
import ProtectedRoute from './components/ProtectedRoute'

const Logout = () => {
  localStorage.clear()
  return <Navigate to='/login' />
}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/login'
            element={
              <Login />
            }
          />

          <Route 
            path='/register'
            element={
              <RegisterAndLogout />
            }
          />

          <Route 
            path='/logout'
            element={
              <Logout />
            }
          />

          <Route 
            path='*'
            element={
              <NotFound />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
