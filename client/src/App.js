import React, { useEffect } from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Account from './pages/user/Account';
import { connect } from 'react-redux';
import Loader from './components/Loader';
import { authRequest } from './actions/actions';
import Verify from './pages/auth/Verify';
import PhoneVerify from './pages/auth/PhoneVerify';


const App = (props) => {
  const { loader, authRequest, currentUser} = props

  useEffect(()=>{
    authRequest()
  },[authRequest])

  const renderSignup = () => {
    if (currentUser) {
      if (currentUser.isEmailVerified === false) {
        return <Navigate to="/verify" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }
    return <Signup />;
  }

  const renderLogin = () => {
    if (currentUser) {
      if (currentUser.isEmailVerified === false) {
        return <Navigate to="/verify" />;
      }
      if (currentUser.verificationCode) {
        return <Navigate to="/sms-verify" />;
      }
       else {
        return <Navigate to="/dashboard" />;
      }
    }
    return <Login />;
  }


  return (
    <ThemeProvider theme={theme}>

      {
        !loader ?
          <Routes>
            <Route exact path='/' element={ renderLogin()} />
            <Route exact path='/signup' element={renderSignup()} />
            <Route exact path='/verify' element={<Verify />} />
            <Route exact path='/sms-verify' element={<PhoneVerify />} />

            <Route exact path='/dashboard' element={<Account />} />
            <Route exact path='/inventory' element={<Account />} />
            <Route exact path='/inventory/category' element={<Account />} />
            <Route exact path='/inventory/brands' element={<Account />} />
            <Route exact path='/analytics' element={<Account />} />
            <Route exact path='/stores' element={<Account />} />
            <Route exact path='/settings' element={<Account />} />

          </Routes>
        :
          <Loader />
      }

      

    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

export default connect(mapStateToProps, {authRequest})(App)
