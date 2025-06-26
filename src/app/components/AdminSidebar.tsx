'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, Typography, Divider } from '@mui/material';
import { SportsCricket as FixturesIcon } from '@mui/icons-material';

export default function AdminSidebar() {
  const pathname = usePathname();

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
          Admin Panel
        </Typography>
        <Divider sx={{ mt: 3, mb: 2 }} />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Link href="/admin" passHref>
          <Button
            fullWidth
            startIcon={<FixturesIcon />}
            sx={{
              ...buttonStyles,
              bgcolor: pathname === '/admin' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              color: pathname === '/admin' ? 'primary.main' : 'text.primary',
            }}
          >
            Manage Fixtures
          </Button>
        </Link>
      </Box>
    </Box>
  );
}