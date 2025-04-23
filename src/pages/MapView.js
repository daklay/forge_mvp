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
  },
  {
    id: 2,
    name: 'Sarah Williams',
    expertise: 'UX Designer',
    position: [51.507, -0.087],
    interests: ['UX Design', 'Product Management', 'User Research'],
    company: 'Design Forward',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    expertise: 'ML Engineer',
    position: [51.503, -0.093],
    interests: ['Machine Learning', 'AI', 'Data Science'],
    company: 'AI Solutions',
  },
  {
    id: 4,
    name: 'Emily Davis',
    expertise: 'Data Scientist',
    position: [51.506, -0.095],
    interests: ['Data Science', 'AI', 'Statistics'],
    company: 'Data Insights',
  },
  {
    id: 5,
    name: 'David Lee',
    expertise: 'Blockchain Developer',
    position: [51.504, -0.088],
    interests: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'],
    company: 'Blockchain Solutions',
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
                    <Typography variant="subtitle1">{professional.name}</Typography>
                    <Typography variant="body2">{professional.expertise}</Typography>
                    <Typography variant="body2">{professional.company}</Typography>
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
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <PersonIcon />
                            </Avatar>
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
    </Container>
  );
};

export default MapView;
