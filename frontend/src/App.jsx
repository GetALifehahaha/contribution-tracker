import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'


const logout = () => {
    localStorage.clear();
    return <Navigate to='/login'/>
}

const registerAndLogout = () => {
  localStorage.clear();
  return;
}

const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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