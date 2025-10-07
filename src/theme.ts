import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6' },      // 紫
    secondary: { main: '#22d3ee' },    // 青
    background: { default: '#0b0b12', paper: 'rgba(255,255,255,0.04)' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Inter Variable", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    h1: { fontFamily: '"Space Grotesk", Inter, sans-serif', fontWeight: 800, letterSpacing: '-.02em' },
    h2: { fontFamily: '"Space Grotesk", Inter, sans-serif', fontWeight: 800, letterSpacing: '-.02em' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)',
          boxShadow: '0 10px 25px rgba(139,92,246,.35)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(13,13,23,.6)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,.08)',
        },
      },
    },
  },
});
