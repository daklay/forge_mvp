import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Alert,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import TerrainIcon from '@mui/icons-material/Terrain';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Mock data for professionals on the map
const mapProfessionals = [
  {
    id: 1,
    name: 'Alex Chen',
    expertise: 'Fintech Expert',
    position: [51.505, -0.09], // Example coordinates
    interests: ['Fintech', 'Blockchain', 'AI'],
    company: 'FinTech Innovations',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    expertise: 'UX Designer',
    position: [51.507, -0.087],
    interests: ['UX Design', 'Product Management', 'User Research'],
    company: 'Design Forward',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    expertise: 'ML Engineer',
    position: [51.503, -0.093],
    interests: ['Machine Learning', 'AI', 'Data Science'],
    company: 'AI Solutions',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 4,
    name: 'Emily Davis',
    expertise: 'Data Scientist',
    position: [51.506, -0.088],
    interests: ['Data Science', 'AI', 'Statistics'],
    company: 'Data Insights',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: 5,
    name: 'David Lee',
    expertise: 'Blockchain Developer',
    position: [51.505, -0.089],
    interests: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'],
    company: 'Blockchain Solutions',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 6,
    name: 'Jennifer Kim',
    expertise: 'Product Manager',
    position: [51.508, -0.091],
    interests: ['Product Strategy', 'User Experience', 'Market Research'],
    company: 'ProductLab',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 7,
    name: 'Robert Taylor',
    expertise: 'Cybersecurity Specialist',
    position: [51.502, -0.086],
    interests: ['Network Security', 'Ethical Hacking', 'Blockchain Security'],
    company: 'SecureNet',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    expertise: 'AR/VR Developer',
    position: [51.509, -0.094],
    interests: ['Augmented Reality', 'Virtual Reality', '3D Modeling'],
    company: 'ImmerseTech',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: 9,
    name: 'Thomas Wilson',
    expertise: 'IoT Engineer',
    position: [51.501, -0.092],
    interests: ['Internet of Things', 'Embedded Systems', 'Smart Devices'],
    company: 'ConnectedWorld',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 10,
    name: 'Olivia Brown',
    expertise: 'Cloud Architect',
    position: [51.506, -0.085],
    interests: ['Cloud Computing', 'Serverless Architecture', 'DevOps'],
    company: 'CloudNative',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 11,
    name: 'Daniel Park',
    expertise: 'Startup Founder',
    position: [51.510, -0.089],
    interests: ['Entrepreneurship', 'Venture Capital', 'Tech Startups'],
    company: 'NexGen Ventures',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80',
  },
  {
    id: 12,
    name: 'Emma Rodriguez',
    expertise: 'Mobile App Developer',
    position: [51.500, -0.091],
    interests: ['iOS Development', 'Android Development', 'Cross-platform Apps'],
    company: 'AppWorks',
    photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80',
  },
  {
    id: 13,
    name: 'James Thompson',
    expertise: 'Venture Capitalist',
    position: [51.507, -0.083],
    interests: ['Investment', 'Startups', 'Technology Trends'],
    company: 'Horizon Capital',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 14,
    name: 'Aisha Patel',
    expertise: 'Quantum Computing Researcher',
    position: [51.503, -0.097],
    interests: ['Quantum Computing', 'Physics', 'Advanced Algorithms'],
    company: 'Quantum Labs',
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 15,
    name: 'Ryan Garcia',
    expertise: 'Robotics Engineer',
    position: [51.501, -0.095],
    interests: ['Robotics', 'Automation', 'Mechanical Engineering'],
    company: 'Automation Systems',
    photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    id: 16,
    name: 'Natalie Wong',
    expertise: 'Digital Marketing Strategist',
    position: [51.505, -0.082],
    interests: ['Digital Marketing', 'Social Media', 'Growth Hacking'],
    company: 'GrowthX',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  },
  {
    id: 17,
    name: 'Carlos Mendez',
    expertise: 'Blockchain Developer',
    position: [51.508, -0.096],
    interests: ['Blockchain', 'Cryptocurrencies', 'Smart Contracts'],
    company: 'ChainTech',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
];

// Mock data for indoor locations
const indoorLocations = [
  {
    id: 1,
    name: 'Main Hall',
    position: [51.505, -0.09],
    professionals: [
      { expertise: 'Data Scientists', count: 10 },
      { expertise: 'ML Engineers', count: 5 },
      { expertise: 'UX Designers', count: 3 },
    ],
  },
  {
    id: 2,
    name: 'Booth 3',
    position: [51.507, -0.087],
    professionals: [
      { expertise: 'Data Scientists', count: 5 },
      { expertise: 'Blockchain Developers', count: 2 },
    ],
  },
  {
    id: 3,
    name: 'Workshop Room',
    position: [51.503, -0.093],
    professionals: [
      { expertise: 'UX Designers', count: 8 },
      { expertise: 'Product Managers', count: 4 },
    ],
  },
  {
    id: 4,
    name: 'Innovation Lab',
    position: [51.508, -0.091],
    professionals: [
      { expertise: 'AR/VR Developers', count: 6 },
      { expertise: 'IoT Engineers', count: 7 },
    ],
  },
  {
    id: 5,
    name: 'Networking Lounge',
    position: [51.502, -0.086],
    professionals: [
      { expertise: 'Startup Founders', count: 12 },
      { expertise: 'Venture Capitalists', count: 5 },
      { expertise: 'Angel Investors', count: 3 },
    ],
  },
  {
    id: 6,
    name: 'Tech Talks Stage',
    position: [51.506, -0.085],
    professionals: [
      { expertise: 'Cloud Architects', count: 8 },
      { expertise: 'Cybersecurity Specialists', count: 6 },
      { expertise: 'AI Researchers', count: 9 },
    ],
  },
];

// Custom marker icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to set the map view
const SetMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
  return null;
};

