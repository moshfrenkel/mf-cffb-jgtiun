/* MoshFit PWA — CFFB-01. Local-first (localStorage); Supabase sync hooks in sync.js. */

/* ---------------- BLOCK DATA ---------------- */
const HE_DOW = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];

const WORKOUTS = {
  A: { code:'A', name:'GROUNDED', focus:'רגליים · סקוואט + לאנג׳', train:true,
    lifts:[{name:'Front Squat',scheme:'4×4 @65%'},{name:'Walking Lunge',scheme:'3×8/רגל'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות לסקוואט, דמבל/קטלבל ללאנג׳, חבל. לכתוב משקל Front Squat על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חבל 2 דק׳, goblet squat hold, world\'s greatest stretch, front squat ריק ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Front Squat 4×4 @65%, מנוחה 90 שנ׳. ואז Walking/Reverse Lunge 3×8 לרגל מועמס, ברך שמאל בקו.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Dead Bug 3×10 · Side Plank 2×30 שנ׳ לצד.'},
    {tag:'WOD', t:9, title:'מטקון · Tabata ×3 (20/10)', d:'סבב 1 Air Squat · סבב 2 Mountain Climbers · סבב 3 Jump Rope.',
      timer:{mode:'interval', label:'Tabata 20/10', rounds:18, phases:[{label:'עבודה',sec:20,work:1},{label:'מנוחה',sec:10,work:0}], cycle:['Air Squat','Mountain Climbers','Jump Rope']}},
    {tag:'DOWN',t:3, title:'שחרור', d:'pigeon, quad stretch, נשימות. לרשום בלוג.'},
  ]},
  B: { code:'B', name:'OVERHEAD', focus:'פלג גוף עליון', train:true,
    lifts:[{name:'Push Press',scheme:'5×4 @65%'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות ל-press, דמבלים קלים, גומיית Pallof. לכתוב משקל Push Press על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חתירה 2 דק׳, band dislocates, scap push-up, press ריק ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Push Press 5×4 @65%, הנעה מהרגליים. מנוחה 90 שנ׳.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Lateral Raise 3×15 (medial delt) · Pallof Press 3×12.'},
    {tag:'WOD', t:9, title:'מטקון · AMRAP 9', d:'10 Push-up · 12 Ring Row · 14 Russian Twist.',
      timer:{mode:'amrap', label:'AMRAP 9', sec:540}},
    {tag:'DOWN',t:3, title:'שחרור', d:'מתיחת חזה, lat stretch, נשימות.'},
  ]},
  C: { code:'C', name:'EXPLODE', focus:'כוח-מהירות', train:true,
    lifts:[{name:'Power Clean',scheme:'6×3 @60%'},{name:'Push Jerk',scheme:'3×3 קל'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות, קטלבל, בוקס נמוך. רצפה פנויה להנפות. לכתוב משקל Power Clean על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חבל 2 דק׳, muscle clean ריק, front rack stretch, קפיצות נמוכות.'},
    {tag:'STR', t:16,title:'כוח', d:'Power Clean 6×3 @60% טכני ונפיץ. מנוחה 2 דק׳. בסוף Push Jerk 3×3 קל.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Bent-over Row 3×10 (אחיזה ניטרלית) · Plank 3×40 שנ׳.'},
    {tag:'WOD', t:9, title:'מטקון · EMOM 9', d:'דקה זוגית 10 KB Swing · דקה אי-זוגית 8 Box Jump נמוך.',
      timer:{mode:'interval', label:'EMOM 9', rounds:9, phases:[{label:'דקה',sec:60,work:1}], cycle:['10 KB Swing','8 Box Jump נמוך']}},
    {tag:'DOWN',t:3, title:'שחרור', d:'שחרור אמה/שורש כף יד, child\'s pose, נשימות.'},
  ]},
  D: { code:'D', name:'ANCHOR', focus:'ציר · גב תחתון', train:true,
    lifts:[{name:'Deadlift',scheme:'5×3 @65%'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט (trap bar אם יש)+צלחות, straps, מזרן ל-core. לכתוב משקל הדדליפט על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חתירה 2 דק׳, hip hinge drill, glute activation, דדליפט קל ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Deadlift 5×3 @65% עם straps, גב ניטרלי. מנוחה 2 דק׳.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Single-Leg Glute Bridge 3×10 לצד · Hollow Hold 3×30 שנ׳.'},
    {tag:'WOD', t:9, title:'מטקון · For Time 21-15-9', d:'Air Squat + Sit-up, ובסוף כל סבב 30 Jump Rope. קצב מבוקר.',
      timer:{mode:'fortime', label:'For Time', cap:540}},
    {tag:'DOWN',t:3, title:'שחרור', d:'hamstring stretch, שחרור גב תחתון, נשימות.'},
  ]},
  REST: { code:'R', name:'מנוחה', focus:'הגוף בונה עכשיו', train:false, stages:[
    {tag:'REST',t:0, title:'יום מנוחה', d:'הליכה קלה או מתיחות אם בא לך, בלי לכפות. שינה היא האימון של היום.'},
  ]},
};

const SPECIAL = {
  '2026-07-01': { code:'1', name:'FIRST TOUCH', focus:'יום פתיחה · Re-Entry 50-60%', train:true,
    lifts:[{name:'Front Squat',scheme:'5×5 לימוד'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'היכרות עם הבוקס: איפה המוטות, הצלחות, החבל. להוציא מוט ריק/קל.'},
    {tag:'WARM',t:7, title:'חימום', d:'3 דק׳ חבל קל, cat-cow, band pull-apart, scap push-ups, bodyweight squat ×10.'},
    {tag:'STR', t:16,title:'כוח', d:'Front Squat לימוד תנועה 5×5 במוט ריק/קל (20-30 ק״ג). depth מלא, גב זקוף. לומדים, לא מעמיסים.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Glute Bridge 3×12 · Dead Bug 3×8 לצד.'},
    {tag:'WOD', t:9, title:'מטקון · Intervals 30/30 ×6', d:'סירוגין Row / Air Squat. קל-בינוני, להזיע בלי לקרוס.',
      timer:{mode:'interval', label:'Intervals 30/30', rounds:12, phases:[{label:'עבודה',sec:30,work:1}], cycle:['Row','Air Squat']}},
    {tag:'DOWN',t:3, title:'שחרור', d:'מתיחת hip flexors, couch stretch, 10 נשימות עמוקות.'},
  ]},
  '2026-07-02': { code:'2', name:'OPEN GATES', focus:'יום פתיחה · Re-Entry 50-60%', train:true,
    lifts:[{name:'Strict Press',scheme:'5×5 לימוד'}], stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט קל, קטלבל 12, בוקס, גומייה. תחנה אחת נקייה.'},
    {tag:'WARM',t:7, title:'חימום', d:'3 דק׳ חתירה, arm circles, band face-pull, incline push-up ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Strict Press לימוד 5×5 במוט קל (20-25 ק״ג). שליטה מלאה, ליבה אסופה.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Face Pull 3×15 · Pallof Press 3×10 לצד.'},
    {tag:'WOD', t:9, title:'מטקון · AMRAP 9', d:'8 KB Swing (12 ק״ג) · 8 Box Step-up · 8 Hollow Rock. קצב נינוח.',
      timer:{mode:'amrap', label:'AMRAP 9', sec:540}},
    {tag:'DOWN',t:3, title:'שחרור', d:'מתיחת חזה בפתח דלת, thoracic rotation, נשימות.'},
  ]},
};

const BYDOW = {0:'A',1:'B',2:'REST',3:'C',4:'D',5:'REST',6:'REST'};

const NUTRITION = {
  train: { kcal:'~2200', p:'155', f:'115', c:'~130' },
  rest:  { kcal:'~1900', p:'150', f:'110', c:'~80' },
  boxes: [
    ['בוקר','3 ביצים + חצי אבוקדו + עגבנייה','~22'],
    ['שייק (אימון)','Whey + בננה קטנה לפני, מיד אחרי','~25'],
    ['קופסה 1 · צהריים','180ג׳ חזה עוף + פחמימה קטנה + ירקות','~45'],
    ['קופסה 2 · ערב','טונה / דג / בקר רזה + סלט + חומוס במידה','~40'],
    ['תוספת','יוגורט יווני 0% / קוטג׳ + אגוזים','~22'],
  ],
  shop: {
    'חלבון':['חזה עוף 1.5 ק״ג','דג (סלמון/בקלה) 600 גרם','טונה בקופסה ×6','בקר רזה 5% 500 גרם','ביצים ×24','יוגורט יווני 0% ×4','קוטג׳ 5% ×2'],
    'פחמימה (מעט)':['אורז, מנות מדודות','בטטה 700 גרם','חומוס מוכן ×1-2','בננות ×5 (לפני אימון)'],
    'ירקות ושומן טוב':['סלט: מלפפון, עגבנייה, פלפל, חסה','ברוקולי, כרובית, שעועית ירוקה, פטריות','בצל, שום','אבוקדו ×4-5','אגוזים/שקדים, שמן זית'],
  },
};

const SUPPS = [
  {id:'creatine', name:'קריאטין 5 גרם', when:'בוקר'},
  {id:'vitd', name:'ויטמין D 2000', when:'בוקר עם אוכל'},
  {id:'whey', name:'Whey אחרי אימון', when:'ימי אימון'},
  {id:'omega', name:'אומגה 3', when:'עם ארוחה'},
  {id:'mag', name:'מגנזיום', when:'22:00 לפני שינה'},
];

/* ---------------- STORE (local-first) ---------------- */
const DB = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem('mf_'+k)) ?? def; }catch(e){ return def; } },
  set(k, v){ localStorage.setItem('mf_'+k, JSON.stringify(v)); if(window.MFSync) window.MFSync.push(k, v); },
};

