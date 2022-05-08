import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { AccountCircle, AccountCircleOutlined, Assessment, AssessmentOutlined, Dashboard, DashboardOutlined, Forum, ForumOutlined, LocalMall, LocalMallOutlined, Settings, SettingsOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: props => props.drawer,
        height: '100vh',
        borderRight: `1px solid ${grey[300]}`
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
        marginBottom: '1rem',
        borderRadius: '10px',
        transition: 'all .2s ease',
        '& .MuiListItemIcon-root': {
            transition: 'all .2s ease',
            minWidth: 'auto'
        },
        '&:hover': {
            cursor: 'pointer',
            color: '#fff',
            background: '#000',
            '& .MuiListItemIcon-root': {
                color: '#fff',
            }
        }
    }
}))
const Sidebar = (props) => {
    const classes = useStyles(props)
    const path = useLocation().pathname

    const menu = [
        {name: 'Dashboard', icon: <DashboardOutlined />, path: '/account/dashboard'},
        {name: 'Products', icon: <LocalMallOutlined />, path: '/account/products'},
        {name: 'Analytics', icon: <AssessmentOutlined /> , path: '/account/analytics'},
        {name: 'Account', icon: <AccountCircleOutlined />, path: '/account/account'},
        {name: 'Settings', icon: <SettingsOutlined />, path: '/account/settings'},
        {name: 'Support', icon: <ForumOutlined />, path: '/account/support'},

    ]


  return (
    <div className={classes.wrapper}>
        <Box padding='1.5rem'>
            <Typography className={classes.logo} variant='h5'>hive<span>Afrika.</span></Typography>
        </Box>
        <Divider />
        <List style={{padding: '1rem'}} >
            {
                menu.map(item => {
                    return (
                        <ListItem key={item.name} className={classes.menuItem}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText> {item.name}</ListItemText>
                        </ListItem>
                    )
                })
            }
        </List>

    </div>
  )
}

export default Sidebar