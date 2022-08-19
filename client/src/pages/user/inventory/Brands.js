import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Image from '../../../assets/category.png'


const useStyles = makeStyles(theme => ({

}))


const Brands = () => {
  const classes = useStyles()



  return (
    <div>
          <Box padding={'5rem'} textAlign='center'>
                <img src={Image} alt='launch' width='22%' style={{marginBottom: '1.5rem'}} />
                <Typography variant='h6'>Organize By Brands</Typography>
                <Typography variant='body1' color='textSecondary'>Structure your product data by creating brands. You have no brands</Typography>
                <Button variant='contained' onClick={() => {}} size='large' disableElevation color='primary' style={{color: '#fff', marginTop: '1rem', borderRadius: '8px'}}>Create Brands</Button>
            </Box>
    </div>
  )
}

export default Brands