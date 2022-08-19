import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Image from '../../../assets/category.png'


const useStyles = makeStyles(theme => ({

}))

const Category = () => {
  const classes = useStyles()



  return (
    <div>
          <Box padding={'5rem'} textAlign='center'>
                <img src={Image} alt='launch' width='22%' style={{marginBottom: '1.5rem'}} />
                <Typography variant='h6'>Organize Your Products</Typography>
                <Typography variant='body1' color='textSecondary'>This is where you categorize your products. You have no categories</Typography>
                <Button variant='contained' onClick={() => {}} size='large' disableElevation color='primary' style={{color: '#fff', marginTop: '1rem', borderRadius: '8px'}}>New Category</Button>
            </Box>
    </div>
  )
}

export default Category