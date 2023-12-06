'use client'

import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { IoHome, IoMenu } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaBookOpen, FaStamp } from 'react-icons/fa';
import { BsFillGearFill, BsFillCalendarEventFill, BsYoutube, BsBuildingsFill, BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { AiFillPlayCircle, AiOutlineCloudDownload } from 'react-icons/ai';
import { ImBlogger } from 'react-icons/im';
import { GoGoal } from 'react-icons/go';
import { MdArticle } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';
import NotificationDialog from './NotificationDialog';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigationIconsSize = '1.1rem';

const navigationItems = [
    {
        text: 'Research Paper & Articles',
        icon: <MdArticle style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/research-papers'
    },
    {
        text: 'Research Grants',
        icon: <GiReceiveMoney style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/research-grants'
    },
    {
        text: 'Patents',
        icon: <FaStamp style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/patents'
    },
    {
        text: 'Simulation Tools',
        icon: <BsFillGearFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/simulation-tools'
    },
    {
        text: 'Cources and Tutorials',
        icon: <AiFillPlayCircle style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/courses-and-tutorials'
    },
    {
        text: 'Conferences and Webinar events',
        icon: <BsFillCalendarEventFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/conferences-and-webinar-events',
    },
    {
        text: 'YouTube Content',
        icon: <BsYoutube style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/youtube-content'
    },
    {
        text: 'Blogs',
        icon: <ImBlogger style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/blogs'
    },
    {
        text: 'Projects',
        icon: <GoGoal style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/projects'
    },
    {
        text: 'Software & Tools',
        icon: <AiOutlineCloudDownload style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/software-and-tools'
    },
    {
        text: 'Companies',
        icon: <BsBuildingsFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/companies'
    },
    {
        text: 'Books',
        icon: <FaBookOpen style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/books',
    },
    {
        text: 'Researchers',
        icon: <BsFillFileEarmarkPersonFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/researchers',
    }
].sort((a, b) => a.text.localeCompare(b.text));

const NavBar = () => {
    const pathname = usePathname();

    const { data: session } = useSession();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [openNotificationDialog, setOpenNotificationDialog] = useState(false);

    const [user, setUser] = useState({});

    const fetchUserDetails = async () => {
        const response = await fetch('/api/user');

        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
    }

    useEffect(() => {
        if (session)
            fetchUserDetails();
    }, [session]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigationMenu = () => {
        setAnchorElUser(null);
        setOpenNotificationDialog(true);
    };

    const userProfile = session ?
        <Box sx={{ flexGrow: '0', scale: '.8' }}>
            <Tooltip title={session.user.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Image" src={session.user.image} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {user && user.role === 'admin' &&
                    <MenuItem key='Notifications' onClick={handleNavigationMenu}>
                        <Typography textAlign="center">Notifications</Typography>
                    </MenuItem>
                }
                <MenuItem key='Logout' onClick={() => signOut()}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
            {user && user.role === 'admin' && <NotificationDialog open={openNotificationDialog} setOpen={setOpenNotificationDialog} />}
        </Box>
        :
        <Button variant='inherit' onClick={() => signIn()}>
            Login
        </Button>;

    return (
        <AppBar position={'sticky'} sx={{ background: 'rgba(251,251,253,0.65)', color: 'black', zIndex: '2', backdropFilter: 'saturate(180%) blur(20px)', borderRadius: '1rem' }} elevation={0}>
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setToggleDrawer(true)}>
                    <IoMenu />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: '1' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={'/gupta-lab-logo.png'} width={512} height={512} alt={'DNA Storage Resource Page'} style={{ width: '30px', height: '30px' }} />
                        <Typography variant='h6' marginLeft={1}>DNA Storage Resources Page</Typography>
                    </Link>
                </Typography>
                {session === undefined ? '' : userProfile}
            </Toolbar>
            <Drawer
                elevation={0}
                anchor={'left'}
                open={toggleDrawer}
                onClose={() => setToggleDrawer(false)}
                PaperProps={{
                    sx: {
                        background: 'transparent',

                    }
                }}

            >
                <Box sx={{
                    width: 300,
                    background: 'white',
                    // style one 
                    borderRadius: '1rem',
                    margin: '1rem',

                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },

                    // style two
                    // borderBottomRightRadius: '1rem',
                    // borderTopRightRadius: '1rem',
                    // margin: '1rem',
                    // marginLeft: '0',

                    background: '#E3EAF5',
                    height: '100%'
                }}
                    role="presentation">
                    <List>
                        <Divider sx={{ marginTop: '1rem' }} textAlign='left'>HOME</Divider>
                        <ListItem disablePadding>
                            <Link href={'/'} style={{ width: '100%' }}>
                                <ListItemButton sx={{
                                    borderRadius: '.5rem',
                                    padding: '.1rem',
                                    paddingLeft: '1rem',
                                    margin: '0.2rem 0.5rem',
                                    backgroundColor: pathname === '/' ? 'rgba(0,0,0,0.1)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                }} onClick={() => { setToggleDrawer(false) }} >
                                    <ListItemIcon sx={{ color: 'black', minWidth: '0', paddingRight: '1rem' }}>
                                        <IoHome />
                                    </ListItemIcon>
                                    <ListItemText sx={{ flexGrow: '1' }}>
                                        <Typography variant='button' fontSize={'.8rem'}>{'Dashboard'}</Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <Divider sx={{ marginTop: '1rem' }} textAlign='left'>CATEGORIES</Divider>
                        {navigationItems.map((item, idx) => (
                            <ListItem key={idx} disablePadding>
                                <Link href={item.href} style={{ width: '100%' }}>
                                    <ListItemButton sx={{
                                        borderRadius: '.5rem',
                                        padding: '.1rem',
                                        paddingLeft: '1rem',
                                        margin: '0.2rem 0.5rem',
                                        backgroundColor: pathname === item.href ? 'rgba(0,0,0,0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                    }} onClick={() => { setToggleDrawer(false) }} >
                                        <ListItemIcon sx={{ color: 'black', minWidth: '0', paddingRight: '1rem' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{ flexGrow: '1' }}>
                                            <Typography variant='button' fontSize={'.8rem'}>{item.text}</Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar >
    );
}

export default NavBar