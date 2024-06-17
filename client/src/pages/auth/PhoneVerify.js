import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Divider, Grid, Link, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { verifySMS, resendSMS, successModal, errorModal } from '../../actions/actions';
import { Navigate } from 'react-router-dom';
import { LockOpen } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    root : {
        height: '100vh',
        '& .MuiDivider-root': {
          flexGrow: 1
        }
      },
      wrapper : {
        display: 'flex',
        flexDirection: 'column',
        padding: '3.2rem',
        borderRadius: '16px',
        boxShadow: '-24px 24px 72px 8px rgb(145 158 171 / 24%)',
        '& a': {
          color: theme.primaryColor,
          fontWeight: 400
          
        }
      },
      title : {
        marginBottom: '.5rem',
        fontWeight: 500,
        fontSize: '1.6rem'
      },
      field : {
        textAlign: 'center',
        marginBottom: '1.5rem',
        borderRadius: '1.6rem',
        '& *': {
          borderRadius: '8px'
        },
        '& label.Mui-focused':{
          color: theme.primaryColor
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            border: `1px solid ${theme.primaryColor}`
          }
        }
      },
      btn: {
        padding: '1rem 0',
        color: '#fff',
        borderRadius: '8px',
        marginBottom: '2rem',
        '&:hover' : {
          background: theme.primaryColor
        }
      },
      flex : {
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
      },
      fieldIcon: {
        color: grey[400],
        cursor: 'pointer',
      },
      icon: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: '0 auto',
        marginBottom: '1.5rem'
      }

}))

const PhoneVerify = (props) => {
    const classes = useStyles()
  const [code, setCode] = useState('')
  const [disable, setDisable] = useState(true)

  useEffect(()=>{
    if(code.length === 5 || code.length === 6){
      setDisable(false)
    }else{
      setDisable(true)
    }
  },[code])

const onFormSubmit = (e) => {
    e.preventDefault()
    setDisable(true)
    props.successModal('Verifying sms code. Hold on..')

    setTimeout(async() => {
        const res = await props.verifySMS({token: code})
        if(res.status === 'success'){
            props.successModal('Verfication successful. Hold on..')
            window.location.assign('/dashboard')
        }else{
            setDisable(false)
            props.errorModal('Sorry, could not verify sms code. Please try again')
        }
        
    }, 500);
}

const resendCode = () => {
    props.successModal('Sending verification code. Hold on..')
    
    setTimeout(async() => {
        const res = await props.resendSMS()
        if(res.status === 'success'){
            props.successModal('Verification code sent')
        }else{
            errorModal('Sorry, could not send SMS. Please try again.')
        }
    }, 500);
}


  const renderPage = () => {
    if(props.currentUser){
        if(props.currentUser && props.currentUser.verificationCode){
            
            return(
                <Container className={classes.root}>
                {/* MODAL  */}
                { props.modal && <Modal status={props.modal.status} />}
                  <Grid container style={{height: '100%', display: 'flex', alignItems:'center'}}>
                    <Grid item xs={12} sm={8} md={6} lg={5} style={{margin: '0 auto'}}>
                      <Avatar className={classes.icon}><LockOpen style={{fontSize: '3rem'}} /></Avatar>
                      <div className={`${classes.wrapper}`}>
                        <Typography className={classes.title} variant='h5'>Before You Buzz In..</Typography>
                        <Typography style={{marginBottom: '1.5rem'}} paragraph color='textSecondary'>Please check your phone (+233) {props.currentUser && props.currentUser.phone} for a verification code to confirm your login action.</Typography>
  
                        <form onSubmit={(e)=> onFormSubmit(e)}>
                          <TextField className={classes.field} variant='outlined' inputProps={{maxLength: 6}}  placeholder='Enter verification code' value={code} onChange={(e)=>setCode(e.target.value)} fullWidth />
                          <Button className={classes.btn} disabled={disable} variant='contained' color='secondary' disableElevation type='submit' fullWidth>Continue</Button>
                        </form>
  
                          <Box className={classes.flex} >
                            <Divider /> 
                            <Typography color='textSecondary' variant='body2' >Didn't get code? <Link style={{cursor: 'pointer'}} onClick={resendCode}>Resend code</Link></Typography> 
                            <Divider />
                          </Box>
                      </div>
                    </Grid>
                  </Grid>
                </Container>
            )
        }

        if(props.currentUser && !props.currentUser.isEmailVerified){
            return <Navigate to='/verify' />
        }
        
    }
    if(!props.currentUser){
        return <Navigate to='/' />
    }


    return <Navigate to='/dashboard' />
  }


  return (
    <>
      {renderPage()}
    </>
  )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {verifySMS, resendSMS, successModal, errorModal})(PhoneVerify);
