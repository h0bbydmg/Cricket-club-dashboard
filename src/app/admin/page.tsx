'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Stack, Paper, Grid } from '@mui/material';
import {
  SportsCricket as CricketIcon, 
  Event as DateIcon, 
  Schedule as TimeIcon,
  Place as LocationIcon, 
  Add as AddIcon, 
  Edit as EditIcon
} from '@mui/icons-material';
import AdminSidebar from '../components/AdminSidebar';

interface Match {
  _id?: string;
  date: string;
  time: string;
  ground: string;
}

export default function AdminPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newMatch, setNewMatch] = useState<Omit<Match, '_id'>>({ date: '', time: '', ground: '' });
  const [editedMatch, setEditedMatch] = useState<Match | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const res = await fetch('/admin/api/matches');
    const data = await res.json();
    setMatches(data);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setIsEditing(null);
    setNewMatch({ date: '', time: '', ground: '' });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewMatch({ date: '', time: '', ground: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMatch(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/admin/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMatch)
    });
    if (res.ok) {
      fetchMatches();
      setIsCreating(false);
      setNewMatch({ date: '', time: '', ground: '' });
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/admin/api/matches/${id}`, { method: 'DELETE' });
    fetchMatches();
  };

  const handleEditClick = (match: Match) => {
    setIsEditing(match._id!);
    setEditedMatch({ ...match });
    setIsCreating(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedMatch) {
      setEditedMatch(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleSaveEdit = async (id: string) => {
    await fetch(`/admin/api/matches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedMatch)
    });
    setIsEditing(null);
    setEditedMatch(null);
    fetchMatches();
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedMatch(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{
        flexGrow: 1,
        p: { xs: 2, md: 4 },
        ml: { md: '280px' },
        width: { xs: '100%', md: 'calc(100% - 280px)' }
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>Match Fixtures Management</Typography>
          {!isCreating && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                ml: 50
              }}
            >
              Create New Match
            </Button>
          )}
        </Box>

        {isCreating && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom mb={3}>Schedule New Match</Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth label="Date" name="date" value={newMatch.date}
                  onChange={handleInputChange} placeholder="e.g. June 30, 2025" required
                />
                <TextField
                  fullWidth label="Time" name="time" value={newMatch.time}
                  onChange={handleInputChange} placeholder="e.g. 7:00 AM" required
                />
                <TextField
                  fullWidth label="Ground Location" name="ground" value={newMatch.ground}
                  onChange={handleInputChange} placeholder="e.g. Turf zone Arena" required
                />
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="outlined" onClick={handleCancel} sx={{ borderRadius: 3, px: 3, py: 1 }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" sx={{ borderRadius: 3, px: 3, py: 1 }}>
                    Schedule Match
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        )}

        <Grid container spacing={3}>
          {matches.map((match) => (
            <Grid size={{ xs: 12, md: 6 }} key={match._id}>
              <Card sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <CricketIcon color="primary" fontSize="large" />
                    <Typography variant="h6" fontWeight={600}>Match</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
                    {isEditing === match._id ? (
                      <>
                        <TextField fullWidth label="Date" name="date" value={editedMatch?.date || ''} onChange={handleEditInputChange} margin="dense" />
                        <TextField fullWidth label="Time" name="time" value={editedMatch?.time || ''} onChange={handleEditInputChange} margin="dense" />
                        <TextField fullWidth label="Ground" name="ground" value={editedMatch?.ground || ''} onChange={handleEditInputChange} margin="dense" />
                      </>
                    ) : (
                      <>
                        <Box display="flex" alignItems="center" gap={1}>
                          <DateIcon fontSize="small" color="action" />
                          <Typography>{match.date}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TimeIcon fontSize="small" color="action" />
                          <Typography>{match.time}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography>{match.ground}</Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    {isEditing === match._id ? (
                      <>
                        <Button variant="contained" color="primary" onClick={() => handleSaveEdit(match._id!)} sx={{ borderRadius: 3, px: 3, py: 1 }}>
                          Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{ borderRadius: 3, px: 3, py: 1 }}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEditClick(match)} sx={{ borderRadius: 3, px: 3, py: 1 }}>
                          Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(match._id!)} sx={{ borderRadius: 3, px: 3, py: 1 }}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}