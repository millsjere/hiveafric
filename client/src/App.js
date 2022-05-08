import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Account from './pages/user/Account';


const App = () => {
  return (
    <ThemeProvider theme={theme}>

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />

        <Route exact path='/account/dashboard' element={<Account />} />

      </Routes>

    </ThemeProvider>
  );
}

export default App;
