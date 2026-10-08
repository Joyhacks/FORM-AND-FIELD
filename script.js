(()=>{
 'use strict';
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
 const nav=$('.mobile-nav');
 if(nav){
   $$('.mobile-nav-panel a',nav).forEach(a=>a.addEventListener('click',()=>nav.open=false));
   document.addEventListener('pointerdown',e=>{if(nav.open&&!nav.contains(e.target))nav.open=false;});
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.open){nav.open=false;$('.mobile-menu',nav).focus();}});
 }
 // Highlight current top-level navigation destination on all pages.
 const page=location.pathname.split('/').pop()||'index.html';
 $$('.nav a').forEach(a=>{const href=a.getAttribute('href');if(page!=='index.html'&&href.endsWith(page))a.setAttribute('aria-current','page');});
 const progress=$('#scroll-progress');let ticking=false;
 function setProgress(){let distance=document.documentElement.scrollHeight-innerHeight; progress.style.width=`${distance>0?Math.max(0,Math.min(100,100*scrollY/distance)):0}%`;ticking=false;}
 if(progress){setProgress();addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(setProgress);ticking=true;}},{passive:true});addEventListener('resize',setProgress);}
 const filterButtons=$$('.filter-btn'), projects=$$('.archive-grid .project'),status=$('.filter-status');
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  const value=btn.dataset.filter;
  filterButtons.forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
  let count=0;projects.forEach(p=>{const show=value==='all'||p.dataset.category===value;p.hidden=!show;if(show)count++;});
  if(status)status.textContent=`${count} ${count===1?'study':'studies'}`;
 }));
 // Arrow keys switch material tabs, following the WAI-ARIA Tabs keyboard pattern.
 const tabs=$$('.notes-tabs [role="tab"]');
 function activateTab(tab,focus){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel)panel.hidden=!selected;});if(focus)tab.focus();}
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateTab(tab,false));
  tab.addEventListener('keydown',e=>{let next=-1;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==-1){e.preventDefault();activateTab(tabs[next],true);}});
 });
 const form=$('#brief-form');let prepared='';
 if(form)form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);
  const clean=x=>String(data.get(x)||'').replace(/\r/g,'').trim();
  prepared=['FORM & FIELD / PROJECT BRIEF','',`Prepared: ${new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})}`,'',`Name: ${clean('name')}`,`Email: ${clean('email')}`,`Site type: ${clean('type')}`,'', 'About the place:',clean('message'),'','---','Prepared using the Form & Field portfolio prototype.','No details were transmitted to a server.'].join('\n');
  $('#brief-preview').textContent=prepared;$('#brief-result').hidden=false;
  $('#form-feedback').textContent='Brief prepared locally. Nothing has been sent.';
  $('#copy-feedback').textContent='';$('#brief-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 });
 const copy=$('#copy-brief');if(copy)copy.addEventListener('click',async()=>{
  const result=$('#copy-feedback');try{
   if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(prepared);}else{
     const t=document.createElement('textarea');t.value=prepared;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();if(!document.execCommand('copy'))throw Error('Clipboard unavailable');t.remove();
   }
   result.textContent='Copied. The brief is ready to paste.';
  }catch{result.textContent='Clipboard unavailable. Select the text above to copy it manually.';}
 });
 const download=$('#download-brief');if(download)download.addEventListener('click',()=>{
  if(!prepared)return; const blob=new Blob([prepared],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='form-and-field-project-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 });
})();