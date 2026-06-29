/* Supabase cloud sync (optional). App works fully local without it.
   To enable: create app/config.js with:
     window.MF_CONFIG = { url:'https://xxxx.supabase.co', anonKey:'eyJ...', device:'mosh' };
   and run schema.sql in the Supabase SQL editor. */
(function(){
  const cfg = window.MF_CONFIG;
  if(!cfg || !cfg.url || !cfg.anonKey){ window.MFSync = null; return; }

  const base = cfg.url.replace(/\/$/,'') + '/rest/v1/app_state';
  const headers = {
    'apikey': cfg.anonKey,
    'Authorization': 'Bearer ' + cfg.anonKey,
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates',
  };
  const device = cfg.device || 'mosh';

  window.MFSync = {
    // push one key/value blob to cloud (upsert on device+key)
    push(key, value){
      fetch(base, { method:'POST', headers,
        body: JSON.stringify([{ device, key, value, updated: new Date().toISOString() }]) })
        .catch(()=>{}); // silent: local is source of truth, cloud is backup
    },
    // pull all rows for this device, hydrate localStorage (call on load)
    async pull(){
      try{
        const r = await fetch(base + '?device=eq.' + encodeURIComponent(device) + '&select=key,value,updated', { headers });
        if(!r.ok) return;
        const rows = await r.json();
        rows.forEach(row=>{
          const lk = 'mf_' + row.key;
          // only overwrite if cloud is newer than local marker (simple: always trust cloud on fresh device)
          if(localStorage.getItem(lk) === null){ localStorage.setItem(lk, JSON.stringify(row.value)); }
        });
      }catch(e){}
    },
  };
})();
