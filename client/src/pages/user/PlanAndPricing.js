import { Box, Button, ButtonGroup, Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import PriceListItem from '../../components/PriceListItem'


const useStyles = makeStyles(theme => ({
    wrapper: {
        background: '#fff',
        padding: '4rem 5rem',
        borderRadius: '15px'
    },
    btnGroup: {
        borderRadius: '10px',
    },
    btn: {
        height: '3.5rem',
        width: '12rem',
        borderRadius: '10px',
    }
}))

const PlanAndPricing = () => {
    const classes = useStyles()
    const pricePackage = [
        {
            name: 'FREE',
            price: 'FREE',
            description: 'Idea for Individuals',
            benefits: ['50 Products Hive','Up to 1 Connection', 'API Integration','No Team Management', 'No Emails Alerts','No Product Import & Export']
        },
        {
            name: 'BASIC',
            description: 'Idea for Small Scale Business',
            price: '34.99',
            benefits: ['1000 Products Hive','Up to 5 Connection', 'Team Management (2)', 'API Integration','Email Alerts', 'No Product Import & Export']
        },
        {
            name: 'STANDARD',
            description: 'Idea for Growing Businesses',
            price: '49.99',
            benefits: ['5000 Products Hive','Up to 10 Connection', 'Team Management (5)', 'API Integration','Email Alerts','Products Import & Export']
        },
        {
            name: 'PROFESSIONAL',
            description: 'Idea for Large Scale',
            price: '79.99',
            benefits: ['10,000 Products Hive','Up to 25 Connection', 'Team Management (10)', 'API Integration','Email Alerts', 'Products Import & Export']
        },
        {
            name: 'BUSINESS',
            description: 'Idea for Distributors & Manufacturers',
            price: '99.99',
            benefits: ['50,000 Products Hive','Up to 50 Connection', 'Team Management (15)', 'API Integration','Email Alerts', 'Products Import & Export']
        }
        ]


  return (
    <Box className={classes.wrapper}>
            <Box marginBottom={'4rem'} textAlign='center'>
                <ButtonGroup size='large' className={classes.btnGroup} color="secondary" aria-label="outlined primary button group">
                    <Button className={classes.btn} variant='contained' disableElevation>Monthly</Button>
                    <Button className={classes.btn}>Yearly <Chip size='small' style={{color: '#fff', marginLeft: '8px'}} color='primary' label={'Save 20%'} /></Button>
                </ButtonGroup>
            </Box>

            <Grid container spacing={3}>
                {
                    pricePackage?.map((item, index) => {
                        return (
                            <Grid key={index} item xl={3} lg={4} md={6} sm={6} xs={12}>
                                <PriceListItem 
                                name={item.name} 
                                price={item.price} 
                                description={item.description}
                                benefits={item.benefits}  />
                            </Grid>
                        )
                    })
                }
            </Grid>
    </Box>
  )
}

export default PlanAndPricing