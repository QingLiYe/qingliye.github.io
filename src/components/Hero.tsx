// src/components/Hero.tsx
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';


export default function Hero() {
  return (
    <Box id="home" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* 背景光晕：需要在 index.css 里有 .hero-bg 样式 */}
      <Box className="hero-bg" />

      {/* 首屏：满宽 & 满视口高度(扣掉 AppBar) */}
      <Box
        component="section"
        sx={{
          minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* 外层满宽，内层设一个最大阅读宽度 */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{ px: { xs: 2, md: 6 }, width: '100%', maxWidth: '1440px', mx: 'auto' }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={{ xs: 6, md: 8 }}>
            {/* 左侧文案 */}
            <Box flex={1}>
              <Chip
                label="Welcome to my Website"
                color="secondary"
                variant="outlined"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  bgcolor: 'rgba(167,139,250,0.12)',
                  borderColor: 'rgba(167,139,250,0.35)',
                }}
              />

              <Typography
  variant="h2"
  sx={{ fontWeight: 800, lineHeight: 1.1, mb: 2, fontSize: { xs: 36, md: 54 } }}
>
  I’m{' '}
  <Box component="span" sx={{ color: 'primary.main' }}>Yuriel</Box>
  {' '}
  — Full-Stack & Data Automation Developer
</Typography>

<Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 600, mb: 2 }}>
  I build fast, auditable React/Next apps, Mapbox GL JS dashboards, and n8n workflows with Node.js APIs.
</Typography>

<Typography sx={{ color: 'text.secondary', maxWidth: 720, mb: 2 }}>
  7+ years across Android, web & geospatial. Contract-first APIs, performance tuning, request cancellation, and CI/CD basics.
</Typography>

<Typography sx={{ color: 'text.secondary', maxWidth: 720 }}>
  Web & Apps · Geo/Maps (Mapbox GL JS) · Document AI (OCR) & Automation (n8n) · Payments & Logistics (Stripe, NZ Post, Zappy)
</Typography>



              <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1.75, sm: 3 }}     // 约 14px 与 24px 的间距
  sx={{ mt: 4, alignItems: { xs: 'stretch', sm: 'center' } }}
>
  <Button variant="contained" size="large" href="#contact">
    LET’S DISCUSS
  </Button>

  <Button
    component="a"
    href="/projects/Yuriel_Yu_Deng_CV.pdf"
    download="Yu-Deng_CV_2025.pdf"
    variant="outlined"
    size="large"
  >
    DOWNLOAD CV
  </Button>
</Stack>

            </Box>

            {/* 右侧人物 + 玻璃卡片 */}
            <Box flex={1} sx={{ position: 'relative' }}>
              <Box
                component="img"
               src="/projects/my-photo.jpg"          // ← 来自 public
  alt="Portrait"
  loading="lazy"
  decoding="async"
               
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80';
                }}
                sx={{
                  width: '100%',
                  maxWidth: 480,
                  display: 'block',
                  ml: { md: 'auto' },
                  borderRadius: 6,
                  boxShadow:
                    '0 30px 70px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.06)',
                }}
              />

              {/* 7+ 年 */}
              <Box
                className="glass"
                sx={{
                  position: 'absolute',
                  bottom: 28,
                  left: { xs: 12, md: 40 },
                  p: 2.2,
                  boxShadow: '0 20px 50px rgba(0,0,0,.35)',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center' }}>
                  7+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, textAlign: 'center' }}>
                  Years of Experiences
                </Typography>
              </Box>

              {/* 500+ 项目 */}
              <Box
                className="glass"
                sx={{
                  position: 'absolute',
                  top: { xs: -18, md: 24 },
                  right: { xs: 8, md: -10 },
                  p: 2.2,
                    color: '#0f172a',                    // ← 深色字
    bgcolor: 'rgba(255,255,255,.92)', 
                  boxShadow: '0 20px 50px rgba(0,0,0,.35)',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center' }}>
                  5+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, textAlign: 'center' }}>
                  Total Projects
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
