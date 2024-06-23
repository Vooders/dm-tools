import * as React from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import UpdateAllButton from './UpdateAllButton'
import Inventory from '../pages/Inventory'
import { HashRouter, Route, Routes } from "react-router-dom"

import Characters from '../pages/Characters'
import Languages from '../pages/Languages'
import Senses from '../pages/Senses'
import Skills from '../pages/Skills'
import Health from '../pages/Health'
import Wealth from '../pages/Wealth'
import MainMenu from './MainMenu'
import ErrorBoundary from './ErrorBoundry'
import Theme from './Theme'
import Metrics from '../pages/Metrics'
import CreateNpc from '../pages/CreateNpc'
import Npcs from '../pages/Npcs'
import PlayerCharacter from '../pages/PlayerCharacter'
import NpcCharacter from '../pages/NpcCharacter'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Vooders made this © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
)

function DashboardContent() {
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <Theme>
            <HashRouter>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                DM Tools
                            </Typography>
                            <UpdateAllButton />
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <MainMenu />
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <ErrorBoundary>
                            <Container maxWidth='lg' sx={{ my: 4 }}>
                                <Grid container spacing={3} >
                                    {/* Recent Inventory */}
                                    <Grid item xs={12} >
                                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                            <Routes>
                                                <Route path="/" element={<Health />} />
                                                <Route path="/inventory" element={<Inventory />} />
                                                <Route path="/characters" element={<Characters />} />
                                                <Route path="/languages" element={<Languages />} />
                                                <Route path="/senses" element={<Senses />} />
                                                <Route path="/skills" element={<Skills />} />
                                                <Route path="/health" element={<Health />} />
                                                <Route path="/wealth" element={<Wealth />} />
                                                <Route path="/metrics" element={<Metrics />} />
                                                <Route path="/createNpc" element={<CreateNpc />} />
                                                <Route path="/createNpc/:npcId" element={<CreateNpc />} />
                                                <Route path="/npcs" element={<Npcs />} />
                                                <Route path="/characterSheet/:characterId" element={<PlayerCharacter />} />
                                                <Route path="/npcSheet/:characterId" element={<NpcCharacter />} />
                                            </Routes>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ pt: 4 }} />
                            </Container>
                        </ErrorBoundary>
                    </Box>
                </Box>
            </HashRouter>
        </Theme>
    )
}

export default function Dashboard() {
    return <DashboardContent />
}
