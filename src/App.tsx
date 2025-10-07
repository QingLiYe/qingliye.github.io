import { CssBaseline } from '@mui/material';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';

export default function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      {/* 全局不要 overflow: hidden；仅防止 100vw 造成横向滚动 */}
      <main style={{ overflowX: 'hidden' }}>
        <Hero />       {/* 自己内部 overflow: hidden，不影响下面 */}
        <Projects />   {/* full-bleed 背景 + 窄卡片 */}
      </main>
    </>
  );
}
