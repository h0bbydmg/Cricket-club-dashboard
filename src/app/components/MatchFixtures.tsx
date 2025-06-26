'use client';
import { Box, Typography, Card, CardContent, Chip, Avatar, Button, Divider } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

interface Match {
  date: string;
  time: string;
  ground: string;
  players: string[];
  unPlayers: string[];
}

interface Ground {
  id: number;
  name: string;
  location: string;
  capacity: string;
  surfaceType: string;
  openDays: string;
  timeOpen: string;
  contact: string;
}

const matches: Match[] = [
  { date: 'June 16, 2025', time: '7:00 AM', ground: 'Turfzone Arena', players: ['Rahul', 'Amit', 'Vikram', 'Raj'], unPlayers: ['Suresh'] },
  { date: 'June 23, 2025', time: '6:30 AM', ground: 'Spartan Sports Club', players: ['Suresh', 'Amit'], unPlayers: ['Rahul', 'Vikram'] }
];

const groundDetails: Record<string, Ground> = {
  'Turfzone Arena': {
    id: 1,
    name: 'Turfzone Arena',
    location: 'HSR Layout, Bangalore',
    capacity: '22 players',
    surfaceType: 'Grass',
    openDays: 'Mon - Sun',
    timeOpen: '7:00 AM – 10:00 PM',
    contact: '123456789'
  },
  'Spartan Sports Club': {
    id: 2,
    name: 'Spartan Sports Club',
    location: 'Whitefield, Bangalore',
    capacity: '20 players',
    surfaceType: 'Artificial Turf',
    openDays: 'Weekdays only',
    timeOpen: '6:00 AM – 9:00 PM',
    contact: '987654321'
  }
};

export default function MatchFixturesPage() {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(null);

  const goBack = () => setSelectedMatchIndex(null);

  if (selectedMatchIndex !== null) {
    const match = matches[selectedMatchIndex];
    const ground = groundDetails[match.ground];

    return (
      <Box p={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 1 }}>
          Back to Fixtures
        </Button>
        <Card sx={{ borderRadius: 4, maxWidth: 700, mx: 'auto' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={0}>
              <SportsCricketIcon color="primary" fontSize="large" />
              <Typography variant="h5" fontWeight={600}>Match Details</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1.2} mb={2}>
              <Box display="flex" alignItems="center" gap={1.2}><EventIcon fontSize="small" /><Typography>{match.date}</Typography></Box>
              <Box display="flex" alignItems="center" gap={1.2}><ScheduleIcon fontSize="small" /><Typography>{match.time}</Typography></Box>
              <Box display="flex" alignItems="center" gap={1.2}><PlaceIcon fontSize="small" /><Typography>{match.ground}</Typography></Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>Ground Information</Typography>
            <Typography variant="body2"><strong>Location:</strong> {ground.location}</Typography>
            <Typography variant="body2"><strong>Capacity:</strong> {ground.capacity}</Typography>
            <Typography variant="body2"><strong>Surface:</strong> {ground.surfaceType}</Typography>
            <Typography variant="body2"><strong>Open:</strong> {ground.openDays}, {ground.timeOpen}</Typography>
            <Typography variant="body2" gutterBottom><strong>Contact:</strong> {ground.contact}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Available Players
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
              {match.players.map(player => (
                <Box key={player} display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: 'success.light' }}>{player.charAt(0)}</Avatar>
                  <Typography variant="caption">{player}</Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Unavailable Players
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {match.unPlayers.map(player => (
                <Box key={player} display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: 'error.light' }}>{player.charAt(0)}</Avatar>
                  <Typography variant="caption">{player}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        Upcoming Matches
      </Typography>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        {matches.map((match, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: '100%', md: '50%' },
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 6 }
            }}
            onClick={() => setSelectedMatchIndex(index)}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <SportsCricketIcon color="primary" fontSize="large" />
                <Typography variant="h6" fontWeight={600}>Match Fixture</Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}><EventIcon fontSize="small" /><Typography>{match.date}</Typography></Box>
                <Box display="flex" alignItems="center" gap={1}><ScheduleIcon fontSize="small" /><Typography>{match.time}</Typography></Box>
                <Box display="flex" alignItems="center" gap={1}><PlaceIcon fontSize="small" /><Typography>{match.ground}</Typography></Box>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Chip icon={<CheckCircleOutlineIcon />} label={`Available: ${match.players.length}`} color="success" size="small" />
                  <Chip icon={<HighlightOffIcon />} label={`Unavailable: ${match.unPlayers.length}`} color="error" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}