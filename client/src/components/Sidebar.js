import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { AccountCircleOutlined,AssessmentOutlined, DashboardOutlined, ExitToApp, ForumOutlined, LocalMallOutlined, PeopleAltOutlined, PlayCircleFilled, SettingsOutlined, } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: props => props.drawer,
        height: '100vh',
        borderRight: `1px solid ${grey[300]}`,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff'
    },
    logo: {
        textAlign: 'center',
        '& span': {
            fontWeight: 600,
            color: theme.primaryColor
        }
    },
    menuItem : {
        gap: '1rem',
        marginBottom: '.5rem',
        borderRadius: '10px',
        transition: 'all .2s ease',
        '& .MuiListItemIcon-root': {
            transition: 'all .2s ease',
            minWidth: 'auto'
        },
        '& .MuiListItemText-root p' : {
            transition: 'all .2s ease',
        },
        '&:hover': {
            cursor: 'pointer',
            color: '#fff',
            background: '#000',
            '& .MuiListItemIcon-root, .MuiListItemText-root p': {
                color: '#fff',
            }
        }
    },
    active : {
        background: '#000',
        color: '#fff',
        '& .MuiListItemIcon-root, .MuiListItemText-root p': {
            color: '#fff',
        }
    },
    goPro: {
        background: theme.primaryColor,
        color: '#fff',
        '& .MuiListItemIcon-root, .MuiListItemText-root p': {
            color: '#fff',
        }
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin: '0 auto',
        marginBottom: '.5rem',
        marginTop: '-3rem',
        border: '4px solid white'
    },
    iconBtn: {
        borderRadius: '10px',
        marginLeft: '.8rem',
        padding: '.5rem',
        background: theme.primaryColor,
        color: '#fff',
        transition: 'all .2s ease',
        '&:hover': {
            color: '#000'
        }
    }

}))
const Sidebar = (props) => {
    const classes = useStyles(props)
    const path = useLocation().pathname.split('/')[2]

    const menu = [
        {name: 'Dashboard', icon: <DashboardOutlined />, path: '/account/dashboard'},
        {name: 'Products', icon: <LocalMallOutlined />, path: '/account/products'},
        {name: 'Analytics', icon: <AssessmentOutlined /> , path: '/account/analytics'},
        {name: 'Connect', icon: <PeopleAltOutlined />, path: '/account/connect'},
        {name: 'Account', icon: <AccountCircleOutlined />, path: '/account/profile'},
        {name: 'Settings', icon: <SettingsOutlined />, path: '/account/settings'},

    ]

    const extra = [
        {name: 'Join Colony', icon: <ForumOutlined />, path: '/account/dashboard'},
        {name: 'Move To PRO', icon: <PlayCircleFilled />, path: '/account/products'},

    ]




  return (
    <div className={classes.wrapper}>
        <Box padding='1.5rem'>
            <Typography className={classes.logo} variant='h5'>hive<span>Afrika.</span></Typography>
        </Box>
        <Divider />
        <List style={{padding: '1.5rem 1rem'}} >
            {
                menu.map(item => {
                    return (
                        <ListItem key={item.name} className={`${classes.menuItem} ${path === item.name.toLowerCase() && classes.active}` }>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText><Typography color='textSecondary'>{item.name}</Typography> </ListItemText>
                        </ListItem>
                    )
                })
            }
        </List>
        <Divider style={{margin: '0 1.5rem'}} />
        <List style={{padding: '1.5rem 1rem'}} >
            {
                extra.map(item => {
                    return (
                        <ListItem key={item.name} className={`${classes.menuItem} ${item.name === 'Move To PRO' && classes.goPro} ${path === item.name.toLowerCase() && classes.active}` }>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText><Typography color='textSecondary'>{item.name}</Typography> </ListItemText>
                        </ListItem>
                    )
                })
            }
        </List>

        {/* User Profile */}
        <Box padding='1rem' textAlign={'center'} bgcolor='#0000000d' margin={'1rem'} marginTop='auto' borderRadius='15px'>
            <Avatar className={classes.large} />
            <Typography style={{fontWeight: 500, fontSize: '1rem'}} noWrap>Jeremiah Mills</Typography>
            <Typography variant='body2' color='textSecondary' noWrap>jeremiah@hiveafrika.com</Typography>
            <Typography variant='body2' color='textSecondary' >superadmin</Typography>
            <span style={{marginTop: '1rem', display: 'block' }}>
                <IconButton className={classes.iconBtn} style={{marginLeft: 0}}> <ForumOutlined /> </IconButton>
                <IconButton className={classes.iconBtn}> <ExitToApp /> </IconButton>
            </span>
        </Box>


    </div>
  )
}

export default Sidebar