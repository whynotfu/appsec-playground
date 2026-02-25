(function () {
    'use strict';

    const DS = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
    const DF = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
    const MO = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    const MG = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

    const P1_START = new Date(2026,1,26);
    const P1_END = new Date(2026,6,31);
    const W1 = new Date(2026,1,23);
    const today = new Date();

    let vMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let vWeek = mon(new Date(today));
    let vDay = new Date(today);
    let view = 'calendar';

    function fmt(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
    function same(a,b) { return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }
    function isT(d) { return same(d,today); }
    function mon(d) { const r=new Date(d); const w=r.getDay(); r.setDate(r.getDate()-(w===0?6:w-1)); return r; }
    function add(d,n) { const r=new Date(d); r.setDate(r.getDate()+n); return r; }
    function isP2(d) { return fmt(d)>=PERIOD_CHANGE_DATE; }
    function wn(d) { const w=Math.floor((d-W1)/(7*864e5))+1; return w>=1&&w<=WEEKLY_THEMES.length?w:null; }
    function wt(d) { const n=wn(d); return n?WEEKLY_THEMES[n-1]:null; }

    // localStorage
    function tk(ds,i) { return `sd_${ds}_${i}`; }
    function isDone(ds,i) { return localStorage.getItem(tk(ds,i))==='1'; }
    function toggle(ds,i) { const k=tk(ds,i); localStorage.getItem(k)==='1'?localStorage.removeItem(k):localStorage.setItem(k,'1'); }

    // Sticker for a date — pseudo-random per day via date hash
    const STICKER_KEYS = Object.keys(STICKERS);
    function sticker(date) {
        const ds = fmt(date);
        let h = 0;
        for (let i = 0; i < ds.length; i++) h = ((h << 5) - h + ds.charCodeAt(i)) | 0;
        return STICKERS[STICKER_KEYS[Math.abs(h) % STICKER_KEYS.length]];
    }

    // Events
    function evts(date) {
        const ds=fmt(date), dow=date.getDay(), out=[];
        for (const m of MILESTONES) if(m.date===ds) out.push({time:'',title:m.title,desc:'',type:'milestone'});
        const p2=isP2(date), tasks=p2?SECURITY_TASKS_P2:SECURITY_TASKS_P1;
        if(!p2&&dow===4&&ds<'2026-03-02') return [...out,...THURSDAY_BEFORE_MAR2.map(t=>({...t}))];
        const dt=tasks[dow];
        if(dt) for(const t of dt) out.push({time:t.time,title:t.title,desc:t.desc,type:t.type});
        return out;
    }

    function checkable(list) { return list.filter(e=>e.type!=='commute'&&e.type!=='milestone'); }

    // Hours estimate
    function hrs(t) {
        if(!t) return 0;
        const m=t.match(/(\d{1,2}):(\d{2})\s*[—\-]\s*(\d{1,2}):(\d{2})/);
        return m?Math.max(0,((+m[3]*60+ +m[4])-(+m[1]*60+ +m[2]))/60):0;
    }

    // Streak
    function streak() {
        let s=0, d=new Date(today);
        const te=evts(d), tc=checkable(te);
        if(!tc.some((_,i)=>isDone(fmt(d),i))) d=add(d,-1);
        for(let i=0;i<365;i++){
            const ds=fmt(d), e=checkable(evts(d));
            if(!e.length){d=add(d,-1);continue;}
            if(e.some((_,j)=>isDone(ds,j))){s++;d=add(d,-1);}else break;
        }
        return s;
    }

    // Global stats
    function totalStats() {
        let totalCheck=0, totalDone=0, secH=0, ctfH=0;
        const start=new Date(2026,1,26), end=add(today,0);
        for(let d=new Date(start);d<=end;d=add(d,1)){
            const ds=fmt(d), e=evts(d), c=checkable(e);
            c.forEach((_,i)=>{ totalCheck++; if(isDone(ds,i)) totalDone++; });
        }
        // This week hours
        const wm=mon(new Date(today));
        for(let i=0;i<7;i++){
            const e=evts(add(wm,i));
            for(const ev of e){ const h=hrs(ev.time); if(ev.type==='sec')secH+=h; if(ev.type==='ctf')ctfH+=h; }
        }
        return {totalCheck,totalDone,secH,ctfH};
    }

    function todayStats() {
        const ds=fmt(today), e=checkable(evts(today));
        let done=0; e.forEach((_,i)=>{if(isDone(ds,i))done++;}); return {done,total:e.length};
    }

    // Phase progress
    function phasePct() {
        const t=P1_END-P1_START, e=Math.min(Math.max(today-P1_START,0),t);
        return Math.round(e/t*100);
    }

    // ===== RENDER STATS =====
    function renderStats() {
        const s=streak(), td=todayStats(), ts=totalStats(), pp=phasePct();
        document.getElementById('statsBar').innerHTML = `
            <div class="stat-card"><div class="stat-value sv-streak">${s}</div><div class="stat-label">streak</div></div>
            <div class="stat-card"><div class="stat-value sv-today">${td.done}/${td.total}</div><div class="stat-label">today</div></div>
            <div class="stat-card"><div class="stat-value sv-sec">${ts.secH.toFixed(0)}h</div><div class="stat-label">sec/week</div></div>
            <div class="stat-card"><div class="stat-value sv-ctf">${ts.ctfH.toFixed(0)}h</div><div class="stat-label">ctf/week</div></div>
            <div class="stat-card"><div class="stat-value sv-phase">${pp}%</div><div class="stat-label">phase 1</div></div>
        `;
    }

    function renderTheme() {
        const th=wt(today), el=document.getElementById('weekTheme');
        if(!th){el.style.display='none';return;}
        el.style.display='flex';
        el.innerHTML=`<span class="te">${th.tag}</span><div><div class="tl">Week ${th.week}</div><div class="tt">${th.theme}</div><div class="tf">${th.focus}</div></div>`;
    }

    // ===== CALENDAR =====
    function renderCal() {
        const g=document.getElementById('calendarView');
        g.innerHTML='';
        ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(h=>{
            const d=document.createElement('div');d.className='cal-header';d.textContent=h;g.appendChild(d);
        });
        const y=vMonth.getFullYear(),mo=vMonth.getMonth();
        let off=new Date(y,mo,1).getDay(); off=off===0?6:off-1;
        const dim=new Date(y,mo+1,0).getDate(), pdim=new Date(y,mo,0).getDate();
        for(let i=off-1;i>=0;i--) g.appendChild(dayCell(new Date(y,mo-1,pdim-i),true));
        for(let i=1;i<=dim;i++) g.appendChild(dayCell(new Date(y,mo,i),false));
        const rem=(off+dim)%7===0?0:7-(off+dim)%7;
        for(let i=1;i<=rem;i++) g.appendChild(dayCell(new Date(y,mo+1,i),true));
        setTitle(`${MO[mo]} ${y}`);
    }

    function dayCell(date,other) {
        const el=document.createElement('div'); el.className='cal-day';
        if(other) el.classList.add('other-month');
        if(isT(date)) el.classList.add('today');
        if(date.getDay()===0) el.classList.add('weekend');

        const e=evts(date), ds=fmt(date), ch=checkable(e);
        const doneCnt=ch.filter((_,i)=>isDone(ds,i)).length;
        if(e.some(x=>x.type==='milestone')) el.classList.add('has-milestone');
        if(ch.length>0&&doneCnt===ch.length) el.classList.add('all-done');

        // Day number row + sticker
        const st=!other?sticker(date):null;
        let numHtml=`<div class="day-num"><span>${date.getDate()}</span><span class="day-num-right">`;
        if(st) numHtml+=`<img class="cal-sticker" src="${st.file}" alt="">`;
        if(isT(date)) numHtml+=`<span class="today-dot"></span>`;
        if(ch.length>0&&doneCnt===ch.length&&!other) numHtml+=`<span class="day-done-icon">\u2713</span>`;
        numHtml+=`</span></div>`;

        // Progress bar for the day
        let progHtml='';
        if(ch.length>0&&!other) {
            const pct=Math.round(doneCnt/ch.length*100);
            progHtml=`<div class="day-progress"><div class="day-progress-fill" style="width:${pct}%"></div></div>`;
        }

        // Events — show ALL, no limit, with done state
        const visible=e.filter(x=>x.type!=='commute');
        let evHtml='<div class="day-events">';
        let ci=0;
        for(const ev of visible){
            const isC=ev.type!=='milestone';
            const d=isC?isDone(ds,ci):false;
            if(isC) ci++;
            evHtml+=`<div class="day-ev ${ev.type} ${d?'done-ev':''}">${ev.title}</div>`;
        }
        evHtml+='</div>';

        el.innerHTML=numHtml+progHtml+evHtml;
        el.addEventListener('click',()=>openModal(date));
        return el;
    }

    // ===== WEEK VIEW =====
    function renderWeek() {
        const c=document.getElementById('weekView'); c.innerHTML='';
        const th=wt(vWeek);
        if(th){
            const d=document.createElement('div');d.className='week-theme-strip';
            d.innerHTML=`<span class="te">${th.tag}</span><div><div class="tl">Week ${th.week}</div><div class="tt">${th.theme}</div><div class="tf">${th.focus}</div></div>`;
            c.appendChild(d);
        }
        for(let i=0;i<7;i++){
            const date=add(vWeek,i), ds=fmt(date), e=evts(date), ch=checkable(e);
            const doneCnt=ch.filter((_,j)=>isDone(ds,j)).length;
            const row=document.createElement('div'); row.className='week-row';
            if(isT(date)) row.classList.add('today');
            if(ch.length>0&&doneCnt===ch.length) row.classList.add('all-done');

            let evHtml='';
            if(!e.length) evHtml='<div class="wk-free">Свободный день</div>';
            let ci=0;
            for(const ev of e){
                const isC=ev.type!=='commute'&&ev.type!=='milestone';
                const done=isC?isDone(ds,ci):false;
                const idx=ci; if(isC) ci++;
                evHtml+=`<div class="wk-event ${ev.type} ${done?'done':''}">
                    <div class="wk-time">${ev.time}</div>
                    <div class="wk-body">
                        ${isC?`<label class="chk"><input type="checkbox" ${done?'checked':''} data-d="${ds}" data-i="${idx}"><span class="chk-box"></span></label>`:''}
                        <div><div class="wk-title">${ev.title}</div>${ev.desc?`<div class="wk-desc">${ev.desc}</div>`:''}</div>
                    </div>
                </div>`;
            }
            const wst=sticker(date);
            row.innerHTML=`<div class="wk-label"><div class="wk-name">${DS[date.getDay()]}</div><div class="wk-num">${date.getDate()}</div>${wst?`<img class="wk-sticker" src="${wst.file}" alt="">`:''}</div><div class="wk-events">${evHtml}</div>`;
            c.appendChild(row);
        }
        c.querySelectorAll('.chk input').forEach(cb=>cb.addEventListener('change',e=>{
            toggle(e.target.dataset.d,+e.target.dataset.i); renderWeek(); renderStats();
        }));
        const n=wn(vWeek);
        setTitle(`${n?'Неделя '+n+' \u00b7 ':''}${vWeek.getDate()} ${MG[vWeek.getMonth()]}`);
    }

    // ===== TODAY VIEW =====
    function renderToday() {
        const c=document.getElementById('todayView'); c.innerHTML='';
        const d=vDay, ds=fmt(d), e=evts(d), ch=checkable(e);
        const doneCnt=ch.filter((_,i)=>isDone(ds,i)).length;
        const th=wt(d);

        const st = sticker(d);
        let hdr=`<div class="today-hdr">`;
        if(st) hdr+=`<img class="today-sticker" src="${st.file}" alt="sticker">`;
        hdr+=`<h2>${DF[d.getDay()]}, ${d.getDate()} ${MG[d.getMonth()]}</h2>
            <div class="today-sub">${doneCnt}/${ch.length} done</div>`;
        if(ch.length>0) hdr+=`<div class="today-pbar"><div class="today-pfill" style="width:${Math.round(doneCnt/ch.length*100)}%"></div></div>`;
        hdr+=`</div>`;
        c.insertAdjacentHTML('beforeend',hdr);

        if(th){
            c.insertAdjacentHTML('beforeend',`<div class="week-theme-strip" style="margin-bottom:20px">
                <span class="te">${th.tag}</span><div><div class="tl">Week ${th.week}</div><div class="tt">${th.theme}</div><div class="tf">${th.focus}</div></div></div>`);
        }

        let tl='<div class="tl-wrap">';
        if(!e.length) tl+=`<div class="tl-item rest"><div class="tl-title">Свободный день</div></div>`;
        let ci=0;
        for(const ev of e){
            const isC=ev.type!=='commute'&&ev.type!=='milestone';
            const done=isC?isDone(ds,ci):false;
            const idx=ci; if(isC) ci++;
            tl+=`<div class="tl-item ${ev.type} ${done?'done':''}"><div class="tl-top">
                ${isC?`<label class="chk"><input type="checkbox" ${done?'checked':''} data-d="${ds}" data-i="${idx}"><span class="chk-box"></span></label>`:''}
                <div>${ev.time?`<div class="tl-time">${ev.time}</div>`:''}
                <div class="tl-title">${ev.title}</div>
                ${ev.desc?`<div class="tl-desc">${ev.desc}</div>`:''}</div>
            </div></div>`;
        }
        tl+='</div>';
        c.insertAdjacentHTML('beforeend',tl);

        c.querySelectorAll('.chk input').forEach(cb=>cb.addEventListener('change',e=>{
            toggle(e.target.dataset.d,+e.target.dataset.i); renderToday(); renderStats();
        }));
        setTitle(`${d.getDate()} ${MG[d.getMonth()]} ${d.getFullYear()}`);
    }

    // ===== MODAL =====
    function openModal(date) {
        const ds=fmt(date), e=evts(date), th=wt(date), ch=checkable(e);
        const st=sticker(date);
        document.getElementById('modalDate').textContent=`${DF[date.getDay()]}, ${date.getDate()} ${MG[date.getMonth()]}`;
        let h='';
        if(st) h+=`<div class="m-sticker"><img src="${st.file}" alt="sticker"></div>`;
        if(th) h+=`<div class="m-theme"><div class="m-theme-l">Week ${th.week} <span class="m-theme-tag">${th.tag}</span></div><div class="m-theme-t">${th.theme}</div><div class="m-theme-f">${th.focus}</div></div>`;
        if(!e.length) h+='<div style="text-align:center;color:var(--text-3);padding:16px">Нет событий</div>';
        let ci=0;
        for(const ev of e){
            const isC=ev.type!=='commute'&&ev.type!=='milestone';
            const done=isC?isDone(ds,ci):false;
            const idx=ci; if(isC) ci++;
            h+=`<div class="m-ev ${ev.type} ${done?'done':''}"><div class="m-row">
                ${isC?`<label class="chk"><input type="checkbox" ${done?'checked':''} data-d="${ds}" data-i="${idx}"><span class="chk-box"></span></label>`:''}
                <div class="m-content">${ev.time?`<div class="m-time">${ev.time}</div>`:''}
                <div class="m-title">${ev.title}</div>
                ${ev.desc?`<div class="m-desc">${ev.desc}</div>`:''}</div>
            </div></div>`;
        }
        const body=document.getElementById('modalBody'); body.innerHTML=h;
        body.querySelectorAll('.chk input').forEach(cb=>cb.addEventListener('change',e=>{
            toggle(e.target.dataset.d,+e.target.dataset.i);
            openModal(date); renderStats(); render();
        }));
        document.getElementById('modal').classList.remove('hidden');
    }

    // Nav
    function setTitle(t){document.getElementById('currentTitle').textContent=t;}
    function sw(v){
        view=v;
        document.querySelectorAll('.btn-view').forEach(b=>b.classList.remove('active'));
        document.querySelector(`[data-view="${v}"]`).classList.add('active');
        document.getElementById('calendarView').classList.toggle('hidden',v!=='calendar');
        document.getElementById('weekView').classList.toggle('hidden',v!=='week');
        document.getElementById('todayView').classList.toggle('hidden',v!=='today');
        render();
    }
    function prev(){
        if(view==='calendar')vMonth.setMonth(vMonth.getMonth()-1);
        else if(view==='week')vWeek=add(vWeek,-7);
        else vDay=add(vDay,-1);
        render();
    }
    function next(){
        if(view==='calendar')vMonth.setMonth(vMonth.getMonth()+1);
        else if(view==='week')vWeek=add(vWeek,7);
        else vDay=add(vDay,1);
        render();
    }
    function render(){
        if(view==='calendar')renderCal();
        else if(view==='week')renderWeek();
        else renderToday();
    }

    document.addEventListener('DOMContentLoaded',()=>{
        renderStats(); renderTheme(); render();
        document.getElementById('prevBtn').addEventListener('click',prev);
        document.getElementById('nextBtn').addEventListener('click',next);
        document.getElementById('modalClose').addEventListener('click',()=>document.getElementById('modal').classList.add('hidden'));
        document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')document.getElementById('modal').classList.add('hidden');});
        document.querySelectorAll('.btn-view').forEach(b=>b.addEventListener('click',()=>sw(b.dataset.view)));
        document.addEventListener('keydown',e=>{
            if(e.key==='Escape')document.getElementById('modal').classList.add('hidden');
            if(e.target.tagName==='INPUT')return;
            if(e.key==='ArrowLeft')prev(); if(e.key==='ArrowRight')next();
            if(e.key==='1')sw('calendar'); if(e.key==='2')sw('week'); if(e.key==='3')sw('today');
        });
    });
})();
