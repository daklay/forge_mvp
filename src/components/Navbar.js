import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

// Mock user data with profile image
const currentUser = {
  name: 'Ali Essaghir',
  photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
};

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Events', path: '/events' },
  { title: 'Proximity Demo', path: '/proximity' },
  { title: 'Live Map', path: '/map' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  // Mock notifications
  const notifications = [
    { id: 1, message: 'Alex (Fintech Expert) is nearby!' },
    { id: 2, message: 'Welcome to the AI Stage! 15 ML Engineers are here.' },
    { id: 3, message: 'New connection request from Sarah (UX Designer)' },
  ];

  const renderPhotoDialog = () => {
    return (
      <Dialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>
          {currentUser.name}'s Profile Photo
          <IconButton
            aria-label="close"
            onClick={() => setOpenPhotoDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            &times;
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <img 
              src={currentUser.photo} 
              alt={currentUser.name} 
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '4px' }} 
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          {/* Mobile menu - only visible on small screens */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#295bbe', mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Logo for mobile - next to menu */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                textDecoration: 'none',
                alignItems: 'center',
              }}
            >
              <img src={logo} alt="Conference Connect Logo" style={{ height: '90px', marginTop: '-10px', marginBottom: '-10px' }} />
            </Box>
          </Box>
          
          {/* Logo for desktop */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexGrow: 0,
            }}
          >
            <img src={logo} alt="Conference Connect Logo" style={{ height: '70px', marginTop: '5px', marginBottom: '5px' }} />
          </Box>

          {/* Menu for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.title} 
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#295bbe', display: 'block', '&:hover': { color: '#1a3f80' } }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Notifications */}
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <Tooltip title="Open notifications">
              <IconButton 
                onClick={handleOpenNotificationsMenu} 
                sx={{ p: 0, color: '#295bbe', '&:hover': { color: '#1a3f80' } }}
                aria-label="notifications"
              >
                <Badge badgeContent={notifications.length} sx={{ '& .MuiBadge-badge': { backgroundColor: '#295bbe', color: 'white' } }} className="notification-badge">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-notifications"
              anchorEl={anchorElNotifications}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotifications)}
              onClose={handleCloseNotificationsMenu}
            >
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleCloseNotificationsMenu}>
                  <Typography textAlign="center">{notification.message}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View profile or click avatar to see full photo">
              <Box sx={{ display: 'flex' }}>
                <IconButton 
                  sx={{ p: 0 }}
                  onClick={(e) => {
                    // Stop propagation to prevent the menu from opening
                    e.stopPropagation();
                    setOpenPhotoDialog(true);
                  }}
                >
                  <Avatar 
                    src={currentUser.photo}
                    alt={currentUser.name}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      border: '2px solid #295bbe',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 0 10px rgba(41,91,190,0.3)',
                      }
                    }}
                  />
                </IconButton>
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ p: 0, ml: 1 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%',
                    bgcolor: '#295bbe',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}>
                    ▼
                  </Box>
                </IconButton>
              </Box>
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
              <MenuItem 
                onClick={handleCloseUserMenu}
                component={RouterLink}
                to="/profile"
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem 
                onClick={handleCloseUserMenu}
                component={RouterLink}
                to="/register"
              >
                <Typography textAlign="center">Register</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderPhotoDialog()}
    </>
  );
};

export default Navbar;
