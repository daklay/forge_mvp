import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock user data
const userData = {
  name: 'Ali Essaghir',
  jobTitle: 'AI Engineer',
  company: 'TechInnovate',
  expertise: 'Machine learning algorithms and neural networks with focus on computer vision applications',
  interests: ['AI', 'Machine Learning', 'Computer Vision', 'Neural Networks', 'Data Science'],
  connections: 24,
  events: 5,
  photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // URL to the user's photo
};

const Profile = () => {
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  
  // Photo dialog for enlarged view
  const renderPhotoDialog = () => {
    return (
      <Dialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>
          {userData.name}'s Profile Photo
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
              src={userData.photo} 
              alt={userData.name} 
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '4px' }} 
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                  }
                }}
                alt={userData.name}
                src={userData.photo}
                onClick={() => setOpenPhotoDialog(true)}
              />
              <Typography variant="h5" component="h1" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {userData.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.company}
              </Typography>
              
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
              
              <Divider sx={{ width: '100%', my: 3 }} />
              
              <Box sx={{ width: '100%' }}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Job Title" 
                      secondary={userData.jobTitle} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Company" 
                      secondary={userData.company} 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Divider sx={{ width: '100%', my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userData.connections}</Typography>
                  <Typography variant="body2" color="text.secondary">Connections</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userData.events}</Typography>
                  <Typography variant="body2" color="text.secondary">Events</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ width: '100%', my: 3 }} />
              
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<LinkedInIcon />}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<GitHubIcon />}
                >
                  GitHub
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Expertise */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Expertise
            </Typography>
            <Typography variant="body1" paragraph>
              {userData.expertise}
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Interests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {userData.interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
          
          {/* Privacy Settings */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Privacy Settings
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <VisibilityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Profile Visibility
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch defaultChecked color="primary" />}
                      label="Show my name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label="Show only expertise"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label="Go anonymous"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Location Sharing
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label="Share continuously"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch defaultChecked color="primary" />}
                      label="Only when app is open"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label="Never share location"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
          
          {/* Recent Activity */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Connected with Sarah Williams (UX Designer)"
                  secondary="Yesterday at TechConf 2025"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Attended AI Summit"
                  secondary="April 15, 2025"
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Connected with James Chen (Data Scientist)"
                  secondary="April 15, 2025 at AI Summit"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      {renderPhotoDialog()}
    </Container>
  );
};

export default Profile;
