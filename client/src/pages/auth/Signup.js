import { Avatar, Box, Button, Container, Grid, Hidden, InputAdornment, Link, MenuItem, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {AvatarGroup, Rating} from '@material-ui/lab';
import { ArrowForward, BusinessCenter, Copyright, Email, Person, Phone, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useReducer, useState } from 'react'
import { grey } from '@material-ui/core/colors'
import Colors from '../../assets/colors.jpg'
import { connect } from 'react-redux'
import Modal from '../../components/Modal'
import { userSignup, successModal, errorModal } from '../../actions/actions'


const useStyles = makeStyles( theme => ({
    root: {
        background: '#fff'
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
        marginBottom: '.5rem'
    },
    fieldIcon : {
        color: grey[400]
    },
    btn : {
        height: '3.2rem',
        margin: '1rem 0'
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
    const [disable, setDisable] = useState(false)

    const industry =[
        'Cosmetics','Electronic & IT Equipment','Fashion','Fashion Accessories','Food & Beverage',
        'Footwear','Furniture & Bedding',
        'Hair & Beauty','Homewares','Hospitality','Jewellery','Medicine',
        'Sporting & Outdoor','Software & Security','Toys & Hobbies'
    ]

    const initState = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        password: ''
    }
    const reducerFn = (state, action) => {
        switch (action.type) {
            case "FNAME":
              return {...state, firstname: action.payload.trim().toLowerCase()}
            case "LNAME":
              return {...state, lastname: action.payload.trim().toLowerCase()}
            case "EMAIL":
                return {...state, email: action.payload.trim().toLowerCase()}
            case "PHONE":
                return {...state, phone: action.payload}
            case "COMPANY":
              return {...state, company: action.payload.trim()}
            case "INDUSTRY":
              return {...state, industry: action.payload}
            case "PASSWORD":
                return {...state, password: action.payload.trim()}
            case "RESET":
                return initState
            default:
                return state;
        }
    }

    const [formInput, dispatch] = useReducer(reducerFn, initState)

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(formInput.firstname === '' || formInput.lastname === ''){
          props.errorModal('Come on!! The hive must belong to someone')
          return
        }
        if(formInput.email === '' || !formInput.email.includes('@')){
            props.errorModal('Sorry, but I really need a valid email address')
            return
        }
        if(formInput.password === '' || formInput.password.length < 8){
            props.errorModal('Sorry, password must be more than 8 characters')
            return
        }
        if(formInput.company === ''){
            props.errorModal('Please provide your company name')
            return
        }
        if(formInput.industry === ''){
            props.errorModal('Please select an industry')
            return
          }

        // call action creator
        //console.log(formInput)
        props.successModal('Building your hive. Please wait...')
        setDisable(true)

        setTimeout(async() => {
            const res = await props.userSignup(formInput)
            if(res.status === 'success'){
                setDisable(false)
                props.successModal('Your hive is ready. Buzz in')
            }else{
                setDisable(false)
                if (res.status === "failed" && res.error.code === 11000) {
                    const errMessage = `Sorry, ${Object.keys(res.error.keyValue)} is already taken.`;
                    props.errorModal(errMessage);
                }
                else if (res.status === "failed" && res.error.name === "ValidationError") {
                    const errMessage = res.message.split(":")[2].trim();
                    props.errorModal(errMessage);
                }
                else{
                    props.errorModal('Sorry, something went wrong. Please try again');
                }

            }
        }, 1000);

    }

  return (

    <div className={classes.root}>
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
                    <img src={'https://res.cloudinary.com/hiveafrika/image/upload/v1659887796/Assets/HiveAfrica-Logo_htot27.png'} alt='logo' width='15%' />
                        <Typography variant='h5' className={classes.logo} >hive<span>Afrika.</span> </Typography>
                    </Box>

                    <Box >
                        <Typography className={classes.title} variant='h6'>Build a Hive<span>.</span> </Typography>
                        <Typography color='textSecondary' style={{marginBottom: '2rem'}}>Already have a hive? Let's buzz in. <Link href='/'>Login</Link></Typography>

                        <form onSubmit={onFormSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} variant='outlined' fullWidth label='First Name' value={formInput.firstname} onChange={(e)=> dispatch({type: "FNAME", payload: e.target.value})} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Person className={classes.fieldIcon} /> </InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} variant='outlined' fullWidth label='Last Name' value={formInput.lastname} onChange={(e)=> dispatch({type: "LNAME", payload: e.target.value})} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Person className={classes.fieldIcon} /> </InputAdornment>
                                    }} />
                                </Grid>
                            
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} variant='outlined' fullWidth label='Email' value={formInput.email} onChange={(e)=> dispatch({type: "EMAIL", payload: e.target.value})} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Email className={classes.fieldIcon} /> </InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} variant='outlined' fullWidth label='Phone' inputProps={{ maxLength: '10'}} value={formInput.phone} onChange={(e)=> dispatch({type: "PHONE", payload: e.target.value})} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Phone className={classes.fieldIcon} /> </InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} variant='outlined' fullWidth label='Company Name' value={formInput.company} onChange={(e)=> dispatch({type: "COMPANY", payload: e.target.value})} InputProps={{
                                        endAdornment: <InputAdornment position='end'><BusinessCenter className={classes.fieldIcon} /> </InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={12} md={6} lg={6}>
                                    <TextField className={classes.field} select defaultValue={''} variant='outlined' fullWidth label='Industry' value={formInput.industry} onChange={(e)=> dispatch({type: "INDUSTRY", payload: e.target.value})}>
                                        {
                                            industry.map((el,index) => {
                                                return (
                                                    <MenuItem key={el} value={el}>{el}</MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <TextField className={classes.field} type={show ? 'text' : 'password'} value={formInput.password} onChange={(e)=> dispatch({type: "PASSWORD", payload: e.target.value})} variant='outlined' fullWidth label='Password' InputProps={{
                                        endAdornment: <InputAdornment position='end'> { show ? <Visibility className={classes.fieldIcon} style={{cursor: 'pointer'}} onClick={()=> setShow(!show)} /> : <VisibilityOff className={classes.fieldIcon} style={{cursor: 'pointer'}} onClick={()=> setShow(!show)} /> } </InputAdornment>
                                    }} />
                                </Grid>
                            </Grid>

                            <Button className={classes.btn} type={'submit'} disabled={disable} disableElevation variant='contained' color='secondary' fullWidth endIcon={<ArrowForward />}>Sign up</Button>
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

export default connect(mapStateToProps, {errorModal, userSignup, successModal,})(Signup)