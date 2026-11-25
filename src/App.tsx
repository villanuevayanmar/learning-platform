import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Brain, Check, ChevronRight, Clock3, Code2, Lightbulb, NotebookPen, RotateCcw, Sparkles, Target } from 'lucide-react';
import { calculateMastery, evaluateAnswer, getNextQuestionIndex, questions, type AnswerRecord, type LearningMode } from './learning';
const KEY = 'learning-studio-progress-v1';
type Saved = { records: AnswerRecord[]; notes: string; mode: LearningMode };
const empty: Saved = { records: [], notes: '', mode: 'adaptive' };
function load(): Saved {
 try { const v = JSON.parse(localStorage.getItem(KEY) || 'null') as Partial<Saved> | null;
 return { records: Array.isArray(v?.records) ? v.records : [], notes: typeof v?.notes === 'string' ? v.notes : '', mode: v?.mode === 'guided' || v?.mode === 'self-paced' ? v.mode : 'adaptive' }; } catch { return empty; }
}
export default function App() {
 const [saved,setSaved] = useState<Saved>(load);
 const [index,setIndex] = useState(() => getNextQuestionIndex(load().records,questions.length) ?? 0);
 const [choice,setChoice] = useState<number|null>(null);
 const [feedback,setFeedback] = useState<'correct'|'incorrect'|null>(null);
 const [hint,setHint] = useState(false);
 const [notesOpen,setNotesOpen] = useState(false);
 const current = questions[index];
 const mastery = useMemo(() => calculateMastery(saved.records,questions.length),[saved.records]);
 const completed = new Set(saved.records.filter(r=>r.correct).map(r=>r.questionId));
 const finished = completed.size === questions.length;
 useEffect(()=>{ localStorage.setItem(KEY,JSON.stringify(saved)); },[saved]);
 function submit() {
  if(choice===null || !current) return;
  const correct = evaluateAnswer(current,choice);
  setSaved(old=>({...old,records:[...old.records,{questionId:current.id,selected:choice,correct,independent:!hint}]}));
  setFeedback(correct?'correct':'incorrect');
 }
 function next() {
  const n = getNextQuestionIndex(saved.records,questions.length);
  setIndex(n ?? 0); setChoice(null); setFeedback(null); setHint(false);
 }
 function reset() { setSaved(old=>({...old,records:[]})); setIndex(0); setChoice(null); setFeedback(null); setHint(false); }
 return <div className="shell">
  <header><a className="brand" href="#"><span className="mark"><BookOpen size={19}/></span>learning<span className="muted">studio</span></a><nav><a className="active" href="#learn">My learning</a><a href="#course">Courses</a><button onClick={()=>setNotesOpen(v=>!v)}><NotebookPen size={15}/> Notes</button></nav><span className="avatar">G</span></header>
  <main>
   <section className="hero"><div><p className="eyebrow">YOUR LEARNING SPACE</p><h1>Make progress.<br/><em>Not just notes.</em></h1><p className="intro">A good lesson meets you where you are. This one changes direction when you need it to.</p></div><div className="hero-art"><div className="ring"/><div className="core"><Brain size={40}/></div><i/><b/></div></section>
   <section id="learn" className="overview"><div className="heading"><div><p className="eyebrow">YOUR CURRENT PATH</p><h2>Pick up where you left off</h2></div><span className="pill">● Prototype lesson</span></div>
    <article className="course" id="course"><div className="course-info"><span className="course-icon"><Code2 size={22}/></span><div><p className="eyebrow">PROGRAMMING · BEGINNER</p><h3>Variables and data types in C</h3><p>Learn how programs name, store, and update information.</p><small><Clock3 size={13}/> 12 min <BookOpen size={13}/> 1 lesson <Target size={13}/> 3 concepts</small></div></div>
     <div className="progress"><div><span>Independent mastery</span><strong>{mastery}%</strong></div><div className="track"><i style={{width:mastery+'%'}}/></div><small>{completed.size} of 3 checks completed</small><button className="primary full" onClick={()=>{setIndex(getNextQuestionIndex(saved.records,questions.length)??0);setFeedback(null)}}>Continue lesson <ArrowRight size={15}/></button></div>
    </article>
   </section>
   <section className="learning"><div className="lesson"><div className="heading"><div><p className="eyebrow">LESSON 01 / PRACTICE</p><h2>Check your understanding</h2></div><span className="count">{Math.min(completed.size+1,3)} / 3</span></div>
    <div className="modes">{(['adaptive','guided','self-paced'] as LearningMode[]).map(m=><button key={m} className={saved.mode===m?'chosen':''} onClick={()=>setSaved(o=>({...o,mode:m}))}>{m==='adaptive'?<Sparkles size={14}/>:m==='guided'?<Lightbulb size={14}/>:<Clock3 size={14}/>} {m==='self-paced'?'Self-paced':m[0].toUpperCase()+m.slice(1)}</button>)}</div>
    <article className="question">{finished?<div className="finished"><span className="success"><Check size={26}/></span><p className="eyebrow">CHECKPOINT COMPLETE</p><h3>You made it through all three checks.</h3><p>Independent mastery: {mastery}%. Try again later to see what you can recall without support.</p><button className="primary" onClick={reset}><RotateCcw size={15}/> Practice again</button></div>:<>
     <div className="qtop"><span>CONCEPT {index+1} OF 3</span><span>{current.concept}</span></div><h3>{current.prompt}</h3>{current.code&&<pre>{current.code}</pre>}
     <div className="choices">{current.choices.map((c,i)=><button key={c} disabled={!!feedback} className={'choice '+(choice===i?'selected ':'')+(feedback&&i===current.answer?' right ':'')+(feedback&&choice===i&&i!==current.answer?' wrong':'')} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{c}{feedback&&i===current.answer&&<Check size={16}/>}</button>)}</div>
     {feedback&&<div className={'feedback '+feedback}><strong>{feedback==='correct'?'That is correct.':'Not quite. Keep working at it.'}</strong><p>{feedback==='correct'?current.explanation:'Review the hint, then retry. A wrong attempt does not reduce your progress.'}</p>{feedback==='incorrect'&&<button onClick={()=>{setChoice(null);setFeedback(null)}}>Try again <RotateCcw size={13}/></button>}</div>}
     {!feedback&&<div className="actions"><button className="hint" onClick={()=>setHint(v=>!v)}><Lightbulb size={15}/>{hint?'Hide hint':'Need a hint?'}</button><button className="primary" disabled={choice===null} onClick={submit}>Check answer <ArrowRight size={15}/></button></div>}
     {hint&&!feedback&&<div className="hintbox">{current.hint}</div>}
     {feedback==='correct'&&<button className="next" onClick={next}>Next concept <ChevronRight size={16}/></button>}
    </>}</article>
   </div><aside><div className="aside-card"><span className="aside-icon"><Brain size={18}/></span><p className="eyebrow">HOW ADAPTIVE LEARNING WORKS</p><h3>Support when you need it. Independence when you’re ready.</h3><p>Hints and explanations help you move forward. The platform tracks whether you solved a problem independently or with support.</p><hr/><div><span>Learning mode</span><strong>{saved.mode==='self-paced'?'Self-paced':saved.mode[0].toUpperCase()+saved.mode.slice(1)}</strong></div><div><span>Evidence collected</span><strong>{saved.records.length} attempts</strong></div></div><div className="aside-card secondary"><span className="aside-icon"><Target size={18}/></span><h3>Mastery is more than a score.</h3><p>Correct answers after hints are useful learning evidence, but are not counted as independent mastery.</p></div></aside></section>
   {notesOpen&&<section className="notes"><div className="heading"><div><p className="eyebrow">PERSONAL WORKSPACE</p><h2>Lesson notes</h2></div><button onClick={()=>setNotesOpen(false)}>Close</button></div><textarea rows={5} value={saved.notes} onChange={e=>setSaved(o=>({...o,notes:e.target.value}))} placeholder="Write down a question, useful example, or something to remember..."/><small>Saved in this browser only. Accounts and cross-device sync are not connected yet.</small></section>}
  </main><footer><span>LEARNING STUDIO / EARLY PROTOTYPE</span><span>Built around understanding, not speed.</span></footer>
 </div>;
}