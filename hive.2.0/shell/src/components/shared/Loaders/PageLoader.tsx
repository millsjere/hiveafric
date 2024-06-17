import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import Logo from '../../../assets/images/logo.png'

const PageLoader = () => {
    return (
        <Box>
            <img src={Logo} alt='logo' width={'100%'} />
            <LinearProgress />
        </Box>
    )
}

export default PageLoader