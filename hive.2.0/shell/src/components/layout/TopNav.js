
import { ImageAdd01Icon, Menu02Icon, Notification01Icon, NotificationCircleIcon, Search01Icon, UserCircleIcon } from 'hugeicons-react'
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box } from '@mui/material'
import React from 'react'

const TopNav = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ bgcolor: '#fff', borderBottom: '1px solid #ededed' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu02Icon />
        </IconButton>

        <Box sx={{ ml: 'auto' }}>
          <Button size='small' startIcon={<ImageAdd01Icon size={18} />} variant='contained' disableElevation onClick={() => { }}
            sx={{ color: '#fff', textTransform: 'none', borderRadius: '10px', height: '2.3rem', mr: 3 }} color='secondary'>
            Add Product
          </Button>
          <IconButton onClick={() => { }}><Search01Icon /></IconButton>
          <IconButton><Badge variant='standard' color='primary' overlap='circular' sx={{ '& > span': { color: '#fff' } }} badgeContent={4} > <Notification01Icon /> </Badge></IconButton>
          <IconButton onClick={() => { }}><UserCircleIcon size={25} /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav