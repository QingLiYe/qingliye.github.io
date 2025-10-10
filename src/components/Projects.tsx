// src/components/Projects.tsx
// import { Box, Button, Card, Chip, Container, Link, Stack, Typography } from '@mui/material';
import { Box, Button, Card, Chip, Link, Stack, Typography } from '@mui/material';
import { keyframes } from '@mui/system';           // ✅ 新增
import { useEffect, useRef } from 'react'; 

/* ---------- 你原来的 Projects（示例） ---------- */
type Project = {
  title: string;
  desc: string;
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    title: 'Project Name',
    desc:
      'I created this personal project to showcase how to craft a clean, accessible UI and tell a clear story about the problem and solution.',
    image:
      'https://images.unsplash.com/photo-1583875762488-9069d8d8e8d1?q=80&w=1400&auto=format&fit=crop',
    href: '#',
  }
];

/** ---- 你的项目视频清单（放 public/demos/ 下） ---- */
type ProjectVideo = { title: string; src: string; poster?: string; href?: string };

const projectVideos: ProjectVideo[] = [
  {
    title: 'EquityAI — Congestion',
    src: 'https://youtu.be/SDgtRBXbj8s',
    href: 'https://youtu.be/SDgtRBXbj8s'
  },
  {
    title: 'Ink Pro — Website Demo',
    src: 'https://youtu.be/BESRUAoTNqM',
    href: 'https://youtu.be/BESRUAoTNqM'
  }
];


// 判断是否是 YouTube 链接
const isYouTubeUrl = (url: string) => /youtu\.?be|youtube\.com/.test(url);

// 把 youtu.be / watch?v=… 统一转成 embed
const toYouTubeEmbed = (url: string) => {
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname === 'youtu.be') id = u.pathname.slice(1);
    else if (u.hostname.includes('youtube.com')) {
      id = u.searchParams.get('v') || u.pathname.split('/').pop() || '';
    }
    return id
      ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
      : url;
  } catch {
    return url;
  }
};

