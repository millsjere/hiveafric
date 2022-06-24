import { Badge, Box, Button, Dialog, DialogContent, Divider, Drawer, FormLabel, Grid, IconButton, InputAdornment, Slide, TextField, Typography } from '@material-ui/core';
import { Close, NotificationsOutlined, SaveAlt, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Dashboard from './Dashboard'
import Products from './inventory/Products';
import { grey } from '@material-ui/core/colors';
import FileUpload from '../../assets/file-upload.png'


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
    productDrawer: {
        width: '35rem',
        padding: '2rem',
        '& .MuiOutlinedInput-root' : {
            borderRadius: '9px'
        }
    },
    field: {
        marginTop: '.5rem',
        marginBottom: '1.2rem'
    },
    media: {
       marginTop: '.5rem',
       marginBottom: '1.2rem',
       border: `1px dashed ${grey[400]}`,
       borderRadius: '6px',
       padding: '2rem',
       textAlign: 'center',
       cursor: 'pointer'
    },
    toolbar: theme.mixins.toolbar,
    btn: {
        color: '#fff', fontWeight: 600,
        '& span': {
            height: '2.8rem',
        }
    }
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Account = () => {
    const classes = useStyles()
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [upload, setUpload] = useState(false)
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const browse = useRef()

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

    const addProduct = () => {
        setUpload(true)
    }
    

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
                    <Typography color='textSecondary'>Inventory</Typography>
                    <Typography variant='h5' className={classes.title}>Products</Typography>
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
               </span>
           </Box>

           {/* ALL CONTENT */}
           <Box margin={'1rem'}>
              {path === '/dashboard' ? <Dashboard /> : null }
              {path === '/inventory' ? <Products add={addProduct} /> : null }
              {path === '/inventory/new' ? <Dashboard /> : null }
              {path === '/inventory/category' ? <Dashboard /> : null }
              {path === '/inventory/brands' ? <Dashboard /> : null }
              {path === '/analytics' ? <Dashboard /> : null }
              {path === '/account' ? <Dashboard /> : null }
              {path === '/settings' ? <Dashboard /> : null }
                
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

       {/* ADD PRODUCT */}
       <Drawer anchor='right' open={upload} classes={{ paper: classes.productDrawer }}>
            <Box display={'flex'} justifyContent='space-between' alignItems={'center'} marginBottom='2rem'>
                <Typography variant='h5' className={classes.title}>Add Product</Typography>
                <IconButton onClick={()=> setUpload(false)}><Close /></IconButton>
            </Box>

            <Box>
                <FormLabel required className={classes.label}>Title</FormLabel>
                <TextField className={classes.field} variant='outlined' placeholder='Name of product' fullWidth />

                <FormLabel required className={classes.label}>Description</FormLabel>
                <TextField className={classes.field} variant='outlined' multiline rows={7} placeholder='Enter product description' fullWidth />

                <FormLabel required className={classes.label}>Price</FormLabel>
                <TextField className={classes.field} variant='outlined' type={'number'} inputProps={{min: 0}} placeholder='0.00' fullWidth InputProps={{
                    startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>
                }} />
                <Grid container spacing={3}>
                    <Grid item sm={6}>
                        <FormLabel required className={classes.label}>SKU</FormLabel>
                        <TextField className={classes.field} variant='outlined' placeholder='Product SKU' fullWidth />
                    </Grid>
                    <Grid item sm={6}>
                        <FormLabel required className={classes.label}>Quantity</FormLabel>
                        <TextField className={classes.field} type={'number'} inputProps={{min: 0}} variant='outlined' placeholder='Available in-stock' fullWidth />
                    </Grid>
                </Grid>

                <FormLabel required className={classes.label}>Media</FormLabel>
                <input type={'file'} accept='.jpg, .png, .jpeg' style={{display: 'none'}} ref={browse} />
                <Box className={classes.media}>
                    <img src={FileUpload} alt='file-upload' width={'15%'} />
                    <Typography color='textSecondary'>Browse and upload files</Typography>
                    <Typography color='textSecondary' variant='body2'>File Max Size - 0.5MB</Typography>
                </Box>
                <Box>

                </Box>

                <FormLabel required className={classes.label}>Category</FormLabel>
                <TextField className={classes.field} variant='outlined' placeholder='Product category' fullWidth />

                <FormLabel required className={classes.label}>Tags</FormLabel>
                <TextField className={classes.field} variant='outlined' placeholder='Product tags' fullWidth />
            </Box>
            <Button variant='contained' color='primary' className={classes.btn} disableElevation fullWidth>Save  Product</Button>
            <Box className={classes.toolbar}></Box>
       </Drawer>
    </div>
  )
}

export default Account