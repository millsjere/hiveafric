import { Avatar, Box, Button, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { AccountCircleOutlined,AssessmentOutlined, DashboardOutlined, ExitToApp, ExpandMore, HeadsetMic, Help, KeyboardArrowRight, LocalMallOutlined, Payment, SettingsOutlined, } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { logoutUser, successModal } from '../actions/actions'
import Modal from './Modal'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: props => props.drawer,
        height: '100vh',
        borderRight: `1px solid ${grey[300]}`,
        display: 'flex',
        flexDirection: 'column',
        background: theme.secondaryColor
    },
    logo: {
        textAlign: 'center',
        color: '#fff',
        '& span': {
            fontWeight:700,
            color: theme.primaryColor
        }
    },
    menuItem : {
        gap: '1rem',
        marginBottom: '.5rem',
        borderRadius: '10px',
        transition: 'all .2s ease',
        '& .MuiListItemIcon-root': {
            color: theme.primaryColor,
            transition: 'all .2s ease',
            minWidth: 'auto'
        },
        '& .MuiListItemText-root p' : {
            color: '#fff',
            transition: 'all .2s ease',
        },
        '&:hover': {
            cursor: 'pointer',
            color: '#fff',
            background: theme.opacSecondary,
            '& .MuiListItemIcon-root, .MuiListItemText-root p': {
                color: '#fff',
            }
        }
    },
    active : {
        background: theme.opacSecondary,
        color: '#fff',
        '& .MuiListItemIcon-root, .MuiListItemText-root p': {
            color: '#fff',
        }
    },
    goPro: {
        background: theme.primaryColor,
        '& .MuiListItemIcon-root, .MuiListItemText-root p': {
            // color: '#fff',
        }
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        margin: '0 auto',
        marginBottom: '.5rem',
        marginTop: '-3rem',
        border: `6px solid ${theme.secondaryColor}`
    },
    iconBtn: {
        borderRadius: '10px',
        marginLeft: '.8rem',
        padding: '.5rem',
        background: theme.secondaryColor,
        color: '#fff',
        transition: 'all .2s ease',
        '&:hover': {
            color: theme.primaryColor
        }
    },
    nested: {
        paddingLeft: theme.spacing(3)
    },

}))
const Sidebar = (props) => {
    const { currentUser } = props
    const classes = useStyles(props)
    const path = useLocation().pathname.split('/')[1]
    const [ open, setOpen ] = useState(false)

    const extra = [
        {name: 'Plan & Pricing', icon: <Payment fontSize='small' />, path: '/pricing'},
        {name: 'Help Centre', icon: <Help  fontSize='small'/>, path: '/help'},
        {name: 'Support', icon: <HeadsetMic  fontSize='small'/>, path: '/support'},

    ]

    const navLinks = (val) => {
        window.location.assign(`/${val}`)
    }

    const Logout = ()=> {
        props.successModal('Buzzing you out. Hold on..')
        setTimeout(() => {
            props.logoutUser()
        }, 500);
    }



  return (
    <div className={classes.wrapper}>
        {props.modal && <Modal status={props.modal.status} />}
        <Box padding='1.5rem'>
            <Typography className={classes.logo} variant='h5'>hive<span>Afrika.</span></Typography>
        </Box>
        <Divider style={{background: '#ffffff33'}} />
        <List style={{padding: '1.5rem 1rem'}} >
            <ListItem className={`${classes.menuItem} ${path === 'dashboard' && classes.active}` } onClick={()=> navLinks('dashboard')}>
                <ListItemIcon ><DashboardOutlined fontSize='small' /></ListItemIcon>
                <ListItemText><Typography color='textSecondary'>Dashboard</Typography> </ListItemText>
            </ListItem>
            <ListItem className={`${classes.menuItem} ${path === 'inventory' && classes.active}` } onClick={()=>setOpen(!open)}>
                <ListItemIcon > <LocalMallOutlined fontSize='small' /> </ListItemIcon>
                <ListItemText><Typography color='textSecondary'>Inventory</Typography> </ListItemText>
                { open ? <ExpandMore /> : <KeyboardArrowRight style={{color: grey[400]}} /> }
            </ListItem>
            <Collapse in={open} timeout='auto'>
                    <List disablePadding>
                        <ListItem dense className={`${classes.menuItem}` } onClick={()=> navLinks('inventory')}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText className={classes.nested}><Typography color='textSecondary'>Products</Typography> </ListItemText>
                        </ListItem>
                        <ListItem dense className={`${classes.menuItem}`} onClick={()=> navLinks('inventory/category')}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText className={classes.nested}><Typography color='textSecondary'>Categories</Typography> </ListItemText>
                        </ListItem>
                        <ListItem dense className={`${classes.menuItem}` } onClick={()=> navLinks('inventory/brands')}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText className={classes.nested}><Typography color='textSecondary'>Brands</Typography> </ListItemText>
                        </ListItem>
                    </List>
            </Collapse>
            <ListItem className={`${classes.menuItem} ${path === 'analytics' && classes.active}` } onClick={()=> navLinks('analytics')}>
                <ListItemIcon> <AssessmentOutlined fontSize='small' /> </ListItemIcon>
                <ListItemText><Typography color='textSecondary'>Analytics</Typography> </ListItemText>
            </ListItem>
            <ListItem className={`${classes.menuItem} ${path === 'stores' && classes.active}` } onClick={()=> navLinks('stores')}>
                <ListItemIcon><AccountCircleOutlined fontSize='small' /></ListItemIcon>
                <ListItemText><Typography color='textSecondary'>Stores</Typography> </ListItemText>
            </ListItem>
            <ListItem className={`${classes.menuItem} ${path === 'settings' && classes.active}` } onClick={()=> navLinks('settings')}>
                <ListItemIcon> <SettingsOutlined fontSize='small' /> </ListItemIcon>
                <ListItemText><Typography color='textSecondary'>Account</Typography> </ListItemText>
            </ListItem>
        </List>
        <Divider style={{margin: '0 1.5rem', background: '#ffffff33'}} light />
        <List style={{padding: '1.5rem 1rem'}} >
            {
                extra.map(item => {
                    return (
                        <ListItem button component={'a'} href={item.path} key={item.name} className={`${classes.menuItem} ${path === item.name.toLowerCase() || item.name.toLowerCase().includes(path) ? classes.active : null}` }>
                            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                            <ListItemText><Typography color='textSecondary'>{item.name}</Typography> </ListItemText>
                        </ListItem>
                    )
                })
            }
        </List>
        <Box padding={'1rem'}></Box>
        {/* User Profile */}
        <Box padding='1rem' textAlign={'center'} bgcolor='#256d945c' color='#fff' margin={'1rem'} marginTop='auto' borderRadius='15px' style={{backgroundImage: 'linear-gradient(181deg, #0969ab, #083554)'}}>
            <Avatar src={ currentUser && currentUser.photo ? currentUser.photo : null } alt='user-img' className={classes.large} />
            <Typography style={{fontWeight: 500, fontSize: '1rem'}} noWrap>{currentUser && currentUser.fullname}</Typography>
            <Typography variant='body2' style={{color: '#ffffff'}} noWrap>{currentUser && currentUser.email}</Typography>
            <Typography variant='body2' style={{color: '#ffffff70'}} >Administrator</Typography>
            <Button variant='contained' startIcon={<ExitToApp />} disableElevation onClick={Logout} style={{background: '#0271bd80', textTransform: 'none', marginTop: '1rem', borderRadius: '8px', color: '#e7e7e7'}} > Sign Out </Button>
        </Box>
        <Box padding={'.2rem'}></Box>


    </div>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {logoutUser, successModal})(Sidebar)