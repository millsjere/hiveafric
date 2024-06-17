import React from 'react'
import { Avatar, AvatarGroup, Box, Rating, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../assets/images/logo.png'


// AuthWrapper: 
// This is used to wrap auth pages: Login, ForgotPassword, Resetpassword and Signup

type AuthWrapperProps = {
    children: React.ReactNode,
    title: React.ReactNode,
    subtitle: React.ReactNode,
    image: any,
    order?: number,
    imagePosition?: string
    textAlign?: any
}

export const AuthWrapper = ({ children, title, subtitle, image, order = 1, imagePosition = 'center', textAlign = 'center' }: AuthWrapperProps) => {
    const navigate = useNavigate()
    return (
        <div>
            <Box height={'100vh'} display={'flex'} flexDirection={order === 2 ? 'row-reverse' : 'row'}>
                <Box width={{ sm: '50%', md: '45%', lg: '45%' }} p={10} sx={{
                    display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, flexDirection: 'column', justifyContent: 'space-between',
                    backgroundSize: 'cover', backgroundImage: `linear-gradient(0deg, rgba(0,0,0,40%), rgba(0,0,0, 10%)), url(${image})`,
                    backgroundPosition: imagePosition
                }}>
                    <p></p>
                    <Box p={4} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255, 10%)', borderRadius: '20px', 'backdrop-filter': 'blur(20px)' }}>
                        <Typography variant='h4' mb={2} textTransform={'capitalize'} fontWeight={200}>Grow Bigger <br />Connect Faster</Typography>
                        <Typography variant='body1'>Create a free account and get a 50 product hive with full access to all features. No credit card needed. Trusted by the Giants & Professionals</Typography>
                        <Stack direction={'row'} gap={2} mt={4} >
                            <AvatarGroup sx={{ display: { sm: 'none', md: 'none', lg: 'flex' } }}>
                                <Avatar />
                                <Avatar />
                                <Avatar />
                                <Avatar />
                            </AvatarGroup>

                            <Box>
                                <Rating value={5} color='primary' readOnly />
                                <Typography variant='body2' mt={-1} sx={{ color: '#fff' }}>from 100+ reviews</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
                <Box width={{ xs: '100%', sm: '50%', lg: '55%' }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '2rem'
                }}>
                    <span>
                        <img src={Logo} width={80} alt="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                        <Typography color={'GrayText'}>Hive Afrika</Typography>
                    </span>
                    <Box width={{ xs: '80%', sm: '80%', md: '80%', lg: '50%' }} textAlign={textAlign}>
                        {title}
                        {subtitle}
                        {children}
                    </Box>

                    <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: 'row' }} justifyContent={'space-between'} width={{ xs: '80%', sm: '80%', md: '80%', lg: '50%' }}>
                        <Typography variant='body2' color={'GrayText'} sx={{ textAlign: 'center' }}> © {new Date().getFullYear()} Hive Afrika</Typography>
                        <Typography variant='body2' color={'GrayText'}>About Us</Typography>
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}