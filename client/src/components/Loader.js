import { Box, LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    wrap : {
        width: '100%',
        height: '100vh',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    imgBox : {
        width: '14rem',
        marginBottom: '1rem'
    },
    title : {
        fontWeight: 600
    },
}))
const Loader = () => {
    const classes = useStyles()

  return (
    <div className={classes.wrap}>
        <Box>
            <Box className={classes.imgBox}> <Typography variant='h5' className={classes.title}>Hive Afrika</Typography> </Box>
            <LinearProgress variant='indeterminate' />
        </Box>

    </div>
  )
}

export default Loader