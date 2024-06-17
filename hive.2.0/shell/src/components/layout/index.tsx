import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Footer from './Footer';
import { Analytics02Icon, ArrowDown01Icon, ArrowRight01Icon, CreditCardValidationIcon, DashboardSquare01Icon, DashboardSquareAddIcon, HelpCircleIcon, ImageAdd02Icon, InboxDownloadIcon, LogoutSquare01Icon, Settings01Icon, StoreLocation01Icon, TaskAdd02Icon, UserSquareIcon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { getData, sessionTimeout } from '../../config/appConfig';
import Logo from '../../assets/images/logo.png'

type SideBarMenuProps = {
  name: string,
  icon: React.ReactNode,
  path: string,
  hasSubMenu?: boolean,
  subMenus?: any[]
}
const drawerWidth = 240;

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const currentUser = getData('uid')
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false);

  console.log(currentUser)

  const primaryMenu: SideBarMenuProps[] = [
    { name: 'Dashboard', icon: <DashboardSquare01Icon size={20} />, path: '/dashboard' },
    {
      name: 'Inventory', icon: <InboxDownloadIcon size={20} />, path: '/inventory', hasSubMenu: true, subMenus: [
        { name: 'Product', icon: <TaskAdd02Icon size={20} />, path: '/inventory/products' },
        { name: 'Categories', icon: <DashboardSquareAddIcon size={20} />, path: '/inventory/categories' },
        { name: 'Brands', icon: <ImageAdd02Icon size={20} />, path: '/inventory/brands' },
      ]
    },
    { name: 'Analytics', icon: <Analytics02Icon size={20} />, path: '/analytics' },
    { name: 'Stores', icon: <StoreLocation01Icon size={20} />, path: '/stores', hasSubMenu: false, subMenus: [] },
    { name: 'Account', icon: <UserSquareIcon size={20} />, path: '/account' },
  ]

  const extraMenu: SideBarMenuProps[] = [
    { name: 'Subscription', icon: <CreditCardValidationIcon size={20} />, path: '/pricing' },
    { name: 'Help Centre', icon: <HelpCircleIcon size={20} />, path: '/help' },
  ]

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box display={'flex'} flexDirection={'column'} height={'100vh'} bgcolor={'secondary.main'}>
      <Toolbar sx={{ gap: 2 }}>
        <img src={Logo} alt='logo' width={'30%'} />
        <Typography fontWeight={600} variant='h6' fontSize={'1.1rem'} sx={{ color: '#fff' }}>Hive Afrika</Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: '#ffffff30' }} />
      <List >
        {primaryMenu?.map((menu, index) => {
          return (
            menu?.hasSubMenu ?
              <>
                <ListItem key={index} disablePadding sx={{ color: '#fff' }}>
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon color='primary.main' sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
                    <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                    {open ? <ArrowDown01Icon size={18} /> : <ArrowRight01Icon size={18} />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout='auto'>
                  <List >
                    {
                      menu?.subMenus?.map((sub, i) => (
                        <ListItem sx={{ color: '#fff' }} key={i} dense onClick={() => navigate(sub?.path)}>
                          <ListItemButton>
                            <ListItemIcon sx={{ minWidth: '30px', color: '#ED8A2F' }}>{sub?.icon}</ListItemIcon>
                            <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={sub?.name} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    }
                  </List>
                </Collapse>
              </>

              :
              <ListItem sx={{ color: '#fff' }} key={index} disablePadding>
                <ListItemButton onClick={() => navigate(menu?.path)}>
                  <ListItemIcon sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
                  <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                </ListItemButton>
              </ListItem>
          )
        }
        )}
      </List>
      <Divider sx={{ bgcolor: '#ffffff30' }} />
      <List>
        {extraMenu?.map((menu, index) => (
          <ListItem key={index} disablePadding sx={{ color: '#fff' }}>
            <ListItemButton onClick={() => navigate(menu?.path)}>
              <ListItemIcon sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
              <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* User Profile */}
      <Box padding='1rem' textAlign={'center'} bgcolor='#256d945c' color='#fff' margin={'1rem'} marginTop='auto' borderRadius='15px' style={{ backgroundImage: 'linear-gradient(181deg, #0969ab, #083554)' }}>
        <Avatar sx={{ width: '4rem', height: '4rem', m: '0 auto', mb: '.5rem', mt: '-3rem', border: theme => `6px solid ${theme.palette.secondary.main}` }} src={currentUser?.photo || null} alt='user-img' />
        <Typography noWrap>{currentUser?.firstname}</Typography>
        <Typography noWrap variant='body2'>{currentUser?.email}</Typography>
        <Typography variant='body2' style={{ color: '#ffffff70' }}>Administrator</Typography>
        <Stack direction={'row'} gap={0} justifyContent={'center'} mt={2}>
          <IconButton color='primary'><Settings01Icon /></IconButton>
          <IconButton onClick={() => { sessionTimeout(); navigate('/') }} color='primary'><LogoutSquare01Icon /></IconButton>
        </Stack>
        {/* <Button variant='contained' startIcon={<ExitToApp />} disableElevation onClick={Logout} style={{background: '#0271bd80', textTransform: 'none', marginTop: '1rem', borderRadius: '8px', color: '#e7e7e7'}} > Sign Out </Button> */}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNav
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <SideNav
        drawer={drawer} mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />

      {/* main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Box height={'100vh'} p={3}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
