import './sidebar.css'
import { ContextFunction } from '../../Context/Context';
import { forwardRef, useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillHome, AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import Slide from '@mui/material/Slide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Box,
    Dialog,
    Badge,
    Tooltip,
    DialogActions,
    DialogContent,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button

} from '@mui/material';
import axios from 'axios';







const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SideBar = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate()

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken !== null ? true : false


    useEffect(() => {
        getCart()
    }, [])



    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpenAlert(true);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };
    const getCart = async () => {
        if (authToken) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }

    }
    const handleLogOut = () => {
        if (authToken) {
            navigate('/login ')
            localStorage.removeItem('Authorization')
            toast.success("Logout Successfully", { autoClose: 500, })
            // setOpenAlert(false);
        }
        else {
            toast.error("User is already logged of", { autoClose: 500, })
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ToastContainer />
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <AiOutlineMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {/* Mini variant drawer */}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <FiChevronRight /> : <FiChevronLeft />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Divider />
                    <List>
                        <NavLink to='/' >
                            <Tooltip title="Home">
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                        <ListItemIcon
                                            sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'space-between', }}>
                                            <AiFillHome style={{ marginLeft: open ? 0 : 40 }} className='nav-icon' />
                                            <ListItemText sx={{ opacity: open ? 1 : 0, marginLeft: open ? 3 : 0 }}>Home</ListItemText>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        </NavLink>
                        <NavLink to='/cart'>
                            <Tooltip title="Cart">
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                        <ListItemIcon
                                            sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'space-between', }}>
                                            <Badge badgeContent={setProceed ? cart.length : 0} color="primary" sx={{ padding: 0.3 }}>
                                                <FaShoppingCart style={{ marginLeft: open ? -5 : 24 }} className='nav-icon' />
                                            </Badge>

                                            <ListItemText sx={{ opacity: open ? 1 : 0, marginLeft: open ? 2.8 : 0 }}>Cart</ListItemText>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        </NavLink>

                        {setProceed ? (

                            <Tooltip title="Logout">
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton onClick={handleClickOpen}
                                        sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                        <ListItemIcon
                                            sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'space-between', }}>
                                            <FiLogOut style={{ marginLeft: open ? 0 : 50 }} className='nav-icon' />
                                            <ListItemText sx={{ opacity: open ? 1 : 0, marginLeft: open ? 3 : 0 }}>Logout</ListItemText>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        ) : (
                            <Link to='/login'>
                                <Tooltip title="Login">
                                    <ListItem disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                            <ListItemIcon
                                                sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'space-between', }}>
                                                <CgProfile style={{ marginLeft: open ? 0 : 50 }} className='nav-icon' />
                                                <ListItemText sx={{ opacity: open ? 1 : 0, marginLeft: open ? 3 : 0 }}>Login</ListItemText>
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            </Link>
                        )
                        }
                    </List>
                </Drawer>
                <DrawerHeader />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                </Box>


                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h6'>  Do You Want To Logout?</Typography>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/"> <Button variant='contained' endIcon=<FiLogOut /> color='primary' onClick={handleLogOut}>Logout</Button></Link>
                        <Button variant='contained' color='error' endIcon=<AiFillCloseCircle /> onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box >
        </>
    );
}
export default SideBar