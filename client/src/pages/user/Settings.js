import { Card, CardContent, Container, Grid } from '@material-ui/core'
import { Fingerprint, Lock, Notifications, Person } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({

}))
const Settings = () => {
    const classes = useStyles()


    const menuList = [
        {name: 'Basic Info', icon: <Person />},
        {name: 'Password', icon: <Lock />},
        {name: 'Notification', icon: <Notifications />},
        {name: 'Two-step Verification', icon: <Fingerprint />},
        {name: 'Basic Info', icon: <Person />},
    ]


  return (
    <div>
        <Container >
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <Card variant='outlined' elevation={0}>
                        <CardContent>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={9}>
                     <Card variant='outlined' elevation={0}>
                        <CardContent>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}

export default Settings