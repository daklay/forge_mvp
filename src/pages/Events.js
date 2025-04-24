import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  CircularProgress,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'TechConf 2025',
    date: 'May 15-17, 2025',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'The premier tech conference for developers, entrepreneurs, and tech enthusiasts. Join us for three days of inspiring talks, workshops, and networking opportunities.',
    price: null,
    attendees: 1200,
    categories: ['Technology', 'Networking', 'Innovation'],
    featured: true,
  },
  {
    id: 2,
    title: 'AI Summit',
    date: 'June 5-6, 2025',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Explore the latest advancements in artificial intelligence and machine learning. Connect with AI researchers, practitioners, and industry leaders.',
    price: null,
    attendees: 800,
    categories: ['AI', 'Machine Learning', 'Data Science'],
    featured: true,
  },
  {
    id: 3,
    title: 'Startup Mixer',
    date: 'May 25, 2025',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'A networking event for startup founders, investors, and enthusiasts. Pitch your ideas, find co-founders, or secure funding for your venture.',
    price: null,
    attendees: 300,
    categories: ['Startup', 'Entrepreneurship', 'Networking'],
    featured: false,
  },
  {
    id: 4,
    title: 'UX Design Conference',
    date: 'July 10-12, 2025',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    description: 'Immerse yourself in the world of user experience design. Learn from industry experts, participate in workshops, and expand your design toolkit.',
    price: null,
    attendees: 500,
    categories: ['Design', 'UX', 'Product'],
    featured: false,
  },
  {
    id: 5,
    title: 'Blockchain Summit',
    date: 'August 3-4, 2025',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Dive into the world of blockchain technology, cryptocurrencies, and decentralized applications. Network with blockchain enthusiasts and industry pioneers.',
    price: null,
    attendees: 600,
    categories: ['Blockchain', 'Cryptocurrency', 'Web3'],
    featured: false,
  },
  {
    id: 6,
    title: 'Women in Tech Meetup',
    date: 'May 30, 2025',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    description: 'A supportive community event for women in technology. Share experiences, find mentors, and build meaningful professional relationships.',
    price: null,
    attendees: 250,
    categories: ['Diversity', 'Networking', 'Career'],
    featured: false,
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents);

  const steps = ['Event Details', 'What are you looking for?', 'Payment'];

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
    setActiveStep(0);
    setPaymentComplete(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setPaymentComplete(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredEvents(upcomingEvents);
    } else {
      const filtered = upcomingEvents.filter(
        (event) => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.categories.some(category => category.toLowerCase().includes(query))
      );
      setFilteredEvents(filtered);
    }
  };

  const handlePayment = () => {
    setProcessingPayment(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentComplete(true);
    }, 2000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            {selectedEvent && (
              <>
                <Box sx={{ mb: 2 }}>
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    style={{ width: '100%', borderRadius: 8, maxHeight: 300, objectFit: 'cover' }} 
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {selectedEvent.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EventIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {selectedEvent.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {selectedEvent.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {selectedEvent.attendees} expected attendees
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {selectedEvent.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {selectedEvent.categories.map((category) => (
                    <Chip key={category} label={category} color="primary" variant="outlined" />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1">
                    Platform Fee:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    $1
                  </Typography>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Our app charges a one-time platform fee to connect you with relevant professionals at this event.
                </Alert>
              </>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What are you looking for?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="I'm looking for..."
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="E.g., Potential collaborators, job opportunities, mentorship, investment partners, etc."
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  This information helps us connect you with the right people at the event.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      // case 2:
      //   return (
      //     <Box>
      //       <Typography variant="h6" gutterBottom>
      //         Attendee Information
      //       </Typography>
      //       <Grid container spacing={2}>
      //         <Grid item xs={12} sm={6}>
      //           <TextField
      //             required
      //             label="First Name"
      //             fullWidth
      //             variant="outlined"
      //           />
      //         </Grid>
      //         <Grid item xs={12} sm={6}>
      //           <TextField
      //             required
      //             label="Last Name"
      //             fullWidth
      //             variant="outlined"
      //           />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <TextField
      //             required
      //             label="Email"
      //             fullWidth
      //             variant="outlined"
      //             type="email"
      //           />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <TextField
      //             label="Company"
      //             fullWidth
      //             variant="outlined"
      //           />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <TextField
      //             label="Job Title"
      //             fullWidth
      //             variant="outlined"
      //           />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <FormControlLabel
      //             control={<Checkbox color="primary" />}
      //             label="I agree to share my profile information with other attendees"
      //           />
      //         </Grid>
      //       </Grid>
      //     </Box>
      //   );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            {paymentComplete ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Payment Successful!
                </Typography>
                <Typography variant="body1" paragraph>
                  You've successfully subscribed to our networking service for {selectedEvent.title}. A confirmation email has been sent to your inbox.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  You can now use all premium networking features at this event, including proximity alerts, professional matching, and enhanced profile visibility.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Event details will be available in your profile.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Method</FormLabel>
                    <RadioGroup defaultValue="credit-card">
                      <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
                      <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Card Number"
                    fullWidth
                    variant="outlined"
                    placeholder="1234 5678 9012 3456"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Expiration Date"
                    fullWidth
                    variant="outlined"
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="CVV"
                    fullWidth
                    variant="outlined"
                    placeholder="123"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Name on Card"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Billing Address"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Zip Code"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
                    <Typography variant="body1">
                      Platform Fee:
                    </Typography>
                    <Typography variant="h6" color="primary.dark">
                      $1
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This is a one-time platform fee for using our networking features at this event.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Upcoming Events
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover events and subscribe to our networking service to connect with relevant professionals
      </Typography>

      {/* Search and Filter */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder="Search events by title, location, or category..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FilterIcon />}
              fullWidth
            >
              Filter Options
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Events */}
      {filteredEvents.some(event => event.featured) && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Featured Events
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {filteredEvents
              .filter(event => event.featured)
              .map((event) => (
                <Grid item xs={12} md={6} key={event.id}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image}
                      alt={event.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EventIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {event.description.substring(0, 150)}...
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {event.categories.map((category) => (
                          <Chip key={category} label={category} size="small" />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.attendees} attendees
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="large" 
                        color="primary" 
                        fullWidth
                        variant="contained"
                        onClick={() => handleOpenDialog(event)}
                      >
                        Subscribe Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {/* All Events */}
      <Typography variant="h5" gutterBottom>
        All Events
      </Typography>
      {filteredEvents.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          No events found matching your search criteria. Try adjusting your search terms.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description.substring(0, 100)}...
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.attendees} attendees
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="medium" 
                    variant="contained"
                    color="primary" 
                    fullWidth
                    onClick={() => handleOpenDialog(event)}
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      fontWeight: 'medium'
                    }}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Registration Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Event Networking Subscription
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            &times;
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            {renderStepContent(activeStep)}
          </Box>
        </DialogContent>
        <DialogActions>
          {activeStep !== 0 && !paymentComplete && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            !paymentComplete && (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                disabled={processingPayment}
                startIcon={processingPayment && <CircularProgress size={20} color="inherit" />}
              >
                {processingPayment ? 'Processing...' : 'Complete Payment'}
              </Button>
            )
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {paymentComplete && (
            <Button variant="contained" color="primary" onClick={handleCloseDialog}>
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Events;
