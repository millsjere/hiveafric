import axios from 'axios'

// GET AUTH
export const authRequest = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get("/auth/request");
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
        dispatch(successModal('Building your new hive...'))
        try {
            const res = await axios.post('/hive/signup', data)
            if(res.data.status === 'success'){
                dispatch({type: "NEW_USER", payload: res.data.data});
                dispatch(successModal('Your hive is ready!!'));
                setTimeout(()=>{
                    window.location.assign('/')
                })
            }
        } catch (error) {
            // console.log(error.response);
            if (
                error.response.data.status === "failed" &&
                error.response.data.error.code === 11000
            ) {
                const errMessage = `Sorry, ${Object.keys(
                error.response.data.error.keyValue
                )} is already taken.`;
                dispatch(errorModal(errMessage));
            }
            if (
                error.response.data.status === "failed" &&
                error.response.data.error.name === "ValidationError"
            ) {
                const errMessage = error.response.data.message.split(":")[2].trim();
                dispatch(errorModal(errMessage));
            }
        }
    }
}

// USER LOGIN
export const userLogin = (data) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/hive/login', data);
            if (res.data.status === "success") {
                dispatch(successModal("Login successful..."));
                setTimeout(() => {
                  dispatch({ type: "LOGIN_USER", payload: res.data.data });
                }, 1000);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response.data.status === "failed") {
                dispatch(errorModal(error.response.data.message));
            }
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
        const res = await axios.delete("/auth/logout");
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
  