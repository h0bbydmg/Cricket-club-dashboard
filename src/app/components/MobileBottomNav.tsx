'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BottomNavigation, BottomNavigationAction, Paper, Avatar, Popover, Typography, Box, Divider, Button, } from '@mui/material';
import {
  SportsCricket as FixturesIcon,
  Equalizer as StatsIcon,
  EventAvailable as AvailabilityIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    console.log('Logout clicked');
    handleClose();
  };

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'flex', md: 'none' } }}
        elevation={3}
      >
        <BottomNavigation value={pathname} showLabels sx={{ width: '100%' }}>
          <BottomNavigationAction
            label="Fixtures"
            value="/match-fixtures"
            icon={<FixturesIcon />}
            component={Link}
            href="/match-fixtures"
          />
          <BottomNavigationAction
            label="Stats"
            value="/player-stats"
            icon={<StatsIcon />}
            component={Link}
            href="/player-stats"
          />
          <BottomNavigationAction
            label="Availability"
            value="/availability"
            icon={<AvailabilityIcon />}
            component={Link}
            href="/availability"
          />
          <BottomNavigationAction
            label="Player"
            value="player"
            onClick={handleMenuClick}
            icon={
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'white' }}>
                P
              </Avatar>
            }
          />
        </BottomNavigation>
      </Paper>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 1300 }}
        slotProps={{
          paper: {
            sx: { borderRadius: 2, boxShadow: 3, p: 2, minWidth: 200 },
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>P</Avatar>
          <Box>
            <Typography variant="subtitle1">Player Name</Typography>
            <Typography variant="caption" color="text.secondary">Team Member</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Button
          fullWidth
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{ color: 'error.main', justifyContent: 'flex-start' }}
        >
          Logout
        </Button>
      </Popover>
    </>
  );
}