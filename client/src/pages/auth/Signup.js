import { Avatar, Box, Button, Container, Grid, Hidden, InputAdornment, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {AvatarGroup, Rating} from '@material-ui/lab';
import { ArrowForward, Copyright, Email, Person, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useReducer, useState } from 'react'
import { grey } from '@material-ui/core/colors'
import Colors from '../../assets/colors.jpg'
import { connect } from 'react-redux'
import Modal from '../../components/Modal'
import { errorModal, userLogin } from '../../actions/actions'


const useStyles = makeStyles( theme => ({
    logo : {
        fontWeight: 300,
        '& span': {
            fontWeight: 700,
            color: theme.primaryColor 
        }
    },
    title : {
        fontSize: '1.8rem',
        fontWeight: 600,
        '& span' : {
            color: theme.primaryColor
        }
    },
    field : {
        marginBottom: '1.8rem'
    },
    fieldIcon : {
        color: grey[400]
    },
    btn : {
        height: '3.2rem',
        marginBottom: '1rem'
    },
    banner : {
        height: '100%',
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0, 90%), rgba(0,0,0, 10%)), url(${Colors})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}))

const Signup = (props) => {
    const classes = useStyles()
    const [show, setShow] = useState(false)

    const reducerFn = (state, action) => {
        switch (action.type) {
            case "USERNAME":
              return {...state, username: action.payload}
            case "EMAIL":
                return {...state, email: action.payload}
            case "PASSWORD":
                return {...state, password: action.payload}
            case "RESET":
                return {email: '',password:'' }
            default:
                return state;
        }
    }

    const [formInput, dispatch] = useReducer(reducerFn, {username: '', email: '', password: ''})

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(formInput.username === ''){
          props.errorModal('Come on! The hive must belong to someone')
          return
        }
        if(formInput.email === '' || !formInput.email.includes('@')){
            props.errorModal('Sorry, but I really need a valid email address')
            return
        }
        if(formInput.password === '' || formInput.email.length < 6){
            props.errorModal('Sorry, password must be more than 6 characters')
            return
        }

        // call action creator
        props.userLogin(formInput)
    }

  return (

    <div>
        {/* Modal */}
        {props.modal && <Modal status={props.modal.status} /> }
        <Grid container style={{height: '100vh' }} >
            

            <Hidden smDown >
                <Grid item lg={7} md={6} >
                
                    <Box className={classes.banner} display='flex' flexDirection={'column'} justifyContent='end'>
                        <Box margin='5rem'>
                            <Typography gutterBottom variant='h3' style={{color: '#fff', fontWeight: 200, fontSize: '2.8vw'}}>Grow bigger.<br />Connect faster.</Typography>
                            <Typography style={{color: '#fff', marginBottom: '3rem'}}>
                                Create a free account and get a 50 product hive with full access to all features.<br /> 
                                No credit card needed. Trusted by the Giants & Professionals
                            </Typography>

                            <Box display={'flex'} gridGap='1rem'>
                                <AvatarGroup>
                                    <Avatar />
                                    <Avatar />
                                    <Avatar />
                                    <Avatar />
                                </AvatarGroup>
                                <span>
                                    <Rating value={5} color='primary' readOnly />
                                    <Typography variant='body2' style={{color:'#fff'}}>from 100+ reviews</Typography>
                                </span>
                            </Box>
                        </Box>
                        
                    </Box>
                    
                </Grid>
            </Hidden>

            <Grid item lg={5} md={6} sm={12}>
                <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem 5rem', height:'100%' }}>
                    <Box>
                        <Typography variant='h5' className={classes.logo} >hive<span>Afrika.</span> </Typography>
                    </Box>

                    <Box >
                        <Typography className={classes.title} variant='h6'>Build a Hive<span>.</span> </Typography>
                        <Typography color='textSecondary' style={{marginBottom: '2rem'}}>Already have a hive? Let's buzz in. <Link href='/'>Login</Link></Typography>

                        <form onSubmit={onFormSubmit}>
                             <TextField className={classes.field} variant='outlined' fullWidth label='Username' value={formInput.username} onChange={(e)=> dispatch({type: "USERNAME", payload: e.target.value})} InputProps={{
                                endAdornment: <InputAdornment position='end'><Person className={classes.fieldIcon} /> </InputAdornment>
                            }} />
                            <TextField className={classes.field} variant='outlined' fullWidth label='Email' value={formInput.email} onChange={(e)=> dispatch({type: "EMAIL", payload: e.target.value})} InputProps={{
                                endAdornment: <InputAdornment position='end'><Email className={classes.fieldIcon} /> </InputAdornment>
                            }} />
                            <TextField className={classes.field} type={show ? 'text' : 'password'} value={formInput.password} onChange={(e)=> dispatch({type: "PASSWORD", payload: e.target.value})} variant='outlined' fullWidth label='Password' InputProps={{
                                endAdornment: <InputAdornment position='end'> { show ? <Visibility className={classes.fieldIcon} onClick={()=> setShow(!show)} /> : <VisibilityOff className={classes.fieldIcon} onClick={()=> setShow(!show)} /> } </InputAdornment>
                            }} />
                            <Button className={classes.btn} type={'submit'} disableElevation variant='contained' color='secondary' fullWidth endIcon={<ArrowForward />}>Sign up</Button>
                            <Typography variant='body2' style={{textAlign: 'center'}} color='textSecondary'>Can't find my hive. <Link href='/forgotpassword'>Forgot password</Link></Typography> 
                        </form>

                    </Box>

                    <Box display={'flex'} justifyContent='space-between'>
                        <span >
                            <Typography style={{display: 'flex'}} color='textSecondary' variant='body2'> <Copyright fontSize='small' style={{marginRight: '5px'}} />  hiveafrika {new Date().getFullYear()}</Typography>
                        </span>
                        <Hidden xsDown>
                            <span >
                                <Typography style={{display: 'flex'}} color='textSecondary' variant='body2'> support@hiveafrika.com</Typography>
                            </span>
                        </Hidden>
                    </Box>

                </Container>
            </Grid>

        </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

export default connect(mapStateToProps, {errorModal, userLogin})(Signup)