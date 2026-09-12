/* challenge-30 state bridge.
   The box lives in localStorage on Mosh's phone, so nothing outside can tell
   which day he is on. This file exports that state in two ways:
     1. automatic  — upsert to Supabase app_state (same table/pattern as app/sync.js),
                     active only when app/config.js defines window.MF_CONFIG.
     2. manual     — a short ASCII status code Mosh copies once into the catalog.
   Never blocks the app: every failure path is silent, local stays source of truth. */
(function () {
  const KEY = 'ch30';

  function summarize(S) {
    const days = S.days || {};
    const nums = Object.keys(days).map(Number).filter(n => n >= 1 && n <= 30);
    const stamped = nums.length;
    let day = 31;
    for (let d = 1; d <= 30; d++) { if (!days[d]) { day = d; break; } }
    const dates = new Set(nums.map(n => days[n].date).filter(Boolean));
    if (S.joker) dates.add(S.joker);
    const iso = d => d.toISOString().slice(0, 10);
    const shift = (str, n) => { const d = new Date(str + 'T12:00:00'); d.setDate(d.getDate() + n); return iso(d); };
    const today = iso(new Date());
    let cur = today, streak = 0;
    if (!dates.has(cur)) cur = shift(cur, -1);
    while (dates.has(cur)) { streak++; cur = shift(cur, -1); }
    const allDates = nums.map(n => days[n].date).filter(Boolean).sort();
    return {
      challenge: KEY,
      startDate: S.start || allDates[0] || null,
      currentDay: day,
      stamped,
      streak,
      windowDays: nums.filter(n => days[n].window).length,
      minutes: stamped * 14,
      lastStamp: allDates[allDates.length - 1] || null,
      joker: S.joker || null,
      capturedAt: today,
    };
  }

  /* one line, ASCII + digits only: survives RTL terminals, WhatsApp and Telegram
     without a single character flipping direction. */
  function code(S) {
    const x = summarize(S);
    return ['CH30',
      'd' + x.currentDay,
      's' + (x.startDate || '0000-00-00'),
      'k' + x.stamped,
      'r' + x.streak,
      'w' + x.windowDays,
      'm' + x.minutes,
      'u' + x.capturedAt,
    ].join(' ');
  }

  function publish(S) {
    const x = summarize(S);
    try { localStorage.setItem('ch30.state', JSON.stringify(x)); } catch (e) {}
    const cfg = window.MF_CONFIG;
    if (!cfg || !cfg.url || !cfg.anonKey) return;
    try {
      fetch(cfg.url.replace(/\/$/, '') + '/rest/v1/app_state', {
        method: 'POST',
        headers: {
          apikey: cfg.anonKey,
          Authorization: 'Bearer ' + cfg.anonKey,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify([{
          device: cfg.device || 'mosh',
          key: KEY,
          value: x,
          updated: new Date().toISOString(),
        }]),
      }).catch(() => {});
    } catch (e) {}
  }

  function copy(S) {
    const t = code(S);
    const done = () => { const el = document.getElementById('ch30code'); if (el) el.textContent = t + '  ✓'; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  window.CH30State = { summarize, code, publish, copy };
})();
