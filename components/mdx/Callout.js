import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const calloutStyles = {
  info: {
    icon: InfoIcon,
    bgcolor: 'rgba(96, 165, 250, 0.1)',
    borderColor: '#60a5fa',
    iconColor: '#60a5fa',
  },
  warning: {
    icon: WarningIcon,
    bgcolor: 'rgba(251, 191, 36, 0.1)',
    borderColor: '#fbbf24',
    iconColor: '#fbbf24',
  },
  error: {
    icon: ErrorIcon,
    bgcolor: 'rgba(248, 113, 113, 0.1)',
    borderColor: '#f87171',
    iconColor: '#f87171',
  },
  success: {
    icon: CheckCircleIcon,
    bgcolor: 'rgba(74, 222, 128, 0.1)',
    borderColor: '#4ade80',
    iconColor: '#4ade80',
  },
  tip: {
    icon: LightbulbIcon,
    bgcolor: 'rgba(167, 139, 250, 0.1)',
    borderColor: '#a78bfa',
    iconColor: '#a78bfa',
  },
};

export default function Callout({ type = 'info', title, children }) {
  const style = calloutStyles[type] || calloutStyles.info;
  const Icon = style.icon;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        my: 2,
        borderRadius: 2,
        bgcolor: style.bgcolor,
        borderLeft: 4,
        borderColor: style.borderColor,
      }}
    >
      <Icon sx={{ color: style.iconColor, fontSize: 24, flexShrink: 0, mt: 0.25 }} />
      <Box>
        {title && (
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 0.5, color: style.iconColor }}
          >
            {title}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.primary', '& p': { m: 0 } }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
