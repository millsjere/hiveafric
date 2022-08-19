import axios from 'axios'

// GET AUTH
export const authRequest = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/hive/authRequest');
            //console.log(res)
            if (res.data.status === "user found") {
              dispatch({ type: "NEW_USER", payload: res.data.data });
              dispatch({ type: "EXIT_LOADING" });
            }
            if (res.data.status === "no user found") {
              dispatch({ type: "NO_USER" });
              dispatch({ type: "EXIT_LOADING" });
            }
          } catch (error) {
            if(error.response.data.meessage.startsWith('Operation')){
              errorModal('Connection Timeout. Please check your internet connection');
            }else {
              errorModal('Sorry, connection timeout. Something went wrong');
            }
      
          }
    }
}

// USER SIGNUP
export const userSignup = (data) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/hive/signup', data)
            dispatch({type: "NEW_USER", payload: res.data.data});
            return res.data

        } catch (error) {
            console.log(error.response);
            return error.response.data
        }
    }
}

// VERIFY USER
export const verifyUserEmail = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/hive/verifyUser", data);
      if(res.data.status === 'success'){
       dispatch(successModal('Email verification successful. Please wait...'))
       setTimeout(() => {
        window.location.reload()
       }, 1000);
      }
    } catch (error) {
      //console.log(error.response)
      dispatch(errorModal(error.response.data.message));
    }
  };
};

// RESEND EMAIL VERIFICATION
export const resendUserEmailVerification = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/hive/resendEmailVerification");
      if(res.data.status === 'success'){
       dispatch(successModal('Verification email sent. Please check your inbox'))
      }
    } catch (error) {
      //console.log(error.response)
      dispatch(errorModal('Sorry, could not send email. Please try again'));
    }
  };
};


// SMS VERIFY //
export const verifySMS = (data) => {
  return async () => {
    try {
      const res = await axios.post("/hive/verifySMS", data);
      return res.data

    } catch (error) {
      //console.log(error.response)
      return error.response.data
    }
  };
};

export const resendSMS = (data) => {
  return async () => {
    try {
      const res = await axios.get("/hive/resendSMS");
      return res.data

    } catch (error) {
      //console.log(error.response)
      return error.response.data
    }
  };
};

// USER LOGIN
export const userLogin = (data) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/hive/login', data);
            dispatch({ type: "LOGIN_USER", payload: res.data.data });
            return res.data

        } catch (error) {
            //console.log(error.response);
            return error.response.data
        }
    }
}
// FORGOT PASSWORD
export const forgotUserPassword = (data) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/hive/forgotpassword", data);
        if(res.data.status === 'success'){
         dispatch(successModal('Reset email sent to your inbox'))
        }
      } catch (error) {
        //console.log(error.response)
        dispatch(errorModal(error.response.data.message));
      }
    };
};

// RESET PASSWORD
export const resetUserPassword = (token, data) => {
    return async (dispatch) => {
      try {
        const res = await axios.patch(`/hive/resetpassword/${token}`, data);
        if(res.data.status === 'success'){
         dispatch(successModal('Password reset successful. Please login'))
         setTimeout(()=>{
           window.location.assign('/auth/login')
         },1500)
        }
      } catch (error) {
        //console.log(error.response)
        dispatch(errorModal(error.response.data.message));
      }
    };
  };

// LOGOUT USER
export const logoutUser = () => {
    return async (dispatch) => {
      try {
        const res = await axios.delete("/hive/logout");
        if (res.data.status === "success") {
          dispatch({ type: "LOGOUT_USER" });
          window.location.assign("/");
        }
      } catch (error) {
        console.log(error.response);
      }
    };
  };

// MODAL - ERROR ACTIONS CREATORS //

export const successModal = (message) => {
    return {
      type: "SUCCESS_MODAL",
      payload: message,
    };
  };
  
  export const errorModal = (message) => {
    return {
      type: "ERROR_MODAL",
      payload: message,
    };
  };
  
  export const resetModal = () => {
    return {
      type: "RESET_MODAL",
    };
  };
  