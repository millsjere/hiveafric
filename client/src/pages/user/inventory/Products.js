import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Hidden, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { KeyboardArrowDown, Search, ViewModule, List, Tune, SaveAlt } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import ProductItem from '../../../components/ProductItem'
import Launch from '../../../assets/rocket.png'


 const useStyles = makeStyles(theme => ({
    root : {
        position: 'relative',
        '& .MuiOutlinedInput-root': {
            borderRadius: '6px'
        }
    },
    filter : {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '0%',
        zIndex: 99,
        background: '#f3f3f3',
        padding: '1.5rem 0',
        '& #filter': {
            display: 'flex',
            flex: 1,
            gap: '5px',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    },
    icon: {
        color: grey[400]
    },
    btn: {
        textTransform:'none', 
        borderRadius: '6px', 
        height: '2.5rem' ,
        border: '1px solid lightgrey',
        marginLeft: '5px'
    },
    iconBtn: {
        fontSize: '1.6rem',
        borderRadius: '10px', 

    },
    floatBtn: {
        color:'#fff',
        textTransform:'none', 
        borderRadius: '10px', 
        height: '3.0rem',
        position: 'fixed',
        bottom: '-12%',
        right: '3%',
        zIndex: 80,
        transition: 'all .5s ease',
        opacity: 0
    },
    active: {
        opacity: 1,
        bottom: '5%'
    }
 }))

const Products = (props) => {
    const classes = useStyles()
    const [scroll, setScroll] = useState(0)
    const products = []

    const showBtn = () => {
        setScroll(window.scrollY)
    }

    useEffect(()=>{
        const pageScroll = () => {
            window.addEventListener('scroll', showBtn)
        }
        pageScroll()
        return () => {
            window.removeEventListener('scroll', showBtn)
        }
    },[])


  return (
    <div className={classes.root}>
        {
            products.length === 0 ?
            <>
                {/* SEARCH & FILTER */}
                <Box className={classes.filter}>
                    <TextField style={{flex: 1.5, outline: 'none', border: 'none',marginRight: '10px'}} size='small' fullWidth variant='outlined' className={classes.search} 
                        InputProps={{ startAdornment: <InputAdornment position='start'><Search className={classes.icon} size='small' /></InputAdornment> }} 
                        placeholder='Search products by name or keyword' 
                    />
                    <span id='filter'>
                        <Hidden smDown>
                            <Button className={classes.btn} endIcon={<KeyboardArrowDown />} variant='text' disableElevation ><Typography>Category</Typography> </Button>
                            <Button className={classes.btn} endIcon={<KeyboardArrowDown />} variant='text' disableElevation ><Typography>Brand</Typography> </Button>
                            <IconButton style={{borderRadius: '10px', padding: '6px'}} ><List className={classes.iconBtn} /></IconButton>
                            <IconButton style={{borderRadius: '10px', padding: '6px'}} ><ViewModule className={classes.iconBtn} /></IconButton>
                        </Hidden>
                        <Hidden mdUp>
                            <Button className={classes.btn} endIcon={<Tune />} variant='text' disableElevation ><Typography>Filters</Typography> </Button>
                        </Hidden>
                    </span>
                </Box>

                <Box padding={'0 0 2rem 0'}>
                    <Grid container spacing={3}>
                        {
                            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item, index) => {
                                return(
                                    <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
                                        <ProductItem title={item} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </>
            :
            <Box padding={'5rem'} textAlign='center' bgcolor={'#fff'} borderRadius='20px'>
                <img src={Launch} alt='launch' width='25%' style={{marginBottom: '2.5rem'}} />

                <Grid container spacing={3}>
                    <Grid item sm={6}>
                        <Card variant='outlined' style={{borderRadius: '10px'}}>
                            <CardContent style={{padding: '2rem'}}>
                                <Avatar style={{margin: '0 auto', marginBottom: '1rem'}}>1</Avatar>
                                <Typography variant='h6'>Product Settings</Typography>
                                <Typography variant='body1' color='textSecondary'>Provide settings (currency and more) for your products.</Typography>
                                <Button variant='contained' onClick={() => props.add()} size='large' disableElevation color='primary' style={{color: '#fff', marginTop: '1rem', borderRadius: '8px'}}>Go To Settings</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={6}>
                        <Card variant='outlined'  style={{borderRadius: '10px'}}> 
                            <CardContent style={{padding: '2rem'}}>
                                <Avatar style={{margin: '0 auto', marginBottom: '1rem'}}>2</Avatar>
                                <Typography variant='h6'>Add Products</Typography>
                                <Typography variant='body1' color='textSecondary'>Add products to manage your inventory and stores</Typography>
                                <Button variant='contained' onClick={() => props.add()} size='large' disableElevation color='primary' style={{color: '#fff', marginTop: '1rem', borderRadius: '8px'}}>Add Product</Button>
                            </CardContent>   
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        }

       
        <Button startIcon={<SaveAlt />} variant='contained' className={`${classes.floatBtn} ${ scroll > 160 ? classes.active : null}`} color='secondary'
        disableElevation onClick={() => props.add()}>Add Product</Button>
        


    </div>
  )
}

export default Products