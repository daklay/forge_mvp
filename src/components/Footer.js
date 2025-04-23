import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Conference Connect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Networking made easy at professional events
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="/proximity" color="inherit">
                Proximity Networking
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="/map" color="inherit">
                Live Maps
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="/register" color="inherit">
                User Profiles
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="#" color="inherit">
                Our Team
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="#" color="inherit">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link href="#" color="inherit">
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Conference Connect. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
