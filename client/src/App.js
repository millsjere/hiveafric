import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Account from './pages/user/Account';
import { connect } from 'react-redux';


const App = (props) => {
  return (
    <ThemeProvider theme={theme}>

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />

        <Route exact path='/dashboard' element={<Account />} />
        <Route exact path='/inventory' element={<Account />} />
        <Route exact path='/inventory/new' element={<Account />} />
        <Route exact path='/inventory/category' element={<Account />} />
        <Route exact path='/inventory/brands' element={<Account />} />
        <Route exact path='/analytics' element={<Account />} />
        <Route exact path='/account' element={<Account />} />
        <Route exact path='/settings' element={<Account />} />

      </Routes>

    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps, {})(App)
