import { Badge, Box, Button, Container, IconButton, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { NotificationsOutlined, SaveAlt, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import Sidebar from '../../components/Sidebar';


const drawer = 240;

const useStyles = makeStyles(theme => ({
    root : {
        display: 'flex'
    },
    appbar: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        background: 'transparent',
        padding: '1rem',
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
        background: '#fff',
        marginLeft: '.8rem',
        padding: '.5rem',
        background: '#0000000a'
    }
}))
const Account = () => {
    const classes = useStyles()


  return (
    <div className={classes.root}>

        {/* SIDEBAR */}
       <Box width={`${drawer}px`}>
            <Sidebar drawer={drawer} />
       </Box>

        
       <Box width={'100%'}>
           <Container>
            {/* APP BAR */}
           <Box className={classes.appbar}>
                <span>
                    <Typography color='textSecondary'>Welcome back,</Typography>
                    <Typography variant='h5' className={classes.title}>Jeremiah Mills</Typography>
               </span>
               <span>
                    <Button startIcon={<SaveAlt />} variant='contained' disableElevation style={{color:'#fff',textTransform:'none', borderRadius: '10px', height: '2.5rem' }} color='secondary'> Upload Product </Button>
                    <IconButton className={classes.iconBtn}>
                        <Search />
                    </IconButton>
                    <IconButton className={classes.iconBtn}>
                        <Badge variant='standard' color='secondary' className={classes.badge} badgeContent={4} > <NotificationsOutlined /> </Badge>
                    </IconButton>
               </span>
           </Box>

           {/* ALL CONTENT */}
           <Box >
              
                
           </Box>
           </Container>
          

       </Box>
    </div>
  )
}

export default Account