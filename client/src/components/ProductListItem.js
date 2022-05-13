import { Avatar, Box, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
    wrap : {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '20px 0',
        '&:hover': {
            cursor: 'pointer',
            '& #title, #icon': {
                color: theme.primaryColor
            }
        }
    },
    title: {
        transition: 'all .2s ease'
    },
    avatar : {
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: '10px'
    }
}))

const ProductListItem = ({name, sales, image}) => {
    const classes = useStyles()

  return (
    <div className={classes.wrap}>
        <Box>
            <Avatar src={image} className={classes.avatar} />
           
        </Box>
        <Box>
            <Typography id='title' className={classes.title} >{name}</Typography>
            <Typography variant='body2' color='textSecondary'>{sales} Purchases</Typography>
        </Box>
        <Box marginLeft='auto'>
            <KeyboardArrowRight id='icon'  />
        </Box>
    </div>
  )
}

export default ProductListItem