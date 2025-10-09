// src/components/About.tsx
import { Box, Card, CardContent, Typography, Stack, Chip, Divider, Button } from '@mui/material';

export default function About() {
  const shots = ['/about/grades-1.png', '/about/grades-2.png']; // grade screenshots

  const cardSx = {
    bgcolor: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.06)',
    borderRadius: 3,
    boxShadow: '0 24px 80px rgba(2,6,23,.35)',
  } as const;

  return (
    <Box
      component="section"
      id="about"
      sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        ml: '-50vw',
        mr: '-50vw',
        py: { xs: 8, md: 12 },
        bgcolor: '#0b0f1a',
        scrollMarginTop: { xs: 72, md: 96 },
      }}
    >
      <Box sx={{ maxWidth: 1200, px: { xs: 2, md: 6 }, mx: 'auto', color: 'rgba(255,255,255,0.92)' }}>
        {/* Title */}
        <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 2 }}>
          About Me
          <Box component="span" sx={{ display: 'block', width: 110, height: 4, bgcolor: 'primary.main', borderRadius: 999, mx: 'auto', mt: 1.5 }} />
        </Typography>
        <Typography align="center" sx={{ opacity: 0.7, mb: 5 }}>
          A few quick signals about my studies, work, and life.
        </Typography>

        {/* ======= Layout: CSS Grid (7/5 at md+) ======= */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 2, md: 3 },
            alignItems: 'stretch',
          }}
        >
          {/* Left: Intro + two highlight stories */}
          <Box>
            <Card sx={{ ...cardSx, height: '100%', width: '100%' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Hi, I’m Yuriel</Typography>
                <Typography sx={{ opacity: 0.9, mb: 2 }}>
                  I’m pursuing a <b>Master of Information Science</b> (all <b>A</b> grades). I build full-stack & data-automation solutions:
                  React/Next, Node.js, Mapbox GL JS, and n8n. I received <b>two “Outstanding Employee”</b> awards during full-time work.
                  Since <b>Nov 2024</b>, I’ve been a long-term volunteer at the <b>SPCA Op Shop</b>.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="Highly responsible" size="small" />
                  <Chip label="Fast self-learner" size="small" />
                  <Chip label="Tennis · twice a week" size="small" />
                  <Chip label="Cat person" size="small" />
                  <Chip label="Quiet but delivery-focused" size="small" />
                </Stack>

                <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,.06)' }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                  Two stories that make me confident I can ship difficult things
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>① 2021 · Government portal (internal markup framework)</Typography>
                    <Typography sx={{ opacity: 0.85 }}>
                      No public docs; only an internal handbook. I mapped the data endpoints,
                      built a templating & publishing pipeline, iterated daily with experiments, and delivered on time with quality.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>② 2019 · Android + WeChat Mini-program</Typography>
                    <Typography sx={{ opacity: 0.85 }}>
                      3 months to self-learn, 6 months to ship. I followed the official manuals, shipped multiple mini-programs,
                      and enabled the company’s mobile capability.
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,.06)' }} />

                <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: '70ch' }}>
                  Tennis is my best “pressure valve.” Doubles require independent decisions and tight teamwork—just like engineering.
                  My favorite fruit is <strong>grapes</strong>: rinse and eat—simple and reusable, independent yet composable,
                  which is how I like my codebases.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Right: Education / Volunteering / Awards / Life */}
          <Box>
            <Stack spacing={2.5} sx={{ '& > .MuiCard-root': { width: '100%' } }}>
              {/* Education */}
              <Card sx={{ ...cardSx }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Education</Typography>
                  <Typography sx={{ opacity: 0.9 }}>
                    <b>Massey University</b>, Master of Information Science (2024.06 – 2025.11)
                  </Typography>
                  <Typography sx={{ opacity: 0.9 }}>Current results: <b>All A</b></Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                    {shots.map((s, i) => (
                      <Box
                        key={i}
                        component="a"
                        href={s}
                        target="_blank"
                        rel="noreferrer"
                        sx={{
                          width: 96,
                          height: 64,
                          borderRadius: 1.5,
                          overflow: 'hidden',
                          display: 'block',
                          border: '1px solid rgba(255,255,255,.08)',
                        }}
                      >
                        <Box component="img" src={s} alt={`Massey grade screenshot ${i + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Volunteering */}
              <Card sx={{ ...cardSx }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Volunteering</Typography>
                  <Typography sx={{ opacity: 0.9 }}>
                    <b>SPCA Op Shop</b> (Nov 2024 – Present) · Long-term volunteer
                  </Typography>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card sx={{ ...cardSx }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Awards</Typography>
                  <Typography sx={{ opacity: 0.9 }}>Received <b>two Outstanding Employee</b> awards in full-time roles</Typography>
                </CardContent>
              </Card>

              {/* Life */}
              <Card sx={{ ...cardSx }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Life</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    <Chip size="small" label="Tennis · twice a week" />
                    <Chip size="small" label="Favorite fruit: grapes" />
                    <Chip size="small" label="Cat lover" />
                    <Chip size="small" label="Prefer focused work over heavy socializing" />
                  </Stack>
                </CardContent>
              </Card>

              {/* CV Button */}
              <Button
                size="large"
                variant="outlined"
                color="inherit"
                href="/projects/Yuriel_Yu_Deng_CV.pdf"
                sx={{
                  borderRadius: 999,
                  borderColor: 'rgba(255,255,255,.2)',
                  ':hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                Download CV
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
