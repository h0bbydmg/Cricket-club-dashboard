'use client'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import './globals.css'
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import { usePathname } from 'next/navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
          '@media (max-width: 768px)': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAdminRoute ? (
            <Box sx={{ display: 'flex' }}>
              {children}
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ 
                flexGrow: 1, 
                p: { xs: 2, md: 4 }, 
                ml: { md: '280px' },
                width: { xs: '100%', md: 'calc(100% - 280px)' }
              }}>
                {children}
              </Box>
              <MobileBottomNav />
            </Box>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}