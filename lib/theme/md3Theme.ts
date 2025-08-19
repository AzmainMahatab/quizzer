import { createTheme } from '@mui/material/styles';

// MD3-inspired Material Theme (approximation with MUI v5)
// Notes:
// - MD3 uses dynamic color schemes and larger shapes; we approximate with a seed color and rounded corners.
// - Components overrides tune density, rounded corners, and tonal surfaces akin to MD3.

const seedColor = '#6750A4'; // MD3 primary (Material You purple)
const secondary = '#625B71';
const tertiary = '#7D5260';

const md3Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: seedColor },
    secondary: { main: secondary },
    error: { main: '#B3261E' },
    success: { main: '#1E8E3E' },
    warning: { main: '#F9DEDC' },
    info: { main: '#4A4458' },
    background: {
      default: '#FFFBFE', // MD3 surface
      paper: '#FFFBFE',
    },
  },
  shape: {
    borderRadius: 16, // MD3 rounded shape
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'system-ui',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            'radial-gradient(circle at 10% 10%, rgba(103,80,164,0.06) 0, transparent 40%), radial-gradient(circle at 90% 20%, rgba(125,82,96,0.06) 0, transparent 40%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: '#FEF7FF',
          color: '#1D192B',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
      defaultProps: {
        elevation: 1,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // pills (MD3 suggestion)
          paddingLeft: '20px',
          paddingRight: '20px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'medium',
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
  },
});

export default md3Theme;
