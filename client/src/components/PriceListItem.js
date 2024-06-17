import { Box, Button, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { CheckCircle, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    wrapper: {
        background: '#fff',
        padding: '2rem',
        borderRadius: '15px',
        border: `1px solid ${grey[300]}`,
        '&:hover': {
            border: `1px solid ${theme.primaryColor}`,

            '& #chip': {
                background: theme.primaryColor,
                color: '#fff'
            }
        }
    },
    label: {
        marginBottom: '1rem'
    },
    title: {
        fontWeight: 700,
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end'
    },
    btn: {
        marginTop:'2rem', 
        height: '3.5rem', 
        borderRadius: '8px',
        '&:hover': {
            background: theme.primaryColor
        }
    }
}))

const PriceListItem = ({name, price, description, benefits}) => {
    const classes = useStyles()
    
  return (
    <Box className={classes.wrapper}>
            <Box>
                <Chip id='chip' label={name} className={classes.label} />
                <Typography variant='h3' className={classes.title} gutterBottom>
                    {price === 'FREE' ? price : `$${price}`}
                    <Typography variant='body1' style={{marginBottom: '3px'}}>/month</Typography>
                </Typography>
                <Typography color='textSecondary' variant='body1'>{description}</Typography>
            </Box>
            <Divider style={{margin: '1rem 0'}} />
            <List>
            {
                benefits?.map((item,index) => {
                    return (
                        item.startsWith('No') ?
                        <ListItem key={index} disabled>
                            <ListItemIcon style={{minWidth: '32px'}}><Cancel fontSize='small' color='primary' /></ListItemIcon>
                            <ListItemText >{item}</ListItemText>
                        </ListItem>
                        :
                        <ListItem key={index}>
                            <ListItemIcon style={{minWidth: '32px'}}><CheckCircle fontSize='small' color='primary' /></ListItemIcon>
                            <ListItemText>{item}</ListItemText>
                        </ListItem>

                    )
                })
            }
            </List>
            <Button size='large' disabled={name === 'FREE' && true } disableElevation className={classes.btn} fullWidth variant='contained' color='secondary'>Get Started</Button>

    </Box>
  )
}

export default PriceListItem