/* ---------------- HELPERS ---------------- */
function todayKey(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

/* lift log: flat list of {date, code, lift, weight, reps} — the source of truth for PRs */
function liftGet(date, lift){
  return DB.get('liftlog',[]).find(x=>x.date===date && x.lift===lift) || null;
}
function liftSet(date, code, lift, weight, reps){
  const log = DB.get('liftlog',[]);
  const i = log.findIndex(x=>x.date===date && x.lift===lift);
  const w = weight===''?null:Number(weight), r = reps===''?null:Number(reps);
  if(w==null && r==null){ if(i>=0){ log.splice(i,1); DB.set('liftlog',log); } return; }
  const rec = {date, code, lift, weight:w, reps:r};
  if(i>=0) log[i]=rec; else log.push(rec);
  DB.set('liftlog', log);
}
function e1rm(w, r){ if(!w||!r) return null; return Math.round(w*(1+r/30)); } // Epley estimate
/* best set per lift across all history → for the PR page */
function personalRecords(){
  const log = DB.get('liftlog',[]).filter(x=>x.weight);
  const byLift = {};
  log.forEach(x=>{
    const b = byLift[x.lift];
    const better = !b || x.weight>b.weight || (x.weight===b.weight && (x.reps||0)>(b.reps||0));
    if(better) byLift[x.lift] = x;
  });
  return Object.entries(byLift).map(([lift,best])=>({lift, ...best, est:e1rm(best.weight,best.reps)}))
    .sort((a,b)=>b.weight-a.weight);
}
function planFor(d){
  const k = todayKey(d);
  if(SPECIAL[k]) return SPECIAL[k];
  return WORKOUTS[BYDOW[d.getDay()]];
}
function el(tag, cls, html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

/* ---------------- VIEWS ---------------- */
const app = document.getElementById('view');
let activeTab = 'today';
let selectedDate = new Date(); // which day the workout player shows
const BLOCK_START = new Date('2026-07-01T12:00:00');
const BLOCK_END   = new Date('2026-07-28T12:00:00');

function render(){
  app.innerHTML='';
  if(activeTab==='today') viewToday();
  else if(activeTab==='calendar') viewCalendar();
  else if(activeTab==='workout') viewWorkout();
  else if(activeTab==='nutrition') viewNutrition();
  else if(activeTab==='progress') viewProgress();
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on', t.dataset.tab===activeTab));
  window.scrollTo(0,0);
}

/* ---- TODAY ---- */
function viewToday(){
  const d = new Date();
  const p = planFor(d);
  const isTrain = p.train;
  const n = isTrain ? NUTRITION.train : NUTRITION.rest;

  const head = el('div','hero');
  head.innerHTML = `<div class="kick">${HE_DOW[d.getDay()]} · ${d.getDate()}.${d.getMonth()+1} · CFFB-01</div>
    <h1>${isTrain?'אימון':'מנוחה'} <em>${p.name}</em></h1>
    <div class="focus">${p.focus}</div>`;
  app.appendChild(head);

  if(isTrain){
    const card = el('div','card tappable');
    card.innerHTML = `<div class="card-h">האימון של היום</div>
      <div class="mini">${p.stages.find(s=>s.tag==='STR')?.d||''}</div>
      <div class="go">פתח אימון מלא ←</div>`;
    card.onclick=()=>{ selectedDate=new Date(); activeTab='workout'; render(); };
    app.appendChild(card);
  }

  // supplements checklist
  const sk = 'supp_'+todayKey();
  const done = DB.get(sk, {});
  const sc = el('div','card');
  sc.innerHTML = `<div class="card-h">תוספים היום</div>`;
  SUPPS.forEach(s=>{
    if(s.id==='whey' && !isTrain) return;
    const row = el('label','check');
    row.innerHTML = `<input type="checkbox" ${done[s.id]?'checked':''}>
      <span><b>${s.name}</b><i>${s.when}</i></span>`;
    row.querySelector('input').onchange=(e)=>{ done[s.id]=e.target.checked; DB.set(sk,done); };
    sc.appendChild(row);
  });
  app.appendChild(sc);

  // nutrition snapshot
  const nc = el('div','card');
  nc.innerHTML = `<div class="card-h">תזונה (${isTrain?'יום אימון':'יום מנוחה'})</div>
    <div class="macros">
      <div><b>${n.kcal}</b><i>קל׳</i></div>
      <div><b>${n.p}</b><i>חלבון</i></div>
      <div><b>${n.f}</b><i>שומן</i></div>
      <div><b>${n.c}</b><i>פחמ׳</i></div>
    </div>
    <div class="go" data-go="nutrition">קופסאות ורשימת קניות ←</div>`;
  nc.querySelector('[data-go]').onclick=()=>{ activeTab='nutrition'; render(); };
  app.appendChild(nc);

  // evening / sleep
  const ec = el('div','card soft');
  ec.innerHTML = `<div class="card-h">הערב</div>
    <div class="mini">מגנזיום ב-22:00 · יעד שינה 22:30 (קימה 05:30). השינה היא התקרה של התוצאות.</div>`;
  app.appendChild(ec);

  // quick checkin button
  const qc = el('div','card tappable accent');
  qc.innerHTML = `<div class="card-h">צ׳ק-אין יומי</div><div class="go">משקל, שינה, מצב רוח, כאב ←</div>`;
  qc.onclick=()=>{ activeTab='progress'; render(); };
  app.appendChild(qc);
}

/* ---- WORKOUT PLAYER ---- */
let timer = {iv:null, idx:-1};   // only one active timer at a time
function clearActiveTimer(){
  if(timer.iv){ clearInterval(timer.iv); timer.iv=null; }
  if(timer.idx>=0){ const o=document.getElementById('cnt-'+timer.idx); if(o) o.textContent=''; const b=document.getElementById('btn-'+timer.idx); if(b) b.textContent=b.dataset.label; }
  timer.idx=-1;
}
function buzz(p){ if(navigator.vibrate) navigator.vibrate(p); }
const mmss = s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

function viewWorkout(){
  const d = selectedDate;
  const p = planFor(d);
  const isToday = todayKey(d)===todayKey();
  const dKey = todayKey(d);
  const dateLbl = `${HE_DOW[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}${isToday?' · היום':''}`;
  app.appendChild(el('div','hero', `<div class="kick">WORKOUT · ${p.code} · ${dateLbl}</div><h1>${p.name}</h1><div class="focus">${p.focus}</div>`));

  if(!p.train){ app.appendChild(el('div','card','<div class="mini">יום מנוחה. תן לגוף לבנות. הליכה קלה אם בא לך.</div>')); return; }

  const total = p.stages.reduce((a,s)=>a+s.t,0);
  app.appendChild(el('div','totalbar', `<span>${total} דקות דלת לדלת</span><span class="latin">DOOR → DOOR</span>`));

  p.stages.forEach((s,i)=>{
    const st = el('div','stage');
    const lbl = timerLabel(s);
    st.innerHTML = `<div class="st-head"><span class="st-tag latin">${s.tag}</span><span class="st-title">${s.title}</span><span class="st-time">${s.t?s.t+'′':''}</span></div>
      <div class="st-body">${s.d}</div>
      ${lbl?`<button class="st-timer" id="btn-${i}" data-label="${lbl}">${lbl}</button>`:''}
      <div class="st-count" id="cnt-${i}"></div>`;
    if(lbl) st.querySelector('.st-timer').onclick=()=>runTimer(i, s);
    app.appendChild(st);

    // weights entry right after the strength stage
    if(s.tag==='STR' && p.lifts) app.appendChild(liftCard(p, dKey));
  });

  app.appendChild(finishCard(p, dKey));
}

/* button label per timer type (countdown default) */
function timerLabel(s){
  if(!s.timer){ return s.t>0 ? `טיימר ${s.t}:00` : ''; }
  const t=s.timer;
  if(t.mode==='fortime') return `▶ ${t.label} · סטופר`;
  return `▶ ${t.label}`;
}

/* ---- weights card ---- */
function liftCard(p, dKey){
  const c = el('div','card lifts');
  c.innerHTML = `<div class="card-h">משקלי עבודה · רשום תוך כדי</div>`;
  p.lifts.forEach(lf=>{
    const cur = liftGet(dKey, lf.name) || {};
    const row = el('div','liftrow');
    row.innerHTML = `<div class="lf-name"><b>${lf.name}</b><i class="latin">${lf.scheme}</i></div>
      <div class="lf-in"><input class="lf-w" type="number" inputmode="decimal" placeholder="ק״ג" value="${cur.weight??''}"><span>×</span><input class="lf-r" type="number" inputmode="numeric" placeholder="חז׳" value="${cur.reps??''}"></div>`;
    const w=row.querySelector('.lf-w'), r=row.querySelector('.lf-r');
    const save=()=>liftSet(dKey, p.code, lf.name, w.value, r.value);
    w.onchange=save; r.onchange=save;
    c.appendChild(row);
  });
  c.appendChild(el('div','mini','נשמר אוטומטית. השיאים מתעדכנים בעמוד התקדמות.'));
  return c;
}

/* ---- structured finish log ---- */
function finishCard(p, dKey){
  const c = el('div','card accent');
  const prev = DB.get('worklog',[]).find(x=>x.date===dKey && x.code===p.code) || {};
  c.innerHTML = `<div class="card-h">סיום אימון · בלוג</div>
    <label class="field col"><span>איך היה? מה עשית, תחושה, איך המרפק הגיב</span>
      <textarea class="fin-note" rows="3" placeholder="כמה מילים ביומן...">${prev.note||''}</textarea></label>
    <div class="field"><span>RPE · כמה קשה (1-10)</span><input class="fin-rpe" type="number" inputmode="numeric" min="1" max="10" value="${prev.rpe??''}"></div>
    <div class="field col"><span>מרפק (tennis elbow)</span><div class="seg" id="seg-elbow"></div></div>`;
  // elbow segmented control
  const seg = c.querySelector('#seg-elbow');
  let elbow = prev.elbow || '';
  [['ok','שקט'],['felt','הרגשתי'],['pain','כאב']].forEach(([v,t])=>{
    const b=el('button','seg-b'+(elbow===v?' on':''),t);
    b.onclick=()=>{ elbow=v; seg.querySelectorAll('.seg-b').forEach(x=>x.classList.remove('on')); b.classList.add('on'); };
    seg.appendChild(b);
  });
  const save = el('button','bigbtn','שמור בלוג · סיימתי');
  save.onclick=()=>{
    clearActiveTimer();
    const note=c.querySelector('.fin-note').value.trim();
    const rpe=c.querySelector('.fin-rpe').value;
    const lifts=(p.lifts||[]).map(lf=>liftGet(dKey,lf.name)).filter(Boolean)
      .map(x=>`${x.lift} ${x.weight||'?'}×${x.reps||'?'}`);
    const logs=DB.get('worklog',[]);
    const rec={date:dKey, code:p.code, name:p.name, note, rpe:rpe?Number(rpe):null, elbow, lifts};
    const i=logs.findIndex(x=>x.date===dKey && x.code===p.code);
    if(i>=0) logs[i]=rec; else logs.unshift(rec);
    DB.set('worklog',logs);
    save.textContent='נשמר ✓ כל הכבוד'; buzz([120,60,120]);
    setTimeout(()=>{ activeTab='progress'; render(); }, 700);
  };
  c.appendChild(save);
  return c;
}

/* ---------------- TIMER ENGINE ---------------- */
function runTimer(i, s){
  const out=document.getElementById('cnt-'+i);
  const btn=document.getElementById('btn-'+i);
  // toggle off if this one is running
  if(timer.idx===i && timer.iv){ clearActiveTimer(); return; }
  clearActiveTimer();
  timer.idx=i; if(btn) btn.textContent='⏸ עצור';
  const t = s.timer;
  if(!t) return countdown(out, s.t*60);
  if(t.mode==='countdown' || t.mode==='amrap') return countdown(out, t.sec, t.label);
  if(t.mode==='fortime') return stopwatch(out, t.cap);
  if(t.mode==='interval') return interval(out, t);
}
function countdown(out, secs, label){
  let left=secs;
  const tick=()=>{ out.innerHTML=`<span class="big">${mmss(left)}</span>${label?`<span class="sub">${label}</span>`:''}`;
    if(left<=0){ clearActiveTimer(); out.innerHTML='<span class="big done">סיום ✓</span>'; buzz([200,100,200]); return; }
    if(left<=3) buzz(80);
    left--; };
  tick(); timer.iv=setInterval(tick,1000);
}
function stopwatch(out, cap){
  let s=0;
  const tick=()=>{ out.innerHTML=`<span class="big">${mmss(s)}</span><span class="sub">סופר עולה · עצור כשסיימת</span>`;
    if(cap && s>=cap){ clearActiveTimer(); buzz([200,100,200]); return; }
    s++; };
  tick(); timer.iv=setInterval(tick,1000);
}
function interval(out, t){
  let round=0, ph=0, left=t.phases[0].sec, totalRounds=t.rounds;
  const exForRound=(r)=> t.cycle ? t.cycle[r % t.cycle.length] : '';
  const paint=()=>{
    const phase=t.phases[ph], ex=exForRound(round), cls=phase.work?'work':'rest';
    out.innerHTML=`<span class="rd">סבב ${round+1}/${totalRounds}</span>`+
      `<span class="big ${cls}">${mmss(left)}</span>`+
      `<span class="sub">${phase.label}${ex?' · '+ex:''}</span>`;
  };
  paint();
  const tick=()=>{
    left--;
    if(left<0){
      ph++;
      if(ph>=t.phases.length){ ph=0; round++; }
      if(round>=totalRounds){ clearActiveTimer(); out.innerHTML='<span class="big done">'+t.label+' ✓</span>'; buzz([200,100,200,100,200]); return; }
      buzz(t.phases[ph].work?[150]:[80,50,80]);
      left=t.phases[ph].sec;
    } else if(left<=3 && left>=0){ buzz(60); }
    paint();
  };
  timer.iv=setInterval(tick,1000);
}

/* ---- CALENDAR (whole block ahead) ---- */
function viewCalendar(){
  app.appendChild(el('div','hero','<div class="kick">BLOCK CALENDAR · 1.7–28.7</div><h1>הבלוק <em>קדימה</em></h1><div class="focus">CFFB-01 · 4 שבועות · הקש על יום לפתוח אותו</div>'));

  const grid = el('div','cal');
  ['א','ב','ג','ד','ה','ו','ש'].forEach(h=>grid.appendChild(el('div','cal-h',h)));

  // start from the Sunday of the week containing BLOCK_START
  const start = new Date(BLOCK_START);
  start.setDate(start.getDate() - start.getDay()); // back to Sunday
  const tk = todayKey();
  for(let i=0;i<35;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const inBlock = d>=BLOCK_START && d<=BLOCK_END;
    if(!inBlock){ grid.appendChild(el('div','cal-cell empty')); continue; }
    const p = planFor(d);
    const cell = el('div','cal-cell '+(p.train?'tr':'rt')+(todayKey(d)===tk?' today':''));
    cell.innerHTML = `<span class="cd latin">${d.getDate()}.${d.getMonth()+1}</span><span class="cl">${p.train?p.code:'·'}</span>`;
    if(p.train){ cell.onclick=()=>{ selectedDate=d; activeTab='workout'; render(); }; }
    grid.appendChild(cell);
  }
  app.appendChild(grid);

  // legend
  const lg = el('div','card'); lg.innerHTML='<div class="card-h">מקרא</div>';
  const items = [
    ['A','GROUNDED','רגליים, סקוואט + לאנג׳'],
    ['B','OVERHEAD','פלג גוף עליון'],
    ['C','EXPLODE','כוח-מהירות'],
    ['D','ANCHOR','ציר, גב תחתון'],
    ['1','FIRST TOUCH','יום פתיחה 1.7'],
    ['2','OPEN GATES','יום פתיחה 2.7'],
    ['·','מנוחה','שינה והתאוששות'],
  ];
  items.forEach(([c,n,f])=>{ const r=el('div','leg'); r.innerHTML=`<span class="leg-c latin">${c}</span><b>${n}</b><i>${f}</i>`; lg.appendChild(r); });
  app.appendChild(lg);
}

/* ---- NUTRITION ---- */
function viewNutrition(){
  const isTrain = planFor(new Date()).train;
  const n = isTrain?NUTRITION.train:NUTRITION.rest;
  app.appendChild(el('div','hero','<div class="kick">NUTRITION · LOW-CARB</div><h1>קופסאות <em>ומאקרו</em></h1>'));
  app.appendChild(el('div','card', `<div class="card-h">היום (${isTrain?'אימון':'מנוחה'})</div>
    <div class="macros"><div><b>${n.kcal}</b><i>קל׳</i></div><div><b>${n.p}</b><i>חלבון</i></div><div><b>${n.f}</b><i>שומן</i></div><div><b>${n.c}</b><i>פחמ׳</i></div></div>`));

  const bc=el('div','card'); bc.innerHTML='<div class="card-h">הקופסאות</div>';
  NUTRITION.boxes.forEach(b=>{ const r=el('div','box'); r.innerHTML=`<span class="b-when">${b[0]}</span><span class="b-what">${b[1]}</span><span class="b-p latin">${b[2]}g</span>`; bc.appendChild(r); });
  app.appendChild(bc);

  const sc=el('div','card'); sc.innerHTML='<div class="card-h">רשימת קניות · חמישי</div>';
  Object.entries(NUTRITION.shop).forEach(([cat,items])=>{
    sc.appendChild(el('div','shop-cat',cat));
    const ul=el('ul','shoplist'); items.forEach(it=>ul.appendChild(el('li',null,it))); sc.appendChild(ul);
  });
  app.appendChild(sc);

  app.appendChild(el('div','card soft','<div class="card-h">הכנה</div><div class="mini">חמישי בערב: לגרל את כל העוף בנינג׳ה (בלי פלטות עישון), קציצות בקר, סיר אורז על הכיריים. טונה לא צריכה בישול, חלבון מיידי.</div>'));
}

/* ---- PROGRESS + CHECKIN ---- */
function viewProgress(){
  app.appendChild(el('div','hero','<div class="kick">PROGRESS</div><h1>הנתונים <em>שלי</em></h1>'));

  // ---- personal records (pulled from the lift log) ----
  const prs = personalRecords();
  const pc = el('div','card'); pc.innerHTML='<div class="card-h">שיאים אישיים</div>';
  if(!prs.length){
    pc.appendChild(el('div','mini','עוד אין משקלים. רשום משקלי עבודה בתוך האימון, והשיאים יופיעו פה אוטומטית.'));
  } else {
    prs.forEach(r=>{
      const row=el('div','prrow');
      row.innerHTML=`<div class="pr-lift"><b>${r.lift}</b><i class="latin">${(r.date||'').slice(5)}</i></div>
        <div class="pr-val"><span class="pr-w latin">${r.weight}<small>ק״ג</small></span><span class="pr-x latin">× ${r.reps||'?'}</span></div>
        ${r.est?`<div class="pr-e latin" title="e1RM משוער">≈${r.est}</div>`:''}`;
      pc.appendChild(row);
    });
    pc.appendChild(el('div','mini','השיא = הסט הכי כבד שרשמת. ≈ זו הערכת 1RM (Epley).'));
  }
  app.appendChild(pc);

  const ck = DB.get('checkin_'+todayKey(), {});
  const f = el('div','card'); f.innerHTML='<div class="card-h">צ׳ק-אין היום</div>';
  const fields = [
    ['weight','משקל (ק״ג)','number'],
    ['sleep','שעות שינה','number'],
    ['mood','מצב רוח 1-10','number'],
    ['pain','כאב מרפק/גב 0-3','number'],
  ];
  fields.forEach(([id,label,type])=>{
    const w=el('label','field'); w.innerHTML=`<span>${label}</span><input type="${type}" inputmode="decimal" value="${ck[id]??''}">`;
    w.querySelector('input').oninput=(e)=>{ ck[id]=e.target.value; };
    f.appendChild(w);
  });
  const save=el('button','bigbtn','שמור צ׳ק-אין');
  save.onclick=()=>{ ck.date=todayKey(); DB.set('checkin_'+todayKey(), ck);
    const all=DB.get('checkins',[]); const i=all.findIndex(x=>x.date===ck.date); if(i>=0)all[i]=ck; else all.unshift(ck); DB.set('checkins',all);
    save.textContent='נשמר ✓'; setTimeout(()=>save.textContent='שמור צ׳ק-אין',1500); renderHistory(); };
  f.appendChild(save);
  app.appendChild(f);

  const hist=el('div','card'); hist.id='histcard'; app.appendChild(hist); renderHistory();

  const logs=DB.get('worklog',[]);
  if(logs.length){
    const ELB={ok:'מרפק שקט',felt:'מרפק הרגיש',pain:'מרפק כאב'};
    const lc=el('div','card'); lc.innerHTML='<div class="card-h">אימונים אחרונים</div>';
    logs.slice(0,8).forEach(l=>{
      const meta=[]; if(l.rpe) meta.push('RPE '+l.rpe); if(l.elbow&&ELB[l.elbow]) meta.push(ELB[l.elbow]);
      const r=el('div','logrow');
      r.innerHTML=`<span class="latin">${l.date}</span><b>${l.code} · ${l.name}${meta.length?' · '+meta.join(' · '):''}</b>`+
        (l.lifts&&l.lifts.length?`<i class="latin lf-tags">${l.lifts.join('  ·  ')}</i>`:'')+
        (l.note?`<i>${l.note}</i>`:'');
      lc.appendChild(r);
    });
    app.appendChild(lc);
  }
}
function renderHistory(){
  const c=document.getElementById('histcard'); if(!c)return;
  const all=DB.get('checkins',[]).slice(0,10);
  c.innerHTML='<div class="card-h">מעקב</div>';
  if(!all.length){ c.appendChild(el('div','mini','עוד אין נתונים. מלא צ׳ק-אין ראשון למעלה.')); return; }
  const t=el('table','htab'); t.innerHTML='<tr><th>תאריך</th><th>משקל</th><th>שינה</th><th>מצב</th></tr>';
  all.forEach(x=>{ const r=el('tr',null,`<td class="latin">${(x.date||'').slice(5)}</td><td class="latin">${x.weight||'-'}</td><td class="latin">${x.sleep||'-'}</td><td class="latin">${x.mood||'-'}</td>`); t.appendChild(r); });
  c.appendChild(t);
}

/* ---------------- NAV ---------------- */
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{ activeTab=t.dataset.tab; render(); });
render();

/* service worker */
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
