import { builds, setStatus, appendLog } from '../mocks/data';

declare global {
  // avoid duplicate intervals across hot reloads in dev
  // eslint-disable-next-line no-var
  var __fabs_sim_running: boolean | undefined;
}

export function ensureSim() {
  if (process.env.NODE_ENV !== 'development') return;
  if (global.__fabs_sim_running) return;
  global.__fabs_sim_running = true;

  setInterval(() => {
    // 1) promote one queued to building
    const queued = builds.find(b => b.status === 'queued');
    if (queued) {
      setStatus(queued.id, 'building');
      appendLog(queued.id, '[runner] starting job...');
    }

    // 2) progress building jobs; randomly finish them
    const now = Date.now();
    for (const b of builds) {
      if (b.status === 'building') {
        appendLog(b.id, `[step] compiling chunk at ${new Date().toISOString()}`);
        // probabilistic finish after ~30-90s of building
        const started = new Date(b.startedAt).getTime();
        const sec = (now - started) / 1000;
        if (sec > 30 && Math.random() < 0.2) {
          const ok = Math.random() < 0.85; // 85% success
          setStatus(b.id, ok ? 'succeeded' : 'failed');
          appendLog(b.id, ok ? '[done] build succeeded' : '[error] build failed');
        }
      }
    }
  }, 4000);
}
