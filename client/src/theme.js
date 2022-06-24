import { createTheme } from '@material-ui/core'


export const theme = createTheme({
    typography : {
        fontFamily: "Plus Jakarta Sans",
        fontSize: 13
    },
    palette : {
        type: 'light',
        primary: {
            main: '#ED8A2F'
        },
        secondary : {
            main: '#083554',
            contrastText: '#fff'
        }
    },
    primaryColor : '#ED8A2F',
    secondaryColor: '#083554',
    opacSecondary: '#00052654'
})