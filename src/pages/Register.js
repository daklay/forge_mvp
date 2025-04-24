import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Switch,
  Chip,
  Stack,
  Autocomplete,
  Avatar,
  IconButton,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// Sample interest tags
const interestOptions = [
  'AI', 'Machine Learning', 'Blockchain', 'Fintech', 'UX Design',
  'Quantum Computing', 'Sustainability', 'Cybersecurity', 'Cloud Computing',
  'IoT', 'AR/VR', 'Mobile Development', 'Web3', 'Data Science', 'Robotics',
  'Startup', 'Venture Capital', 'Product Management', 'DevOps', 'Marketing'
];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Ali Essaghir',
    jobTitle: 'AI Engineer',
    company: 'Forge',
    expertise: 'AI',
    interests: ['AI', 'Machine Learning', 'Blockchain'],
    email: 'ali.essaghir@forge.com',
    password: '123456',
    confirmPassword: '123456',
  });

  const [privacySettings, setPrivacySettings] = useState({
    showName: true,
    showExpertiseOnly: false,
    anonymous: false,
    shareLocationContinuously: false,
    shareLocationWhenOpen: true,
    shareLocationNever: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    
    // Handle mutually exclusive options
    if (name === 'showName' && checked) {
      setPrivacySettings({
        ...privacySettings,
        showName: true,
        showExpertiseOnly: false,
        anonymous: false,
        [name]: checked,
      });
    } else if (name === 'showExpertiseOnly' && checked) {
      setPrivacySettings({
        ...privacySettings,
        showName: false,
        showExpertiseOnly: true,
        anonymous: false,
        [name]: checked,
      });
    } else if (name === 'anonymous' && checked) {
      setPrivacySettings({
        ...privacySettings,
        showName: false,
        showExpertiseOnly: false,
        anonymous: true,
        [name]: checked,
      });
    } else if (name === 'shareLocationContinuously' && checked) {
      setPrivacySettings({
        ...privacySettings,
        shareLocationContinuously: true,
        shareLocationWhenOpen: false,
        shareLocationNever: false,
      });
    } else if (name === 'shareLocationWhenOpen' && checked) {
      setPrivacySettings({
        ...privacySettings,
        shareLocationContinuously: false,
        shareLocationWhenOpen: true,
        shareLocationNever: false,
      });
    } else if (name === 'shareLocationNever' && checked) {
      setPrivacySettings({
        ...privacySettings,
        shareLocationContinuously: false,
        shareLocationWhenOpen: false,
        shareLocationNever: true,
      });
    } else {
      setPrivacySettings({
        ...privacySettings,
        [name]: checked,
      });
    }
  };

  const handleInterestsChange = (event, newValue) => {
    setFormData({
      ...formData,
      interests: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, privacySettings });
    // In a real app, you would send this data to your backend
    // For this demo, we'll just navigate to the profile page
    navigate('/profile');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Profile
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Set up your professional profile to connect with relevant attendees at events
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {/* Profile Photo */}
            <Grid item xs={12} display="flex" justifyContent="center">
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  alt="Profile Photo"
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g., AI Engineer, Startup Founder"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Describe your main professional expertise"
                multiline
                rows={2}
              />
            </Grid>

            {/* Interests */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="interests"
                options={interestOptions}
                value={formData.interests}
                onChange={handleInterestsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interests"
                    placeholder="Add your professional interests"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>

            {/* Social Media Integration */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Optional Integrations
                </Typography>
              </Divider>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  color="primary"
                >
                  Connect LinkedIn
                </Button>
                {/* <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  color="primary"
                >
                  Connect GitHub
                </Button> */}
              </Stack>
            </Grid>

            {/* Privacy Settings */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Privacy Settings
                </Typography>
              </Divider>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Profile Visibility
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.showName}
                        onChange={handlePrivacyChange}
                        name="showName"
                        color="primary"
                      />
                    }
                    label="Show my name"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.showExpertiseOnly}
                        onChange={handlePrivacyChange}
                        name="showExpertiseOnly"
                        color="primary"
                      />
                    }
                    label="Show only my expertise"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.anonymous}
                        onChange={handlePrivacyChange}
                        name="anonymous"
                        color="primary"
                      />
                    }
                    label="Go anonymous"
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Location Sharing
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.shareLocationContinuously}
                        onChange={handlePrivacyChange}
                        name="shareLocationContinuously"
                        color="primary"
                      />
                    }
                    label="Share continuously"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.shareLocationWhenOpen}
                        onChange={handlePrivacyChange}
                        name="shareLocationWhenOpen"
                        color="primary"
                      />
                    }
                    label="Only when app is open"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.shareLocationNever}
                        onChange={handlePrivacyChange}
                        name="shareLocationNever"
                        color="primary"
                      />
                    }
                    label="Never share location"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Create Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
