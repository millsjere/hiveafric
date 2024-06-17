import React, { useReducer } from 'react'
import { AuthWrapper, InputField, RoundButton } from '../../components/shared'
import { Autocomplete, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import BgImage from '../../assets/images/slider2.jpg'
import { ArrowRight01Icon, Briefcase07Icon, SquareLock02Icon, Mail01Icon, SmartPhone01Icon, UserCircleIcon, ArrowLeft01Icon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from '../../context/AlertContext'
import { base, saveData } from '../../config/appConfig'


type FieldProps = {
    label: string,
    type: string,
    action: string,
    icon: any, level: number, state: string
}

const fields: FieldProps[] = [
    { label: 'First Name', type: 'text', action: 'FNAME', icon: <UserCircleIcon size={20} color='#acacac' />, level: 1, state: 'firstname' },
    { label: 'Last Name', type: 'text', action: 'LNAME', icon: <UserCircleIcon size={20} color='#acacac' />, level: 1, state: 'lastname' },
    { label: 'Email', type: 'email', action: 'EMAIL', icon: <Mail01Icon size={20} color='#acacac' />, level: 1, state: 'email' },
    { label: 'Phone', type: 'tel', action: 'PHONE', icon: <SmartPhone01Icon size={20} color='#acacac' />, level: 1, state: 'phone' },
    { label: 'Industry', type: 'select', action: 'INDUSTRY', icon: <UserCircleIcon size={20} color='#acacac' />, level: 2, state: 'industry' },
    { label: 'Company', type: 'text', action: 'COMPANY', icon: <Briefcase07Icon size={20} color='#acacac' />, level: 2, state: 'company' },
    { label: 'Password', type: 'password', action: 'PASSWORD', icon: <SquareLock02Icon size={20} color='#acacac' />, level: 2, state: 'password' },
    { label: 'Confirm Password', type: 'password', action: 'CONFIRM_PASSWORD', icon: <SquareLock02Icon size={20} color='#acacac' />, level: 2, state: 'confirmPassword' },
]

const industries: string[] = [
    '', 'Cosmetics', 'Electronic & IT Equipment', 'Fashion', 'Fashion Accessories', 'Food & Beverage',
    'Footwear', 'Furniture & Bedding', 'Media', 'Health Care',
    'Hair & Beauty', 'Homewares', 'Hospitality', 'Jewellery', 'Medicine',
    'Sporting & Outdoor', 'Software & Security', 'Toys & Hobbies'
]

const Signup = () => {
    const navigate = useNavigate()
    const [load, setLoad] = React.useState(false)
    const [stage, setStage] = React.useState(1)
    const { errorAlert, successAlert } = useAlert()

    const initState = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        password: '',
        confirmPassword: '',
    }
    const reducerFn = (state: any, action: { type: any; payload: string }) => {
        switch (action.type) {
            case "FNAME":
                return { ...state, firstname: action.payload }
            case "LNAME":
                return { ...state, lastname: action.payload }
            case "EMAIL":
                return { ...state, email: action.payload }
            case "PHONE":
                return { ...state, phone: action.payload }
            case "COMPANY":
                return { ...state, company: action.payload }
            case "INDUSTRY":
                return { ...state, industry: action.payload }
            case "PASSWORD":
                return { ...state, password: action.payload }
            case "CONFIRM_PASSWORD":
                return { ...state, confirmPassword: action.payload }
            case "RESET":
                return initState
            default:
                return state;
        }
    }

    const [formInput, dispatch] = useReducer(reducerFn, initState)

    const validateFormFields = () => {
        if (stage === 1) {
            if (formInput.firstname === '') return errorAlert('Please provide first name')
            if (formInput.lastname === '') return errorAlert('Please provide last name')
            if (formInput.email === '' || !formInput.email.includes('@')) return errorAlert('Invalid email address')
            if (formInput.phone === '' || formInput.phone.length < 10 || /\D/.test(formInput.phone)) return errorAlert('Invalid phone number')
            setStage(2)
        }
        if (stage === 2) {
            if (formInput.industry === '') return errorAlert('Please select an industry')
            if (formInput.company === '') return errorAlert('Please provide company name')
            if (formInput.password === '' || formInput.password.length < 8) return errorAlert('Password must be more than 8 characters')
            if (formInput.password !== formInput.confirmPassword) return errorAlert('Passwords do not match')
            onFormSubmit()
        }

    }
    const goBack = () => {
        setStage(1)
        setLoad(false)
    }
    const onFormSubmit = async () => {
        const url = '/hive/user/signup'
        const payload = {
            ...formInput
        }
        try {
            setLoad(true)
            const { data: res } = await base.post(url, payload)
            if (res?.status === 'success') {
                // console.log(res?.data)
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('Account creation successful')
                navigate('/verify-email', { replace: true })
            }
        } catch (error) {
            console.log(error)
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }
    return (
        <div>
            <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Build a Hive<span style={{ color: '#ED8A2F' }}>.</span></Typography>}
                subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Already have a hive? <Link to='/' style={{ color: '#ED8A2F' }}>Login</Link></Typography>}
                image={BgImage}
                order={1}
                imagePosition={'right'}
            >
                <Grid container rowSpacing={0} columnSpacing={2}>
                    {
                        stage === 1 &&
                        fields?.filter(el => el?.level === 1)?.map((field, i) => {
                            return <Grid key={i} item xs={12} sm={12}>
                                <InputField
                                    type={field?.type}
                                    variant='outlined'
                                    value={formInput?.[field.state]}
                                    onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                                    label={field?.label}
                                    fullWidth
                                    InputProps={{ endAdornment: <InputAdornment position='start'>{field?.icon}</InputAdornment> }}
                                />
                            </Grid>
                        })
                    }
                    {
                        stage === 2 &&
                        fields?.filter(el => el?.level === 2)?.map((field, i) => {
                            return <Grid key={i} item sm={12}>
                                {
                                    field?.state === 'industry' ?
                                        <Autocomplete onChange={(_e, newVal) => dispatch({ type: field?.action, payload: newVal! })}
                                            options={industries} value={formInput?.[field.state]}
                                            getOptionLabel={(option) => option || ''}
                                            isOptionEqualToValue={(option, val) => option === val}
                                            renderInput={(params) => <InputField label={field?.label} type={field?.type} variant='outlined' {...params} />}
                                        />
                                        :
                                        <InputField
                                            type={field?.type}
                                            variant='outlined'
                                            value={formInput?.[field.state]}
                                            onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                                            label={field?.label}
                                            fullWidth
                                            InputProps={{ endAdornment: <InputAdornment position='start'>{field?.icon}</InputAdornment> }}
                                        />

                                }
                            </Grid>
                        })
                    }
                </Grid>
                <RoundButton
                    endIcon={<ArrowRight01Icon id='end-icon' style={{ transition: 'all .2s ease-in' }} color='#fff' size={20} />}
                    onClick={validateFormFields}
                    loading={load} sx={{ mb: '1rem' }}
                    text={stage === 1 ? 'Continue' : 'Sign Up'} variant={'contained'}
                    color='secondary' disableElevation fullWidth
                />
                {
                    stage > 1 &&
                    <Typography textAlign={'center'} sx={{ cursor: 'pointer' }}
                        mt={2} display={'flex'} color={'primary'} onClick={goBack}
                        alignItems={'center'} gap={.5} justifyContent={'center'} ><ArrowLeft01Icon size={20} />
                        Go Back
                    </Typography>
                }
            </AuthWrapper>
        </div>
    )
}

export default Signup