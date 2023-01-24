import * as React from 'react';

import List from '@mui/material/List';
import CharactersMenu from './menuItems/CharactersMenu'
import Divider from '@mui/material/Divider';
import { mainListItems, secondaryListItems } from './listItems';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

export default function MainMenu() {
    return (
        <ThemeProvider
            theme={createTheme({
                components: {
                    MuiListItemButton: {
                        defaultProps: {
                            disableTouchRipple: true,
                        }
                    },
                    MuiListItemText: {
                        styleOverrides: {
                            root: {
                                color: 'rgba(255,255,255,.8)'
                            }
                        }
                    },
                    MuiSvgIcon: {
                        styleOverrides: {
                            root: {
                                height: '2em',
                                width: '2em',
                            },
                        },
                    },
                    MuiListSubheader: {
                        styleOverrides: {
                            root: {
                                fontSize: 16,
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                palette: {
                    mode: 'dark',
                    primary: { main: 'rgb(102, 157, 246)' },
                    background: { paper: 'rgb(5, 30, 52)' },
                },
                typography: {
                    fontSize: 12,
                },
            })}
        >
            <List component="nav">
                <CharactersMenu />
                <Divider sx={{ my: 1 }} />
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
        </ThemeProvider>
    )
}
