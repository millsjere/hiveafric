import { alpha, Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, LinearProgress, Typography } from '@material-ui/core'
import { AccountCircle, LocalMall, MoreVert, TrendingUp } from '@material-ui/icons'
import { AvatarGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Slider from '../../assets/slider2.jpg'
import ProductListItem from '../../components/ProductListItem'


const useStyles = makeStyles(theme => ({
    slider : {
        display: 'flex',
        height: '18rem',
        padding: '3rem',
        borderRadius: '15px',
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0, 80%), transparent ), url(${Slider})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: '2rem'
    },
    slideLeft: {
        display: 'flex',
        flex: '1', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start',
        '& h4, p': {
            color: '#fff'
        }
    },
    card : {
        borderRadius: '15px',
        position: 'relative',
        overflow: 'hidden'
    },
    cardIcon: {

    },
    title : {
        fontSize: '2rem',
        fontWeight: 600
    },
    bar : {
        height: '.3rem',
        borderRadius: '5px',
        background: theme.secondaryColor
    },
    avatar : {
        background: theme.primaryColor
    },
    bgIcon: {
        fontSize: '15vw',
        color: alpha(theme.secondaryColor, 0.08),
        position: 'absolute',
        bottom: '-40%',
        right: '-15%',
        zIndex: 0,
        [theme.breakpoints.down('md')]: {
            bottom: '-20%',
        }

    }
}))
const Dashboard = () => {
    const classes = useStyles()

    const topProducts = [
        { name: 'Dell i7 Laptop', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-4.jpg', path: ''},
        { name: 'Dre Power Headset', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-5.jpg', path: ''},
        { name: 'HP USB Mouse', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-6.jpg', path: ''},
        { name: 'Samsung 24inch TV', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-2.jpg', path: ''},
        { name: 'Dell i3 Laptop', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-1.jpg', path: ''},
        { name: 'Dell i5 Laptop', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-3.jpg', path: ''},
        { name: 'Dell i7 Laptop', img: 'https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2018/04/white-electronics-product-7.jpg', path: ''}
    ]

  return (
    <div>

        <Grid container spacing={4}>

            <Grid item lg={8} md={12} sm={12}>
                <Box className={classes.slider} >
                    <span className={classes.slideLeft}>
                        <Typography variant='h4' gutterBottom >Grow bigger, <br/>Connect faster</Typography>
                        <Typography color='textSecondary' gutterBottom>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus impedit rem debitis dolor adipisci.
                        </Typography>
                        <Button variant='contained' color='primary' disableElevation style={{textTransform: 'none', marginTop: '1rem'}}>Get Started</Button>
                    </span>
                    <span style={{flex: '1'}}>

                    </span>
                </Box>

                <Grid container spacing={3}>
                    <Grid item lg={6} md={6}>
                        <Card className={classes.card} variant='outlined' elevation={0}>
                            <CardContent style={{padding: '2rem'}}>
                                <Box display={'flex'} justifyContent='space-between' marginBottom={'2rem'} zIndex={2} position='relative' >
                                    <span style={{display: 'flex', gap: '.8rem', alignItems: 'center'}}>
                                        <Avatar style={{borderRadius: '10px'}} className={classes.avatar} ><LocalMall /></Avatar>
                                        <Typography variant='h6'>Products</Typography>
                                    </span>
                                    <span>
                                        <IconButton><MoreVert className={classes.cardIcon} /></IconButton>
                                    </span>
                                </Box>
                                <Box zIndex={2} position='relative'>
                                    <Typography className={classes.title}>1600</Typography>
                                    <Typography variant='body2' color='textSecondary' style={{marginBottom: '5px'}}>80% used | 2000 Products</Typography>
                                    <LinearProgress className={classes.bar} variant='determinate' value={80} />
                                </Box>
                                <LocalMall className={classes.bgIcon} />

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item lg={6} md={6}>
                        <Card className={classes.card} variant='outlined' elevation={0}>
                            <CardContent style={{padding: '2rem'}}>
                                <Box display={'flex'} justifyContent='space-between' marginBottom={'2rem'} zIndex={2} position='relative'>
                                    <span style={{display: 'flex', gap: '.8rem', alignItems: 'center'}}>
                                        <AvatarGroup spacing={'small'}>
                                            <Avatar style={{background: '#ED8A2F',}} />
                                            <Avatar style={{background: '#ED8A2F',}} />
                                            <Avatar style={{background: '#ED8A2F',}} />
                                        </AvatarGroup>
                                        <Typography variant='h6'>Connect</Typography>
                                    </span>
                                    <span>
                                        <IconButton><MoreVert className={classes.cardIcon} /></IconButton>
                                    </span>
                                </Box>
                                <Box zIndex={2} position='relative'>
                                    <Typography className={classes.title}>05 Stores</Typography>
                                    <Typography variant='body2' color='textSecondary' style={{marginBottom: '5px'}}>50% used | 10 Connections</Typography>
                                    <LinearProgress className={classes.bar} variant='determinate' value={50} />
                                </Box>
                                <AccountCircle className={classes.bgIcon} />

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>


            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <Card className={classes.card} variant='outlined' elevation={0}>
                    <CardContent style={{padding: '2rem'}}>
                        <Box display={'flex'} justifyContent='space-between' marginBottom={'2rem'} zIndex={2} position='relative' >
                            <span style={{display: 'flex', gap: '.8rem', alignItems: 'center'}}>
                                <Avatar style={{borderRadius: '10px'}} className={classes.avatar} ><TrendingUp /></Avatar>
                                <Typography variant='h6'>Top Products</Typography>
                            </span>
                            <span>
                                <IconButton> <MoreVert className={classes.cardIcon} /></IconButton>
                            </span>
                        </Box>
                        <Divider style={{marginTop: '-10px'}} />
                        <Box>
                            {
                                topProducts.map((prod, index) => {
                                    return (
                                       
                                            <ProductListItem key={index} name={prod.name} image={prod.img} sales={32} style={{ margin: '10px 0'}} />
                                      
                                    )
                                })
                            }
                        </Box>
                        
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    </div>
  )
}

export default Dashboard