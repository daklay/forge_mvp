import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Meet who matters now.
          </Typography>
          <Typography variant="h5" paragraph>
            A networking app for conferences, meetups, and professional events that helps attendees discover relevant people nearby.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            mt={4}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={RouterLink}
              to="/proximity"
            >
              Demo Features
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Key Features
        </Typography>

        <Grid container spacing={4} mt={2}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'primary.light',
                  position: 'relative'
                }}
              >
                <PeopleIcon sx={{ fontSize: 100, color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  User Profiles
                </Typography>
                <Typography>
                  Create your professional profile with job title, company, and expertise. Add tags for interests and customize your privacy settings.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="text" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Try Registration
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'secondary.light',
                  position: 'relative'
                }}
              >
                <PersonPinCircleIcon 
                  sx={{ fontSize: 100, color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Proximity Networking
                </Typography>
                <Typography>
                  Discover professionals with matching interests nearby. Receive notifications when relevant connections are within range.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/proximity" 
                  variant="text" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  See Demo
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'primary.dark',
                  position: 'relative'
                }}
              >
                <MapIcon 
                  sx={{ fontSize: 100, color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Live Interactive Map
                </Typography>
                <Typography>
                  View real-time attendee locations on a map. Filter by expertise and see clusters of professionals in different areas.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/map" 
                  variant="text" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Explore Map
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h3" color="primary">
                  1
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Create Your Profile
                </Typography>
                <Typography>
                  Register with your professional details and interests to help others find you.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h3" color="primary">
                  2
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Discover Nearby Professionals
                </Typography>
                <Typography>
                  Get notified when people with matching interests are nearby.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h3" color="primary">
                  3
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Connect and Network
                </Typography>
                <Typography>
                  Send virtual handshakes and start meaningful conversations.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to transform your networking experience?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 2 }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
