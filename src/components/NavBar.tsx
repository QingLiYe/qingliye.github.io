// src/components/NavBar.tsx
import * as React from 'react';
import { AppBar, Toolbar, Container, Button, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const items = [
  { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
];

export default function NavBar() {               // ★ 一定是 export default
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const linkProps = { color: 'inherit' as const, sx: { opacity: 0.9 } };

  return (
    <AppBar position="sticky" elevation={0}
      sx={{ bgcolor: 'rgba(13,13,23,0.6)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>yuriel</Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {items.map((it) => (
              <Button key={it.label} component="a" href={it.href} {...linkProps}>{it.label}</Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleOpen}><MenuIcon /></IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              {items.map((it) => (
                <MenuItem key={it.label} component="a" href={it.href} onClick={handleClose}>
                  {it.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
