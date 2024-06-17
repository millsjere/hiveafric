import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, Link, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { verifyUserEmail, resendUserEmailVerification } from '../../actions/actions';
import { Navigate } from 'react-router-dom';


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
        fontSize: '1.8rem'
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

}))

const Verify = (props) => {
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
    props.verifyUserEmail({token: code})
}


  const renderPage = () => {
    if(props.currentUser){
        if(props.currentUser.isEmailVerified === false){
          return(
              <Container className={classes.root}>
              {/* MODAL  */}
              { props.modal && <Modal status={props.modal.status} />}
                <Grid container style={{height: '100%', display: 'flex', alignItems:'center'}}>
                  <Grid item xs={12} sm={8} md={6} lg={5} style={{margin: '0 auto'}}>
                    <div className={`${classes.wrapper}`}>
                      <Typography className={classes.title} variant='h5'>Before You Buzz In..</Typography>
                      <Typography style={{marginBottom: '2.5rem'}} paragraph color='textSecondary'>Please check your email <b>({props.currentUser && props.currentUser.email})</b> to verify your account. If not there, check your spam folder </Typography>

                      <form onSubmit={(e)=> onFormSubmit(e)}>
                        <TextField className={classes.field} variant='outlined' inputProps={{maxLength: 6}}  placeholder='Enter verification code' value={code} onChange={(e)=>setCode(e.target.value)} fullWidth />
                        <Button className={classes.btn} disabled={disable} variant='contained' color='secondary' disableElevation type='submit' fullWidth>Verify Code</Button>
                      </form>

                        <Box className={classes.flex} >
                          <Divider /> 
                          <Typography color='textSecondary' variant='body2' >Didn't get code? <Link style={{cursor: 'pointer'}} onClick={()=> props.resendUserEmailVerification()}>Resend code</Link></Typography> 
                          <Divider />
                        </Box>
                    </div>
                  </Grid>
                </Grid>
              </Container>
          )
        }
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

export default connect(mapStateToProps, {verifyUserEmail, resendUserEmailVerification})(Verify);
