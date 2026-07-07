/* MoshFit PWA — CFFB-01. Local-first (localStorage); Supabase sync hooks in sync.js.
   Chalk-box edition: chalkboards + manila clipboards, bilingual he/en, metcon scores, Spotify. */

/* ---------------- LANGUAGE ---------------- */
let LANG = (function(){ try{ return JSON.parse(localStorage.getItem('mf_lang')) || 'he'; }catch(e){ return 'he'; } })();
function tx(v){ return (v && typeof v==='object' && ('he' in v)) ? (v[LANG] ?? v.he) : v; }
function applyLang(){
  document.documentElement.dir  = LANG==='he' ? 'rtl' : 'ltr';
  document.documentElement.lang = LANG;
}
const T = {
  train:{he:'אימון',en:'TRAIN'}, rest:{he:'מנוחה',en:'REST DAY'},
  today:{he:'היום',en:'Today'}, calendar:{he:'לוח',en:'Board'}, workout:{he:'אימון',en:'WOD'},
  nutrition:{he:'תזונה',en:'Fuel'}, progress:{he:'התקדמות',en:'Progress'},
  todayWod:{he:'האימון של היום',en:"TODAY'S SESSION"},
  openFull:{he:'פתח אימון מלא ←',en:'Open full session →'},
  suppsToday:{he:'תוספים היום',en:'SUPPLEMENTS'},
  nutriTitle:{he:'תזונה',en:'FUEL'}, trainDay:{he:'יום אימון',en:'training day'}, restDay:{he:'יום מנוחה',en:'rest day'},
  kcal:{he:'קל׳',en:'kcal'}, protein:{he:'חלבון',en:'protein'}, fat:{he:'שומן',en:'fat'}, carbs:{he:'פחמ׳',en:'carbs'},
  boxesShop:{he:'קופסאות ורשימת קניות ←',en:'Boxes & shopping list →'},
  evening:{he:'הערב',en:'TONIGHT'},
  eveningTxt:{he:'מגנזיום ב-22:00 · יעד שינה 22:30 (קימה 05:30). השינה היא התקרה של התוצאות.',en:'Magnesium at 22:00 · sleep by 22:30 (up at 05:30). Sleep is the ceiling on your results.'},
  checkinCta:{he:'צ׳ק-אין יומי',en:'DAILY CHECK-IN'},
  checkinGo:{he:'משקל, שינה, מצב רוח, כאב ←',en:'Weight, sleep, mood, pain →'},
  doorToDoor:{he:'דקות דלת לדלת',en:'minutes door to door'},
  restNote:{he:'יום מנוחה. תן לגוף לבנות. הליכה קלה אם בא לך.',en:'Rest day. Let the body build. Easy walk if you feel like it.'},
  monoNote:{he:'יום אפור על הלוח = יום שהגוף צובע אותך מחר.',en:'A grey day on the board = the body paints you back tomorrow.'},
  weightsH:{he:'משקלי עבודה — רשום תוך כדי',en:'WORKING WEIGHTS — log as you go'},
  weightsMini:{he:'נשמר אוטומטית. השיאים מתעדכנים בעמוד התקדמות.',en:'Saved automatically. PRs update on the Progress page.'},
  kg:{he:'ק״ג',en:'kg'}, reps:{he:'חז׳',en:'reps'},
  restBetween:{he:'מנוחה בין סטים',en:'REST BETWEEN SETS'},
  restLbl:{he:'מנוחה',en:'rest'},
  finishH:{he:'סיום אימון — דו״ח',en:'SESSION DEBRIEF'},
  finishQ:{he:'איך היה? מה עשית, תחושה, איך המרפק הגיב',en:'How was it? What you did, how it felt, how the elbow behaved'},
  finishPh:{he:'כמה מילים ביומן...',en:'A few words for the journal...'},
  rpe:{he:'RPE · כמה קשה (1-10)',en:'RPE · how hard (1-10)'},
  elbow:{he:'מרפק (tennis elbow)',en:'Elbow (tennis elbow)'},
  elbOk:{he:'שקט',en:'quiet'}, elbFelt:{he:'הרגשתי',en:'felt it'}, elbPain:{he:'כאב',en:'pain'},
  saveLog:{he:'שמור בלוג · סיימתי',en:'SAVE — DONE FOR TODAY'},
  savedWell:{he:'נשמר ✓ כל הכבוד',en:'Saved ✓ well done'},
  stop:{he:'⏸ עצור',en:'⏸ stop'},
  timer:{he:'טיימר',en:'timer'},
  stopwatch:{he:'סטופר',en:'stopwatch'},
  finish:{he:'סיום ✓',en:'DONE ✓'},
  round:{he:'סבב',en:'ROUND'},
  stopUp:{he:'סופר עולה · עצור כשסיימת',en:'counting up · stop when done'},
  scoreH:{he:'תוצאת המטקון — על הלוח',en:'METCON SCORE — ON THE BOARD'},
  scoreMin:{he:'דק׳',en:'min'}, scoreSec:{he:'שנ׳',en:'sec'},
  scoreRounds:{he:'סבבים',en:'rounds'}, scoreReps:{he:'חזרות',en:'reps'},
  scoreDone:{he:'הושלמו',en:'done'}, scoreOf:{he:'מתוך',en:'of'},
  scoreNotePh:{he:'הערה: משקל, סקיילינג, איפה נשבר...',en:'Note: load, scaling, where it broke...'},
  rx:{he:'RX כמו שכתוב',en:'RX as written'}, scaled:{he:'Scaled מותאם',en:'Scaled'},
  saveScore:{he:'כתוב על הלוח',en:'CHALK IT UP'},
  scoreSaved:{he:'נכתב ✓',en:'Chalked ✓'},
  musicH:{he:'מוזיקה לאימון',en:'BOX SOUNDTRACK'},
  musicOpen:{he:'פתח נגן ספוטיפיי',en:'Open Spotify player'},
  musicPh:{he:'הדבק קישור פלייליסט/אלבום מספוטיפיי',en:'Paste a Spotify playlist/album link'},
  musicSet:{he:'החלף',en:'Set'},
  musicMini:{he:'הנגן דורש אינטרנט. אפשר להדביק כל קישור ספוטיפיי והוא יישמר.',en:'Player needs internet. Paste any Spotify link and it sticks.'},
  calKick:{he:'לוח הבלוק · 1.7–28.7',en:'BLOCK BOARD · JUL 1–28'},
  calH1a:{he:'הבלוק',en:'THE BLOCK'}, calH1b:{he:'קדימה',en:'AHEAD'},
  calFocus:{he:'CFFB-01 · 4 שבועות · הקש על יום לפתוח אותו',en:'CFFB-01 · 4 weeks · tap a day to open it'},
  legend:{he:'מקרא',en:'LEGEND'},
  legRest:{he:'שינה והתאוששות',en:'sleep & recovery'},
  nutKick:{he:'תזונה · דל-פחמימה',en:'FUEL · LOW-CARB'},
  nutH1a:{he:'קופסאות',en:'BOXES'}, nutH1b:{he:'ומאקרו',en:'& MACROS'},
  boxesH:{he:'הקופסאות',en:'The boxes'},
  shopH:{he:'רשימת קניות · חמישי',en:'Shopping list · Thursday'},
  prepH:{he:'הכנה',en:'PREP'},
  prepTxt:{he:'חמישי בערב: לגרל את כל העוף בנינג׳ה (בלי פלטות עישון), קציצות בקר, סיר אורז על הכיריים. טונה לא צריכה בישול, חלבון מיידי.',en:'Thursday night: grill all the chicken in the Ninja (no smoke plates), beef patties, pot of rice on the stove. Tuna needs no cooking — instant protein.'},
  progKick:{he:'התקדמות',en:'PROGRESS'},
  progH1a:{he:'הנתונים',en:'MY'}, progH1b:{he:'שלי',en:'NUMBERS'},
  prH:{he:'בורסת השיאים',en:'PR EXCHANGE'},
  prEmpty:{he:'עוד אין משקלים. רשום משקלי עבודה בתוך האימון, והשיאים יופיעו פה אוטומטית.',en:'No weights yet. Log working weights inside a session and PRs show up here.'},
  prMini:{he:'השיא = הסט הכי כבד שרשמת. ≈ זו הערכת 1RM (Epley).',en:'PR = heaviest set you logged. ≈ is an Epley e1RM estimate.'},
  scoresH:{he:'לוח הגיר · תוצאות מטקון',en:'THE CHALKBOARD · METCON SCORES'},
  scoresEmpty:{he:'הלוח עוד נקי. סיים מטקון, כתוב תוצאה, והיא תישאר פה בגיר.',en:'Board is still clean. Finish a metcon, chalk the score, it stays here.'},
  checkinH:{he:'צ׳ק-אין היום',en:'CHECK-IN — TODAY'},
  fWeight:{he:'משקל (ק״ג)',en:'Weight (kg)'}, fSleep:{he:'שעות שינה',en:'Hours of sleep'},
  fMood:{he:'מצב רוח 1-10',en:'Mood 1-10'}, fPain:{he:'כאב מרפק/גב 0-3',en:'Elbow/back pain 0-3'},
  saveCheckin:{he:'שמור צ׳ק-אין',en:'SAVE CHECK-IN'}, saved:{he:'נשמר ✓',en:'Saved ✓'},
  wtrend:{he:'מגמת משקל גוף',en:'BODYWEIGHT TREND'},
  wtrendEmpty:{he:'צריך לפחות 2 שקילות לגרף. מלא משקל בצ׳ק-אין כל יום ותראה את הקו.',en:'Need at least 2 weigh-ins for the line. Log weight daily in the check-in.'},
  wStart:{he:'התחלה',en:'start'}, wNow:{he:'עכשיו',en:'now'}, wDiff:{he:'שינוי',en:'change'},
  histH:{he:'מעקב',en:'TRACKING'},
  histEmpty:{he:'עוד אין נתונים. מלא צ׳ק-אין ראשון למעלה.',en:'No data yet. Fill your first check-in above.'},
  thDate:{he:'תאריך',en:'Date'}, thW:{he:'משקל',en:'Weight'}, thS:{he:'שינה',en:'Sleep'}, thM:{he:'מצב',en:'Mood'},
  lastH:{he:'אימונים אחרונים',en:'RECENT SESSIONS'},
  elbLog:{ok:{he:'מרפק שקט',en:'elbow quiet'},felt:{he:'מרפק הרגיש',en:'elbow felt'},pain:{he:'מרפק כאב',en:'elbow pain'}},
  backupH:{he:'גיבוי ושחזור',en:'BACKUP & RESTORE'},
  backupWhat:{he:'כל הנתונים שלך יושבים על הטלפון הזה בלבד. גבה לפני מעבר מכשיר או ניקוי דפדפן.',en:'All your data lives on this phone only. Back up before switching device or clearing the browser.'},
  backupCopy:{he:'העתק גיבוי',en:'Copy backup'},
  backupCopied:{he:'הועתק ✓ שמור בהערות/וואטסאפ',en:'Copied ✓ save it in Notes/WhatsApp'},
  backupShow:{he:'הצג טקסט לגיבוי ידני',en:'Show text for manual backup'},
  restorePh:{he:'הדבק כאן טקסט גיבוי כדי לשחזר...',en:'Paste a backup text here to restore...'},
  restoreBtn:{he:'שחזר מהטקסט',en:'Restore from text'},
  restoreDone:{he:'שוחזר ✓',en:'Restored ✓'},
  restoreBad:{he:'הטקסט לא תקין',en:'Invalid backup text'},
  restoreConfirm:{he:'לשחזר? זה יחליף את הנתונים הנוכחיים במכשיר.',en:'Restore? This replaces the current data on this device.'},
  eqBar:{he:'מוט',en:'Barbell'}, eqPlates:{he:'צלחות לכל צד',en:'Plates per side'},
  eqKb:{he:'קטלבל',en:'Kettlebell'}, eqDb:{he:'דמבלים',en:'Dumbbells'},
  eqRope:{he:'חבל קפיצה',en:'Jump rope'}, eqBox:{he:'בוקס',en:'Box'},
  eqBand:{he:'גומיית התנגדות',en:'Resistance band'}, eqMat:{he:'מזרן',en:'Mat'},
  eqRings:{he:'טבעות',en:'Rings'}, eqRower:{he:'מכונת חתירה',en:'Rower'},
  eqStraps:{he:'רצועות משיכה',en:'Lifting straps'},
  emptyBar:{he:'מוט ריק, בלי צלחות',en:'empty bar, no plates'},
  target:{he:'המשקל להיום',en:"today's load"},
  whyFirst:{he:'נקודת פתיחה. מכאן זה מתעדכן לפי מה שתרשום',en:'starting point — updates from what you log'},
  whyUp:{he:'עלייה: פעם קודמת {w} והשלמת את החזרות',en:'moving up: last time {w} and you hit the reps'},
  whySame:{he:'כמו פעם קודמת, קודם משלימים חזרות',en:'same as last time — hit the reps first'},
  whyStick:{he:'המשקל שעבדת איתו לאחרונה',en:'what you used last time'},
  allSets:{he:'כל הסטים אותו דבר:',en:'all sets the same:'},
  detailSets:{he:'פירוט סט-סט ↓',en:'set by set ↓'},
  hideDetail:{he:'סגור פירוט ↑',en:'hide detail ↑'},
  setN:{he:'סט',en:'set'}, addSet:{he:'+ עוד סט',en:'+ add set'},
  kgEach:{he:'ק״ג ליד',en:'kg each'},
  actual:{he:'מה עשיתי בפועל:',en:'what I actually did:'},
  stageNotePh:{he:'פתק לעצמי: איך הלך החלק הזה...',en:'note to self: how this part went...'},
};
function t(k){ return tx(T[k]); }

const HE_DOW = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const EN_DOW = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function dowName(d){ return LANG==='he' ? HE_DOW[d.getDay()] : EN_DOW[d.getDay()]; }

