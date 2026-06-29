/* MoshFit PWA — CFFB-01. Local-first (localStorage); Supabase sync hooks in sync.js. */

/* ---------------- BLOCK DATA ---------------- */
const HE_DOW = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];

const WORKOUTS = {
  A: { code:'A', name:'GROUNDED', focus:'רגליים · סקוואט + לאנג׳', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות לסקוואט, דמבל/קטלבל ללאנג׳, חבל. לכתוב משקל Front Squat על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חבל 2 דק׳, goblet squat hold, world\'s greatest stretch, front squat ריק ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Front Squat 4×4 @65%, מנוחה 90 שנ׳. ואז Walking/Reverse Lunge 3×8 לרגל מועמס, ברך שמאל בקו.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Dead Bug 3×10 · Side Plank 2×30 שנ׳ לצד.'},
    {tag:'WOD', t:9, title:'מטקון · Tabata ×3 (20/10)', d:'סבב 1 Air Squat · סבב 2 Mountain Climbers · סבב 3 Jump Rope.'},
    {tag:'DOWN',t:3, title:'שחרור', d:'pigeon, quad stretch, נשימות. לרשום בלוג.'},
  ]},
  B: { code:'B', name:'OVERHEAD', focus:'פלג גוף עליון', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות ל-press, דמבלים קלים, גומיית Pallof. לכתוב משקל Push Press על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חתירה 2 דק׳, band dislocates, scap push-up, press ריק ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Push Press 5×4 @65%, הנעה מהרגליים. מנוחה 90 שנ׳.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Lateral Raise 3×15 (medial delt) · Pallof Press 3×12.'},
    {tag:'WOD', t:9, title:'מטקון · AMRAP 9', d:'10 Push-up · 12 Ring Row · 14 Russian Twist.'},
    {tag:'DOWN',t:3, title:'שחרור', d:'מתיחת חזה, lat stretch, נשימות.'},
  ]},
  C: { code:'C', name:'EXPLODE', focus:'כוח-מהירות', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט+צלחות, קטלבל, בוקס נמוך. רצפה פנויה להנפות. לכתוב משקל Power Clean על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חבל 2 דק׳, muscle clean ריק, front rack stretch, קפיצות נמוכות.'},
    {tag:'STR', t:16,title:'כוח', d:'Power Clean 6×3 @60% טכני ונפיץ. מנוחה 2 דק׳. בסוף Push Jerk 3×3 קל.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Bent-over Row 3×10 (אחיזה ניטרלית) · Plank 3×40 שנ׳.'},
    {tag:'WOD', t:9, title:'מטקון · EMOM 9', d:'דקה זוגית 10 KB Swing · דקה אי-זוגית 8 Box Jump נמוך.'},
    {tag:'DOWN',t:3, title:'שחרור', d:'שחרור אמה/שורש כף יד, child\'s pose, נשימות.'},
  ]},
  D: { code:'D', name:'ANCHOR', focus:'ציר · גב תחתון', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט (trap bar אם יש)+צלחות, straps, מזרן ל-core. לכתוב משקל הדדליפט על הלוח.'},
    {tag:'WARM',t:7, title:'חימום', d:'חתירה 2 דק׳, hip hinge drill, glute activation, דדליפט קל ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Deadlift 5×3 @65% עם straps, גב ניטרלי. מנוחה 2 דק׳.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Single-Leg Glute Bridge 3×10 לצד · Hollow Hold 3×30 שנ׳.'},
    {tag:'WOD', t:9, title:'מטקון · For Time 21-15-9', d:'Air Squat + Sit-up, ובסוף כל סבב 30 Jump Rope. קצב מבוקר.'},
    {tag:'DOWN',t:3, title:'שחרור', d:'hamstring stretch, שחרור גב תחתון, נשימות.'},
  ]},
  REST: { code:'R', name:'מנוחה', focus:'הגוף בונה עכשיו', train:false, stages:[
    {tag:'REST',t:0, title:'יום מנוחה', d:'הליכה קלה או מתיחות אם בא לך, בלי לכפות. שינה היא האימון של היום.'},
  ]},
};

