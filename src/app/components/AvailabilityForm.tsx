'use client'

import { Box, Typography, Button, Paper, useMediaQuery, useTheme } from '@mui/material'

export default function AvailabilityForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper elevation={0} sx={{ p: isMobile ? 2 : 4, borderRadius: 4 }}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        Mark Your Availability
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, fontSize: isMobile ? '1rem' : '1.1rem' }}>
        Are you available for the next match on <Typography component="span" color="primary" fontWeight="bold">Sunday, June 23</Typography>?
      </Typography>
      <Box display="flex" gap={3} flexDirection={isMobile ? 'column' : 'row'}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={isMobile}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: isMobile ? '1rem' : '1.1rem',
            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Yes, I'm In!
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth={isMobile}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: isMobile ? '1rem' : '1.1rem',
            borderWidth: 2,
            '&:hover': {
              transform: 'translateY(-2px)',
              borderWidth: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          No, I'm Out
        </Button>
      </Box>
    </Paper>
  );
}