/* ---------------- BLOCK DATA (bilingual) ---------------- */
const B = (he,en)=>({he,en});

const WORKOUTS = {
  A: { code:'A', name:'GROUNDED', focus:B('רגליים · סקוואט + לאנג׳','Legs · squat + lunge'), train:true,
    lifts:[{name:'Front Squat',scheme:'4×4 @65%',sets:4,reps:4,start:30,inc:2.5,equip:'bar'},
           {name:'Walking Lunge',scheme:'3×8/leg',sets:3,reps:8,start:8,inc:2,equip:'db',each:true}],
    equip:[{t:'bar',lift:'Front Squat'},{t:'db',lift:'Walking Lunge'},{t:'rope'},{t:'mat',note:B('לקור בסוף','for the core work')}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('מוט+צלחות לסקוואט, דמבל/קטלבל ללאנג׳, חבל. לכתוב משקל Front Squat על הלוח.','Bar + plates for squats, DB/KB for lunges, jump rope. Chalk your Front Squat weight on the board.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('חבל 2 דק׳, goblet squat hold, world\'s greatest stretch, front squat ריק ×8.','2 min rope, goblet squat hold, world\'s greatest stretch, empty-bar front squat ×8.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Front Squat 4×4 @65%, מנוחה 90 שנ׳. ואז Walking/Reverse Lunge 3×8 לרגל מועמס, ברך שמאל בקו.','Front Squat 4×4 @65%, rest 90s. Then loaded Walking/Reverse Lunge 3×8 per leg, left knee tracking.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Dead Bug 3×10 · Side Plank 2×30 שנ׳ לצד.','Dead Bug 3×10 · Side Plank 2×30s per side.')},
    {tag:'WOD', t:9, title:B('מטקון · Tabata ×3 (20/10)','Metcon · Tabata ×3 (20/10)'), d:B('סבב 1 Air Squat · סבב 2 Mountain Climbers · סבב 3 Jump Rope.','Round 1 Air Squat · round 2 Mountain Climbers · round 3 Jump Rope.'),
      timer:{mode:'interval', label:'Tabata 20/10', rounds:18, phases:[{label:B('עבודה','WORK'),sec:20,work:1},{label:B('מנוחה','REST'),sec:10,work:0}], cycle:['Air Squat','Mountain Climbers','Jump Rope']}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('pigeon, quad stretch, נשימות. לרשום בלוג.','Pigeon, quad stretch, breathing. Then log it.')},
  ]},
  B: { code:'B', name:'OVERHEAD', focus:B('פלג גוף עליון','Upper body'), train:true,
    lifts:[{name:'Push Press',scheme:'5×4 @65%',sets:5,reps:4,start:25,inc:2.5,equip:'bar'}],
    accLoads:[{name:'Lateral Raise',scheme:'3×15',sets:3,reps:15,start:4,inc:1,equip:'db',each:true}],
    equip:[{t:'bar',lift:'Push Press'},{t:'db',lift:'Lateral Raise'},{t:'band',note:B('ל-Pallof Press','for Pallof Press')},{t:'rings',note:B('ל-Ring Row במטקון','for metcon Ring Rows')},{t:'rower',note:B('לחימום','for the warm-up')}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('מוט+צלחות ל-press, דמבלים קלים, גומיית Pallof. לכתוב משקל Push Press על הלוח.','Bar + plates for the press, light DBs, Pallof band. Chalk your Push Press weight on the board.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('חתירה 2 דק׳, band dislocates, scap push-up, press ריק ×8.','2 min row, band dislocates, scap push-ups, empty-bar press ×8.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Push Press 5×4 @65%, הנעה מהרגליים. מנוחה 90 שנ׳.','Push Press 5×4 @65%, drive from the legs. Rest 90s.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Lateral Raise 3×15 (medial delt) · Pallof Press 3×12.','Lateral Raise 3×15 (medial delt) · Pallof Press 3×12.')},
    {tag:'WOD', t:9, title:B('מטקון · AMRAP 9','Metcon · AMRAP 9'), d:B('10 Push-up · 12 Ring Row · 14 Russian Twist.','10 Push-ups · 12 Ring Rows · 14 Russian Twists.'),
      timer:{mode:'amrap', label:'AMRAP 9', sec:540}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('מתיחת חזה, lat stretch, נשימות.','Chest stretch, lat stretch, breathing.')},
  ]},
  C: { code:'C', name:'EXPLODE', focus:B('כוח-מהירות','Speed-strength'), train:true,
    lifts:[{name:'Power Clean',scheme:'6×3 @60%',sets:6,reps:3,start:25,inc:2.5,equip:'bar'},
           {name:'Push Jerk',scheme:'3×3 light',sets:3,reps:3,start:20,inc:2.5,equip:'bar'}],
    accLoads:[{name:'Bent-over Row',scheme:'3×10',sets:3,reps:10,start:10,inc:2,equip:'db',each:true}],
    wodLoads:[{name:'KB Swing',start:12,equip:'kb',sticky:true}],
    equip:[{t:'bar',lift:'Power Clean'},{t:'kb',lift:'KB Swing'},{t:'db',lift:'Bent-over Row'},{t:'box',note:B('נמוך, לקפיצות','low, for jumps')},{t:'rope',note:B('לחימום','for the warm-up')}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('מוט+צלחות, קטלבל, בוקס נמוך. רצפה פנויה להנפות. לכתוב משקל Power Clean על הלוח.','Bar + plates, kettlebell, low box. Clear floor for pulls. Chalk your Power Clean weight on the board.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('חבל 2 דק׳, muscle clean ריק, front rack stretch, קפיצות נמוכות.','2 min rope, empty-bar muscle clean, front-rack stretch, low jumps.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Power Clean 6×3 @60% טכני ונפיץ. מנוחה 2 דק׳. בסוף Push Jerk 3×3 קל.','Power Clean 6×3 @60%, technical and explosive. Rest 2 min. Finish with light Push Jerk 3×3.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Bent-over Row 3×10 (אחיזה ניטרלית) · Plank 3×40 שנ׳.','Bent-over Row 3×10 (neutral grip) · Plank 3×40s.')},
    {tag:'WOD', t:9, title:B('מטקון · EMOM 9','Metcon · EMOM 9'), d:B('דקה זוגית 10 KB Swing · דקה אי-זוגית 8 Box Jump נמוך.','Even minutes 10 KB Swings · odd minutes 8 low Box Jumps.'),
      timer:{mode:'interval', label:'EMOM 9', rounds:9, phases:[{label:B('דקה','MINUTE'),sec:60,work:1}], cycle:[B('10 KB Swing','10 KB Swings'),B('8 Box Jump נמוך','8 low Box Jumps')]}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('שחרור אמה/שורש כף יד, child\'s pose, נשימות.','Forearm/wrist release, child\'s pose, breathing.')},
  ]},
  D: { code:'D', name:'ANCHOR', focus:B('ציר · גב תחתון','Hinge · lower back'), train:true,
    lifts:[{name:'Deadlift',scheme:'5×3 @65%',sets:5,reps:3,start:50,inc:5,equip:'bar'}],
    equip:[{t:'bar',lift:'Deadlift',note:B('trap bar אם יש','trap bar if available')},{t:'straps'},{t:'rope',note:B('למטקון','for the metcon')},{t:'rower',note:B('לחימום','for the warm-up')},{t:'mat',note:B('לקור','for the core work')}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('מוט (trap bar אם יש)+צלחות, straps, מזרן ל-core. לכתוב משקל הדדליפט על הלוח.','Bar (trap bar if available) + plates, straps, mat for core. Chalk your deadlift weight on the board.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('חתירה 2 דק׳, hip hinge drill, glute activation, דדליפט קל ×8.','2 min row, hip hinge drill, glute activation, light deadlift ×8.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Deadlift 5×3 @65% עם straps, גב ניטרלי. מנוחה 2 דק׳.','Deadlift 5×3 @65% with straps, neutral spine. Rest 2 min.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Single-Leg Glute Bridge 3×10 לצד · Hollow Hold 3×30 שנ׳.','Single-Leg Glute Bridge 3×10 per side · Hollow Hold 3×30s.')},
    {tag:'WOD', t:9, title:B('מטקון · For Time 21-15-9','Metcon · For Time 21-15-9'), d:B('Air Squat + Sit-up, ובסוף כל סבב 30 Jump Rope. קצב מבוקר.','Air Squats + Sit-ups, 30 Jump Rope after each round. Controlled pace.'),
      timer:{mode:'fortime', label:'For Time', cap:540}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('hamstring stretch, שחרור גב תחתון, נשימות.','Hamstring stretch, lower-back release, breathing.')},
  ]},
  REST: { code:'R', name:B('מנוחה','REST'), focus:B('הגוף בונה עכשיו','The body is building now'), train:false, stages:[
    {tag:'REST',t:0, title:B('יום מנוחה','rest day'), d:B('הליכה קלה או מתיחות אם בא לך, בלי לכפות. שינה היא האימון של היום.','Easy walk or stretching if you feel like it, never forced. Sleep is today\'s workout.')},
  ]},
};

const SPECIAL = {
  '2026-07-01': { code:'1', name:'FIRST TOUCH', focus:B('יום פתיחה · Re-Entry 50-60%','Opening day · re-entry 50-60%'), train:true,
    lifts:[{name:'Front Squat',scheme:'5×5 learn',sets:5,reps:5,start:20,inc:2.5,equip:'bar'}],
    equip:[{t:'bar',lift:'Front Squat',note:B('קל, לומדים תנועה','light — skill work')},{t:'rope'},{t:'band'},{t:'rower',note:B('למטקון','for the metcon')},{t:'mat'}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('היכרות עם הבוקס: איפה המוטות, הצלחות, החבל. להוציא מוט ריק/קל.','Meet the box: where the bars, plates and rope live. Grab an empty/light bar.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('3 דק׳ חבל קל, cat-cow, band pull-apart, scap push-ups, bodyweight squat ×10.','3 min easy rope, cat-cow, band pull-aparts, scap push-ups, bodyweight squat ×10.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Front Squat לימוד תנועה 5×5 במוט ריק/קל (20-30 ק״ג). depth מלא, גב זקוף. לומדים, לא מעמיסים.','Front Squat skill work 5×5 with an empty/light bar (20-30 kg). Full depth, upright back. Learning, not loading.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Glute Bridge 3×12 · Dead Bug 3×8 לצד.','Glute Bridge 3×12 · Dead Bug 3×8 per side.')},
    {tag:'WOD', t:9, title:B('מטקון · Intervals 30/30 ×6','Metcon · Intervals 30/30 ×6'), d:B('סירוגין Row / Air Squat. קל-בינוני, להזיע בלי לקרוס.','Alternate Row / Air Squat. Easy-moderate — sweat, don\'t collapse.'),
      timer:{mode:'interval', label:'Intervals 30/30', rounds:12, phases:[{label:B('עבודה','WORK'),sec:30,work:1}], cycle:['Row','Air Squat']}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('מתיחת hip flexors, couch stretch, 10 נשימות עמוקות.','Hip flexor stretch, couch stretch, 10 deep breaths.')},
  ]},
  '2026-07-02': { code:'2', name:'OPEN GATES', focus:B('יום פתיחה · Re-Entry 50-60%','Opening day · re-entry 50-60%'), train:true,
    lifts:[{name:'Strict Press',scheme:'5×5 learn',sets:5,reps:5,start:20,inc:2.5,equip:'bar'}],
    wodLoads:[{name:'KB Swing',start:12,equip:'kb',sticky:true}],
    equip:[{t:'bar',lift:'Strict Press',note:B('קל, לומדים תנועה','light — skill work')},{t:'kb',lift:'KB Swing'},{t:'box',note:B('ל-Step-up','for step-ups')},{t:'band'},{t:'rower',note:B('לחימום','for the warm-up')}], stages:[
    {tag:'SET', t:4, title:B('הכנה','setup'), d:B('מוט קל, קטלבל 12, בוקס, גומייה. תחנה אחת נקייה.','Light bar, 12 kg kettlebell, box, band. One clean station.')},
    {tag:'WARM',t:7, title:B('חימום','warm-up'), d:B('3 דק׳ חתירה, arm circles, band face-pull, incline push-up ×8.','3 min row, arm circles, band face-pulls, incline push-up ×8.')},
    {tag:'STR', t:16,title:B('כוח','strength'), d:B('Strict Press לימוד 5×5 במוט קל (20-25 ק״ג). שליטה מלאה, ליבה אסופה.','Strict Press skill work 5×5 with a light bar (20-25 kg). Full control, braced core.')},
    {tag:'ACC', t:6, title:B('עזר + קור','accessory + core'), d:B('Face Pull 3×15 · Pallof Press 3×10 לצד.','Face Pull 3×15 · Pallof Press 3×10 per side.')},
    {tag:'WOD', t:9, title:B('מטקון · AMRAP 9','Metcon · AMRAP 9'), d:B('8 KB Swing (12 ק״ג) · 8 Box Step-up · 8 Hollow Rock. קצב נינוח.','8 KB Swings (12 kg) · 8 Box Step-ups · 8 Hollow Rocks. Relaxed pace.'),
      timer:{mode:'amrap', label:'AMRAP 9', sec:540}},
    {tag:'DOWN',t:3, title:B('שחרור','cool-down'), d:B('מתיחת חזה בפתח דלת, thoracic rotation, נשימות.','Doorway chest stretch, thoracic rotation, breathing.')},
  ]},
};

const BYDOW = {0:'A',1:'B',2:'REST',3:'C',4:'D',5:'REST',6:'REST'};

const NUTRITION = {
  train: { kcal:'~2200', p:'155', f:'115', c:'~130' },
  rest:  { kcal:'~1900', p:'150', f:'110', c:'~80' },
  boxes: [
    [B('בוקר','Morning'), B('3 ביצים + חצי אבוקדו + עגבנייה','3 eggs + half avocado + tomato'), '~22'],
    [B('שייק (אימון)','Shake (train)'), B('Whey + בננה קטנה לפני, מיד אחרי','Whey + small banana pre, right after'), '~25'],
    [B('קופסה 1 · צהריים','Box 1 · lunch'), B('180ג׳ חזה עוף + פחמימה קטנה + ירקות','180g chicken breast + small carb + veg'), '~45'],
    [B('קופסה 2 · ערב','Box 2 · dinner'), B('טונה / דג / בקר רזה + סלט + חומוס במידה','Tuna / fish / lean beef + salad + hummus in moderation'), '~40'],
    [B('תוספת','Extra'), B('יוגורט יווני 0% / קוטג׳ + אגוזים','0% Greek yogurt / cottage + nuts'), '~22'],
  ],
  shop: [
    [B('חלבון','Protein'), [B('חזה עוף 1.5 ק״ג','Chicken breast 1.5 kg'),B('דג (סלמון/בקלה) 600 גרם','Fish (salmon/cod) 600g'),B('טונה בקופסה ×6','Canned tuna ×6'),B('בקר רזה 5% 500 גרם','Lean beef 5% 500g'),B('ביצים ×24','Eggs ×24'),B('יוגורט יווני 0% ×4','0% Greek yogurt ×4'),B('קוטג׳ 5% ×2','Cottage 5% ×2')]],
    [B('פחמימה (מעט)','Carbs (light)'), [B('אורז, מנות מדודות','Rice, measured portions'),B('בטטה 700 גרם','Sweet potato 700g'),B('חומוס מוכן ×1-2','Hummus ×1-2'),B('בננות ×5 (לפני אימון)','Bananas ×5 (pre-workout)')]],
    [B('ירקות ושומן טוב','Veg & good fat'), [B('סלט: מלפפון, עגבנייה, פלפל, חסה','Salad: cucumber, tomato, pepper, lettuce'),B('ברוקולי, כרובית, שעועית ירוקה, פטריות','Broccoli, cauliflower, green beans, mushrooms'),B('בצל, שום','Onion, garlic'),B('אבוקדו ×4-5','Avocado ×4-5'),B('אגוזים/שקדים, שמן זית','Nuts/almonds, olive oil')]],
  ],
};

const SUPPS = [
  {id:'creatine', name:B('קריאטין 5 גרם','Creatine 5g'), when:B('בוקר','morning')},
  {id:'vitd', name:B('ויטמין D 2000','Vitamin D 2000'), when:B('בוקר עם אוכל','morning with food')},
  {id:'whey', name:B('Whey אחרי אימון','Whey post-workout'), when:B('ימי אימון','training days')},
  {id:'omega', name:B('אומגה 3','Omega 3'), when:B('עם ארוחה','with a meal')},
  {id:'mag', name:B('מגנזיום','Magnesium'), when:B('22:00 לפני שינה','22:00 before sleep')},
];

/* ---------------- STORE (local-first) ---------------- */
const DB = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem('mf_'+k)) ?? def; }catch(e){ return def; } },
  set(k, v){ localStorage.setItem('mf_'+k, JSON.stringify(v)); if(window.MFSync) window.MFSync.push(k, v); },
};

