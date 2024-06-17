import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Container, Divider, Grid, IconButton, InputAdornment, LinearProgress, ListItem, ListItemIcon, ListItemText, Switch, TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Add, CallMade, CameraAlt, Email, Fingerprint, LocalMall, Lock, Notifications, Payment, Person, Phone, Receipt } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import Visa from '../../assets/visa.png'

const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: '10px',
        marginBottom: '2rem'
    },
    field: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px'
        }
    },
    avatar: {
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    picBtn: {
        position: 'absolute',
        bottom: -1,
        right: 0,
        background: '#fff', 
        padding: '7px',
        boxShadow: '1px 0 5px rgba(0,0,0, 20%)', 
        '&:hover': {
            background: '#fff'
        }
    },
    cardHead: {
        padding: ' 1.5rem 2rem',
        '& span': {
            fontWeight: 600
        }
    },
    bar : {
        marginBottom: '5px',
        height: '12px',
        borderRadius: '10px'
    }
}))


const Settings = (props) => {
    const classes = useStyles()
    const [title, setTitle] = useState('Basic Info')


    const menuList = [
        {name: 'Basic Info', icon: <Person />, path: '#basic'},
        {name: 'Password', icon: <Lock />, path: '#password'},
        {name: 'Notifications', icon: <Notifications />, path: '#notifications'},
        {name: 'Two-Step Verification', icon: <Fingerprint />, path:'#verification'},
        {name: 'Product Setting', icon: <LocalMall />, path:'#product'},
        {name: 'Billing & Payment', icon: <Payment />, path: '#billing'},
        {name: 'Invoices', icon: <Receipt />, path: '#invoices'}
    ]


  return (
    <div>
       <Container maxWidth='xl'>
            <Grid container spacing={3}>
                <Grid item sm={4} >
                    <Card variant='outlined' elevation={0} className={classes.card} style={{position: 'sticky', top: '3%'}}>
                        <CardContent>
                            {
                                menuList.map(el => {
                                    return (
                                        <ListItem key={el.name} component='a' href={el.path} button style={{borderRadius: '6px', margin: '5px 0'}}>
                                            <ListItemIcon>{el.icon}</ListItemIcon>
                                            <ListItemText>{el.name}</ListItemText>
                                        </ListItem>
                                    )
                                })
                            }
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={8}>

                    {/* BASIC INFO */}
                     <Card id='basic' variant='outlined' elevation={0} className={classes.card} >
                     <CardHeader title={title} className={classes.cardHead} />
                     <Divider />
                        <CardContent style={{padding: '2rem'}}>
                            <Box position={'relative'} width={'fit-content'} mb={4} >
                                <Avatar className={classes.avatar} />
                                <IconButton className={classes.picBtn}><CameraAlt style={{fontSize: '1.2rem'}} /></IconButton>
                            </Box>
                            <Grid container spacing={3} >
                                <Grid item sm={6}>
                                    <TextField variant='outlined' fullWidth className={classes.field} label={'First Name'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Person fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' fullWidth className={classes.field} label={'Last Name'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Person fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' fullWidth className={classes.field} disabled label={'Email'} value={props.currentUser ? props.currentUser.email : ''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Email fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' fullWidth className={classes.field} label={'Phone'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Phone fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' fullWidth className={classes.field} label={'Industry'} value={''} />
                                </Grid>
                            </Grid>
                            <Button variant='contained' disableElevation color='primary' style={{marginTop: '1.2rem',borderRadius: '8px', textTransform: 'none', color: '#fff', height: '3rem', width: '10rem'}}>Update</Button>
                        </CardContent>
                    </Card>

                    {/* PASSWORD */}
                    <Card id='password' variant='outlined' elevation={0} className={classes.card}>
                        <CardHeader title={'Password & Security'} className={classes.cardHead} />
                        <Divider />
                        <CardContent style={{padding: '2rem'}}>
                            <Grid container spacing={3} >
                                <Grid item sm={6}>
                                    <TextField variant='outlined' type={'password'} fullWidth className={classes.field} label={'Current Password'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Lock fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' type={'password'} fullWidth className={classes.field} label={'New Password'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Lock fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField variant='outlined' type={'password'} fullWidth className={classes.field} label={'Confirm Password'} value={''} InputProps={{
                                        endAdornment: <InputAdornment position='end'><Lock fontSize='small' style={{color: grey[400]}} /></InputAdornment>
                                    }} />
                                </Grid>
                                <Grid item sm={6}>
                                    <Button variant='contained' disableElevation color='primary' style={{borderRadius: '8px', textTransform: 'none', color: '#fff', height: '100%', width: '10rem'}}>Update</Button>
                                </Grid>
                               
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* NOTIFICATIONS */}
                    <Card id='notifications' variant='outlined' elevation={0} className={classes.card}>
                         <CardHeader title={'Notifications'} className={classes.cardHead} />
                        <Divider />
                        <CardContent style={{padding: '2rem'}}>
                            <Grid container spacing={3}>
                                <Grid item sm={12}>
                                    <Box display={'flex'} justifyContent='space-between' textAlign={'flex-start'}>
                                        <span>
                                            <Typography variant='h6'>Emails</Typography>
                                            <Typography variant='body1' color='textSecondary'>This is a placeholder text for email notifications</Typography>
                                        </span>
                                        <Switch color='primary' checked />
                                    </Box>
                                </Grid>
                                <Grid item sm={12}>
                                    <Box display={'flex'} justifyContent='space-between' textAlign={'flex-start'}>
                                        <span>
                                            <Typography variant='h6'>Newsletters</Typography>
                                            <Typography variant='body1' color='textSecondary'>This is a placeholder text for newsletter notifications</Typography>
                                        </span>
                                        <Switch color='primary' checked />
                                    </Box>
                                </Grid>                                
                               
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* TWO-STEP VERIFICATION */}
                    <Card id='verification' variant='outlined' elevation={0} className={classes.card}>
                        <CardContent style={{padding: '3rem 2rem', display: 'flex', justifyContent: 'space-between'}}>
                            <span>
                                <Typography variant='h5' gutterBottom style={{fontWeight: 600}}>Two-Step Verification</Typography>
                                <Typography variant='body1' color='textSecondary'>This is a placeholder text for Two-Step Verification settings</Typography>
                            </span>
                            <Switch color='primary' checked />
                            
                        </CardContent>
                    </Card>

                    {/* BILLING */}
                    <Card id='billing' variant='outlined' elevation={0} className={classes.card}>
                        <CardHeader title={'Billing & Payment'} className={classes.cardHead} />
                        <Divider />
                        <CardContent style={{padding: '2rem'}}>
                            <Grid container spacing={3} >
                                <Grid item sm={12}>
                                    <Card variant='outlined' className={classes.card} >
                                        <CardContent style={{padding: '1.5rem'}}>
                                            <Box display={'flex'} justifyContent={'space-between'} marginBottom={'20px'}>
                                                <span>
                                                    <Box display={'flex'} gridGap={'1rem'} alignItems={'center'}>
                                                        <Typography variant='h6'>Basic Plan</Typography>
                                                        <Chip size='small' label='Current Plan' style={{color: '#fff', background: grey[400]}} />
                                                    </Box>
                                                    <Typography variant='body1' color='textSecondary'>Perfect plan for small teams</Typography>
                                                </span>
                                                <span>
                                                    <Typography style={{fontSize: '2rem', fontWeight: 700}}>$24.99 <span style={{fontSize: '.9rem', color: '#949292', fontWeight: 500}}>/ month</span></Typography>
                                                </span>
                                            </Box>
                                            <Box>
                                                <LinearProgress value={40} variant='determinate' className={classes.bar} />
                                                <Box display={'flex'} justifyContent='space-between'>
                                                    <Typography variant='body2' paragraph color='textPrimary'>200 Used (40%)</Typography>
                                                    <Typography variant='body2' paragraph color='textPrimary'>500 Products</Typography>
                                                </Box>
                                            </Box>

                                        </CardContent>
                                        <Divider />
                                        <CardActions>
                                            <Button color='primary' style={{textTransform: 'none'}} endIcon={<CallMade fontSize='small' />}>Upgrade Plan</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Grid item sm={12}>
                                   <Card variant='outlined' className={classes.card}>
                                        <CardContent style={{padding: '2rem'}}>
                                             <Box marginBottom={'20px'}>
                                                <Typography variant='h6'>Payment Method</Typography>
                                                <Typography variant='body1' color='textSecondary'>Choose how you pay for your plan</Typography>
                                            </Box>
                                            {/* Card Details */}
                                            <Card variant='outlined' className={classes.card} style={{marginBottom: '1rem'}}>
                                                <CardContent style={{display: 'flex', gap: '15px', alignItems: 'flex-start'}}>
                                                    <Box display={'flex'} padding='5px' width={'3rem'} borderRadius={'5px'} border={`1px solid ${grey[300]}`}>
                                                        <img src={Visa} width='100%' alt='visa' />
                                                    </Box>
                                                    <Box>
                                                        <Typography>Visa ending in 1234</Typography>
                                                        <Typography variant='body2' color='textSecondary'>Expiry 06/24</Typography>
                                                        <span style={{display: 'flex', gap: '5px', marginTop: '5px'}}>
                                                            <Email fontSize='small' style={{color: grey[400]}} />
                                                            <Typography variant='body2' color='textSecondary'>billing@hiveafrika.com</Typography>
                                                        </span>
                                                    </Box>
                                                    <Button variant='outlined' style={{marginLeft: 'auto', textTransform: 'none'}}>Edit</Button>
                                                </CardContent>
                                            </Card>
                                            {/* Card Details */}
                                            <Card variant='outlined' className={classes.card} style={{marginBottom: 0}}>
                                                <CardContent style={{display: 'flex', gap: '15px', alignItems: 'flex-start'}}>
                                                    <Box display={'flex'} padding='5px' width={'3rem'} borderRadius={'5px'} border={`1px solid ${grey[300]}`}>
                                                        <img src={Visa} width='100%' alt='visa'/>
                                                    </Box>
                                                    <Box>
                                                        <Typography>Visa ending in 1234</Typography>
                                                        <Typography variant='body2' color='textSecondary'>Expiry 06/24</Typography>
                                                        <span style={{display: 'flex', gap: '5px', marginTop: '5px'}}>
                                                            <Email fontSize='small' style={{color: grey[400]}} />
                                                            <Typography variant='body2' color='textSecondary'>billing@hiveafrika.com</Typography>
                                                        </span>
                                                    </Box>
                                                    <Button variant='outlined' style={{marginLeft: 'auto', textTransform: 'none'}}>Edit</Button>
                                                </CardContent>
                                            </Card>
                                        </CardContent>
                                        
                                    </Card>
                                </Grid>
                                
                               
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* INVOICES */}
                    <Card id='invoices' variant='outlined' elevation={0} className={classes.card}>
                         <CardHeader title={'Invoices'} className={classes.cardHead} />
                        <Divider />
                        <CardContent style={{padding: '2rem'}}>
                            <Grid container spacing={3}>
                                <Grid item sm={12}>
                                    <Box display={'flex'} justifyContent='space-between' textAlign={'flex-start'}>
                                        <span>
                                            <Typography variant='h6'>Emails</Typography>
                                            <Typography variant='body1' color='textSecondary'>This is a placeholder text for email notifications</Typography>
                                        </span>
                                        <Switch color='primary' checked />
                                    </Box>
                                </Grid>
                                <Grid item sm={12}>
                                    <Box display={'flex'} justifyContent='space-between' textAlign={'flex-start'}>
                                        <span>
                                            <Typography variant='h6'>Newsletters</Typography>
                                            <Typography variant='body1' color='textSecondary'>This is a placeholder text for newsletter notifications</Typography>
                                        </span>
                                        <Switch color='primary' checked />
                                    </Box>
                                </Grid>                                
                               
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

       </Container>
    
    </div>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(Settings)