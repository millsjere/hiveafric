import { Box, Button, Divider, Grid, Hidden, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { KeyboardArrowDown, Search, ViewModule, List } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import ProductItem from '../../../components/ProductItem'
import Launch from '../../../assets/rocket.png'


 const useStyles = makeStyles(theme => ({
    root : {
        '& .MuiOutlinedInput-root': {
            borderRadius: '9px'
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
        borderRadius: '10px', 
        height: '2.5rem' 
    },
    iconBtn: {
        fontSize: '1.6rem',
        borderRadius: '10px', 

    }
 }))

const Products = (props) => {
    const classes = useStyles()
    const products = []


  return (
    <div className={classes.root}>
        {
            products.length === 0 ?
            <>
                {/* SEARCH & FILTER */}
                <Box className={classes.filter}>
                    <TextField style={{flex: 1.5, outline: 'none', border: 'none'}} size='small' fullWidth variant='outlined' className={classes.search} InputProps={{ startAdornment: <InputAdornment><Search className={classes.icon} size='small' /></InputAdornment> }} placeholder='Search products by name or keyword' />
                    <span id='filter'>
                        <Hidden mdDown>
                            <Typography>Showing <span style={{color: 'red'}}>(20)</span> results</Typography> 
                        </Hidden>
                        <Divider />
                        <Button className={classes.btn} endIcon={<KeyboardArrowDown />} variant='text' disableElevation ><Typography>Sort By</Typography> </Button>
                        <IconButton style={{borderRadius: '10px', padding: '6px'}} ><List className={classes.iconBtn} /></IconButton>
                        <IconButton style={{borderRadius: '10px', padding: '6px'}} ><ViewModule className={classes.iconBtn} /></IconButton>
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
            <Box padding={'5rem'} textAlign='center'>
                <img src={Launch} alt='launch' width='25%' style={{marginBottom: '1.5rem'}} />
                <Typography variant='h6'>Manage Your Inventory</Typography>
                <Typography variant='body1' color='textSecondary'>This is where you manage your products. You have 0 products</Typography>
                <Button variant='contained' onClick={() => props.add()} size='large' disableElevation color='primary' style={{color: '#fff', marginTop: '1rem', borderRadius: '8px'}}>Add Product</Button>
            </Box>
        }
        


    </div>
  )
}

export default Products