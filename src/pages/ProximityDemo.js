import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  Snackbar,
  Switch,
  FormControlLabel,
  Tooltip,
  Slider,
  TextField,
  InputAdornment,
  Badge,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothSearchingIcon from '@mui/icons-material/BluetoothSearching';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock data for nearby professionals
const nearbyProfessionals = [
  {
    id: 1,
    name: 'Alex Chen',
    expertise: 'Fintech Expert',
    distance: '15m away',
    interests: ['Fintech', 'Blockchain', 'AI'],
    company: 'FinTech Innovations',
    matchScore: 85,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    expertise: 'UX Designer',
    distance: '22m away',
    interests: ['UX Design', 'Product Management', 'User Research'],
    company: 'Design Forward',
    matchScore: 78,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    expertise: 'ML Engineer',
    distance: '8m away',
    interests: ['Machine Learning', 'AI', 'Data Science'],
    company: 'AI Solutions',
    matchScore: 92,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 4,
    name: 'Jennifer Kim',
    expertise: 'Product Manager',
    distance: '12m away',
    interests: ['Product Strategy', 'User Experience', 'Market Research'],
    company: 'ProductLab',
    matchScore: 81,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 5,
    name: 'Robert Taylor',
    expertise: 'Cybersecurity Specialist',
    distance: '18m away',
    interests: ['Network Security', 'Ethical Hacking', 'Blockchain Security'],
    company: 'SecureNet',
    matchScore: 75,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 6,
    name: 'Sophia Martinez',
    expertise: 'AR/VR Developer',
    distance: '5m away',
    interests: ['Augmented Reality', 'Virtual Reality', '3D Modeling'],
    company: 'ImmerseTech',
    matchScore: 88,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: 7,
    name: 'Thomas Wilson',
    expertise: 'IoT Engineer',
    distance: '25m away',
    interests: ['Internet of Things', 'Embedded Systems', 'Smart Devices'],
    company: 'ConnectedWorld',
    matchScore: 72,
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 8,
    name: 'Olivia Brown',
    expertise: 'Cloud Architect',
    distance: '10m away',
    interests: ['Cloud Computing', 'Serverless Architecture', 'DevOps'],
    company: 'CloudNative',
    matchScore: 83,
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 9,
    name: 'Daniel Park',
    expertise: 'Startup Founder',
    distance: '3m away',
    interests: ['Entrepreneurship', 'Venture Capital', 'Tech Startups'],
    company: 'NexGen Ventures',
    matchScore: 90,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80',
  },
  {
    id: 10,
    name: 'Emma Rodriguez',
    expertise: 'Mobile App Developer',
    distance: '7m away',
    interests: ['iOS Development', 'Android Development', 'Cross-platform Apps'],
    company: 'AppWorks',
    matchScore: 86,
    photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80',
  },
  {
    id: 11,
    name: 'James Thompson',
    expertise: 'Venture Capitalist',
    distance: '14m away',
    interests: ['Investment', 'Startups', 'Technology Trends'],
    company: 'Horizon Capital',
    matchScore: 79,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 12,
    name: 'Aisha Patel',
    expertise: 'Quantum Computing Researcher',
    distance: '20m away',
    interests: ['Quantum Computing', 'Physics', 'Advanced Algorithms'],
    company: 'Quantum Labs',
    matchScore: 94,
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 13,
    name: 'Ryan Garcia',
    expertise: 'Robotics Engineer',
    distance: '9m away',
    interests: ['Robotics', 'Automation', 'Mechanical Engineering'],
    company: 'Automation Systems',
    matchScore: 82,
    photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 14,
    name: 'Natalie Wong',
    expertise: 'Digital Marketing Strategist',
    distance: '16m away',
    interests: ['Digital Marketing', 'Social Media', 'Growth Hacking'],
    company: 'GrowthX',
    matchScore: 77,
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  },
  {
    id: 15,
    name: 'Carlos Mendez',
    expertise: 'Blockchain Developer',
    distance: '11m away',
    interests: ['Blockchain', 'Cryptocurrencies', 'Smart Contracts'],
    company: 'Investor',
    matchScore: 89,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
];

// Mock data for venue beacons
const venueBeacons = [
  {
    id: 1,
    name: 'AI Stage',
    professionals: 15,
    expertise: 'ML Engineers',
    location: 'Main Hall - East',
  },
  {
    id: 2,
    name: 'Startup Zone',
    professionals: 23,
    expertise: 'Founders & VCs',
    location: 'Exhibition Area',
  },
  {
    id: 3,
    name: 'Design Corner',
    professionals: 8,
    expertise: 'UX/UI Designers',
    location: 'Workshop Room 2',
  },
];

const ProximityDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [beaconMode, setBeaconMode] = useState(false);
  const [discoveredProfessionals, setDiscoveredProfessionals] = useState([]);

  // Simulate BLE scanning
  useEffect(() => {
    let scanTimer;
    let notificationTimer;
    
    if (isScanning) {
      // Simulate discovering professionals over time
      scanTimer = setTimeout(() => {
        // Add first professional after 2 seconds
        setDiscoveredProfessionals([nearbyProfessionals[0]]);
        
        // Show notification
        setNotification({
          professional: nearbyProfessionals[0],
          message: `${nearbyProfessionals[0].name} (${nearbyProfessionals[0].expertise}) is nearby!`,
        });
        setShowNotification(true);
        
        // Add second professional after 5 seconds
        setTimeout(() => {
          setDiscoveredProfessionals(prev => [...prev, nearbyProfessionals[1]]);
          
          // Show notification
          setNotification({
            professional: nearbyProfessionals[1],
            message: `${nearbyProfessionals[1].name} (${nearbyProfessionals[1].expertise}) is nearby!`,
          });
          setShowNotification(true);
          
          // Add third professional after 8 seconds
          setTimeout(() => {
            setDiscoveredProfessionals(prev => [...prev, nearbyProfessionals[2]]);
            
            // Show notification
            setNotification({
              professional: nearbyProfessionals[2],
              message: `${nearbyProfessionals[2].name} (${nearbyProfessionals[2].expertise}) is nearby!`,
            });
            setShowNotification(true);
          }, 3000);
        }, 3000);
      }, 2000);
    } else {
      setDiscoveredProfessionals([]);
    }
    
    return () => {
      clearTimeout(scanTimer);
      clearTimeout(notificationTimer);
    };
  }, [isScanning]);

  const handleStartScanning = () => {
    setIsScanning(true);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
  };

  const handleOpenProfile = (professional) => {
    setSelectedProfessional(professional);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleNotificationClick = () => {
    if (notification && notification.professional) {
      handleOpenProfile(notification.professional);
      setShowNotification(false);
    }
  };

  const handleToggleMode = () => {
    setBeaconMode(!beaconMode);
    setIsScanning(false);
    setDiscoveredProfessionals([]);
  };

  // Photo dialog for enlarged view
  const renderPhotoDialog = () => {
    return (
      <Dialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>
          Profile Photo
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
              src={selectedPhoto} 
              alt="Profile" 
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '4px' }} 
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Proximity-Based Networking
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover relevant professionals nearby using Bluetooth Low Energy technology
      </Typography>

      {/* Mode Toggle */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              {beaconMode ? 'Venue Beacon Mode' : 'Device-to-Device Mode'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {beaconMode 
                ? 'Discover zones and professionals in specific areas of the venue' 
                : 'Discover other attendees directly when they are within range'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <FormControlLabel
              control={
                <Switch
                  checked={beaconMode}
                  onChange={handleToggleMode}
                  color="primary"
                />
              }
              label={beaconMode ? "Venue Beacon Mode" : "Device-to-Device Mode"}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Device-to-Device Mode */}
      {!beaconMode && (
        <>
          {/* Control Panel */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={7}>
                <Typography variant="h6" gutterBottom>
                  <BluetoothIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  BLE Scanning Status
                </Typography>
                <Typography variant="body2" paragraph>
                  {isScanning 
                    ? 'Actively scanning for professionals with matching interests nearby...' 
                    : 'Scanning is currently paused. Start scanning to discover nearby professionals.'}
                </Typography>
                {isScanning && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        mr: 1,
                        animation: 'pulse 2s infinite',
                      }}
                    />
                    <Typography variant="body2" color="success.main">
                      Broadcasting your profile to nearby devices
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                {!isScanning ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BluetoothSearchingIcon />}
                    onClick={handleStartScanning}
                    size="large"
                  >
                    Start Scanning
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleStopScanning}
                    size="large"
                  >
                    Stop Scanning
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* Discovered Professionals */}
          <Typography variant="h6" gutterBottom>
            Nearby Professionals
          </Typography>
          {discoveredProfessionals.length === 0 ? (
            <Alert severity="info" sx={{ mb: 4 }}>
              {isScanning 
                ? 'Scanning for nearby professionals... This may take a moment.' 
                : 'Start scanning to discover nearby professionals.'}
            </Alert>
          ) : (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {discoveredProfessionals.map((professional) => (
                <Grid item xs={12} sm={6} md={4} key={professional.id}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            mr: 2, 
                            width: 56, 
                            height: 56, 
                            border: '2px solid #3f51b5',
                            cursor: 'pointer',
                            '&:hover': {
                              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            }
                          }}
                          src={professional.photo}
                          alt={professional.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhoto(professional.photo);
                            setOpenPhotoDialog(true);
                          }}
                        />
                        <Box>
                          <Typography variant="h6" component="div">
                            {professional.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {professional.expertise}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          icon={<LocationOnIcon />} 
                          label={professional.distance} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={`${professional.matchScore}% Match`} 
                          size="small" 
                          color={professional.matchScore > 80 ? "success" : "primary"} 
                        />
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <b>Company:</b> {professional.company}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <b>Interests:</b>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {professional.interests.map((interest) => (
                          <Chip
                            key={interest}
                            label={interest}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleOpenProfile(professional)}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Venue Beacon Mode */}
      {beaconMode && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={7}>
                <Typography variant="h6" gutterBottom>
                  <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Venue Beacon Detection
                </Typography>
                <Typography variant="body2" paragraph>
                  {isScanning 
                    ? 'Scanning for venue beacons... You will be notified when entering a beacon zone.' 
                    : 'Start scanning to detect venue beacons and zones.'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                {!isScanning ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BluetoothSearchingIcon />}
                    onClick={handleStartScanning}
                    size="large"
                  >
                    Start Scanning
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleStopScanning}
                    size="large"
                  >
                    Stop Scanning
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Typography variant="h6" gutterBottom>
            Venue Zones
          </Typography>
          {!isScanning ? (
            <Alert severity="info" sx={{ mb: 4 }}>
              Start scanning to discover venue zones and beacons.
            </Alert>
          ) : (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {venueBeacons.map((beacon) => (
                <Grid item xs={12} sm={6} md={4} key={beacon.id}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      height: '100%',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {beacon.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {beacon.location}
                        </Typography>
                      </Box>
                      
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          <b>{beacon.professionals}</b> {beacon.expertise} are in this area
                        </Typography>
                      </Alert>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Explore Zone
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* How It Works */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          How Proximity Networking Works
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Device-to-Device Mode
            </Typography>
            <Typography variant="body2" paragraph>
              • Phones act as BLE "beacons" to broadcast user expertise
            </Typography>
            <Typography variant="body2" paragraph>
              • When two users with matching interests are within 10–30 meters, both get a notification
            </Typography>
            <Typography variant="body2" paragraph>
              • Users can ignore or send a "virtual handshake" to connect
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Venue Beacon Mode
            </Typography>
            <Typography variant="body2" paragraph>
              • Event organizers place physical BLE beacons in zones
            </Typography>
            <Typography variant="body2" paragraph>
              • When a user enters a beacon's range, the app triggers a notification
            </Typography>
            <Typography variant="body2" paragraph>
              • Users can see how many professionals with specific expertise are in each zone
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Professional Profile Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedProfessional && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    mr: 2, 
                    width: 56, 
                    height: 56, 
                    border: '2px solid #3f51b5',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    }
                  }}
                  src={selectedProfessional.photo}
                  alt={selectedProfessional.name}
                  onClick={() => {
                    setSelectedPhoto(selectedProfessional.photo);
                    setOpenPhotoDialog(true);
                  }}
                />
                <Box>
                  {selectedProfessional.name}
                  <Typography variant="body2" color="text.secondary">
                    {selectedProfessional.expertise}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Company</Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProfessional.company}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Interests</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {selectedProfessional.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Match Details</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: `${selectedProfessional.matchScore}%`,
                        height: 8,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      {selectedProfessional.matchScore}% Match
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Common Interests</Typography>
                  <Typography variant="body2" paragraph>
                    You both share interests in {selectedProfessional.interests.join(', ')}.
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                autoFocus
              >
                Send Handshake
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="info"
          sx={{ width: '100%' }}
          action={
            <>
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleNotificationClick}
              >
                VIEW
              </Button>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleCloseNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        >
          {notification?.message}
        </Alert>
      </Snackbar>
      {renderPhotoDialog()}
    </Container>
  );
};

export default ProximityDemo;
