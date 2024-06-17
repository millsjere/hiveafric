import { Avatar, Box, Button, Container, Grid, Hidden, InputAdornment, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {AvatarGroup, Rating} from '@material-ui/lab';
import { ArrowForward, Copyright, Email, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useReducer, useState } from 'react'
import { grey } from '@material-ui/core/colors'
import Colors from '../../assets/colors.jpg'
import { connect } from 'react-redux'
import Modal from '../../components/Modal'
import { errorModal, userLogin, successModal } from '../../actions/actions'


const useStyles = makeStyles( theme => ({
    root: {
        background: '#fff',
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px'
        }
    },
    logo : {
        fontSize: '1.2rem',
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
        marginBottom: '1.8rem',
    },
    fieldIcon : {
        color: grey[400]
    },
    btn : {
        height: '3.5rem',
        marginBottom: '1rem',
        borderRadius: '10px'
    },
    banner : {
        height: '100%',
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0, 70%), rgba(0,0,0, 20%)), url(${Colors})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
}))

const Login = (props) => {
    const classes = useStyles()
    const [show, setShow] = useState(false)
    const [disable, setDisable] = useState(false)

    const reducerFn = (state, action) => {
        switch (action.type) {
            case "EMAIL":
                return {...state, email: action.payload.trim().toLowerCase()}
            case "PASSWORD":
                return {...state, password: action.payload.trim()}
            case "RESET":
                return {email: '',password:'' }
            default:
                return state;
        }
    }

    const [formInput, dispatch] = useReducer(reducerFn, {email: '', password: ''})

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(formInput.email === '' || !formInput.email.includes('@')){
            props.errorModal('Invalid. Provide a valid email address')
            return
        }
        if(formInput.password === '' || formInput.email.length < 8){
            props.errorModal('Invalid. Password must be more than 8 characters')
            return
        }

        // call action creator
        props.successModal('Buzzing you in. Hold on..')
        setDisable(true)

        setTimeout(async() => {
            const res = await props.userLogin(formInput)
            if(res.status === 'success'){
                dispatch({type: 'RESET'})
                setDisable(false)
            }else{
                setDisable(false)
                props.errorModal(res.message)
            }
        }, 1000);
       
    }

  return (

    <div className={classes.root}>
        {/* Modal */}
        {props.modal && <Modal status={props.modal.status} /> }
        <Grid container style={{height: '100vh' }} >
            <Grid item lg={5} md={6} sm={12}>
                <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem 8rem', height:'100%' }}>
                    <Box>
                        <img src={'https://res.cloudinary.com/hiveafrika/image/upload/v1659887796/Assets/HiveAfrica-Logo_htot27.png'} alt='logo' width='15%' />
                        <Typography variant='h5' className={classes.logo} >hive<span>Afrika.</span> </Typography>
                    </Box>

                    <Box >
                        <Typography className={classes.title} variant='h6'>Hello Again<span>.</span> </Typography>
                        <Typography color='textSecondary' style={{marginBottom: '2rem'}}>Don't have a hive? Lets build you one. <Link href='/signup'>Signup</Link></Typography>

                        <form onSubmit={onFormSubmit}>
                            <TextField size='medium' className={classes.field} variant='outlined' fullWidth label='Email' value={formInput.email} onChange={(e)=> dispatch({type: "EMAIL", payload: e.target.value})} InputProps={{
                                endAdornment: <InputAdornment position='end'><Email className={classes.fieldIcon} /> </InputAdornment>
                            }} />
                            <TextField size='medium' className={classes.field} type={show ? 'text' : 'password'} value={formInput.password} onChange={(e)=> dispatch({type: "PASSWORD", payload: e.target.value})} variant='outlined' fullWidth label='Password' InputProps={{
                                endAdornment: <InputAdornment position='end'> { show ? <Visibility className={classes.fieldIcon} style={{cursor: 'pointer'}} onClick={()=> setShow(!show)} /> : <VisibilityOff className={classes.fieldIcon} style={{cursor: 'pointer'}} onClick={()=> setShow(!show)} /> } </InputAdornment>
                            }} />
                            <Button className={classes.btn} type={'submit'} disabled={disable} disableElevation variant='contained' color='secondary' fullWidth endIcon={<ArrowForward />}>Buzz in</Button>
                            <Typography variant='body1' style={{textAlign: 'center'}} color='textSecondary'>Can't find my hive. <Link href='/auth/forgotpassword'>Forgot password</Link></Typography> 
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

            <Hidden smDown >
                <Grid item lg={7} md={6} >
                    <Box className={classes.banner} display='flex' flexDirection={'column'} justifyContent='end'>
                        <Box margin='5rem'>
                            <Typography gutterBottom variant='h3' style={{color: '#fff', fontWeight: 200, fontSize: '2.8vw'}}>Start turning your<br />ideas into reality</Typography>
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

        </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return state
}

export default connect(mapStateToProps, {errorModal, userLogin, successModal})(Login)