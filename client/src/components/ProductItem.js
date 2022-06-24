import { Box, IconButton, Typography } from '@material-ui/core'
import { Edit} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Cover from '../assets/cover.jpg'

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        marginBottom: '10px'
    },
    icon : {
        position: 'absolute',
        top: '5%',
        right: '5%',
        borderRadius: '8px',
        background: '#fff',
        padding: '5px',
        opacity: 0,
        transition: 'all .2s ease-in'
    },
    wrap: {
        '&:hover #iconBtn': {
            opacity: 1,
        }
    }
}))

const ProductItem = (props) => {
    const classes = useStyles()

  return (
    <Box padding='.8rem' paddingBottom={'1rem'} bgcolor={'#fff'} borderRadius='10px' className={classes.wrap} >
        <Box height={'15rem'} position='relative' style={{ backgroundImage: `url(${Cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} borderRadius='10px'>
            <IconButton id={'iconBtn'} className={classes.icon}><Edit fontSize='small'  /></IconButton>
        </Box>
        <Box marginTop={'15px'}>
            <Typography variant='h6' gutterBottom className={classes.title}>New cushion porceline glass plate for product {props.title} title</Typography>
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='body2' color='textSecondary'>GHc 240.00</Typography>
                <Typography variant='body2' color='textSecondary'>QTY 40</Typography>
            </span>
        </Box>
    </Box>
  )
}

export default ProductItem