const SPECIAL = {
  '2026-07-01': { code:'1', name:'FIRST TOUCH', focus:'יום פתיחה · Re-Entry 50-60%', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'היכרות עם הבוקס: איפה המוטות, הצלחות, החבל. להוציא מוט ריק/קל.'},
    {tag:'WARM',t:7, title:'חימום', d:'3 דק׳ חבל קל, cat-cow, band pull-apart, scap push-ups, bodyweight squat ×10.'},
    {tag:'STR', t:16,title:'כוח', d:'Front Squat לימוד תנועה 5×5 במוט ריק/קל (20-30 ק״ג). depth מלא, גב זקוף. לומדים, לא מעמיסים.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Glute Bridge 3×12 · Dead Bug 3×8 לצד.'},
    {tag:'WOD', t:9, title:'מטקון · Intervals 30/30 ×6', d:'סירוגין Row / Air Squat. קל-בינוני, להזיע בלי לקרוס.'},
    {tag:'DOWN',t:3, title:'שחרור', d:'מתיחת hip flexors, couch stretch, 10 נשימות עמוקות.'},
  ]},
  '2026-07-02': { code:'2', name:'OPEN GATES', focus:'יום פתיחה · Re-Entry 50-60%', train:true, stages:[
    {tag:'SET', t:4, title:'setup', d:'מוט קל, קטלבל 12, בוקס, גומייה. תחנה אחת נקייה.'},
    {tag:'WARM',t:7, title:'חימום', d:'3 דק׳ חתירה, arm circles, band face-pull, incline push-up ×8.'},
    {tag:'STR', t:16,title:'כוח', d:'Strict Press לימוד 5×5 במוט קל (20-25 ק״ג). שליטה מלאה, ליבה אסופה.'},
    {tag:'ACC', t:6, title:'עזר + קור', d:'Face Pull 3×15 · Pallof Press 3×10 לצד.'},
    {tag:'WOD', t:9, title:'מטקון · AMRAP 9', d:'8 KB Swing (12 ק״ג) · 8 Box Step-up · 8 Hollow Rock. קצב נינוח.'},
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
let timer = {iv:null, left:0, idx:-1};
function viewWorkout(){
  const d = selectedDate;
  const p = planFor(d);
  const isToday = todayKey(d)===todayKey();
  const dateLbl = `${HE_DOW[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}${isToday?' · היום':''}`;
  app.appendChild(el('div','hero', `<div class="kick">WORKOUT · ${p.code} · ${dateLbl}</div><h1>${p.name}</h1><div class="focus">${p.focus}</div>`));

  if(!p.train){ app.appendChild(el('div','card','<div class="mini">יום מנוחה. תן לגוף לבנות. הליכה קלה אם בא לך.</div>')); return; }

  const total = p.stages.reduce((a,s)=>a+s.t,0);
  app.appendChild(el('div','totalbar', `<span>${total} דקות דלת לדלת</span><span class="latin">DOOR → DOOR</span>`));

  p.stages.forEach((s,i)=>{
    const st = el('div','stage');
    st.innerHTML = `<div class="st-head"><span class="st-tag latin">${s.tag}</span><span class="st-title">${s.title}</span><span class="st-time">${s.t}′</span></div>
      <div class="st-body">${s.d}</div>
      ${s.t>0?`<button class="st-timer" data-i="${i}">התחל טיימר ${s.t}:00</button>`:''}
      <div class="st-count" id="cnt-${i}"></div>`;
    if(s.t>0) st.querySelector('.st-timer').onclick=()=>startTimer(i, s.t, p);
    app.appendChild(st);
  });

  const fin = el('button','bigbtn','סיימתי את האימון · רשום בלוג');
  fin.onclick=()=>logWorkout(p);
  app.appendChild(fin);
}
function startTimer(i, mins, p){
  if(timer.iv){ clearInterval(timer.iv); document.getElementById('cnt-'+timer.idx).textContent=''; }
  timer.idx=i; timer.left=mins*60;
  const out=document.getElementById('cnt-'+i);
  const tick=()=>{ const m=Math.floor(timer.left/60), s=timer.left%60; out.textContent=`${m}:${String(s).padStart(2,'0')}`;
    if(timer.left<=0){ clearInterval(timer.iv); timer.iv=null; out.textContent='הזמן נגמר ✓'; if(navigator.vibrate)navigator.vibrate([200,100,200]); return; } timer.left--; };
  tick(); timer.iv=setInterval(tick,1000);
}
function logWorkout(p){
  const note = prompt('איך היה? (משקלים, תחושה, איך המרפק הגיב)');
  if(note===null) return;
  const logs = DB.get('worklog', []);
  logs.unshift({date:todayKey(), code:p.code, name:p.name, note});
  DB.set('worklog', logs);
  alert('נרשם. כל הכבוד שהגעת.');
  activeTab='progress'; render();
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
  app.appendChild(el('div','hero','<div class="kick">PROGRESS</div><h1>צ׳ק-אין <em>והתקדמות</em></h1>'));

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
    const lc=el('div','card'); lc.innerHTML='<div class="card-h">אימונים אחרונים</div>';
    logs.slice(0,8).forEach(l=>{ const r=el('div','logrow'); r.innerHTML=`<span class="latin">${l.date}</span><b>${l.code} · ${l.name}</b><i>${l.note||''}</i>`; lc.appendChild(r); });
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