/** ---- 无限横向滚动动画 ---- */
const marquee = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }  /* 因为我们会把轨道内容重复两遍 */
`;

/** ---- 横向视频滚动组件 ---- */
function ProjectReel() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // 视口外暂停视频，省电（可选）
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const vids = Array.from(el.querySelectorAll('video'));
    const io = new IntersectionObserver(
      ([entry]) => {
        vids.forEach(v => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()));
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 一圈滚动时间（秒）：按视频数量动态算
  const speedSec = Math.max(30, projectVideos.length * 10);
  return (
    <Box
      ref={wrapRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 2, md: 3 },
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${marquee} ${speedSec}s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {/* 轨道内容重复两遍实现无缝循环 */}
        {[0, 1].map(dup => (
          <Box key={dup} sx={{ display: 'flex' }}>
           {projectVideos.map((p, i) => (
  <Box
    key={`${dup}-${i}`}
    sx={{
      display: 'block',
      width: { xs: 240, sm: 300, md: 360 },
      height: { xs: 140, sm: 180, md: 202 },
      mr: { xs: 1.5, sm: 2, md: 3 },
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 12px 36px rgba(15,23,42,.18)',
      position: 'relative',
      bgcolor: '#000'
    }}
  >
    {isYouTubeUrl(p.src) ? (
      <iframe
        src={toYouTubeEmbed(p.src)}
        title={p.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    ) : (
      <video
        src={p.src}
        poster={p.poster}
        controls  // ← YouTube 用 iframe，这里只有本地/MP4 才会走 <video>
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )}

    {/* 左下角标题 */}
    <Box
      sx={{
        position: 'absolute',
        left: 8,
        bottom: 8,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: 'rgba(0,0,0,.45)',
        color: '#fff',
        fontSize: 12,
        lineHeight: 1.2,
      }}
    >
      {p.title}
    </Box>

    {/* 右上角外链按钮（可选） */}
    {p.href && (
      <Link
        href={p.href}
        target="_blank"
        rel="noreferrer"
        underline="none"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: 'rgba(0,0,0,.55)',
          color: '#fff',
          px: 1,
          py: 0.25,
          borderRadius: 1,
          fontSize: 12,
        }}
      >
        Open ↗
      </Link>
    )}
  </Box>
))}

          </Box>
        ))}
      </Box>
    </Box>
  );
}


/* ---------- 你的 workHistory 数据 & 类型 ---------- */
type RoleEntry = {
  title: string;
  bullets: string[];
  tech?: string[];
};

type WorkEntry = {
  company: string;
  role?: string;
  roles?: RoleEntry[];
  employmentType?: string;
  website?: string;
  start: string; // YYYY-MM
  end: string;   // YYYY-MM 或 'Present'
  bullets?: string[];
  tech?: string[];
  image?: string | string[]
};

export const workHistory: WorkEntry[] = [
  {
    company: 'EquityAI',
    role: 'GIS Developer Intern',
    employmentType: 'Internship',
    website: 'https://www.equityai.co/',
    start: '2025-07',
    end: '2025-10',
    bullets: [
      'Led the frontend for a Mapbox GL JS–based congestion analysis tool; implemented single/multi-zone O/D selection, multi-road comparison, and elasticity-based hotspot coloring with dynamic legends.',
      'Integrated telco origin–destination mobility data with the national road network and built a trip-volume analytics module supporting hourly and daily aggregations (including cross-aggregation).',
      'Connected the UI to Node.js REST services; improved responsiveness via layer management and request cancellation.',
    ],
    tech: ['TypeScript', 'React 19', 'Next 15', 'Mapbox GL JS', 'ECharts', 'Node.js', 'REST'],
    image: '/projects/cna.png',
 
  },
  {
    company: 'AIMployee (InspiroTech Ltd., NZ)',
    employmentType: 'Part-time',
    website: 'https://www.aimployee.co.nz/',
    start: '2025-04',
    end: '2025-08',
    roles: [
      {
        title: 'AI Consultant',
        bullets: [
          'Built an n8n automation framework for financial content → social posts and email approvals.',
          'Developed LLM integration nodes and prompts; launched customer and internal service chatbots.',
        ],
        tech: ['n8n', 'Node.js', 'REST/JSON', 'Prompt Engineering'],
      },
      {
        title: 'Web Developer',
        bullets: [
          'Built the company site end-to-end with WordPress + WooCommerce and custom JavaScript.',
          'Integrated shipping with Zappy and NZ Post for rates, labels, and tracking.',
        ],
        tech: ['WordPress', 'WooCommerce', 'JavaScript', 'Zappy', 'NZ Post'],
      },
    ],
    image: '/projects/ai.png',
  },
  {
    company: 'Hunan Talent Employment & Social Security Information Newspaper Co., Ltd.',
    role: 'Android Development Engineer',
    start: '2018-08',
    end: '2024-05',
    bullets: [
      'Delivered UniApp mini-programs “Xing Ren She” on Douyin, Kuaishou, and Baidu (frontend: Vue; backend: PHP).',
      'Developed video-course and recruitment modules for the Android app “Jiu Ye Ba” (job-seeking platform for university students).',
      'Led the video module design and upgraded the news section for the “Xing Ren She” Android app and WeChat mini program (Android + HTML/CSS/JS with PHP backend).',
      'Built the official website for the Hunan Provincial Medical Security Bureau using ZhiBiaoMa and JavaScript: https://ybj.hunan.gov.cn/.',
    ],
    tech: ['Android', 'Java', 'Vue', 'UniApp', 'WeChat Mini Program', 'PHP', 'JavaScript'],
  },
  {
    company: 'Changsha Ring Tech Co., Ltd.',
    role: 'Android Development Engineer',
    start: '2017-06',
    end: '2018-08',
    bullets: [
      'Independently developed the “Mei Ke” social networking Android app (Java backend).',
      'Contributed to a video streaming Android app integrating WeChat login/registration (Java backend).',
    ],
    tech: ['Android', 'Java', 'WeChat SDK'],
  },
  {
    company: 'Chengdu Zhongke-Daqi Software Co., Ltd. (HQ)',
    role: 'Android Development Engineer',
    website: 'https://www.scbigdata.org/',
    start: '2016-06',
    end: '2017-03',
    bullets: [
      'Key contributor to v1.0 of the Android app for a Smart Tourism project commissioned by the Sichuan Provincial Government (Android client, Java backend).',
    ],
    tech: ['Android', 'Java'],
  },
];

/* ---------- 小工具 ---------- */


const formatRange = (s?: string, e?: string) => {
  const ss = (s || '').replace('-', '/');
  const ee = (e || 'Present').replace('-', '/');
  return ss ? `${ss} – ${ee}` : ee; // s 为空时只显示 end/Present
};

function Bullets({ items }: { items: string[] }) {
  return (
    <Box
      component="ul"
      sx={{
        pl: 3,
        mb: 0,
        listStyle: 'disc',

        color: '#334155',
      }}
    >
      {items.map((t, i) => (
        <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>
          {t}
        </li>
      ))}
    </Box>
  );
}


// 替换原来的 TechChips
function TechChips({ list }: { list: string[] }) {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
      {list.map((t, i) => (
        <Chip
          key={`${t}-${i}`}
          label={t}
          size="small"
          sx={{
            bgcolor: '#EEF2FF',
            color: '#3730A3',
            border: '1px solid #C7D2FE',
            fontWeight: 600,
            '& .MuiChip-label': { px: 1.1 },
          }}
        />
      ))}
    </Stack>
  );
}

 
export default function Projects() {
  // full-bleed：让 section 背景真正铺满视口宽度
   const bleed = {
    width: '100vw',
    position: 'relative' as const,
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
  };
  const SHOW_PROJECTS = true as const;

  // 内容容器：控制左右留白 + 最大阅读宽
  const inner = {
    width: '100%',
    mx: 'auto',
    px: { xs: 2, md: 6 },
    maxWidth: 1440,
  };

  // 卡片窄宽，居中
  const cardShellSx = {
    width: '100%',
    mx: 'auto',
    maxWidth: { xs: '100%', sm: 720, md: 880, lg: 1040 }, // 调这里
    borderRadius: { xs: 3, md: 4 },
    overflow: 'hidden',
    bgcolor: '#fff',
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    boxShadow: '0 20px 60px rgba(15,23,42,.15)',
  } as const;


  return (
     <Box
      component="section"
      id="experience"
      sx={{ ...bleed, bgcolor: '#eaf4f3', py: { xs: 8, md: 12 }, color: '#0f172a' }}
    >
      {/* ===== Projects（整块可关） ===== */}
      {SHOW_PROJECTS && (
  <>
    <Box sx={inner}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 2 }}>
        Projects
        <Box component="span" sx={{ display: 'block', width: 110, height: 4, bgcolor: 'primary.main', borderRadius: 999, mx: 'auto', mt: 1.5 }} />
      </Typography>
      <Typography align="center" sx={{ opacity: 0.7, mb: 3 }}>
        Short demos of my recent work (hover to pause · click to view)
      </Typography>
    </Box>

    <Box sx={inner}>
      <ProjectReel />  {/* ✅ 关键：渲染视频走马灯 */}
    </Box>
  </>
)}


      {/* ===== Experience 标题（内容容器） ===== */}
      <Box sx={inner}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 800, mt: { xs: 8, md: 10 }, mb: 6 }}>
          Experience
          <Box
            component="span"
            sx={{
              display: 'block',
              width: 110,
              height: 4,
              bgcolor: 'primary.main',
              borderRadius: 999,
              mx: 'auto',
              mt: 1.5,
            }}
          />
        </Typography>
      </Box>

      {/* ===== Experience 列表（内容容器） ===== */}
      <Box sx={inner}>
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ px: { xs: 2, md: 6 }, alignItems: 'center' }}>
          {workHistory.map((w, i) => {
            const reversed = i % 2 === 1;
            return (
              <Card key={`${w.company}-${i}`} elevation={0} sx={cardShellSx}>
                {/* 左列：公司/角色/要点 */}
                <Box
                  sx={{
                    order: { xs: 2, md: reversed ? 2 : 1 },
                    p: { xs: 3, md: 5 },
                    color: '#0f172a',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {w.company}
                    {w.website && (
                      <Link href={w.website} target="_blank" rel="noreferrer" sx={{ ml: 1, fontSize: 14 }}>
                        ↗
                      </Link>
                    )}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {w.employmentType && <Chip size="small" label={w.employmentType} />}
                    {w.role && <Chip size="small" color="primary" label={w.role} />}
                    {Boolean(w.start || w.end) && (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={formatRange(w.start, w.end)}
                        sx={{
                          borderColor: '#CBD5E1',
                          color: '#334155',
                          fontWeight: 600,
                          '& .MuiChip-label': { color: '#334155', fontWeight: 600, px: 1.1 },
                        }}
                      />
                    )}
                  </Stack>

                  {w.roles ? (
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      {w.roles.map((r, ri) => (
                        <Box key={ri}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {r.title}
                          </Typography>
                          <Bullets items={r.bullets} />
                          {r.tech && <TechChips list={r.tech} />}
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <>
                      {w.bullets && (
                        <Box sx={{ mt: 2 }}>
                          <Bullets items={w.bullets} />
                        </Box>
                      )}
                      {w.tech && <TechChips list={w.tech} />}
                    </>
                  )}
                </Box>

                {/* 右列占位（可放图/图表） */}
                {/* 右列：图片 */}
<Box
  sx={{
    order: { xs: 1, md: reversed ? 1 : 2 },
    position: 'relative',
    minHeight: { xs: 180, md: 220 },
    bgcolor: 'rgba(15,23,42,.04)',
    overflow: 'hidden',
    borderTopRightRadius: { xs: 0, md: cardShellSx.borderRadius }, // 可选：卡片同圆角
    borderBottomRightRadius: { xs: 0, md: cardShellSx.borderRadius },
  }}
>
  {Array.isArray(w.image) ? (
    <Box sx={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {w.image.slice(0, 4).map((src, i) => (
        <Box
          key={i}
          component="img"
          src={src}               // 例如 '/projects/cna.png'
          alt={`${w.company}-${i}`}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ))}
    </Box>
  ) : w.image ? (
    <Box
      component="img"
      src={w.image}               // 例如 '/projects/ai.png'
      alt={w.company}
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : null}
</Box>

              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}


