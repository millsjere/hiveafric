import { Avatar, Badge, Box, Button, Dialog, DialogContent, Divider, Drawer, IconButton, InputAdornment, Link, MenuItem, Popover, Slide, TextField, Typography } from '@material-ui/core';
import { CameraAlt, Close, FiberManualRecord, NotificationsOutlined, Person, SaveAlt, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard'
import Products from './inventory/Products';
import Category from './inventory/Category';
import Brands from './inventory/Brands';
import AddProduct from '../../components/AddProduct';
import { connect } from 'react-redux';
import Settings from './Settings';
import { grey } from '@material-ui/core/colors';
import PlanAndPricing from './PlanAndPricing';
import Help from './Help';
import Support from './Support';


const drawer = 260;

const useStyles = makeStyles(theme => ({
    root : {
        display: 'flex',
        '& .MuiPopover-root > .MuiPopover-paper': {
            borderRadius: '12px'
        }
    },
    appbar: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        background: 'transparent',
        padding: '1rem',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawer,
          flexShrink: 0,
        },
      },
    drawerPaper: {
        width: drawer,
    },
    content : {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawer}px)`,
        },
        padding: '1rem'
    },
    badge: {
        '& .MuiBadge-badge': {
            border: '2px solid white',
            color: '#fff',
            padding: 0
        }
        
    },
    title: {
        fontWeight: 600,
        letterSpacing: 0
    },
    iconBtn: {
        borderRadius: '10px',
        marginLeft: '.8rem',
        padding: '.5rem',
        background: '#fff'
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
    avatar: {
        marginLeft: '.8rem',
        borderRadius: '10px',
    },
    avatar2: {
        background: theme.primaryColor,
        cursor: 'pointer'
    },
    toolbar: theme.mixins.toolbar,
    btn: {
        color: '#fff', fontWeight: 600,
        '& span': {
            height: '2.8rem',
        }
    },
    hrefs: {
        fontSize: '.8rem',
        color: grey[500],
        cursor: 'pointer',
        '&:hover': {
            color: theme.primaryColor
        }
    },
    popover: {
        
    }
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Account = (props) => {
    const classes = useStyles()
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [upload, setUpload] = useState(false)
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const headers = path.split('/')[1]

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openPro = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

    const addProduct = () => {
        setUpload(true)
    }

  return (
    <>
        <div className={classes.root}>

            {/* SIDEBAR */}
            <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} variant='permanent'>
                <Sidebar drawer={drawer} currentUser={props.currentUser} />
            </Drawer>

            <Box className={classes.content}>

                {/* APP BAR */}
                <Box className={classes.appbar}>
                        <span>
                            <Typography color='textSecondary'>{headers === 'dashboard' ? 'Welcome' : headers[0].toUpperCase() + headers.substring(1).toLowerCase()}</Typography>
                            { path === '/dashboard' && <Typography variant='h5' className={classes.title}>Dashboard</Typography> }
                            { path === '/inventory' && <Typography variant='h5' className={classes.title}>Products(20)</Typography> }
                            { path === '/inventory/category' && <Typography variant='h5' className={classes.title}>Categories</Typography> }
                            { path === '/inventory/brands' && <Typography variant='h5' className={classes.title}>Brands</Typography> }
                            { path === '/analytics' && <Typography variant='h5' className={classes.title}>Metrics</Typography> }
                            { path === '/stores' && <Typography variant='h5' className={classes.title}>Connections</Typography> }
                            { path === '/settings' && <Typography variant='h5' className={classes.title}>Account</Typography> }
                            { path === '/pricing' && <Typography variant='h5' className={classes.title}>Plan & Pricing</Typography> }
                            { path === '/help' && <Typography variant='h5' className={classes.title}>Help Centre</Typography> }
                        </span>
                        <span>
                            <Button startIcon={<SaveAlt />} variant='contained' disableElevation onClick={addProduct}
                            style={{color:'#fff',textTransform:'none', borderRadius: '10px', height: '2.5rem' }} color='secondary'> 
                                Add Product 
                            </Button>
                            <IconButton className={classes.iconBtn} onClick={()=>setOpen(true)}>
                                <Search />
                            </IconButton>
                            <IconButton className={classes.iconBtn}>
                                <Badge variant='standard' color='secondary' overlap='rectangular' className={classes.badge} badgeContent={4} > <NotificationsOutlined /> </Badge>
                            </IconButton>
                            <IconButton onClick={handleClick} className={classes.iconBtn}>
                            <Person />
                            </IconButton>
                        </span>

                    {/* POPOVER */}
                    <Popover className={classes.popover} style={{marginTop: '1rem'}} open={openPro} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Box width='19rem'>
                            <Box padding={'1.5rem'} textAlign='center'>
                                <Box position={'relative'} width='fit-content' m={'0 auto'} mb={2}>
                                    <Avatar className={classes.avatar2} style={{height: '5rem', width:'5rem', m: '0 auto'}} ><Typography variant='h3'>J</Typography></Avatar>
                                    <IconButton className={classes.picBtn}><CameraAlt style={{fontSize: '1.2rem'}} /></IconButton>
                                </Box>
                                <Typography variant='h6' mt={2}>Jeremiah Mills</Typography>
                                <Typography variant='body1' color='textSecondary' mb={2}>jeremiah@hiveafrika.com</Typography>
                            </Box>
                            <Divider />
                            <Box padding={'1rem'}>
                                <MenuItem >My Account</MenuItem>
                                <MenuItem >Stores</MenuItem>
                                <MenuItem >Billing & Payment</MenuItem>
                            </Box>
                            <Divider />
                            <Box padding={'1.5rem 2rem'} textAlign={'center'}>
                                <Button variant='contained' disableElevation className={classes.signout}>Sign Out</Button>
                                <span style={{display: 'flex', marginTop: '1rem', justifyContent: 'space-evenly', alignItems: 'center', gap: '10px'}}>
                                    <Typography>
                                        <Link className={classes.hrefs}  underline='none' href='#'>Terms of Services</Link>
                                    </Typography>
                                    <FiberManualRecord style={{fontSize: '.4rem'}} />
                                    <Typography>
                                        <Link className={classes.hrefs} underline='none' href='#' >Privacy Policy</Link>
                                    </Typography>
                                </span>
                            </Box>

                        </Box>

                    </Popover>

                </Box>

                {/* ALL CONTENT */}
                <Box margin={'1rem'}>
                    {path === '/dashboard' ? <Dashboard /> : null }
                    {path === '/inventory' ? <Products add={addProduct} /> : null }
                    {path === '/inventory/category' ? <Category /> : null }
                    {path === '/inventory/brands' ? <Brands /> : null }
                    {path === '/analytics' ? <Dashboard /> : null }
                    {path === '/stores' ? <Dashboard /> : null }
                    {path === '/settings' ? <Settings /> : null }
                    {path === '/pricing' ? <PlanAndPricing /> : null }
                    {path === '/help' ? <Help /> : null }
                    {path === '/support' ? <Support /> : null }
                        
                </Box>

            </Box>

            {/* SEARCH BAR */}
            <Dialog open={open} fullScreen onClose={()=>setOpen(false)} TransitionComponent={Transition}>
                <DialogContent>
                    <TextField style={{border:'none'}} fullWidth variant='outlined' placeholder='Search for products' InputProps={{
                        startAdornment: <InputAdornment position='start'><Search /></InputAdornment>,
                        endAdornment: <InputAdornment position='end'> <IconButton onClick={()=> setOpen(false)}><Close /></IconButton></InputAdornment>
                    }} />

                    <Typography style={{textAlign:'center', marginTop: '1rem'}} variant='body2' color='textSecondary'>Start typing to see products you are looking for</Typography>
                    
                    {/* SEARCH RESULTS */}
                    <Box>

                    </Box>
                </DialogContent>
            </Dialog>

            {/* ADD PRODUCT */}
            <AddProduct open={upload} close={()=> setUpload(false)} />


        </div>
    </>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(Account)