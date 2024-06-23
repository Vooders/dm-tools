import React from 'react'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'

const theme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: 'rgb(102, 157, 246)' },
        background: { paper: 'rgb(5, 30, 52)' },
    },
    typography: {
        h1: {
            fontSize: '1.4rem',
        },
        subtitle1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.9rem',
        },
        subtitle2: {
            fontSize: '0.98rem',
            lineHeight: '1.4'
        },
    },
    components: {
        MuiListItemButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(rgb(10, 35, 57), rgb(20,45,67))',
                    margin: 4,
                    marginBottom: 10,
                    borderRadius: 8,
                    boxShadow: '0 3px 5px 2px rgba(120,120,120, .4)',
                    padding: '8px',
                }
            }
        }
    }
})

export default function Theme(props: any) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
