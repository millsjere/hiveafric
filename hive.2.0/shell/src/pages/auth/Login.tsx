import { InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base, saveData } from '../../config/appConfig';
import { ArrowRight01Icon, Mail01Icon, SquareLock02Icon } from 'hugeicons-react';
import { AuthWrapper, InputField, RoundButton } from '../../components/shared'
import BgImage from '../../assets/images/slider1.jpg'
import { useAlert } from '../../context/AlertContext';


const Login = () => {
    const navigate = useNavigate()
    const { successAlert, errorAlert } = useAlert()
    const [load, setLoad] = React.useState(false)
    const [value, setValue] = React.useState({ email: '', password: '' })

    // console.log(getData('uid'))

    const onFormSubmit = async () => {
        if (value.email === '' || !value?.email?.includes('@')) return errorAlert('Invalid. Please provide a valid email')
        if (value.password === '') return errorAlert('Invalid. Please provide your password')
        try {
            setLoad(true)
            const url = '/hive/user/login'
            const { data: res } = await base.post(url, value)
            if (res?.status === 'success') {
                // console.log(res?.data)
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('User Login successful')
                navigate('/auth-2fa', { replace: true })
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }


    return (
        <>
            <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Hello Again</Typography>}
                subtitle={<Typography textAlign={'center'} sx={{ mb: 3 }} paragraph color='textSecondary' >Don't have a hive?<Link style={{ color: '#ED8A2F' }} to={'/signup'}> Create account</Link>
                </Typography>}
                image={BgImage}
                order={2}
                imagePosition={'right'}
            >
                <div>
                    <InputField variant='outlined'
                        label='Email' type='email'
                        InputProps={{ endAdornment: <InputAdornment position='start'><Mail01Icon size={20} color='#acacac' /></InputAdornment> }}
                        value={value?.email} onChange={(e) => setValue(prev => ({ ...prev, email: e.target.value }))} fullWidth
                    />
                    <InputField variant='outlined'
                        label='Password' type='password'
                        InputProps={{ endAdornment: <InputAdornment position='start'><SquareLock02Icon size={20} color='#acacac' /></InputAdornment> }}
                        value={value?.password} onChange={(e) => setValue(prev => ({ ...prev, password: e.target.value }))} fullWidth
                    />
                    <RoundButton
                        endIcon={<ArrowRight01Icon id='end-icon' style={{ transition: 'all .2s ease-in' }} color='#fff' size={20} />}
                        onClick={onFormSubmit}
                        loading={load} sx={{ mb: '1rem' }}
                        text='Buzz In' variant={'contained'}
                        color='secondary' disableElevation fullWidth
                    />
                    <Typography textAlign={'center'} paragraph > <Link to='/forgot-password' style={{ color: '#ED8A2F' }}>Forgot Password </Link> </Typography>


                </div>
            </AuthWrapper>
        </>

    )
};


export default Login;
