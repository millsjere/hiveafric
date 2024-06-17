import { Box, IconButton, Tooltip, Typography } from '@material-ui/core'
import { Delete, Edit, FileCopy } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
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
        right: '-5%',
        borderRadius: '8px',
        background: '#fff',
        padding: '5px',
        opacity: 0,
        transition: 'all .2s ease',
        '&:hover' : {
            background: 'red',
            color: '#fff'
        }
    },
    iconDraft : {
        position: 'absolute',
        top: '21%',
        right: '-5%',
        borderRadius: '8px',
        background: '#fff',
        padding: '5px',
        opacity: 0,
        transition: 'all .2s ease',
        '&:hover' : {
            background: 'red',
            color: '#fff'
        }
    },
    iconDelete : {
        position: 'absolute',
        color: 'red',
        top: '37%',
        right: '-5%',
        borderRadius: '8px',
        background: '#fff',
        padding: '5px',
        opacity: 0,
        transition: 'all .2s ease',
        '&:hover' : {
            background: 'red',
            color: '#fff'
        }
    },
    wrap: {
        '&:hover #iconEdit': {
            opacity: 1,
            right: '5%'
        },
        '&:hover #iconDelete': {
            opacity: 1,
            right: '5%',
        }
    }
}))

const ProductItem = (props) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchProducts = setTimeout(() => {
            setLoading(false)
        }, 5000);
        
        return () => {
            clearTimeout(fetchProducts)
        }
    })

  return (
    <Box padding='1.5rem' paddingBottom={'1rem'} bgcolor={'#fff'} borderRadius='10px' className={classes.wrap} >
        
        {
            loading ? 
            <Skeleton variant='rect' animation='wave' width={'100%'} height={'15rem'} style={{borderRadius: '10px', marginBottom: '1rem'}} />
            :
            <Box height={'15rem'} position='relative' style={{ backgroundImage: `url(${Cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} borderRadius='10px'>
                <Tooltip title='Edit' arrow placement="left">
                    <IconButton id={'iconEdit'} className={classes.icon}><Edit fontSize='small'  /></IconButton>
                </Tooltip>
                <Tooltip title='Draft' arrow placement="left">
                    <IconButton id={'iconEdit'} className={classes.iconDraft}><FileCopy fontSize='small'  /></IconButton>
                </Tooltip>
                <Tooltip title='Delete' arrow placement="left">
                    <IconButton id={'iconDelete'} className={classes.iconDelete}><Delete fontSize='small'  /></IconButton>
                </Tooltip>
            </Box>

        }

        {
            loading ?
            <>
                <Skeleton animation={'wave'} variant={'text'} />
                <Skeleton animation={'wave'} variant={'text'} width={'80%'} />
            </>
            :
            <Box marginTop={'15px'}>
                <Typography variant='h6' gutterBottom className={classes.title}>New cushion porceline glass plate for product {props.title} title</Typography>
                <span style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='body2' color='textSecondary'>GHc 240.00</Typography>
                    <Typography variant='body2' color='textSecondary'>QTY 40</Typography>
                </span>
            </Box>
        }
    </Box>
  )
}

export default ProductItem