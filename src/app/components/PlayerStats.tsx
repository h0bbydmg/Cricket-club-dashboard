'use client'
import { Box, Typography, Card, Grid, CircularProgress } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import {
  EmojiEvents as TrophyIcon,
  SportsCricket as MatchesIcon,
  DirectionsRun as RunsIcon,
  Star as HighestScoreIcon,
  LocalFireDepartment as WicketsIcon,
  TrendingUp as FormIcon,
} from '@mui/icons-material';

interface Stat {
  label: string;
  value: number | string;
  Icon: SvgIconComponent;
}

interface PlayerMatchPerformance {
  runs: number;
  maxScore: number;
}

const playerStats: Stat[] = [
  { label: 'Matches', value: 18, Icon: MatchesIcon },
  { label: 'Total Runs', value: 580, Icon: RunsIcon },
  { label: 'Highest Score', value: '91', Icon: HighestScoreIcon },
  { label: 'Wickets Taken', value: 14, Icon: WicketsIcon },
];

const playerRecentPerformances: PlayerMatchPerformance[] = [
  { runs: 45, maxScore: 100 },
  { runs: 78, maxScore: 100 },
  { runs: 21, maxScore: 100 },
  { runs: 91, maxScore: 100 },
  { runs: 55, maxScore: 100 },
];

const winRate = 72;

const StatCard = ({ stat }: { stat: Stat }) => (
  <Card sx={{ textAlign: 'center', p: 2, borderRadius: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
    <stat.Icon sx={{ fontSize: 40, color: 'primary.main' }} />
    <Typography variant="h4" fontWeight={700} mt={1}>{stat.value}</Typography>
    <Typography variant="body1" color="text.secondary">{stat.label}</Typography>
  </Card>
);

const RecentFormChart = () => {
  const chartHeight = 150;

  return (
    <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
        <FormIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>Recent Match Runs</Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="flex-end" height={`${chartHeight}px`}>
        {playerRecentPerformances.map((match, index) => {
          const barHeight = (match.runs / match.maxScore) * chartHeight;

          return (
            <Box key={index} display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="caption" fontWeight="bold">{match.runs}</Typography>
              <Box
                sx={{
                  width: 30,
                  height: `${barHeight}px`,
                  backgroundColor: 'primary.main',
                  borderRadius: 1,
                  transition: 'height 0.5s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">M{index + 1}</Typography>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

const WinRateCircularChart = () => (
  <Card sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h6" fontWeight={600} mb={2}>Season Win Rate</Typography>
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={winRate}
        size={120}
        thickness={4}
        sx={{ color: 'primary.main' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" component="div" color="text.primary" fontWeight="bold">
          {`${winRate}%`}
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default function PlayerStats() {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <TrophyIcon color="primary" sx={{ fontSize: '2.5rem' }} />
        <Typography variant="h4" fontWeight={700}>My Performance Dashboard</Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentFormChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <WinRateCircularChart />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {playerStats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}