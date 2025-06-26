'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, Typography, Divider, IconButton, Avatar, Popover, useMediaQuery, useTheme } from '@mui/material';
import {
  SportsCricket as FixturesIcon,
  Equalizer as StatsIcon,
  EventAvailable as AvailabilityIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

export default function Sidebar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    console.log('Logout clicked');
    handleClose();
  };

  const buttonStyles = {
    justifyContent: 'flex-start',
    fontSize: '1rem',
    py: 1.5,
    px: 3,
    borderRadius: 2,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08)',
    },
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        position: 'fixed',
        boxShadow: 3,
        p: 3,
        bgcolor: 'background.paper',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <Box sx={{ width: '100%', mb: 4, mt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', color: 'primary.main' }}>
          Red Bulls CC
        </Typography>
        <Divider sx={{ mt: 3, mb: 2 }} />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Link href="/match-fixtures" passHref>
          <Button
            fullWidth
            startIcon={<FixturesIcon />}
            sx={{
              ...buttonStyles,
              bgcolor: pathname === '/match-fixtures' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              color: pathname === '/match-fixtures' ? 'primary.main' : 'text.primary',
            }}
          >
            Match Fixtures
          </Button>
        </Link>
        <Link href="/player-stats" passHref>
          <Button
            fullWidth
            startIcon={<StatsIcon />}
            sx={{
              ...buttonStyles,
              bgcolor: pathname === '/player-stats' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              color: pathname === '/player-stats' ? 'primary.main' : 'text.primary',
            }}
          >
            My Stats
          </Button>
        </Link>
        <Link href="/availability" passHref>
          <Button
            fullWidth
            startIcon={<AvailabilityIcon />}
            sx={{
              ...buttonStyles,
              bgcolor: pathname === '/availability' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              color: pathname === '/availability' ? 'primary.main' : 'text.primary',
            }}
          >
            Availability
          </Button>
        </Link>
      </Box>

      <Box sx={{ width: '100%', mt: 'auto' }}>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" alignItems="center" gap={2} p={1.5} borderRadius={2} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>P</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>Player Name</Typography>
            <Typography variant="caption" color="text.secondary">Team Member</Typography>
          </Box>
          <IconButton size="small" onClick={handleMenu} sx={{ ml: 'auto' }}>
            <LogoutIcon />
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Button onClick={handleLogout} sx={{ color: 'error.main', p: 2 }}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </Button>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
}