/* ---------------- BACKUP / RESTORE (portable, URL-agnostic) ----------------
   Everything is in localStorage under the mf_ prefix. This dumps/loads all of
   it as one text blob so data survives a device switch or a move to a new URL. */
function exportAll(){
  const out={_mf:1, _v:7, when:new Date().toISOString(), data:{}};
  for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && k.indexOf('mf_')===0) out.data[k]=localStorage.getItem(k); }
  return JSON.stringify(out);
}
function importAll(str){
  let obj; try{ obj=JSON.parse(str); }catch(e){ return false; }
  if(!obj || !obj._mf || !obj.data || typeof obj.data!=='object') return false;
  Object.entries(obj.data).forEach(([k,v])=>{ if(k.indexOf('mf_')===0 && typeof v==='string') localStorage.setItem(k, v); });
  return true;
}

/* ---------------- HELPERS ---------------- */
function todayKey(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

/* lift log: flat list of {date, code, lift, weight, reps, sets?:[{w,r}]} — source of truth
   for PRs AND for the adaptive load suggestions. weight/reps = "all sets the same";
   sets[] = optional set-by-set detail that wins when present. */
function liftGet(date, lift){
  return DB.get('liftlog',[]).find(x=>x.date===date && x.lift===lift) || null;
}
function liftSet(date, code, def, quickW, quickR, sets){
  const log = DB.get('liftlog',[]);
  const i = log.findIndex(x=>x.date===date && x.lift===def.name);
  sets = (sets||[]).filter(s=>s.w!=='' || s.r!=='')
    .map(s=>({w:s.w===''?null:Number(s.w), r:s.r===''?null:Number(s.r)}));
  let w = quickW===''||quickW==null ? null : Number(quickW);
  let r = quickR===''||quickR==null ? null : Number(quickR);
  if(w==null && sets.length){ // detail only: headline = the heaviest set
    const best = sets.reduce((a,b)=>((b.w||0)>(a.w||0)?b:a));
    w = best.w; if(r==null) r = best.r;
  }
  if(w==null && r==null && !sets.length){ if(i>=0){ log.splice(i,1); DB.set('liftlog',log); } return; }
  const rec = {date, code, lift:def.name, weight:w, reps:r};
  if(sets.length) rec.sets = sets;
  if(i>=0) log[i]=rec; else log.push(rec);
  DB.set('liftlog', log);
}
function e1rm(w, r){ if(!w||!r) return null; return Math.round(w*(1+r/30)); } // Epley estimate
function recTopWeight(rec){
  let w = rec.weight||0;
  (rec.sets||[]).forEach(s=>{ if((s.w||0)>w) w=s.w; });
  return w||null;
}
function repsAtTop(rec, w){
  let r = (rec.weight===w) ? rec.reps : null;
  (rec.sets||[]).forEach(s=>{ if(s.w===w && (s.r||0)>(r||0)) r=s.r; });
  return r;
}
function personalRecords(){
  const byLift = {};
  DB.get('liftlog',[]).forEach(x=>{
    const w = recTopWeight(x); if(!w) return;
    const r = repsAtTop(x, w);
    const b = byLift[x.lift];
    if(!b || w>b.weight || (w===b.weight && (r||0)>(b.reps||0)))
      byLift[x.lift] = {lift:x.lift, date:x.date, weight:w, reps:r};
  });
  return Object.values(byLift).map(b=>({...b, est:e1rm(b.weight,b.reps)}))
    .sort((a,b)=>b.weight-a.weight);
}

/* ---- adaptive load engine ----
   Suggestion = last logged performance for that movement. Hit the prescribed reps
   in every set → one increment up. Missed → same weight. No history → start weight.
   sticky (metcon loads without rep logging) → whatever you used last time. */
function roundLoad(w, equip){
  if(equip==='kb'){ const s=[4,8,12,16,20,24,28,32]; return s.reduce((a,b)=>Math.abs(b-w)<Math.abs(a-w)?b:a); }
  if(equip==='bar') return Math.round(w/2.5)*2.5;
  return Math.round(w*2)/2;
}
function recHitTarget(rec, def){
  if(rec.sets && rec.sets.length)
    return rec.sets.length>=def.sets && rec.sets.filter(s=>(s.r||0)>=def.reps).length>=def.sets;
  return (rec.reps||0) >= def.reps;
}
function suggestFor(def, beforeDate){
  const hist = DB.get('liftlog',[])
    .filter(x=>x.lift===def.name && x.date<beforeDate && recTopWeight(x))
    .sort((a,b)=>a.date<b.date?1:-1);
  if(!hist.length) return {w:roundLoad(def.start,def.equip), why:'first'};
  const last=hist[0], top=recTopWeight(last);
  if(def.sticky || def.inc==null) return {w:top, why:'stick', prev:top};
  if(recHitTarget(last, def)) return {w:roundLoad(top+def.inc,def.equip), why:'up', prev:top};
  return {w:top, why:'same', prev:top};
}
function findDef(p, name){
  return [].concat(p.lifts||[], p.accLoads||[], p.wodLoads||[]).find(d=>d.name===name) || null;
}
/* plate math: what to load per side on a 20 kg bar */
const PLATE_SIZES=[20,15,10,5,2.5,1.25];
function plateBreakdown(total, barKg){
  barKg = barKg||20;
  if(total==null || total<=barKg) return {empty:true};
  let per=(total-barKg)/2; const out=[];
  for(const pl of PLATE_SIZES){ while(per>=pl-0.001){ out.push(pl); per-=pl; } }
  return {empty:false, plates:out};
}

/* per-stage "how it went" notes: {date, code, tag, text} */
function stageNoteGet(date, code, tag){
  return (DB.get('stagenotes',[]).find(x=>x.date===date&&x.code===code&&x.tag===tag)||{}).text||'';
}
function stageNoteSet(date, code, tag, text){
  const all=DB.get('stagenotes',[]);
  const i=all.findIndex(x=>x.date===date&&x.code===code&&x.tag===tag);
  if(!text){ if(i>=0){ all.splice(i,1); DB.set('stagenotes',all); } return; }
  const rec={date,code,tag,text};
  if(i>=0) all[i]=rec; else all.unshift(rec);
  DB.set('stagenotes',all);
}

/* metcon score log: {date, code, wod, mode, a, b, rx, note}
   fortime: a=min b=sec · amrap: a=rounds b=reps · interval: a=rounds done b=total */
function metconGet(date, code){
  return DB.get('metconlog',[]).find(x=>x.date===date && x.code===code) || null;
}
function metconSet(rec){
  const log = DB.get('metconlog',[]);
  const i = log.findIndex(x=>x.date===rec.date && x.code===rec.code);
  if(i>=0) log[i]=rec; else log.unshift(rec);
  DB.set('metconlog', log);
}
function metconScoreStr(m){
  if(m.mode==='fortime') return `${m.a||0}:${String(m.b||0).padStart(2,'0')}`;
  if(m.mode==='amrap')   return `${m.a||0}R${m.b?'+'+m.b:''}`;
  return `${m.a??'?'}/${m.b??'?'}`;
}

function planFor(d){
  const k = todayKey(d);
  if(SPECIAL[k]) return SPECIAL[k];
  return WORKOUTS[BYDOW[d.getDay()]];
}
function el(tag, cls, html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

/* ---------------- CHALK ART (bespoke SVG, no icons/emoji) ---------------- */
const CH='#eceadf', TQ='#3ed3c8', OR='#f4a261';
function figSvg(inner, vb){
  return `<svg viewBox="${vb||'0 0 100 100'}" fill="none" stroke="${CH}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".92">${inner}</svg>`;
}
/* the chalk athletes — one per session type */
const FIGS = {
  A: figSvg(`<path d="M14 34 L86 33" stroke-width="4"/><circle cx="18" cy="33.5" r="8" stroke="${TQ}"/><circle cx="82" cy="33.5" r="8" stroke="${TQ}"/>
    <circle cx="47" cy="24" r="7"/><path d="M46 31 C44 40 42 48 40 55"/><path d="M43 36 L56 33"/>
    <path d="M40 55 C48 58 56 60 60 63 L57 80 L70 82"/><path d="M40 55 L34 74 L46 76"/>
    <path d="M20 92 q8 -6 16 0 q8 6 16 0 q8 -6 16 0" stroke-width="1.6" opacity=".5"/>`),
  B: figSvg(`<path d="M15 16 L85 15" stroke-width="4"/><circle cx="19" cy="15.5" r="8" stroke="${TQ}"/><circle cx="81" cy="15.5" r="8" stroke="${TQ}"/>
    <circle cx="50" cy="34" r="7"/><path d="M50 41 L50 64"/><path d="M50 45 L38 30 M50 45 L62 30"/>
    <path d="M50 64 L41 86 M50 64 L60 85"/>
    <path d="M28 92 l10 -3 M62 92 l10 -3" stroke-width="1.6" opacity=".5"/>`),
  C: figSvg(`<path d="M18 44 L80 42" stroke-width="4"/><circle cx="22" cy="43.5" r="8" stroke="${OR}"/><circle cx="76" cy="43.5" r="8" stroke="${OR}"/>
    <circle cx="52" cy="30" r="7"/><path d="M50 37 L46 56"/><path d="M49 42 L40 46 M49 42 L60 45"/>
    <path d="M46 56 L38 72 L44 88 M46 56 L58 70 L54 87"/>
    <path d="M84 60 l6 -8 M87 70 l7 -5 M85 80 l8 -2" stroke="${TQ}" stroke-width="2" opacity=".7"/>`),
  D: figSvg(`<path d="M16 72 L84 71" stroke-width="4"/><circle cx="20" cy="71.5" r="8" stroke="${TQ}"/><circle cx="80" cy="71.5" r="8" stroke="${TQ}"/>
    <circle cx="38" cy="26" r="7"/><path d="M42 32 C50 38 56 46 58 54"/><path d="M46 38 L48 66 M52 42 L54 66"/>
    <path d="M58 54 L60 88"/><path d="M58 54 C52 66 48 78 50 88"/>
    <path d="M14 92 q10 -5 20 0" stroke-width="1.6" opacity=".5"/>`),
  R: figSvg(`<path d="M12 78 L88 78" stroke-width="2" opacity=".6"/>
    <circle cx="24" cy="68" r="7"/><path d="M31 70 C44 72 58 72 72 70 L80 76"/><path d="M46 71 L52 60 L62 64"/>
    <path d="M64 22 a10 10 0 1 0 8 16 a8 8 0 0 1 -8 -16" stroke="${OR}" stroke-width="2.4"/>
    <path d="M78 34 l5 1 M80 26 l4 -2" stroke-width="1.8" opacity=".6"/>`),
  S: figSvg(`<circle cx="50" cy="22" r="7"/><path d="M50 29 L50 56"/><path d="M50 36 L34 26 M50 36 L66 24"/>
    <path d="M50 56 L38 82 M50 56 L62 82"/>
    <path d="M20 14 l-6 8 6 8 M80 12 l6 8 -6 8" stroke="${TQ}" stroke-width="2.4"/>`),
};
function heroFig(code){ return FIGS[code] || (String(code).match(/^\d/) ? FIGS.S : FIGS.A); }

/* bespoke chalk equipment icons — hand-line style, same DNA as the athletes */
function eqSvg(inner){
  return `<svg viewBox="0 0 40 28" fill="none" stroke="${CH}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
const EQICONS = {
  bar: eqSvg(`<path d="M4 14.2 L36 13.8" stroke-width="2.6"/><path d="M8.2 7 L8 21 M12 9.2 L12.2 18.8" stroke="${TQ}" stroke-width="2.6"/><path d="M31.8 7.2 L32 21 M28 9 L27.8 19" stroke="${TQ}" stroke-width="2.6"/>`),
  plates: eqSvg(`<circle cx="14" cy="14" r="10"/><circle cx="14" cy="14" r="3.4" stroke="${OR}"/><circle cx="30" cy="16.5" r="7"/><circle cx="30" cy="16.5" r="2.3" stroke="${OR}"/>`),
  kb: eqSvg(`<path d="M15.5 9.5 a5 5 0 0 1 9.5 -.3"/><path d="M14 11 q-4.5 5 -2.5 9 a9.5 7 0 0 0 17.5 -.3 q1.8 -4 -2.5 -8.7 z" stroke="${TQ}"/>`),
  db: eqSvg(`<path d="M13 14.1 L27 13.9" stroke-width="2.4"/><path d="M9.2 8 L9 20 M13 10 L13.2 18" stroke="${TQ}" stroke-width="2.4"/><path d="M30.8 8.2 L31 20 M27 10.2 L26.8 18" stroke="${TQ}" stroke-width="2.4"/>`),
  rope: eqSvg(`<path d="M8 5.5 L8.2 12 M32 5.8 L31.8 12" stroke="${OR}" stroke-width="2.6"/><path d="M8.2 12 C8 23 15.5 26 20 22 C24.5 18.2 32 20.5 31.8 12"/>`),
  box: eqSvg(`<path d="M7 12.2 L20 6.8 L33 12 L33.2 22 L7.2 22.2 Z"/><path d="M7 12.2 L20 16 L33 12 M20 16 L20.2 22" stroke-width="1.3" opacity=".7"/>`),
  band: eqSvg(`<ellipse cx="20" cy="13.5" rx="13" ry="7.5" stroke="${TQ}"/><path d="M10 18.5 q10 -3.5 20 -.3" stroke-width="1.4" opacity=".7"/>`),
  mat: eqSvg(`<path d="M5 20.2 L26 20 M5.2 15.8 L26 16"/><circle cx="31" cy="18" r="5.5" stroke="${OR}"/><circle cx="31" cy="18" r="1.7"/>`),
  rings: eqSvg(`<path d="M13 3 L13.2 10.5 M27 3.2 L26.8 10.5" stroke-width="1.6"/><circle cx="13" cy="17" r="6" stroke="${OR}"/><circle cx="27" cy="17" r="6" stroke="${OR}"/>`),
  rower: eqSvg(`<path d="M5 21.5 L35 21.2"/><path d="M10 21 L10.2 13.5 a5.5 5.5 0 0 1 5.8 -.2 L16 21" stroke="${TQ}"/><path d="M22 16.5 l7 .2 .2 4.5 -7.2 -.2 z"/><path d="M25.5 16.5 L30 8.5" stroke-width="1.6"/>`),
  straps: eqSvg(`<path d="M14 4 L14 17.5 q0 4.5 4.5 4.5 M26 4.2 L26 17.5 q0 4.5 -4.5 4.5" stroke="${OR}"/><path d="M11 4 L17 4 M23 4.2 L29 4.2"/>`),
};
const EQNAMES = {bar:'eqBar',plates:'eqPlates',kb:'eqKb',db:'eqDb',rope:'eqRope',box:'eqBox',band:'eqBand',mat:'eqMat',rings:'eqRings',rower:'eqRower',straps:'eqStraps'};

/* memphis chalk scribbles for the wall between boards */
const SCRIB = [
  `<svg viewBox="0 0 70 16" stroke="${TQ}" fill="none" stroke-width="2" stroke-linecap="round"><path d="M3 12 L12 4 L21 12 L30 4 L39 12 L48 4"/></svg>`,
  `<svg viewBox="0 0 40 18" stroke="${OR}" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 14 C4 4 14 4 14 9 C14 14 24 14 24 8 C24 3 34 4 36 8"/></svg>`,
  `<svg viewBox="0 0 24 24" stroke="${CH}" fill="none" stroke-width="2" stroke-linecap="round"><path d="M5 5 L19 19 M19 5 L5 19"/></svg>`,
  `<svg viewBox="0 0 30 30" stroke="${TQ}" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="15" cy="15" r="9" stroke-dasharray="4 5"/></svg>`,
  `<svg viewBox="0 0 46 14" stroke="${OR}" fill="none" stroke-width="2" stroke-linecap="round"><path d="M3 7 L36 7 M30 2 L38 7 L30 12"/></svg>`,
];
function scribbleRow(i){
  const a = SCRIB[i % SCRIB.length], b = SCRIB[(i+2) % SCRIB.length];
  return el('div','wall-scribble', `${a}${b}`);
}
function squig(color){
  return `<svg class="squig" viewBox="0 0 120 10" fill="none" stroke="${color||CH}" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M3 6 C13 2 20 9 30 5 C40 1 48 9 58 5 C68 1 76 9 86 5 C96 2 104 8 114 5"/></svg>`;
}
function zigdiv(){
  return `<svg class="zigdiv" viewBox="0 0 300 8" preserveAspectRatio="none" fill="none" stroke="${CH}" stroke-width="1.6"><path d="M0 6 L15 2 L30 6 L45 2 L60 6 L75 2 L90 6 L105 2 L120 6 L135 2 L150 6 L165 2 L180 6 L195 2 L210 6 L225 2 L240 6 L255 2 L270 6 L285 2 L300 6"/></svg>`;
}
const CHECKMARK = `<svg viewBox="0 0 34 34" fill="none" stroke="${OR}" stroke-width="3.4" stroke-linecap="round"><path d="M7 18 L15 26 L28 7"/></svg>`;
function trayBar(){
  const w = el('div','traybar');
  w.innerHTML = `<i style="inset-inline-start:12%;width:34px;background:linear-gradient(90deg,#fdfbef,#cfcbb8)"></i>
    <i style="inset-inline-start:46%;width:22px;background:linear-gradient(90deg,#7fe0d8,#3ec0b6);transform:rotate(2deg)"></i>
    <i style="inset-inline-end:14%;width:27px;background:linear-gradient(90deg,#f8c18d,#e08a3c);transform:rotate(-3deg)"></i>`;
  return w;
}

/* ---------------- CHALK FX ---------------- */
function chalkPoof(x, y, opts){
  const n=(opts&&opts.n)||14, color=(opts&&opts.color)||'236,234,223';
  for(let i=0;i<n;i++){
    const p=document.createElement('i'); p.className='poof';
    const a=Math.random()*Math.PI*2, d=18+Math.random()*48, s=3+Math.random()*5;
    p.style.cssText=`left:${x}px;top:${y}px;width:${s}px;height:${s}px;`+
      `background:rgba(${color},${(0.4+Math.random()*0.5).toFixed(2)});`+
      `--dx:${(Math.cos(a)*d).toFixed(0)}px;--dy:${(Math.sin(a)*d-16).toFixed(0)}px;`+
      `animation-delay:${(Math.random()*90)|0}ms`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 900);
  }
}
function poofAt(elm, opts){
  const r=elm.getBoundingClientRect();
  chalkPoof(r.left+r.width/2, r.top+r.height/2, opts);
}

/* hand-drawn chalk numerals — the score writes itself on the board */
const GLYPHS={
  '0':{w:40,d:'M20 8 C7 10 7 50 20 52 C33 50 33 10 20 8'},
  '1':{w:26,d:'M6 18 L16 8 L16 52'},
  '2':{w:40,d:'M9 17 C10 4 32 6 30 19 C28 31 12 37 8 52 L33 50'},
  '3':{w:40,d:'M9 12 C24 3 34 14 21 25 C36 29 33 52 8 46'},
  '4':{w:40,d:'M26 8 L8 36 L34 36 M25 22 L25 52'},
  '5':{w:40,d:'M31 8 L12 10 L10 28 C25 22 34 32 30 42 C26 52 13 52 9 45'},
  '6':{w:40,d:'M29 9 C15 13 8 33 12 44 C16 54 30 52 30 42 C29 32 16 32 12 40'},
  '7':{w:36,d:'M7 10 L31 8 L16 52'},
  '8':{w:40,d:'M20 28 C8 24 10 8 20 8 C30 8 32 24 20 28 C7 33 10 52 20 52 C30 52 33 33 20 28'},
  '9':{w:40,d:'M29 19 C29 7 12 6 10 18 C8 30 27 30 29 19 L26 52'},
  ':':{w:18,d:'M9 22 a1.6 1.6 0 1 0 .1 0 M9 40 a1.6 1.6 0 1 0 .1 0'},
  '+':{w:34,d:'M17 16 L17 40 M5 28 L29 28'},
  '/':{w:30,d:'M25 8 L5 52'},
  'R':{w:38,d:'M9 52 L9 8 L24 8 C35 10 35 26 24 28 L9 28 M21 28 L33 52'},
  '?':{w:34,d:'M8 16 C10 4 30 6 28 18 C27 27 17 27 17 36 M17 46 a1.6 1.6 0 1 0 .1 0'},
  ' ':{w:14,d:''},
};
function chalkWrite(host, str){
  const ov=el('div','chalkwrite');
  let x=6; const parts=[];
  String(str).split('').forEach(ch=>{
    const g=GLYPHS[ch]||GLYPHS['?'];
    if(g.d) parts.push(`<g transform="translate(${x},0) rotate(${(Math.random()*4-2).toFixed(1)} 20 30)"><path d="${g.d}"/></g>`);
    x+=g.w;
  });
  ov.innerHTML=`<svg viewBox="0 0 ${x+6} 60" preserveAspectRatio="xMidYMid meet">${parts.join('')}</svg>`;
  host.appendChild(ov);
  let delay=100;
  ov.querySelectorAll('path').forEach(p=>{
    const L=p.getTotalLength();
    p.style.strokeDasharray=L; p.style.strokeDashoffset=L;
    p.style.animation=`chalk-draw .3s ease-out ${delay}ms forwards`;
    delay+=170;
  });
  setTimeout(()=>{ ov.style.transition='opacity .45s'; ov.style.opacity='0'; setTimeout(()=>ov.remove(),500); }, delay+1000);
  return delay;
}

/* stock-ticker count-up for the PR exchange */
function countUp(elm, val, dur){
  const dec=String(val).includes('.')?1:0;
  const node=elm.childNodes[0];
  if(!node || node.nodeType!==3) return;
  const t0=performance.now();
  const step=(t)=>{
    const k=Math.min((t-t0)/(dur||700),1), e=1-Math.pow(1-k,3);
    node.nodeValue=(val*e).toFixed(dec);
    if(k<1) requestAnimationFrame(step); else node.nodeValue=String(val);
  };
  node.nodeValue=(0).toFixed(dec);
  requestAnimationFrame(step);
}

/* PR! — dust burst + chalk sticker on a new personal record */
function celebratePR(wrap){
  const head=wrap.querySelector('.lb-head');
  if(head && !head.querySelector('.prtag')) head.insertAdjacentHTML('beforeend','<span class="prtag">PR!</span>');
  poofAt(head||wrap, {n:26, color:'244,162,97'});
  buzz([90,40,90,40,160]);
}

/* museum-style wall label */
function plate(html){ return `<span class="plate">${html}</span>`; }

/* progressive breakdown: boards hang straighter at the top, crooked further down */
function chaosTilt(){
  const items = app.querySelectorAll(':scope > .board, :scope > .clip');
  items.forEach((b,i)=>{
    const sign = i%2 ? -1 : 1;
    const tilt = Math.min(0.15 + i*i*0.16, 2.6) * sign;
    const shift = Math.min(i*1.6, 11) * -sign;
    b.style.setProperty('--tilt', tilt.toFixed(2)+'deg');
    b.style.setProperty('--shift', shift.toFixed(1)+'px');
  });
}

/* ---------------- VIEWS ---------------- */
const app = document.getElementById('view');
let activeTab = 'today';
let selectedDate = new Date(); // which day the workout player shows
let musicOpen = false;         // session-level: keep the player open across tab switches
const BLOCK_START = new Date('2026-07-01T12:00:00');
const BLOCK_END   = new Date('2026-07-28T12:00:00');

function render(){
  applyLang();
  app.innerHTML='';
  app.classList.remove('mono');
  app.appendChild(langBtn());
  if(activeTab==='today') viewToday();
  else if(activeTab==='calendar') viewCalendar();
  else if(activeTab==='workout') viewWorkout();
  else if(activeTab==='nutrition') viewNutrition();
  else if(activeTab==='progress') viewProgress();
  document.querySelectorAll('.tab').forEach(tb=>{
    tb.classList.toggle('on', tb.dataset.tab===activeTab);
    const s=tb.querySelector('[data-nav]'); if(s) s.textContent = tx(T[s.dataset.nav]);
  });
  chaosTilt();
  window.scrollTo(0,0);
}
function langBtn(){
  const b = el('button','langbtn', LANG==='he' ? 'EN' : 'עב');
  b.onclick = ()=>{ LANG = LANG==='he' ? 'en' : 'he'; DB.set('lang', LANG); render(); };
  return b;
}
function hero(kick, h1, focus, figCode){
  const h = el('div','hero');
  h.innerHTML = `${plate(kick)}<h1>${h1}</h1>${focus?`<div class="focus">${focus}</div>`:''}${figCode?`<span class="fig">${heroFig(figCode)}</span>`:''}`;
  return h;
}

/* ---- TODAY ---- */
function viewToday(){
  const d = new Date();
  const p = planFor(d);
  const isTrain = p.train;
  const n = isTrain ? NUTRITION.train : NUTRITION.rest;
  if(!isTrain) app.classList.add('mono'); // rest day: color drained from the wall, floods back tomorrow

  const dd = `<span class="lt">${d.getDate()}.${d.getMonth()+1}</span>`;
  app.appendChild(hero(
    `${dowName(d)} · ${dd} · <b><span class="lt">CFFB-01</span></b>`,
    `${t(isTrain?'train':'rest')} <em>${tx(p.name)}</em>`,
    tx(p.focus), isTrain?p.code:'R'
  ));

  if(isTrain){
    const bd = el('div','board tray tappable');
    bd.innerHTML = `<div class="board-h t">${t('todayWod')}</div>${squig(TQ)}
      <div class="mini">${tx(p.stages.find(s=>s.tag==='STR')?.d)||''}</div>
      <div class="go">${t('openFull')}</div>`;
    bd.appendChild(trayBar());
    bd.onclick=()=>{ selectedDate=new Date(); activeTab='workout'; render(); };
    app.appendChild(bd);
  } else {
    app.appendChild(el('div','board', `<div class="board-h">${tx(WORKOUTS.REST.stages[0].title)}</div>${squig(CH)}
      <div class="mini">${tx(WORKOUTS.REST.stages[0].d)}</div>
      <div class="mini" style="margin-top:8px;opacity:.7">${t('monoNote')}</div>`));
  }

  app.appendChild(scribbleRow(1));

  // supplements — chalk checklist
  const sk = 'supp_'+todayKey();
  const done = DB.get(sk, {});
  const sc = el('div','board');
  sc.innerHTML = `<div class="board-h o">${t('suppsToday')}</div>${squig(OR)}`;
  SUPPS.forEach(s=>{
    if(s.id==='whey' && !isTrain) return;
    const row = el('div','check'+(done[s.id]?' done':''));
    row.innerHTML = `<span class="cbx">${CHECKMARK}</span>
      <span><b>${tx(s.name)}</b><i>${tx(s.when)}</i></span>`;
    row.onclick=()=>{
      done[s.id]=!done[s.id]; DB.set(sk,done); row.classList.toggle('done',done[s.id]);
      if(done[s.id]){ poofAt(row.querySelector('.cbx'), {n:10, color:'244,162,97'}); buzz(40); }
    };
    sc.appendChild(row);
  });
  app.appendChild(sc);

  // nutrition — manila clipboard snapshot
  const nc = el('div','clip');
  nc.setAttribute('data-tab', `${t('nutriTitle')} · ${t(isTrain?'trainDay':'restDay')}`);
  nc.innerHTML = `<div class="macros" style="--turq:#0e7c72">
      <div><b style="color:#0e7c72;text-shadow:none">${n.kcal}</b><i style="color:#6b5c38">${t('kcal')}</i></div>
      <div><b style="color:#0e7c72;text-shadow:none">${n.p}</b><i style="color:#6b5c38">${t('protein')}</i></div>
      <div><b style="color:#0e7c72;text-shadow:none">${n.f}</b><i style="color:#6b5c38">${t('fat')}</i></div>
      <div><b style="color:#0e7c72;text-shadow:none">${n.c}</b><i style="color:#6b5c38">${t('carbs')}</i></div>
    </div>
    <div class="clip-h" style="margin-top:10px;cursor:pointer" data-go>${t('boxesShop')}</div>`;
  nc.querySelector('[data-go]').onclick=()=>{ activeTab='nutrition'; render(); };
  app.appendChild(nc);

  // music on the wall
  app.appendChild(musicBoard());

  // evening + checkin
  const ec = el('div','board');
  ec.innerHTML = `<div class="board-h">${t('evening')}</div>${squig(CH)}<div class="mini">${t('eveningTxt')}</div>
    <div class="go" data-ci>${t('checkinCta')} · ${t('checkinGo')}</div>`;
  ec.querySelector('[data-ci]').onclick=()=>{ activeTab='progress'; render(); };
  app.appendChild(ec);
}

/* ---- SPOTIFY ---- */
const DEFAULT_SPOTIFY = 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP'; // Beast Mode
function spotifyEmbed(url){
  const m = String(url||'').match(/spotify\.com\/(?:intl-[a-z]{2}\/)?(playlist|album|track|artist|episode|show)\/([A-Za-z0-9]+)/);
  if(!m) return null;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`;
}
function musicBoard(){
  const bd = el('div','board');
  bd.innerHTML = `<div class="board-h o">${t('musicH')}</div>${squig(OR)}`;
  const wrap = el('div','music-wrap');
  const openBtn = el('button','music-open', `♪ ${t('musicOpen')}`.replace('♪', `<svg style="width:15px;height:15px;vertical-align:-2px" viewBox="0 0 24 24" fill="none" stroke="${OR}" stroke-width="2.2" stroke-linecap="round"><path d="M9 18.5 L9.2 5.5 L19 3.5 L19 16"/><circle cx="6.5" cy="18.5" r="2.6"/><circle cx="16.5" cy="16" r="2.6"/></svg>`));
  const mount = ()=>{
    const src = spotifyEmbed(DB.get('spotify', DEFAULT_SPOTIFY)) || spotifyEmbed(DEFAULT_SPOTIFY);
    wrap.innerHTML = `<iframe src="${src}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      <div class="music-set">
        <input type="url" placeholder="${t('musicPh')}" value="">
        <button>${t('musicSet')}</button>
      </div>
      <div class="mini" style="margin-top:6px">${t('musicMini')}</div>`;
    wrap.querySelector('button').onclick = ()=>{
      const v = wrap.querySelector('input').value.trim();
      if(v && spotifyEmbed(v)){ DB.set('spotify', v); musicOpen=true; mount(); }
      else { wrap.querySelector('input').value=''; wrap.querySelector('input').placeholder = LANG==='he'?'קישור לא תקין, נסה שוב':'Invalid link, try again'; }
    };
  };
  openBtn.onclick = ()=>{ musicOpen=true; openBtn.remove(); mount(); };
  bd.appendChild(openBtn); bd.appendChild(wrap);
  if(musicOpen){ openBtn.remove(); mount(); }
  return bd;
}

/* ---- WORKOUT PLAYER ---- */
let timer = {iv:null, idx:-1, restSec:0, repaint:null, mode:null, elapsed:0};
/* the live athlete: a chalk figure center-screen that mirrors the running timer —
   doing the day's lift while you work, lounging in the hammock while you rest */
function showLiveFig(mode, label){
  let f=document.getElementById('livefig');
  if(!f){ f=el('div'); f.id='livefig'; document.body.appendChild(f); }
  f.innerHTML = (mode==='rest' ? FIGS.R : heroFig(timer.code||'A')) + (label?`<span class="lf-tag">${label}</span>`:'');
  f.className = 'on '+mode;
}
function hideLiveFig(){ const f=document.getElementById('livefig'); if(f) f.className=''; }

function clearActiveTimer(){
  if(timer.iv){ clearInterval(timer.iv); timer.iv=null; }
  if(timer.ov){ timer.ov.remove(); timer.ov=null; }
  hideLiveFig();
  if(timer.idx!==-1){ const o=document.getElementById('cnt-'+timer.idx); if(o) o.textContent=''; const b=document.getElementById('btn-'+timer.idx); if(b) b.textContent=b.dataset.label; }
  document.querySelectorAll('.rt-btns button.on').forEach(b=>b.classList.remove('on'));
  document.querySelectorAll('.stage.pulse').forEach(s=>s.classList.remove('pulse'));
  document.body.classList.remove('training');
  timer.idx=-1; timer.restSec=0; timer.repaint=null; timer.mode=null; releaseWake();
}
function buzz(p){ if(navigator.vibrate) navigator.vibrate(p); }
const mmss = s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

/* audio beeps — must init on a user gesture (timer button press) */
let AC=null;
function ensureAudio(){
  try{ if(!AC) AC=new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended') AC.resume(); }catch(e){}
  initVoice();
}
function beep(freq, dur, vol){
  if(!AC) return;
  try{
    const o=AC.createOscillator(), g=AC.createGain(), tt=AC.currentTime;
    o.type='sine'; o.frequency.value=freq||880;
    o.connect(g); g.connect(AC.destination);
    g.gain.setValueAtTime(vol||0.3, tt);
    g.gain.exponentialRampToValueAtTime(0.0001, tt+(dur||0.12));
    o.start(tt); o.stop(tt+(dur||0.12)+0.02);
  }catch(e){}
}
/* voice announcer — box-style callouts (3-2-1, GO, TIME, REST, Round N) via the
   built-in speech engine. English on purpose: that's how a box sounds. Falls back to beeps. */
let VOICE=null;
function initVoice(){
  if(!('speechSynthesis' in window)) return;
  const pick=()=>{
    const vs=speechSynthesis.getVoices();
    VOICE = vs.find(v=>/^en([-_]|$)/i.test(v.lang) && /Google|Natural|Premium|Enhanced/i.test(v.name))
         || vs.find(v=>/^en([-_]|$)/i.test(v.lang)) || null;
  };
  pick(); if(!VOICE) speechSynthesis.onvoiceschanged=pick;
}
function say(txt){
  if(!VOICE) return false;
  try{
    const u=new SpeechSynthesisUtterance(txt);
    u.voice=VOICE; u.lang=VOICE.lang; u.rate=1.12; u.pitch=1.05; u.volume=1;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
    return true;
  }catch(e){ return false; }
}
function cueCount(n){ if(!say(String(n))) beep(680,0.13,0.28); buzz(70); }
function cueDone(word){ if(!say(word||'TIME!')){ beep(990,0.3,0.32); setTimeout(()=>beep(1180,0.32,0.32),200); } buzz([200,100,200]); }
function cueSwitch(work, round){
  if(!say(work ? (round!=null ? 'Round '+round : 'WORK') : 'REST')) beep(work?880:520,0.16,0.3);
  buzz(work?[140]:[80,50,80]);
}

/* wake lock — keep the screen on while a timer runs */
let wakeLock=null;
async function acquireWake(){
  try{ if('wakeLock' in navigator){ wakeLock=await navigator.wakeLock.request('screen'); } }catch(e){}
}
function releaseWake(){ try{ if(wakeLock){ wakeLock.release(); wakeLock=null; } }catch(e){} }

function viewWorkout(){
  const d = selectedDate;
  const p = planFor(d);
  const isToday = todayKey(d)===todayKey();
  const dKey = todayKey(d);
  const dd = `<span class="lt">${d.getDate()}.${d.getMonth()+1}</span>`;
  const kick = `<span class="lt">WOD · ${p.code}</span> · ${dowName(d)} ${dd}${isToday?` · <b>${t('today')}</b>`:''}`;
  app.appendChild(hero(kick, `${tx(p.name)}`, tx(p.focus), p.train?p.code:'R'));

  if(!p.train){
    app.classList.add('mono');
    app.appendChild(el('div','board',`<div class="board-h">${tx(p.name)}</div>${squig(CH)}<div class="mini">${t('restNote')}</div>`));
    return;
  }

  app.appendChild(musicBoard());

  // one big session board — every stage is a collapsible chalk card that carries
  // its own gear list / weights / timers / score, so you log where you train
  const total = p.stages.reduce((a,s)=>a+s.t,0);
  const sb = el('div','board tray');
  sb.innerHTML = `<div class="board-h t"><span class="lt">${total}′</span> ${t('doorToDoor')}</div>${squig(TQ)}`;
  p.stages.forEach((s,i)=>sb.appendChild(stageCard(p, s, i, dKey)));
  sb.appendChild(trayBar());
  app.appendChild(sb);

  app.appendChild(scribbleRow(3));
  app.appendChild(finishClip(p, dKey));
}

/* ---- stage cards ---- */
const STAGE_OPEN = {};
function stageCard(p, s, i, dKey){
  const key = dKey+':'+i;
  const st = el('div','stage'+(STAGE_OPEN[key]?' open':''));
  const lbl = timerLabel(s);
  st.innerHTML = `${i>0?zigdiv():''}
    <div class="st-head"><span class="st-tag lt${s.tag==='WOD'?' wod':''}">${s.tag}</span><span class="st-title">${tx(s.title)}</span><span class="st-time">${s.t?s.t+'′':''}</span><svg class="st-arr" viewBox="0 0 16 16" fill="none" stroke="${CH}" stroke-width="2.2" stroke-linecap="round"><path d="M8 2.5 L8 13.5 M2.5 8 L13.5 8"/></svg></div>
    <div class="st-x"></div>`;
  const x = st.querySelector('.st-x');

  if(s.tag==='SET' && p.equip) x.appendChild(equipListEl(p, dKey)); // gear list replaces the wall of text
  else x.appendChild(el('div','st-body', tx(s.d)));

  if(s.tag==='STR'){
    (p.lifts||[]).forEach(def=>x.appendChild(liftBlock(p, def, dKey)));
    x.appendChild(restTimerEl());
  }
  if(s.tag==='ACC') (p.accLoads||[]).forEach(def=>x.appendChild(loadRow(p, def, dKey)));

  if(lbl){
    const b = el('button','st-timer'); b.id='btn-'+i; b.dataset.label=lbl; b.textContent=lbl;
    b.onclick=()=>runTimer(i, s);
    x.appendChild(b);
  }
  const cnt = el('div','st-count'); cnt.id='cnt-'+i; x.appendChild(cnt);

  if(s.tag==='WOD'){
    (p.wodLoads||[]).forEach(def=>x.appendChild(loadRow(p, def, dKey)));
    x.appendChild(metconSection(p, s, dKey));
  }
  if(s.tag==='STR' || s.tag==='ACC') x.appendChild(stageNoteEl(dKey, p.code, s.tag));

  st.querySelector('.st-head').onclick=()=>{
    STAGE_OPEN[key] = !STAGE_OPEN[key];
    st.classList.toggle('open', STAGE_OPEN[key]);
    if(STAGE_OPEN[key]) poofAt(st.querySelector('.st-arr'), {n:8});
  };
  return st;
}

/* ---- SET stage: the gear to stage, weights computed from today's targets ---- */
function equipListEl(p, dKey){
  const w = el('div','eqlist');
  const row = (ic, label, sub, wtxt)=>{
    const r = el('div','eqrow');
    r.innerHTML = `<span class="eq-ic">${EQICONS[ic]||''}</span><span class="eq-t"><b>${label}</b>${sub?`<i>${sub}</i>`:''}</span>${wtxt?`<span class="eq-w lt">${wtxt}</span>`:''}`;
    w.appendChild(r);
  };
  (p.equip||[]).forEach(q=>{
    const note = q.note ? tx(q.note) : '';
    if(q.t==='bar'){
      const def = findDef(p, q.lift), sg = def ? suggestFor(def, dKey) : null;
      row('bar', t('eqBar'), [q.lift, note].filter(Boolean).join(' · '), '20 '+t('kg'));
      if(sg){
        const pb = plateBreakdown(sg.w, 20);
        if(pb.empty) row('plates', t('eqPlates'), `${q.lift} ${sg.w} ${t('kg')} · ${t('emptyBar')}`, '—');
        else row('plates', t('eqPlates'), `${q.lift} → ${sg.w} ${t('kg')}`, pb.plates.join(' + '));
      }
    } else if(q.lift){
      const def = findDef(p, q.lift), sg = def ? suggestFor(def, dKey) : null;
      const wt = sg ? ((def.each ? sg.w+'+'+sg.w : String(sg.w))+' '+t('kg')) : '';
      row(q.t, t(EQNAMES[q.t]), [q.lift, note].filter(Boolean).join(' · '), wt);
    } else {
      row(q.t, t(EQNAMES[q.t]), note, q.kg ? q.kg+' '+t('kg') : '');
    }
  });
  return w;
}

/* ---- suggested-load chalk line ---- */
function suggWhy(sg){
  if(sg.why==='first') return t('whyFirst');
  if(sg.why==='up')    return tx(T.whyUp).replace('{w}', sg.prev);
  if(sg.why==='stick') return t('whyStick');
  return t('whySame');
}
function suggLine(def, sg){
  return `<div class="sugg"><span class="sg-l">${t('target')}</span><span class="sg-w">${def.each?sg.w+'+'+sg.w:sg.w}</span><span class="sg-kg">${def.each?t('kgEach'):t('kg')}</span><span class="sg-why">${suggWhy(sg)}</span></div>`;
}

/* ---- STR: one block per lift — target, quick log, optional set-by-set ---- */
function liftBlock(p, def, dKey){
  const rec = liftGet(dKey, def.name) || {};
  const sg = suggestFor(def, dKey);
  const wrap = el('div','liftblock');
  wrap.innerHTML = `
    <div class="lb-head"><b class="lt">${def.name}</b> <span class="plate"><span class="lt">${def.scheme}</span></span></div>
    ${suggLine(def, sg)}
    <div class="lb-quick"><span class="q-lbl">${t('allSets')}</span><span class="qq"><input class="slin q-w" type="number" inputmode="decimal" placeholder="${t('kg')}" value="${rec.weight??''}"><span class="x">×</span><input class="slin q-r" type="number" inputmode="numeric" placeholder="${t('reps')}" value="${rec.reps??''}"></span></div>
    <button class="detbtn"></button>
    <div class="lb-sets" style="display:none"></div>`;
  const qw = wrap.querySelector('.q-w'), qr = wrap.querySelector('.q-r');
  const setsBox = wrap.querySelector('.lb-sets'), det = wrap.querySelector('.detbtn');
  let open = !!(rec.sets && rec.sets.length);

  // today's entry is the standing PR (and there was history to beat) → keep the sticker up
  const pr = personalRecords().find(r=>r.lift===def.name);
  const hadHistory = DB.get('liftlog',[]).some(x=>x.lift===def.name && x.date<dKey && recTopWeight(x));
  if(pr && pr.date===dKey && hadHistory)
    wrap.querySelector('.lb-head').insertAdjacentHTML('beforeend','<span class="prtag">PR!</span>');

  const collect = ()=>Array.from(setsBox.querySelectorAll('.setrow')).map(r=>({
    w: r.querySelector('.s-w').value, r: r.querySelector('.s-r').value }));
  const save = ()=>{
    const before=(personalRecords().find(r=>r.lift===def.name)||{}).weight||0;
    liftSet(dKey, p.code, def, qw.value, qr.value, collect());
    const after=(personalRecords().find(r=>r.lift===def.name)||{}).weight||0;
    if(before>0 && after>before) celebratePR(wrap); // beat your best → magnesium cloud
  };
  const addSetRow = (k, v)=>{
    const r = el('div','setrow');
    r.innerHTML = `<span class="sn">${t('setN')} ${k+1}</span><span class="qq"><input class="slin s-w" type="number" inputmode="decimal" placeholder="${t('kg')}" value="${v.w??''}"><span class="x">×</span><input class="slin s-r" type="number" inputmode="numeric" placeholder="${t('reps')}" value="${v.r??''}"></span>`;
    r.querySelectorAll('input').forEach(inp=>inp.onchange=save);
    const add = setsBox.querySelector('.addset');
    if(add) setsBox.insertBefore(r, add); else setsBox.appendChild(r);
  };
  const buildSets = ()=>{
    setsBox.innerHTML = '';
    const cur = (liftGet(dKey, def.name)||{}).sets || [];
    const n = Math.max(def.sets||3, cur.length);
    for(let k=0;k<n;k++) addSetRow(k, cur[k] || ((qw.value||qr.value) ? {w:qw.value, r:qr.value} : {}));
    const add = el('button','detbtn addset', t('addSet'));
    add.onclick = ()=>addSetRow(setsBox.querySelectorAll('.setrow').length, {});
    setsBox.appendChild(add);
  };
  const paintDet = ()=>{
    det.textContent = open ? t('hideDetail') : t('detailSets');
    setsBox.style.display = open ? 'block' : 'none';
  };
  det.onclick = ()=>{ open = !open; if(open && !setsBox.children.length) buildSets(); paintDet(); };
  if(open) buildSets();
  paintDet();
  qw.onchange = ()=>{ if(!open) setsBox.innerHTML=''; save(); };
  qr.onchange = ()=>{ if(!open) setsBox.innerHTML=''; save(); };
  return wrap;
}

/* ---- ACC / WOD loadable movement: suggested weight + what was actually used ---- */
function loadRow(p, def, dKey){
  const rec = liftGet(dKey, def.name) || {};
  const sg = suggestFor(def, dKey);
  const withReps = def.reps != null;
  const wrap = el('div','liftblock');
  wrap.innerHTML = `
    <div class="lb-head"><b class="lt">${def.name}</b>${def.scheme?` <span class="plate"><span class="lt">${def.scheme}</span></span>`:''}</div>
    ${suggLine(def, sg)}
    <div class="lb-quick"><span class="q-lbl">${t('actual')}</span><span class="qq"><input class="slin q-w" type="number" inputmode="decimal" placeholder="${t('kg')}" value="${rec.weight??''}">${withReps?`<span class="x">×</span><input class="slin q-r" type="number" inputmode="numeric" placeholder="${t('reps')}" value="${rec.reps??''}">`:''}</span></div>`;
  const qw = wrap.querySelector('.q-w'), qr = wrap.querySelector('.q-r');
  const save = ()=>{
    const before=(personalRecords().find(r=>r.lift===def.name)||{}).weight||0;
    liftSet(dKey, p.code, def, qw.value, qr ? qr.value : '', []);
    const after=(personalRecords().find(r=>r.lift===def.name)||{}).weight||0;
    if(before>0 && after>before) celebratePR(wrap);
  };
  qw.onchange = save; if(qr) qr.onchange = save;
  return wrap;
}

/* ---- voice-to-text: a chalk mic on every note — speak, it types itself ---- */
const MIC_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3.2 C9.6 3.3 9 5 9.1 6.5 L9.2 11.8 C9.3 13.8 10.5 14.9 12 14.9 C13.5 14.9 14.8 13.8 14.8 11.8 L14.9 6.4 C15 5 14.4 3.2 12 3.2 Z"/>
  <path d="M5.6 11.4 a6.5 6.5 0 0 0 12.9 .2 M12 17.8 L12.1 21.2 M8.6 21.4 L15.5 21.3"/></svg>`;
function addMic(ta){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR || !ta) return;
  const wrap = el('span','notewrap');
  ta.parentNode.insertBefore(wrap, ta); wrap.appendChild(ta);
  const b = el('button','micbtn'); b.type='button'; b.innerHTML = MIC_SVG;
  let rec=null, active=false;
  b.onclick = (e)=>{
    e.preventDefault(); e.stopPropagation();
    if(active){ try{ rec.stop(); }catch(err){} return; }
    rec = new SR();
    rec.lang = LANG==='he' ? 'he-IL' : 'en-US';
    rec.continuous = true; rec.interimResults = false;
    rec.onresult = (ev)=>{
      let txt='';
      for(let i=ev.resultIndex;i<ev.results.length;i++) if(ev.results[i].isFinal) txt+=ev.results[i][0].transcript;
      if(txt.trim()){
        ta.value = (ta.value ? ta.value.trim()+' ' : '') + txt.trim();
        ta.dispatchEvent(new Event('change')); // autosaves wherever the note autosaves
      }
    };
    rec.onend = ()=>{ active=false; b.classList.remove('rec'); };
    rec.onerror = ()=>{ active=false; b.classList.remove('rec'); };
    try{ rec.start(); active=true; b.classList.add('rec'); buzz(30); }catch(err){}
  };
  wrap.appendChild(b);
}

/* ---- per-stage note ---- */
function stageNoteEl(dKey, code, tag){
  const ta = el('textarea','score-note'); ta.rows = 2; ta.placeholder = t('stageNotePh');
  ta.value = stageNoteGet(dKey, code, tag);
  ta.onchange = ()=>stageNoteSet(dKey, code, tag, ta.value.trim());
  const holder = el('div'); holder.appendChild(ta); addMic(ta);
  return holder;
}

/* button label per timer type (countdown default) */
function timerLabel(s){
  if(!s.timer){ return s.t>0 ? `${t('timer')} ${s.t}:00` : ''; }
  const tm=s.timer;
  if(tm.mode==='fortime') return `▶ ${tm.label} · ${t('stopwatch')}`;
  return `▶ ${tm.label}`;
}

/* ---- rest timer between sets — lives inside the strength card ---- */
function restTimerEl(){
  const rt=el('div','rest-timer slate');
  rt.innerHTML=`<div class="rt-label">${t('restBetween')}</div>
    <div class="rt-btns">
      <button data-sec="30">0:30</button>
      <button data-sec="60">1:00</button>
      <button data-sec="90">1:30</button>
      <button data-sec="180">3:00</button>
    </div>
    <div class="st-count" id="cnt-rest"></div>`;
  rt.querySelectorAll('.rt-btns button').forEach(b=>{
    b.onclick=()=>runRest(Number(b.dataset.sec), b, rt);
  });
  return rt;
}
function runRest(sec, btn, wrap){
  ensureAudio();
  const out=wrap.querySelector('#cnt-rest');
  if(timer.idx==='rest' && timer.iv && timer.restSec===sec){ clearActiveTimer(); return; }
  clearActiveTimer();
  btn.classList.add('on'); acquireWake();
  timer.idx='rest'; timer.restSec=sec;
  timer.code = planFor(selectedDate).code;
  showLiveFig('rest', t('restLbl')); // the athlete hits the hammock
  countdown(out, sec, t('restLbl'), 'GO!'); // rest over → announcer sends you back to the bar
}

/* ---- metcon score — lives inside the WOD card ---- */
function metconSection(p, wodStage, dKey){
  const tm = wodStage.timer;
  const prev = metconGet(dKey, p.code) || {};
  const bd = el('div','score-sec');
  bd.id='scoreboard';
  bd.innerHTML = `<div class="rt-label" style="color:var(--orange);margin-top:10px">${t('scoreH')}</div>`;

  const inputs = el('div','score-in');
  if(tm.mode==='fortime'){
    inputs.innerHTML = `<input id="sc-a" type="number" inputmode="numeric" placeholder="0" value="${prev.a??''}"><span class="unit">${t('scoreMin')}</span>
      <span class="sep">:</span>
      <input id="sc-b" type="number" inputmode="numeric" min="0" max="59" placeholder="00" value="${prev.b??''}"><span class="unit">${t('scoreSec')}</span>`;
  } else if(tm.mode==='amrap'){
    inputs.innerHTML = `<input id="sc-a" type="number" inputmode="numeric" placeholder="0" value="${prev.a??''}"><span class="unit">${t('scoreRounds')}</span>
      <span class="sep">+</span>
      <input id="sc-b" type="number" inputmode="numeric" placeholder="0" value="${prev.b??''}"><span class="unit">${t('scoreReps')}</span>`;
  } else { // interval: EMOM / Tabata / 30-30
    inputs.innerHTML = `<input id="sc-a" type="number" inputmode="numeric" placeholder="${tm.rounds}" value="${prev.a??''}"><span class="unit">${t('scoreDone')}</span>
      <span class="sep">/</span>
      <span style="font-family:'Amatic SC';font-weight:700;font-size:46px;color:var(--dust)">${tm.rounds}</span><span class="unit">${t('scoreOf')}</span>`;
  }
  bd.appendChild(inputs);

  // RX / Scaled chalk toggle
  const seg = el('div','seg chalkseg'); seg.style.marginTop='8px';
  let rx = prev.rx ?? null;
  [['rx',t('rx')],['sc',t('scaled')]].forEach(([v,lbl])=>{
    const b=el('button','seg-b'+(rx===v?' on':''),lbl);
    b.onclick=()=>{ rx=v; seg.querySelectorAll('.seg-b').forEach(x=>x.classList.remove('on')); b.classList.add('on'); };
    seg.appendChild(b);
  });
  bd.appendChild(seg);

  const note = el('textarea','score-note'); note.rows=2; note.placeholder=t('scoreNotePh'); note.value=prev.note||'';
  bd.appendChild(note); addMic(note);

  const save = el('button','bigbtn on-slate', t('saveScore'));
  save.onclick = ()=>{
    const a = bd.querySelector('#sc-a')?.value, b = bd.querySelector('#sc-b')?.value;
    const rec = {date:dKey, code:p.code, name:tx(p.name), wod:tm.label, mode:tm.mode,
      a:a===''||a==null?null:Number(a), b:tm.mode==='interval'?tm.rounds:(b===''||b==null?null:Number(b)),
      rx, note:note.value.trim()};
    metconSet(rec);
    save.textContent = t('scoreSaved'); buzz([120,60,120]);
    const holdMs = chalkWrite(bd, metconScoreStr(rec)); // the score writes itself on the board
    setTimeout(()=>{ save.textContent=t('saveScore'); }, holdMs+1200);
  };
  bd.appendChild(save);
  return bd;
}
/* stopping the For Time stopwatch drops the elapsed time straight into the score */
function prefillForTime(sec){
  const a=document.querySelector('#scoreboard #sc-a'), b=document.querySelector('#scoreboard #sc-b');
  if(!a||!b) return;
  if(a.value==='' && b.value===''){ a.value=Math.floor(sec/60); b.value=sec%60; }
}

/* ---- structured finish log (dossier) ---- */
function finishClip(p, dKey){
  const c = el('div','clip');
  c.setAttribute('data-tab', t('finishH'));
  const prev = DB.get('worklog',[]).find(x=>x.date===dKey && x.code===p.code) || {};
  c.innerHTML = `<label class="field col"><span>${t('finishQ')}</span>
      <textarea class="fin-note" rows="3" placeholder="${t('finishPh')}">${prev.note||''}</textarea></label>
    <div class="field"><span>${t('rpe')}</span><input class="fin-rpe" type="number" inputmode="numeric" min="1" max="10" value="${prev.rpe??''}"></div>
    <div class="field col"><span>${t('elbow')}</span><div class="seg" id="seg-elbow"></div></div>`;
  addMic(c.querySelector('.fin-note'));
  const seg = c.querySelector('#seg-elbow');
  let elbow = prev.elbow || '';
  [['ok',t('elbOk')],['felt',t('elbFelt')],['pain',t('elbPain')]].forEach(([v,lbl])=>{
    const b=el('button','seg-b'+(elbow===v?' on':''),lbl);
    b.onclick=()=>{ elbow=v; seg.querySelectorAll('.seg-b').forEach(x=>x.classList.remove('on')); b.classList.add('on'); };
    seg.appendChild(b);
  });
  const save = el('button','bigbtn',t('saveLog'));
  save.onclick=()=>{
    clearActiveTimer();
    const note=c.querySelector('.fin-note').value.trim();
    const rpe=c.querySelector('.fin-rpe').value;
    const lifts=[].concat(p.lifts||[], p.accLoads||[], p.wodLoads||[])
      .map(lf=>liftGet(dKey,lf.name)).filter(Boolean)
      .map(x=> x.sets && x.sets.length
        ? `${x.lift} ${x.sets.map(s=>`${s.w||'?'}×${s.r||'?'}`).join(' / ')}`
        : `${x.lift} ${x.weight||'?'}${x.reps?'×'+x.reps:''}`);
    const logs=DB.get('worklog',[]);
    const rec={date:dKey, code:p.code, name:typeof p.name==='object'?p.name.he:p.name, note, rpe:rpe?Number(rpe):null, elbow, lifts};
    const i=logs.findIndex(x=>x.date===dKey && x.code===p.code);
    if(i>=0) logs[i]=rec; else logs.unshift(rec);
    DB.set('worklog',logs);
    save.textContent=t('savedWell'); buzz([120,60,120]);
    // palm wipe sweeps the dossier clean, a big check writes itself, then off to Progress
    const ov=el('div','wipe-ov'); ov.innerHTML='<div class="wipe-smudge"></div>';
    const ck=el('div','wipe-check'); ck.innerHTML='<svg viewBox="0 0 100 100"><path d="M20 55 L42 78 L82 25"/></svg>';
    c.appendChild(ov); c.appendChild(ck);
    setTimeout(()=>{ activeTab='progress'; render(); }, 1800);
  };
  c.appendChild(save);
  return c;
}

/* ---------------- TIMER ENGINE ---------------- */
function runTimer(i, s){
  ensureAudio();
  const out=document.getElementById('cnt-'+i);
  const btn=document.getElementById('btn-'+i);
  if(timer.idx===i && timer.iv){
    // manual stop: if it was the For Time stopwatch, chalk the elapsed time into the score
    const wasFT = timer.mode==='fortime', elapsed = timer.elapsed;
    clearActiveTimer();
    if(wasFT && elapsed>0) prefillForTime(elapsed);
    return;
  }
  clearActiveTimer();
  timer.idx=i; timer.elapsed=0; if(btn) btn.textContent=t('stop'); acquireWake();
  timer.code = planFor(selectedDate).code;
  showLiveFig('work'); // the chalk athlete gets to work, center stage
  const tm = s.timer;
  timer.mode = tm ? tm.mode : 'countdown';
  if(!tm) return countdown(out, s.t*60);
  // WOD timers get the full 3-2-1-GO treatment
  if(tm.mode==='countdown' || tm.mode==='amrap') return preRoll(()=>countdown(out, tm.sec, tm.label));
  if(tm.mode==='fortime') return preRoll(()=>stopwatch(out, tm.cap));
  if(tm.mode==='interval') return preRoll(()=>interval(out, tm));
}

/* 3-2-1-GO: giant chalk numbers slam on screen, announcer counts, then the engine starts */
function preRoll(start){
  const ov=el('div','preroll'); const num=el('span','prn'); ov.appendChild(num);
  document.body.appendChild(ov); timer.ov=ov;
  let n=3;
  const slam=(txt)=>{ num.textContent=txt; num.style.animation='none'; void num.offsetWidth; num.style.animation=''; };
  const step=()=>{
    if(n===0){
      slam('GO!'); num.classList.add('go');
      if(!say('GO!')) beep(990,0.3,0.35);
      buzz([140]);
      chalkPoof(window.innerWidth/2, window.innerHeight/2, {n:24, color:'62,211,200'});
      timer.iv=setTimeout(()=>{ if(timer.ov){ timer.ov.remove(); timer.ov=null; } timer.iv=null; start(); }, 500);
      return;
    }
    slam(n); cueCount(n);
    n--; timer.iv=setTimeout(step, 1000);
  };
  step();
}
/* all engines are anchored to real timestamps, so they self-correct after the
   screen sleeps / the tab is backgrounded (where setInterval gets throttled). */
/* the last 3 seconds: chalk digits jitter, the card gets a heartbeat */
function crunchFx(out, on){
  const big=out.querySelector('.big'); if(big && on) big.classList.add('crunch');
  const card=out.closest('.stage'); if(card) card.classList.toggle('pulse', !!on);
}
function countdown(out, secs, label, endWord){
  const end=Date.now()+secs*1000; let prev=secs+1;
  const paint=()=>{
    let left=Math.round((end-Date.now())/1000); if(left<0) left=0;
    out.innerHTML=`<span class="big">${mmss(left)}</span>${label?`<span class="sub">${label}</span>`:''}`;
    if(left<=0){ clearActiveTimer(); out.innerHTML=`<span class="big done">${t('finish')}</span>`; cueDone(endWord); return; }
    if(left<prev && left<=3) cueCount(left);
    crunchFx(out, left<=3);
    prev=left;
  };
  timer.repaint=paint; paint(); timer.iv=setInterval(paint,250);
}
function stopwatch(out, cap){
  const start=Date.now(); let prev=-1;
  const paint=()=>{
    const s=Math.floor((Date.now()-start)/1000);
    timer.elapsed=s;
    out.innerHTML=`<span class="big">${mmss(s)}</span><span class="sub">${t('stopUp')}</span>`;
    if(cap && s>=cap){ clearActiveTimer(); out.innerHTML='<span class="big done">capped ✓</span>'; cueDone('TIME!'); prefillForTime(cap); return; }
    if(cap && s>prev && s>=cap-3 && s<cap) cueCount(cap-s);
    crunchFx(out, cap && s>=cap-3);
    prev=s;
  };
  timer.repaint=paint; paint(); timer.iv=setInterval(paint,250);
}
function interval(out, tmr){
  const segs=[];
  for(let r=0;r<tmr.rounds;r++) for(let ph=0;ph<tmr.phases.length;ph++) segs.push({r, ph, dur:tmr.phases[ph].sec});
  const total=segs.reduce((a,s)=>a+s.dur,0);
  const start=Date.now();
  const exForRound=(r)=> tmr.cycle ? tx(tmr.cycle[r % tmr.cycle.length]) : '';
  let prevSeg=-1, prevLeft=-1;
  const paint=()=>{
    const elapsed=(Date.now()-start)/1000;
    if(elapsed>=total){ clearActiveTimer(); out.innerHTML='<span class="big done">'+tmr.label+' ✓</span>'; cueDone('TIME!'); return; }
    let acc=0, si=0;
    for(; si<segs.length; si++){ if(elapsed < acc+segs[si].dur) break; acc+=segs[si].dur; }
    const seg=segs[si], phase=tmr.phases[seg.ph];
    let left=Math.ceil(seg.dur-(elapsed-acc)); if(left<1) left=1;
    const ex=exForRound(seg.r), cls=phase.work?'work':'rest';
    out.innerHTML=`<span class="rd">${t('round')} ${seg.r+1}/${tmr.rounds}</span>`+
      `<span class="big ${cls}">${mmss(left)}</span>`+
      `<span class="sub">${tx(phase.label)}${ex?' · '+ex:''}</span>`;
    if(si!==prevSeg) showLiveFig(phase.work?'work':'rest', phase.work?ex:tx(phase.label)); // figure works/rests with the phase
    if(si!==prevSeg && prevSeg!==-1) cueSwitch(phase.work, phase.work ? seg.r+1 : null); // announcer calls the round
    else if(left!==prevLeft && left<=3) cueCount(left);
    crunchFx(out, left<=3);
    prevSeg=si; prevLeft=left;
  };
  timer.repaint=paint; paint(); timer.iv=setInterval(paint,250);
}

/* ---- CALENDAR (whole block ahead) ---- */
function viewCalendar(){
  app.appendChild(hero(`<span class="lt">CFFB-01</span> · ${t('calKick')}`, `${t('calH1a')} <em>${t('calH1b')}</em>`, t('calFocus'), null));

  const doneDates = new Set(DB.get('worklog',[]).map(x=>x.date).concat(DB.get('metconlog',[]).map(x=>x.date)));

  const bd = el('div','board tray');
  const grid = el('div','cal');
  (LANG==='he'?['א','ב','ג','ד','ה','ו','ש']:['S','M','T','W','T','F','S']).forEach(h=>grid.appendChild(el('div','cal-h',h)));

  const start = new Date(BLOCK_START);
  start.setDate(start.getDate() - start.getDay());
  const tk = todayKey();
  let doneN = 0;
  for(let i=0;i<35;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const inBlock = d>=BLOCK_START && d<=BLOCK_END;
    if(!inBlock){ grid.appendChild(el('div','cal-cell empty')); continue; }
    const p = planFor(d);
    const k = todayKey(d);
    const done = doneDates.has(k);
    const cell = el('div','cal-cell '+(p.train?'tr':'rt')+(k===tk?' today':'')+(done?' done-day':''));
    cell.innerHTML = `<span class="cd lt">${d.getDate()}.${d.getMonth()+1}</span><span class="cl">${p.train?p.code:'·'}</span>`;
    if(done){ // don't-break-the-chain ring draws itself, one after another
      cell.insertAdjacentHTML('beforeend',
        `<svg class="done-ring" viewBox="0 0 50 44" style="--d:${(doneN*0.12).toFixed(2)}s"><path d="M25 5 C9 7 3 16 5 26 C7 37 22 42 33 38 C45 34 47 18 39 10 C33 3 27 3 21 6"/></svg>`);
      doneN++;
    }
    if(p.train){ cell.onclick=()=>{ selectedDate=d; activeTab='workout'; render(); }; }
    grid.appendChild(cell);
  }
  bd.appendChild(grid); bd.appendChild(trayBar());
  app.appendChild(bd);

  app.appendChild(scribbleRow(2));

  const lg = el('div','board'); lg.innerHTML=`<div class="board-h">${t('legend')}</div>${squig(CH)}`;
  const items = [
    ['A','GROUNDED', LANG==='he'?'רגליים, סקוואט + לאנג׳':'legs, squat + lunge'],
    ['B','OVERHEAD', LANG==='he'?'פלג גוף עליון':'upper body'],
    ['C','EXPLODE', LANG==='he'?'כוח-מהירות':'speed-strength'],
    ['D','ANCHOR', LANG==='he'?'ציר, גב תחתון':'hinge, lower back'],
    ['1','FIRST TOUCH', LANG==='he'?'יום פתיחה 1.7':'opening day Jul 1'],
    ['2','OPEN GATES', LANG==='he'?'יום פתיחה 2.7':'opening day Jul 2'],
    ['·', LANG==='he'?'מנוחה':'REST', t('legRest')],
  ];
  items.forEach(([c,n,f])=>{ const r=el('div','leg'); r.innerHTML=`<span class="leg-c lt">${c}</span><b>${n}</b><i>${f}</i>`; lg.appendChild(r); });
  app.appendChild(lg);
}

/* ---- NUTRITION ---- */
function viewNutrition(){
  const isTrain = planFor(new Date()).train;
  const n = isTrain?NUTRITION.train:NUTRITION.rest;
  app.appendChild(hero(t('nutKick'), `${t('nutH1a')} <em>${t('nutH1b')}</em>`, null, null));

  const mb = el('div','board');
  mb.innerHTML = `<div class="board-h t">${t('today')} · ${t(isTrain?'trainDay':'restDay')}</div>${squig(TQ)}
    <div class="macros"><div><b>${n.kcal}</b><i>${t('kcal')}</i></div><div><b>${n.p}</b><i>${t('protein')}</i></div><div><b>${n.f}</b><i>${t('fat')}</i></div><div><b>${n.c}</b><i>${t('carbs')}</i></div></div>`;
  app.appendChild(mb);

  const bc=el('div','clip'); bc.setAttribute('data-tab', t('boxesH'));
  NUTRITION.boxes.forEach(b=>{ const r=el('div','box'); r.innerHTML=`<span class="b-when">${tx(b[0])}</span><span class="b-what">${tx(b[1])}</span><span class="b-p lt">${b[2]}g</span>`; bc.appendChild(r); });
  app.appendChild(bc);

  app.appendChild(scribbleRow(4));

  const sc=el('div','clip'); sc.setAttribute('data-tab', t('shopH'));
  NUTRITION.shop.forEach(([cat,items])=>{
    sc.appendChild(el('div','shop-cat',tx(cat)));
    const ul=el('ul','shoplist'); items.forEach(it=>ul.appendChild(el('li',null,tx(it)))); sc.appendChild(ul);
  });
  app.appendChild(sc);

  app.appendChild(el('div','board',`<div class="board-h o">${t('prepH')}</div>${squig(OR)}<div class="mini">${t('prepTxt')}</div>`));
}

/* ---- PROGRESS + CHECKIN ---- */
function viewProgress(){
  app.appendChild(hero(t('progKick'), `${t('progH1a')} <em>${t('progH1b')}</em>`, null, null));

  // ---- the chalkboard of metcon scores ----
  const scores = DB.get('metconlog',[]);
  const sb = el('div','board tray');
  sb.innerHTML = `<div class="board-h o">${t('scoresH')}</div>${squig(OR)}`;
  if(!scores.length){
    sb.appendChild(el('div','mini',t('scoresEmpty')));
  } else {
    scores.slice(0,14).forEach((m,i)=>{
      const row = el('div','chalkline'+(scores.length>3 && i===2?' wiped':'')); // one entry half-wiped, on purpose
      const rxTag = m.rx==='rx' ? ' · RX' : (m.rx==='sc' ? ' · Scaled' : '');
      row.innerHTML = `<span class="cl-date">${(m.date||'').slice(5)}</span>
        <span class="cl-what"><span class="lt">${m.wod}</span>${rxTag}${m.note?`<i>${m.note}</i>`:''}</span>
        <span class="cl-score${m.mode==='fortime'?' o':''}">${metconScoreStr(m)}</span>`;
      sb.appendChild(row);
    });
  }
  sb.appendChild(trayBar());
  app.appendChild(sb);

  // ---- personal records — the PR exchange ----
  const prs = personalRecords();
  const pc = el('div','board');
  pc.innerHTML=`<div class="board-h t">${t('prH')}</div>${squig(TQ)}`;
  if(!prs.length){
    pc.appendChild(el('div','mini',t('prEmpty')));
  } else {
    prs.forEach(r=>{
      const row=el('div','prrow');
      row.innerHTML=`<div class="pr-lift"><b>${r.lift}</b><span class="plate"><span class="lt">SET ${((r.date||'').slice(5)).replace('-','.')}</span></span></div>
        <div class="pr-val"><span class="pr-w">${r.weight}<small>${t('kg')}</small></span><span class="pr-x">× ${r.reps||'?'}</span></div>
        ${r.est?`<div class="pr-e" title="e1RM">≈${r.est}</div>`:''}`;
      pc.appendChild(row);
    });
    pc.appendChild(el('div','mini',t('prMini')));
    // the exchange opens: numbers tick up from zero, staggered like a trading board
    requestAnimationFrame(()=>{
      pc.querySelectorAll('.pr-w').forEach((e,i)=>setTimeout(()=>countUp(e, prs[i].weight, 700), i*90));
    });
  }
  app.appendChild(pc);

  app.appendChild(scribbleRow(0));

  // ---- daily check-in (dossier) ----
  const ck = DB.get('checkin_'+todayKey(), {});
  const f = el('div','clip'); f.setAttribute('data-tab', t('checkinH'));
  const fields = [
    ['weight',t('fWeight'),'number'],
    ['sleep',t('fSleep'),'number'],
    ['mood',t('fMood'),'number'],
    ['pain',t('fPain'),'number'],
  ];
  fields.forEach(([id,label,type])=>{
    const w=el('label','field'); w.innerHTML=`<span>${label}</span><input type="${type}" inputmode="decimal" value="${ck[id]??''}">`;
    w.querySelector('input').oninput=(e)=>{ ck[id]=e.target.value; };
    f.appendChild(w);
  });
  const save=el('button','bigbtn',t('saveCheckin'));
  save.onclick=()=>{ ck.date=todayKey(); DB.set('checkin_'+todayKey(), ck);
    const all=DB.get('checkins',[]); const i=all.findIndex(x=>x.date===ck.date); if(i>=0)all[i]=ck; else all.unshift(ck); DB.set('checkins',all);
    save.textContent=t('saved'); setTimeout(()=>save.textContent=t('saveCheckin'),1500); renderHistory(); renderWeightChart(); };
  f.appendChild(save);
  app.appendChild(f);

  const wc=el('div','board'); wc.id='wchartcard'; app.appendChild(wc); renderWeightChart();

  const hist=el('div','clip'); hist.id='histcard'; hist.setAttribute('data-tab', t('histH'));
  app.appendChild(hist); renderHistory();

  const logs=DB.get('worklog',[]);
  if(logs.length){
    const lc=el('div','board'); lc.innerHTML=`<div class="board-h">${t('lastH')}</div>${squig(CH)}`;
    logs.slice(0,8).forEach(l=>{
      const meta=[]; if(l.rpe) meta.push('RPE '+l.rpe); if(l.elbow&&T.elbLog[l.elbow]) meta.push(tx(T.elbLog[l.elbow]));
      const r=el('div','logrow');
      r.innerHTML=`<span class="latin">${l.date}</span><b>${l.code} · ${l.name}${meta.length?' · '+meta.join(' · '):''}</b>`+
        (l.lifts&&l.lifts.length?`<i class="latin lf-tags">${l.lifts.join('  ·  ')}</i>`:'')+
        (l.note?`<i>${l.note}</i>`:'');
      lc.appendChild(r);
    });
    app.appendChild(lc);
  }

  app.appendChild(scribbleRow(2));
  app.appendChild(backupBoard());
}

/* ---- backup / restore board ---- */
function backupBoard(){
  const bd = el('div','board');
  bd.innerHTML = `<div class="board-h o">${t('backupH')}</div>${squig(OR)}
    <div class="mini" style="margin-bottom:10px">${t('backupWhat')}</div>`;

  const copyBtn = el('button','music-open', t('backupCopy'));
  const ta = el('textarea','score-note'); ta.rows=3; ta.style.display='none'; ta.readOnly=true;
  const showLink = el('div','go'); showLink.style.cssText='color:var(--dust);font-size:15px'; showLink.textContent=t('backupShow');

  copyBtn.onclick = async ()=>{
    const blob = exportAll();
    ta.value = blob;
    let ok=false;
    try{ await navigator.clipboard.writeText(blob); ok=true; }catch(e){}
    if(!ok){ ta.style.display='block'; ta.focus(); ta.select(); try{ document.execCommand('copy'); ok=true; }catch(e){} }
    copyBtn.textContent = t('backupCopied'); buzz([120,60,120]);
    setTimeout(()=>copyBtn.textContent=t('backupCopy'), 2600);
  };
  showLink.onclick = ()=>{ ta.style.display = ta.style.display==='none' ? 'block' : 'none'; if(ta.style.display==='block'){ ta.value=exportAll(); } };

  bd.appendChild(copyBtn);
  bd.appendChild(showLink);
  bd.appendChild(ta);

  // restore
  const rWrap = el('div','rest-timer'); rWrap.style.borderTopColor='var(--faint)';
  const rTa = el('textarea','score-note'); rTa.rows=3; rTa.placeholder=t('restorePh');
  const rBtn = el('button','bigbtn on-slate', t('restoreBtn')); rBtn.style.marginTop='10px';
  rBtn.onclick = ()=>{
    const v = rTa.value.trim();
    if(!v){ return; }
    if(!confirm(t('restoreConfirm'))){ return; }
    if(importAll(v)){ rBtn.textContent=t('restoreDone'); if(window.MFSync){ /* re-push happens on next writes */ } setTimeout(()=>render(), 800); }
    else { rBtn.textContent=t('restoreBad'); setTimeout(()=>rBtn.textContent=t('restoreBtn'),1800); }
  };
  rWrap.appendChild(rTa); rWrap.appendChild(rBtn);
  bd.appendChild(rWrap);
  return bd;
}
function renderWeightChart(){
  const c=document.getElementById('wchartcard'); if(!c) return;
  c.innerHTML=`<div class="board-h t">${t('wtrend')}</div>${squig(TQ)}`;
  const data=DB.get('checkins',[])
    .map(x=>({date:x.date, w:parseFloat(x.weight)}))
    .filter(x=>x.date && !isNaN(x.w))
    .sort((a,b)=> a.date<b.date?-1:1);
  if(data.length<2){ c.appendChild(el('div','mini',t('wtrendEmpty'))); return; }

  const W=320,H=150,padX=14,padTop=16,padBot=24;
  const ws=data.map(d=>d.w); let min=Math.min(...ws), max=Math.max(...ws);
  if(min===max){ min-=1; max+=1; } else { const m=(max-min)*0.18; min-=m; max+=m; }
  const X=i=> padX + i*(W-padX*2)/(data.length-1);
  const Y=w=> padTop + (max-w)/(max-min)*(H-padTop-padBot);
  let line='', dots='';
  data.forEach((d,i)=>{ const x=X(i).toFixed(1), y=Y(d.w).toFixed(1);
    line+=(i?'L':'M')+x+' '+y+' ';
    const last=i===data.length-1;
    dots+=`<circle cx="${x}" cy="${y}" r="${last?4:2.6}" fill="${last?'#f4a261':'#3ed3c8'}"/>`;
  });
  const area=line+`L${X(data.length-1).toFixed(1)} ${H-padBot} L${X(0).toFixed(1)} ${H-padBot} Z`;
  const first=data[0].w, lastW=data[data.length-1].w, diff=+(lastW-first).toFixed(1);
  const sign=diff>0?'+':'';
  const svg=`<svg class="wchart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3ed3c8" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#3ed3c8" stop-opacity="0"/></linearGradient></defs>
    <line x1="${padX}" y1="${Y(max).toFixed(1)}" x2="${W-padX}" y2="${Y(max).toFixed(1)}" stroke="rgba(236,234,223,.18)" stroke-dasharray="3 5"/>
    <line x1="${padX}" y1="${Y(min).toFixed(1)}" x2="${W-padX}" y2="${Y(min).toFixed(1)}" stroke="rgba(236,234,223,.18)" stroke-dasharray="3 5"/>
    <text x="${W-padX}" y="${(Y(max)-4).toFixed(1)}" class="wlab">${max.toFixed(1)}</text>
    <text x="${W-padX}" y="${(Y(min)+11).toFixed(1)}" class="wlab">${min.toFixed(1)}</text>
    <path d="${area}" fill="url(#wg)"/>
    <path d="${line}" fill="none" stroke="#3ed3c8" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
  </svg>`;
  c.insertAdjacentHTML('beforeend', svg);
  const sum=el('div','wsum');
  sum.innerHTML=`<span>${t('wStart')} <b class="latin">${first}</b></span><span>${t('wNow')} <b class="latin">${lastW}</b></span><span class="${diff<=0?'good':'up'}">${t('wDiff')} <b class="latin">${sign}${diff}</b></span>`;
  c.appendChild(sum);
}
function renderHistory(){
  const c=document.getElementById('histcard'); if(!c)return;
  const all=DB.get('checkins',[]).slice(0,10);
  c.innerHTML='';
  if(!all.length){ c.appendChild(el('div','mini',t('histEmpty'))); return; }
  const tb=el('table','htab'); tb.innerHTML=`<tr><th>${t('thDate')}</th><th>${t('thW')}</th><th>${t('thS')}</th><th>${t('thM')}</th></tr>`;
  all.forEach(x=>{ const r=el('tr',null,`<td class="lt">${(x.date||'').slice(5)}</td><td class="lt">${x.weight||'-'}</td><td class="lt">${x.sleep||'-'}</td><td class="lt">${x.mood||'-'}</td>`); tb.appendChild(r); });
  c.appendChild(tb);
}

/* ---------------- NAV ---------------- */
document.querySelectorAll('.tab').forEach(tb=>tb.onclick=()=>{ activeTab=tb.dataset.tab; render(); });
render();

/* when returning to the app: re-grab the wake lock (it auto-releases on hide)
   and force the running timer to snap to the correct real-time value. */
document.addEventListener('visibilitychange', ()=>{
  if(document.visibilityState==='visible' && timer.iv){ acquireWake(); if(timer.repaint) timer.repaint(); }
});

/* service worker */
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
