import { createTheme, ThemeOptions } from '@mui/material/styles';

// MD3-inspired Material Theme with Light and Dark mode support
// Notes:
// - MD3 uses dynamic color schemes and larger shapes; we approximate with a seed color and rounded corners.
// - Components overrides tune density, rounded corners, and tonal surfaces akin to MD3.


// MD3 Light Theme Colors
const lightThemeColors = {
  primary: { main: '#6750A4', contrastText: '#FFFFFF' },
  secondary: { main: '#625B71', contrastText: '#FFFFFF' },
  tertiary: { main: '#7D5260', contrastText: '#FFFFFF' },
  error: { main: '#B3261E', contrastText: '#FFFFFF' },
  success: { main: '#1E8E3E', contrastText: '#FFFFFF' },
  warning: { main: '#F9A825', contrastText: '#000000' },
  info: { main: '#4A4458', contrastText: '#FFFFFF' },
  background: {
    default: '#FFFBFE', // MD3 surface
    paper: '#F7F2FA',   // MD3 surface container
  },
  surface: {
    main: '#FFFBFE',
    variant: '#E7E0EC',
  },
  text: {
    primary: '#1D1B20',
    secondary: '#49454F',
  },
};

// MD3 Dark Theme Colors
const darkThemeColors = {
  primary: { main: '#D0BCFF', contrastText: '#381E72' },
  secondary: { main: '#CCC2DC', contrastText: '#332D41' },
  tertiary: { main: '#EFB8C8', contrastText: '#492532' },
  error: { main: '#F2B8B5', contrastText: '#601410' },
  success: { main: '#4CAF50', contrastText: '#003912' },
  warning: { main: '#FFB74D', contrastText: '#2E1500' },
  info: { main: '#C8C5CE', contrastText: '#322F37' },
  background: {
    default: '#141218', // MD3 surface
    paper: '#211F26',   // MD3 surface container
  },
  surface: {
    main: '#141218',
    variant: '#49454F',
  },
  text: {
    primary: '#E6E0E9',
    secondary: '#CAC4D0',
  },
};

const createMd3Theme = (mode: 'light' | 'dark') => {
  const colors = mode === 'light' ? lightThemeColors : darkThemeColors;

  const baseTheme: ThemeOptions = {
    palette: {
      mode,
      ...colors,
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
      h1: { fontWeight: 700, fontSize: '2.5rem' },
      h2: { fontWeight: 700, fontSize: '2rem' },
      h3: { fontWeight: 700, fontSize: '1.75rem' },
      h4: { fontWeight: 600, fontSize: '1.5rem' },
      h5: { fontWeight: 600, fontSize: '1.25rem' },
      h6: { fontWeight: 600, fontSize: '1.125rem' },
      button: { textTransform: 'none', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.43 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: mode === 'light'
              ? 'radial-gradient(circle at 10% 10%, rgba(103,80,164,0.06) 0, transparent 40%), radial-gradient(circle at 90% 20%, rgba(125,82,96,0.06) 0, transparent 40%)'
              : 'radial-gradient(circle at 10% 10%, rgba(208,188,255,0.1) 0, transparent 40%), radial-gradient(circle at 90% 20%, rgba(239,184,200,0.1) 0, transparent 40%)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            boxShadow: 'none',
            borderBottom: mode === 'light'
              ? '1px solid rgba(0,0,0,0.06)'
              : '1px solid rgba(255,255,255,0.12)',
            backgroundColor: mode === 'light' ? '#FEF7FF' : '#1D1B20',
            color: mode === 'light' ? '#1D192B' : '#E6E0E9',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: mode === 'light' ? '#F7F2FA' : '#211F26',
            transition: 'background-color 0.3s ease',
          },
        },
        defaultProps: {
          elevation: mode === 'light' ? 1 : 2,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20, // MD3 button shape
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '10px',
            paddingBottom: '10px',
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0px 2px 4px rgba(0,0,0,0.1)'
                : '0px 2px 4px rgba(0,0,0,0.3)',
            },
          },
          outlined: {
            borderWidth: '1px',
            '&:hover': {
              borderWidth: '1px',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: mode === 'light' ? '#F7F2FA' : '#211F26',
              transition: 'background-color 0.3s ease',
              '& fieldset': {
                borderColor: mode === 'light' ? '#CAC4D0' : '#49454F',
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#625B71' : '#CCC2DC',
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary.main,
              },
            },
          },
        },
        defaultProps: {
          fullWidth: true,
          size: 'medium',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: mode === 'light' ? '#F7F2FA' : '#211F26',
            transition: 'background-color 0.3s ease',
            boxShadow: mode === 'light'
              ? '0px 1px 3px rgba(0,0,0,0.08)'
              : '0px 1px 3px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'md',
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: mode === 'light'
                ? 'rgba(103,80,164,0.08)'
                : 'rgba(208,188,255,0.08)',
            },
          },
        },
      },
    },
  };

  return createTheme(baseTheme);
};

export const lightTheme = createMd3Theme('light');
export const darkTheme = createMd3Theme('dark');

// Default export for backwards compatibility
export default lightTheme;
