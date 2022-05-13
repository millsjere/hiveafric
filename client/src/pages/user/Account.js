import { Badge, Box, Button, Dialog, DialogContent, Divider, Drawer, IconButton, InputAdornment, Slide, TextField, Typography } from '@material-ui/core';
import { Close, NotificationsOutlined, SaveAlt, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard'


const drawer = 240;

const useStyles = makeStyles(theme => ({
    root : {
        display: 'flex',
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
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Account = () => {
    const classes = useStyles()
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };
    

  return (
    <div className={classes.root}>

        {/* SIDEBAR */}
       <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} variant='permanent'>
            <Sidebar drawer={drawer} />
       </Drawer>

        
       <Box className={classes.content}>
            {/* APP BAR */}
           <Box className={classes.appbar}>
                <span>
                    <Typography color='textSecondary'>Welcome back,</Typography>
                    <Typography variant='h5' className={classes.title}>Jeremiah Mills</Typography>
               </span>
               <span>
                    <Button startIcon={<SaveAlt />} variant='contained' disableElevation style={{color:'#fff',textTransform:'none', borderRadius: '10px', height: '2.5rem' }} color='secondary'> Upload Product </Button>
                    <IconButton className={classes.iconBtn} onClick={()=>setOpen(true)}>
                        <Search />
                    </IconButton>
                    <IconButton className={classes.iconBtn}>
                        <Badge variant='standard' color='secondary' overlap='rectangular' className={classes.badge} badgeContent={4} > <NotificationsOutlined /> </Badge>
                    </IconButton>
               </span>
           </Box>

           {/* ALL CONTENT */}
           <Box margin={'1rem'}>
              {path === '/account/dashboard' ? <Dashboard /> : null }
                
           </Box>
          

       </Box>

       {/* SEARCH BAR */}
       <Dialog open={open} fullScreen onClose={()=>setOpen(false)} TransitionComponent={Transition}>
           <DialogContent>
                <TextField style={{border:'none'}} fullWidth variant='outlined' placeholder='Search for products' InputProps={{
                    startAdornment: <InputAdornment position='start'><Search /></InputAdornment>,
                    endAdornment: <InputAdornment position='end'> <IconButton onClick={()=> setOpen(false)}><Close /></IconButton></InputAdornment>
                }} />
                <Divider />
                <Typography style={{textAlign:'center', marginTop: '1rem'}} variant='body2' color='textSecondary'>Start typing to see products you are looking for</Typography>
                
                {/* SEARCH RESULTS */}
                <Box>

                </Box>
           </DialogContent>
       </Dialog>
    </div>
  )
}

export default Account