const MapView = () => {
  const [mapMode, setMapMode] = useState('outdoor');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center (London)
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Filter professionals based on expertise
  const filteredProfessionals = mapProfessionals.filter(
    (professional) => expertiseFilter === 'all' || professional.expertise.includes(expertiseFilter)
  );

  const handleMapModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMapMode(newMode);
      setSelectedLocation(null);
    }
  };

  const handleExpertiseFilterChange = (event) => {
    setExpertiseFilter(event.target.value);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter(location.position);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Live Interactive Map
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover attendees and points of interest on the interactive map
      </Typography>

      {/* Map Controls */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <ToggleButtonGroup
              value={mapMode}
              exclusive
              onChange={handleMapModeChange}
              aria-label="map mode"
              fullWidth
            >
              <ToggleButton value="outdoor" aria-label="outdoor mode">
                <TerrainIcon sx={{ mr: 1 }} />
                Outdoor
              </ToggleButton>
              <ToggleButton value="indoor" aria-label="indoor mode">
                <ApartmentIcon sx={{ mr: 1 }} />
                Indoor
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel id="expertise-filter-label">
                <FilterListIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                Filter by Expertise
              </InputLabel>
              <Select
                labelId="expertise-filter-label"
                id="expertise-filter"
                value={expertiseFilter}
                label="Filter by Expertise"
                onChange={handleExpertiseFilterChange}
              >
                <MenuItem value="all">All Expertise</MenuItem>
                <MenuItem value="Data">Data Scientists</MenuItem>
                <MenuItem value="ML">ML Engineers</MenuItem>
                <MenuItem value="UX">UX Designers</MenuItem>
                <MenuItem value="Blockchain">Blockchain Developers</MenuItem>
                <MenuItem value="Fintech">Fintech Experts</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Map and Sidebar */}
      <Grid container spacing={3}>
        {/* Map */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 1, height: '100%' }}>
            <MapContainer center={mapCenter} zoom={16} style={{ height: '500px', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <SetMapView center={mapCenter} />

              {mapMode === 'outdoor' && filteredProfessionals.map((professional) => (
                <Marker 
                  key={professional.id} 
                  position={professional.position}
                  icon={createCustomIcon('#3f51b5')}
                >
                  <Popup>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={professional.photo} 
                        alt={professional.name} 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          mr: 2, 
                          border: '2px solid #3f51b5',
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                          }
                        }} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhoto(professional.photo);
                          setOpenPhotoDialog(true);
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{professional.name}</Typography>
                        <Typography variant="body2">{professional.expertise}</Typography>
                        <Typography variant="body2">{professional.company}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                      size="small" 
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      Connect
                    </Button>
                  </Popup>
                </Marker>
              ))}

              {mapMode === 'indoor' && indoorLocations.map((location) => (
                <Marker 
                  key={location.id} 
                  position={location.position}
                  icon={createCustomIcon('#f50057')}
                  eventHandlers={{
                    click: () => {
                      handleLocationClick(location);
                    },
                  }}
                >
                  <Popup>
                    <Typography variant="subtitle1">{location.name}</Typography>
                    <Typography variant="body2">
                      {location.professionals.reduce((total, p) => total + p.count, 0)} professionals here
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1 }}
                      fullWidth
                      onClick={() => handleLocationClick(location)}
                    >
                      View Details
                    </Button>
                  </Popup>
                </Marker>
              ))}

              {/* User's location */}
              <Marker 
                position={[51.505, -0.09]} 
                icon={createCustomIcon('#4caf50')}
              >
                <Popup>
                  <Typography variant="subtitle1">You are here</Typography>
                </Popup>
              </Marker>

              {/* Range circle around user */}
              <Circle 
                center={[51.505, -0.09]} 
                radius={200} 
                pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue', weight: 1 }}
              />
            </MapContainer>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            {mapMode === 'outdoor' ? (
              <>
                <Typography variant="h6" gutterBottom>
                  <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Nearby Professionals
                </Typography>
                
                {filteredProfessionals.length === 0 ? (
                  <Alert severity="info">
                    No professionals matching your filter criteria.
                  </Alert>
                ) : (
                  <List>
                    {filteredProfessionals.map((professional) => (
                      <React.Fragment key={professional.id}>
                        <ListItem 
                          button
                          onClick={() => setMapCenter(professional.position)}
                        >
                          <ListItemAvatar>
                            <Avatar 
                              src={professional.photo}
                              alt={professional.name}
                              sx={{ 
                                width: 40, 
                                height: 40,
                                border: '1px solid #3f51b5',
                                cursor: 'pointer',
                                '&:hover': {
                                  boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhoto(professional.photo);
                                setOpenPhotoDialog(true);
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={professional.name}
                            secondary={
                              <>
                                {professional.expertise}
                                <br />
                                {professional.company}
                              </>
                            }
                          />
                          <Tooltip title="Show on map">
                            <LocationOnIcon color="primary" />
                          </Tooltip>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                )}
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Map Legend
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: '#4caf50',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">Your Location</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: '#3f51b5',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">Professionals</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            border: '1px solid blue',
                            bgcolor: 'rgba(0, 0, 255, 0.1)',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">30m Range</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  <MapIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Indoor Locations
                </Typography>
                
                {selectedLocation ? (
                  <Box>
                    <Button 
                      variant="text" 
                      color="primary" 
                      onClick={() => setSelectedLocation(null)}
                      sx={{ mb: 2 }}
                    >
                      ← Back to all locations
                    </Button>
                    
                    <Typography variant="h6">{selectedLocation.name}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <LocationOnIcon sx={{ verticalAlign: 'middle', fontSize: 16, mr: 0.5 }} />
                      {selectedLocation.position.join(', ')}
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Professionals in this area:
                    </Typography>
                    <List dense>
                      {selectedLocation.professionals.map((prof, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Badge badgeContent={prof.count} color="primary">
                              <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                                <PersonIcon fontSize="small" />
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText
                            primary={prof.expertise}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Navigate to this Location
                    </Button>
                  </Box>
                ) : (
                  <List>
                    {indoorLocations.map((location) => (
                      <React.Fragment key={location.id}>
                        <ListItem 
                          button
                          onClick={() => handleLocationClick(location)}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                              <LocationOnIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={location.name}
                            secondary={
                              <>
                                {location.professionals.reduce((total, p) => total + p.count, 0)} professionals
                              </>
                            }
                          />
                          <Tooltip title="View details">
                            <MapIcon color="primary" />
                          </Tooltip>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                )}
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Map Legend
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: '#4caf50',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">Your Location</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: '#f50057',
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2">Venue Zones</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* How It Works */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          How the Live Map Works
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Outdoor Mode
            </Typography>
            <Typography variant="body2" paragraph>
              • Uses GPS to show real-time attendee locations on a map
            </Typography>
            <Typography variant="body2" paragraph>
              • Filter professionals by expertise to find relevant connections
            </Typography>
            <Typography variant="body2" paragraph>
              • Click on markers to view profiles and connect with attendees
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Indoor Mode
            </Typography>
            <Typography variant="body2" paragraph>
              • Uses Wi-Fi fingerprinting for indoor positioning
            </Typography>
            <Typography variant="body2" paragraph>
              • Shows clusters of professionals in different areas of the venue
            </Typography>
            <Typography variant="body2" paragraph>
              • Navigate to specific zones to find professionals with matching interests
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Photo dialog for enlarged view */}
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
    </Container>
  );
};

export default MapView;
