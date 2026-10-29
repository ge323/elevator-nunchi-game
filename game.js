
const $=s=>document.querySelector(s),cv=$('#cv'),g=cv.getContext('2d');
cv.width=160;cv.height=240;
const R=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h)};
let ac;
function beep(f,d=.08,t='square',v=.06){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),n=ac.createGain();o.type=t;o.frequency.value=f;n.gain.value=v;o.connect(n);n.connect(ac.destination);o.start();n.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(e){}}
const vib=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
const best=()=>{try{return+localStorage.getItem('elv_best')||0}catch(e){return 0}};
const setBest=v=>{try{localStorage.setItem('elv_best',v)}catch(e){}};
function toast(m){const t=$('#toast');t.innerHTML=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)}
let sayT;function say(m,ms=1100){const e=$('#say');e.innerHTML=m;e.style.display='block';clearTimeout(sayT);sayT=setTimeout(()=>e.style.display='none',ms)}

const BOSS=[{s:'#2e4a8a',t:'#e03030',h:'#222',n:'과장',e:0},{s:'#5a5a64',t:'#e0a020',h:'#b8b8b8',n:'부장',e:2},{s:'#15151a',t:'#8e3fc4',h:'#eee',n:'사장',e:4,gl:1},{s:'#c9a227',t:'#b01818',h:'#fff',n:'회장',e:6,gl:1}];
const OKL=['잠깐만!!','어? 같이 가지!','문 좀 열어봐!','야! 나도 타!'];
const BADL=['어~ 자네도 퇴근하나?','오, 마침 잘 만났네','같이 타세. 요즘 어때?'];

let st='title',score=0,c=0,bx=172,spd=30,boss=0,tm=0,press=0,shk=0,t=0,ox=0,ev='',isBoss=false,bhp=3,boostT=0,handT=0,handDone=0,endId=0,darkT=0,jamT=0,inView=0,newEnd=false,grp=[],sd=1,ib=0,allyT=0,lth=0,revived=0,RN=50,zc=0,paused=0,fv=0,bkn=0;
const NEWB={s:'#eef0f6',t:'#3b82f6',h:'#4a2f1d',n:'신입',e:18};
const CASTS=[[0,1,2],[0,1,2],[1,2,'n'],['n',2,'n'],['n','n',2],['n','n','n'],['n','n','n']];
const AUD={s:'#2b2b36',t:'#ffd60a',h:'#777',n:'감사',e:21,gl:1};
const CM=()=>1+.1*(W.rb||0);
const BO=i=>i===3?((W.rk||0)>=6?AUD:BOSS[3]):(c=>c==='n'?NEWB:BOSS[c])(CASTS[W.rk||0][i]);
const RK=['사원','대리','과장','부장','이사','대표','회장'],RC=[40,120,300,600,1000,2000],JC=1500;
const TH=[{w:'#dccba2',b:'#c3ae82',l:'#a9946a',c:'#8d7b5a',t1:'#5d4d3d',t2:'#6e5c48',p:'#e0a070'},{w:'#cfd8e3',b:'#b3bfcf',l:'#98a6ba',c:'#7f8da3',t1:'#7a8599',t2:'#8a95a8',p:'#6fa8dc'},{w:'#d7eee6',b:'#b9dccf',l:'#9cc9ba',c:'#7fb5a5',t1:'#c9dcd5',t2:'#dbe9e4',p:'#8bd0a0'},{w:'#7a3b4a',b:'#63303c',l:'#552733',c:'#3d1c26',t1:'#3d1f2a',t2:'#4a2633',p:'#e6c26a'},{w:'#2c3354',b:'#232945',l:'#1d2239',c:'#161a2e',t1:'#1c2036',t2:'#232843',p:'#ffd86b'},{w:'#9ed8ff',b:'#7cc0ef',l:'#69b0e0',c:'#6fbdf0',t1:'#e8f6ff',t2:'#d4ecfb',p:'#ffffff'},{w:'#b8a9ff',b:'#9a8be0',l:'#8577c9',c:'#7365b8',t1:'#e6e0ff',t2:'#d3caff',p:'#ffffff'},{w:'#0b0b1f',b:'#14143a',l:'#1c1c4a',c:'#05050f',t1:'#12123a',t2:'#1a1a4a',p:'#ffd86b'}];
const THN=['로비','사무실','병원','호텔','야경 라운지','옥상 하늘','구름 위','우주'];
const MX=()=>Math.max(W.mx||0,W.rk||0);
const TT=['부장님이<br>온다!','부장님이<br>온다!','누군가<br>온다!','신입이<br>온다!','신입이<br>온다!','신입이<br>온다!'],TG=['부장님을','부장님을','상사를','신입을','신입을','신입을'];
const rvc=()=>Math.floor((10+score*1.5)*((W.rk||0)>=3?.5:1));
const PK=['','탭 힘 +1','층당 코인 +1','이어하기 반값','탭 힘 +1','탭 힘 +1','코인 +1 추가'];
const CROWD=[0,7,14,21,28,35].map((o,i)=>({o,fk:i%3===2,v:i}));
const FK=[{s:'#e86aa5',h:'#3a2a1a',a:'hp',b:'#e86aa5'},{s:'#8e96a8',h:'#222',gl:1,b:'#3aa05a'},{s:'#ff9f2e',h:'#4a2f1d',a:'cap',b:'#c46a10'},{s:'#9b6ad6',h:'#eeeeee',a:'old'},{s:'#3ba55d',h:'#f2c9a0',b:'#e8f5e9'},{s:'#f2d34a',h:'#7a4a1a',a:'cap'}];
function fkAcc(px,s,o){if(o.a==='hp')R('#222',px-6,147,12,2);else if(o.a==='cap'){R(o.s,px-6,146,12,3);R(o.s,px+(s>0?-9:6),148,3,2)}else if(o.a==='old')R('#6b3d1e',px+(s>0?9:-11),158,2,20);if(o.a!=='old')R(o.b||'#555',px+(s>0?4:-9),158,5,10)}
const FAKE={s:'#e86aa5',h:'#3a2a1a'};
const ENDS=['과장님이 어제 보고서를 읽기 시작했다','과장님과 끝까지 서로 폰만 봤다','부장님이 주말 계획을 물어봤다','부장님이 "요즘 애들은~"을 시작했다','사장님이 어깨를 두드리며 회식을 제안했다','사장님과 눈이 마주쳤다. 5초간 정적','회장님이 직접 업무 보고를 요청했다','회장님이 "자네, 내 방으로"라고 했다','부장님이 전력질주로 뛰어들었다. 문이 포기했다','정전된 사이 누군가 조용히 탑승했다','버튼이 먹통인 사이 상사가 도착했다','택배 카트와 함께 상사도 실려 올라갔다','낙선 손이 문을 열자 상사가 인사했다','거울에 비친 부장님과 눈이 마주쳤다','인파 속에 섞인 상사가 제일 먼저 탔다','이미 타 있던 상사와 끝까지 단둘이 올라갔다','계단으로 먼저 올라온 상사가 문 앞에서 기다리고 있었다','동료가 시간을 벌어줬지만 내가 못 닫았다','신입이 눈을 반짝이며 질문 폭탄을 시작했다','신입이 "선배님 꿀팁 좀요!" 하며 멘토링을 요청했다','문 앞의 인파에 밀려 전원이 한꺼번에 탑승했다','감사팀이 장부를 들고 같이 탑승했다','감사위원이 "잠깐 확인만요" 하며 층마다 서류를 요청했다'];
let W={coin:0,lv:0,bo:0,end:[]};try{Object.assign(W,JSON.parse(localStorage.getItem('elv_w')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('elv_w',JSON.stringify(W))}catch(e){}};
const COST=[10,20,40,80,150];

function person(cx,fy,o,bob=0,back=0){
  const y=fy-30+bob;
  R(o.s,cx-8,y+11,2,10);R(o.s,cx+6,y+11,2,10);
  R('#1d1d26',cx-5,y+22,4,8);R('#1d1d26',cx+1,y+22,4,8);
  R(o.s,cx-6,y+10,12,13);
  if(!back)R(o.t||o.s,cx-1,y+11,2,9);
  R('#f2c9a0',cx-5,y,10,10);
  R(o.h,cx-5,y,10,3);R(o.h,cx-6,y+1,1,4);R(o.h,cx+5,y+1,1,4);
  if(!back){R('#222',cx-3,y+5,1,2);R('#222',cx+2,y+5,1,2)}
  if(o.gl)R('#000',cx-4,y+4,8,1);
}

function draw(){
  g.save();
  const s=shk>0?shk*6:0;g.translate(s?Math.round((Math.random()-.5)*s):0,s?Math.round((Math.random()-.5)*s):0);
  // 벽, 천장, 바닥
  const T=TH[Math.min(7,(score+1)/10|0)];R(T.w,-4,-4,170,190);R(T.b,-4,150,170,3);R(T.l,-4,153,170,32);R(T.p,6,70,28,22);R('#fff',8,72,24,18);R(T.p,12,76,16,10);R('#4aa85a',130,148,16,18);R('#6b4a2b',134,166,8,12);
  R(T.c,-4,-4,170,16);
  for(let i=0;i<3;i++){R('#fffbe0',14+i*52,7,30,4);R('rgba(255,251,224,.18)',10+i*52,11,38,8)}
  for(let i=0;i<20;i++)for(let j=0;j<3;j++)R((i+j)%2?'#6e5c48':'#7c6a54',-4+i*10,184+j*0,0,0);
  for(let i=0;i<17;i++)for(let j=0;j<6;j++)R((i+j)%2?T.t1:T.t2,-4+i*10,178+j*10,10,10);
  // 엘리베이터 프레임/표시등
  R('#3d414c',42,50,76,130);R('#565b68',44,52,72,128);
  R('#14141a',64,54,32,10);g.font='bold 9px monospace';g.textAlign='center';g.fillStyle='#ff4030';g.fillText((score+1)+'F',80,62);
  // 내부
  R('#fff3bf',50,66,60,112);R('#f0dc94',50,66,60,5);R('#e8d17a',50,150,60,28);R('#b0b4bd',50,122,60,2);R('#fff9dd',56,72,3,44);
  // 탑승자
  const bobP=st==='play'&&bx<140?Math.round(Math.sin(t*30)):0;
  if(ev==='inside'&&(st==='play'||st==='succ'||st==='fail'))person(94,178,BO(boss),0,st==='fail'?0:1);person(80,178,PS(),Math.sin(t*3)>.7?1:0,0);
  if(st==='play'||st==='fail')R('#7fd0ff',87,152+(t*40%6|0),2,3);
  // 문
  if(c>0){const pw=Math.round(30*c);
    R('#aab1bd',50,66,pw,112);R('#aab1bd',110-pw,66,pw,112);
    R('#d4d9e2',50+2,66,3,112);R('#d4d9e2',110-5,66,3,112);
    R('#6d7380',50+pw-1,66,1,112);R('#6d7380',110-pw,66,1,112);}
  // 부장
  if(st!=='title'){const mv=(st==='play'||st==='fail');const L=ev==='group'?grp:ev==='rush'?CROWD:ev==='inside'?[]:[{o:0,fk:ev==='fake',v:fv}];
    [...L].reverse().forEach(m=>{const x=bx+m.o,s=m.s||sd;if(m.d||x>=166)return;const px=s<0?160-x:x;person(px,178,m.fk?FK[m.v||0]:BO(boss),mv?Math.round(Math.sin(t*16+m.o)):0,0);if(m.fk)fkAcc(px,s,FK[m.v||0]);else R('#6b3d1e',px+(s>0?-13:6),160,7,6);g.font='bold 12px monospace';g.fillStyle=m.fk?'#4aa8ff':'#ff3030';g.fillText(m.fk?'♪':'!',px,142)})}
  if(ev==='rush'&&(st==='play'||st==='fail')){R('#000',20,20,120,10);R('#ff4030',22,22,Math.round(116*c),6);R('#000',20,32,120,6);R('#ffd60a',22,33,Math.round(116*Math.max(0,ib)/7),4)}
  if(allyT>0&&st==='play'){const ax=bx+16,pa=sd<0?160-ax:ax;person(pa,178,{s:'#3bb3c8',h:'#222'},Math.round(Math.sin(t*20)),0)}
  if(ev==='cart'&&c<.95&&(st==='play'||st==='open')){R('#9c6b3a',96,148,14,30);R('#c89a5e',96,148,14,3);R('#7a5128',96,160,14,2)}
  if(inView)drawIn();else if(handT>0)R('#f2c9a0',98,128,14,6);
  // 대시보드 + 버튼
  R('#262a36',-4,186,170,60);R('#171a22',-4,186,170,3);
  R('#7a808e',48,194,64,40);
  const p=press>0?3:0;
  R('#3a3f4c',62,196,36,36);R(jamT>0?'#777':p?'#e0b030':'#ffd84a',64,198+p,32,32-p);R(p?'#caa028':'#f0b820',64,226,32,0);
  const ac2='#1b1b22',yc=214+p/2;
  for(let i=0;i<5;i++){const k=ev==='inside'?4-i:i;R(ac2,68+i,yc-(4-k),1,(4-k)*2+1);R(ac2,92-i,yc-(4-k),1,(4-k)*2+1)}
  R(ac2,79,yc-4,2,9);if(darkT>0)R('rgba(0,0,0,.9)',0,0,160,186);if(boostT>0){g.strokeStyle='#ffd60a';g.lineWidth=3;g.strokeRect(1.5,1.5,157,237)}
  g.restore();
}

function drawIn(){
 R('#2b2d38',-4,-4,170,190);R('#3b3e4c',-4,-4,170,22);R('#fff3bf',46,6,68,5);R('#8c919e',-4,134,170,3);R('#454858',-4,160,170,26);
 R('#dccba2',36,36,88,134);R('#a9946a',36,140,88,10);R('#6e5c48',36,150,88,20);
 if(st!=='title'&&bx<170){const k=1+(172-bx)/54*1.1,fk=ev==='fake';g.save();g.translate(80,166);g.scale(k,k);person(0,0,fk?FK[fv]:BO(boss),0,0);g.restore();g.font='bold 14px monospace';g.fillStyle=fk?'#4aa8ff':'#ff3030';g.fillText(fk?'♪':'!',80,166-34*k)}
 const pw=Math.round(44*c);R('#aab1bd',36,36,pw,134);R('#aab1bd',124-pw,36,pw,134);R('#6d7380',36+pw-1,36,1,134);R('#6d7380',124-pw,36,1,134);
 if(ev==='cart'&&c<.95)R('#9c6b3a',72,128,26,42);
 R('#1d1f28',28,28,8,146);R('#1d1f28',124,28,8,146);R('#1d1f28',28,28,104,8);
 R('#7a808e',138,60,18,56);for(let i=0;i<4;i++)R(i==1?'#ffd84a':'#444',142,66+i*12,10,8);R('#9fd6e8',2,60,18,70);R('#cfeaf4',4,62,3,66)}
function newRound(){const f=score+1;cx('fl',score);isBoss=f%5===0&&f%50!==0;boss=isBoss?3:score%3;bhp=2;ev=isBoss?'':(f>=3?['fake','fake','cart','hand','dash','dark','jam','inside','stairs','ally','',''][Math.random()*12|0]:'');if(!isBoss&&f>=4&&Math.random()<.25){ev='group';const n=f>=8?3:2;grp=[];for(let i=0;i<n;i++)grp.push({o:i*20,fk:Math.random()<.5,d:0,v:Math.random()*FK.length|0,s:Math.random()<.5?-1:1});if(grp.every(m=>m.fk))grp[Math.random()*n|0].fk=false}
 if(f%50===0)ev='rush';sd=f>=3&&Math.random()<.4?-1:1;if((sd<0||ev==='group')&&!W.tl){W.tl=1;sv();setTimeout(()=>say('왼쪽에서도 온다!',1500),300)}
 fv=Math.random()*FK.length|0;handT=0;handDone=0;jamT=0;darkT=0;allyT=0;inView=ev!=='group'&&ev!=='inside'&&ev!=='rush'&&f>=4&&Math.random()<.3?1:0;if(ev==='fake'&&!W.tut){W.tut=1;sv();setTimeout(()=>say('♪ 표시가 있는 일반인은 태워주세요!',1800),300)}const d=Math.max(1.3,4-.15*score);spd=54/d*(isBoss?.85:1);bx=172;st='open';tm=0;upd();if(isBoss)say(((W.rk||0)>=6?'감사 등장!':'회장님 등장!')+' 2번 닫아라',1600);else if(ev==='group')say('여러 명이 몰려온다! 누가 상사지?',1700);else if(ev==='cart')say('택배 카트다! 문이 안 닫혀',1300);$('#hint').textContent=ev==='inside'?'◀▶ 열림 버튼을 연타해!':ev==='rush'?'게이지가 찰 때까지 연타!':'▶◀ 닫힘 버튼을 연타해!';if(ev==='inside'){st='play';c=.75;ib=3.2;say('앗, 안에 상사가! 열림 열림!!',1500)}else if(ev==='stairs'){bx=140;spd=22/1.9;say('계단으로 먼저 올라왔다?!',1400)}else if(ev==='ally')say('동료가 뛰어온다!',1200);else if(ev==='rush'){bx=128;spd=0;ib=7;RN=40+8*(f/50|0);say(f+'층 돌파 구간! 인파가 몰려온다! 연타!',2200)}if(!isBoss&&CASTS[W.rk||0].includes('n')&&!W.tn&&BO(boss)===NEWB){W.tn=1;sv();setTimeout(()=>say('이제 신입사원이 위협이다!',1600),400)}const tn=Math.min(7,(score+1)/10|0);if(tn!==lth){lth=tn;if(score>0)setTimeout(()=>say((score+1)+'층 · '+THN[tn]+' 구간!',1500),700)}}
function start(){score=0;lth=0;revived=0;c=0;ox=0;$('#title').classList.remove('on');$('#over').classList.remove('on');$('#hud').style.display='flex';$('#hint').style.display='block';$('#bo').style.display='block';$('#pb').style.display='block';boostT=0;newRound();c=0;st='play';upd()}
function upd(){$('#rk').textContent=RK[W.rk||0]+(MX()<6&&W.coin>=RC[MX()]?' ↑':'');$('#fl').textContent=THN[Math.min(7,(score+1)/10|0)]+(isBoss?' · 보스 남은 '+bhp+'번':'');$('#co').innerHTML='<i class="coin"></i>'+W.coin;$('#bo').textContent='부스터 x'+W.bo}
function tap(e){
  if(st!=='play'||jamT>0||paused)return;ct('tp');
  if(ev==='rush'){c=Math.min(1,c+(1+W.lv*.1)/RN*(boostT>0?2:1));press=.08;beep(400+c*600,.03);vib(6);return}if(ev==='inside'){c=Math.max(0,c-(.2+W.lv*.03)*(boostT>0?2:1));press=.08;beep(500,.03);vib(8);return}c=Math.min(1,c+(.22+W.lv*.03+(W.rk||0)*.01)*(boostT>0?2:1)*(ev==='cart'?.6:1));press=.08;beep(500+c*600,.03);vib(8);
}
function over(){
  st='over';ct('pl');if(!bkn&&W.end.length>=3&&(!W.bk||Date.now()-W.bk>6048e5)){bkn=1;setTimeout(()=>toast('기록 백업을 해두세요 (강화 상점)'),1500)}$('#rv').style.display=revived?'none':'block';$('#rv').innerHTML='이어서 하기 · <i class=coin></i>'+rvc()+(W.coin<rvc()?' (부족)':'');$('#bo').style.display='none';$('#pb').style.display='none';$('#hud').style.display='none';$('#hint').style.display='none';
  const b=best(),nb=score>b;if(nb)setBest(score);
  $('#os').textContent=score+'층';
  const ttl=score>=20?'엘리베이터의 신':score>=10?'닫힘 버튼 장인':score>=5?'눈치 9단':'계단 이용자';
  $('#ort').textContent=ttl;$('#ob').innerHTML=RK[W.rk||0]+' · '+(nb?'신기록! ':'최고 '+b+'층 · ')+'<i class="coin"></i>'+W.coin+' · 엔딩 '+W.end.length+'/'+ENDS.length;
  $('#dxb2').innerHTML=dxl();ml();$('#ot').textContent=(newEnd?'새 엔딩! ':'')+ENDS[endId];
  $('#over').classList.add('on');
}
function rushTick(dt){c=Math.min(1,c+.12*dt);ib-=dt;if(c>=.95){const gn=Math.round(15*(((score+1)/50)|0)*CM());W.coin+=gn;ct('ru');sv();c=1;st='succ';tm=0;score++;upd();say('인파 돌파! <i class=coin></i>+'+gn,1800);beep(880,.15,'sine');setTimeout(()=>beep(1320,.3,'sine'),150);setTimeout(()=>beep(1760,.3,'sine'),300);vib([30,40,30,40,60])}else if(ib<=0)arrive()}
function insideTick(dt){c=Math.min(1,c+.44*dt);ib-=dt;if(c<=.06){W.coin+=3;ct('es');sv();st='succ';tm=0;score++;upd();say('탈출 성공! <i class=coin></i>+3');beep(880,.15,'sine');setTimeout(()=>beep(1320,.3,'sine'),150);vib([20,40,20])}else if(ib<=0)arrive()}
function closed(){c=1;
 if(isBoss&&--bhp>0){c=.15;shk=.3;say('문을 억지로 연다! 남은 '+bhp+'번',1000);beep(150,.25,'sawtooth');vib(60);upd();return}
 let m;let pen=0;if(ev==='group'){const fb=Math.min(...grp.filter(x=>!x.d&&!x.fk).map(x=>x.o));pen=3*grp.filter(x=>!x.d&&x.fk&&x.o<fb).length}
 if(ev==='fake'){W.coin=Math.max(0,W.coin-3);m='일반 승객이었다! <i class="coin"></i>-3';beep(150,.3,'sawtooth')}
 else{const gn=Math.round(((isBoss?10:(bx>150?2:1))+((W.rk||0)>=2?1:0)+((W.rk||0)>=6?1:0))*CM());W.coin+=gn;ct('cl');if(isBoss)ct('bk');m=isBoss?'회장 격파! <i class="coin"></i>+10':OKL[Math.random()*4|0]+' <i class="coin"></i>+'+gn;beep(880,.15,'sine');setTimeout(()=>beep(1320,.3,'sine'),150);vib([20,40,20])}
 if(pen){W.coin=Math.max(0,W.coin-pen);m+=' <i class=coin></i>-'+pen}sv();st='succ';tm=0;score++;upd();say(m)}
function arrive(){
 if(ev==='fake'){W.coin+=3;ct('fb');sv();st='succ';tm=0;score++;upd();say('안녕하세요~ <i class="coin"></i>+3');beep(660,.1,'sine');return}
 st='fail';tm=0;shk=.4;endId=BO(boss).e+(Math.random()<.5?0:1);const sp=['dash','dark','jam','cart','hand'].indexOf(ev);if(inView&&Math.random()<.5)endId=13;else if(sp>=0&&Math.random()<.6)endId=8+sp;if(ev==='group'&&Math.random()<.7)endId=14;if(ev==='inside')endId=15;if(ev==='stairs'&&Math.random()<.7)endId=16;if(ev==='ally'&&Math.random()<.7)endId=17;if(ev==='rush')endId=20;say(ENDS[endId],1500);
 newEnd=!W.end.includes(endId);if(newEnd){W.end.push(endId);W.ed=W.ed||{};W.ed[endId]=Date.now()}sv();beep(90,.5,'sawtooth',.1);vib(200)}
const DXL=['과장','과장','부장','부장','사장','사장','회장','회장','돌진','정전','버튼 먹통','택배 카트','낯선 손','엘리베이터 안','무리','이미 탄 상사','계단 추격','동료 구원','신입','신입','인파','감사','감사'];
const DXH=['','','','','','','','','상사가 갑자기 뛰어올 때','불이 꺼졌을 때','버튼이 먹통일 때','택배 카트가 낄 때','낯선 손이 문을 열 때','엘리베이터 안에서 볼 때','여러 명이 몰려올 때','엘리베이터에 상사가 먼저 타 있을 때','상사가 계단으로 먼저 올라올 때','동료가 구하러 올 때','직급이 올라 신입에게 잡히면','직급이 올라 신입에게 잡히면','50층마다 오는 돌파 구간에서 실패하면','회장이 된 뒤 감사에게 잡히면','회장이 된 뒤 감사에게 잡히면'];
const DIA=['8시 47분. 엘베 탔는데 과장님이 어제 보낸 내 보고서를 열어보심… 오타 3개 찾아내서 한 층에 하나씩 말해줌 ㅋㅋ 내려가는 데 1년 걸린 듯.','과장님이랑 단둘이 탐. 서로 폰만 봄. 나 알림 하나도 없는데 괜히 인스타 켰다 껐다 함. 이 정적 ㄹㅇ 시급 줘야 됨.','부장님이 "주말에 뭐 해?" 물어봄. 약속 없다고 솔직하게 말한 거 지금 후회 중… 등산 가자는데 이거 거절 가능한 질문이야? ㅠㅠ','"요즘 애들은 말이야~" 시작됨. 12층 동안 이어짐. 내가 그 요즘 애들인데요? 이어폰 낄 타이밍 놓친 게 오늘의 패인.','사장님이 어깨 툭 치면서 "오늘 한잔?" 해서 순간 얼어붙음. 거절 멘트 5개 준비했는데 하나도 못 씀. 오늘 1차 → 2차 → 노래방 각이다.','사장님이랑 눈 마주침. 인사해야 되나 말아야 되나 고민하다 5초 지남. 엘베 천장 무늬 다 외움. 퇴근길인데 왜 면접 보는 기분이지.','회장님이 직접 "요즘 프로젝트 어떤가?" 물어보심. 저 입사 2년 차인데요. 심장이 엘베보다 먼저 올라감. "네, 열심히 하겠습니다"만 반복함 ㅋㅋㅠㅠ','회장님 한마디. "자네, 내 방으로." 이 문장 들으면 오늘 퇴근은 포기해야 되는 거 맞지? 칼퇴 계획은 내일의 나에게 토스…','부장님이 갑자기 전력질주로 달려와서 몸 던져 탑승함. 운동 안 하신다더니 ㄹㅇ 육상선수였음. 나 닫힘 버튼 연타한 거 들켰나.','갑자기 불 꺼짐. 암흑. 근데 옆에 누가 서 있는 게 느껴짐. 언제 탄 거야?? 숨도 안 쉬는 것 같음. 이거 괴담 아니죠?','닫힘 버튼이 안 눌림. 열 번은 누른 듯. 그 사이에 상사 도착. 아니 버튼아 너까지 나 싫어하니… 이 건물 엘베 점검 좀 해주세요 제발.','택배 카트 때문에 문이 안 닫힘. 기사님이 죄송하다고는 하는데 이미 늦음. 상사님이 카트랑 같이 올라탐. 내 택배도 아닌데 왜 나까지 같이 올라가냐고.','문 닫히는 순간 낯선 손이 쑥 들어옴. 영화인 줄. 상사가 "아이고~" 하면서 탑승함. 그 손 주인이 누군지 아직도 모름. 은인인지 원수인지.','엘베 거울 보는데 뒤에 부장님이 비침. 거울 속에서 눈 마주침. 못 본 척 폰 봄. 근데 뒤통수가 따가움. 부장님 눈빛 ㄹㅇ 레이저임.','사람 많아서 누가 상사인지 구분 못 함. 일반인인 줄 알고 태웠는데 제일 먼저 탄 분이 상사였음. 눈치도 스펙이라는데 나 스펙 부족인가 봐 ㅠㅠ','문 열렸는데 사장님이 이미 타 계심. 뒤돌아 서 계셔서 아직 나 못 본 듯. 열림 버튼 연타했는데… 사장님이 돌아봄. 그냥 같이 18층 감. 인생에서 제일 긴 18층.','문 닫고 안심했는데 다음 층 문 열리니까 부장님이 서 있음. 계단으로 온 거임?? 숨 헐떡이면서 "어, 나 먼저 도착했네" 하는데 소름. 퇴근 안 시켜주려는 의지 ㄹㅇ 대단함.','동료가 "제가 막을게요!" 하고 부장님 붙잡아줌. 감동할 틈도 없이 내가 버튼 못 눌러서 부장님 탑승함. 동료야 미안… 내일 커피 쏠게 ㅠㅠ','신입이 같이 탐. 눈 반짝이면서 "선배님 요즘 힘드신 거 없으세요?" 묻는데… 있다. 너 때문에. 12층 동안 멘토링 당함. 퇴근길에 왜 내가 상담 해주고 있지.','신입이 "선배님 이것만 한 번 봐주세요" 하면서 노트북을 폄. 엘베에서?? 내 퇴근 시간은 그렇게 삭제됨. 나 때는 말이야… 아 나 이제 이 말 하는 사람이구나.','50층 넘었더니 사람들이 한꺼번에 몰려옴. 연타했는데 게이지가 안 참… 결국 전원 탑승. 정원 초과 경보음 울려서 내가 내림. 억울.','회장 됐는데 퇴근길에 감사팀이랑 같이 탐. 장부 들고 있음. 아무 잘못 없는데 괜히 식은땀 남. 회장이어도 감사는 무섭다.','감사위원이 "잠깐 확인만요" 하고 층마다 서류 달라고 함. 내가 회장인데?? 법인카드 영수증 3년 치 요구받음. 퇴근은 내년.'];
let dg,di=0;const D=(c,a,b,w,h)=>{dg.fillStyle=c;dg.fillRect(a,b,w,h)};
function dp(x,fy,o,s){dg.save();dg.translate(x,fy);dg.scale(s,s);D(o.s,-8,-19,2,10);D(o.s,6,-19,2,10);D('#1d1d26',-5,-8,4,8);D('#1d1d26',1,-8,4,8);D(o.s,-6,-20,12,13);D(o.t||o.s,-1,-19,2,9);D('#f2c9a0',-5,-30,10,10);D(o.h,-5,-30,10,3);D(o.h,-6,-29,1,4);D(o.h,5,-29,1,4);D('#222',-3,-25,1,2);D('#222',2,-25,1,2);if(o.gl)D('#000',-4,-26,8,1);dg.restore()}
function dpic(id){dg=$('#dcv').getContext('2d');
 const bi=id<8?id>>1:(id===11?2:id===10?0:1);
 D('#2b2d38',0,0,160,110);D('#3b3e4c',0,0,160,10);D('#fff3bf',44,3,72,3);
 D('#dccba2',34,12,92,90);D('#a9946a',34,84,92,8);D('#6e5c48',34,92,92,10);
 if(id===14){dp(56,98,FK[1],1.3);dp(104,98,FK[3],1.3);dp(80,100,BOSS[0],1.7)}
 else if(id===13){dp(88,98,BOSS[1],1.5)}
 else dp(80,100,(id>20?AUD:id>17?NEWB:BOSS[bi]),id===8?2.2:id>5&&id<8?2.1:1.9);
 if(id===8)for(let i=0;i<5;i++)D('rgba(255,255,255,.55)',38+i*3,26+i*14,16,2);
 D('#aab1bd',34,12,10,90);D('#aab1bd',116,12,10,90);D('#1d1f28',28,8,6,96);D('#1d1f28',126,8,6,96);D('#1d1f28',28,8,104,6);
 if(id===17)dp(112,100,{s:'#3bb3c8',h:'#222'},1.3);
 if(id===11){D('#9c6b3a',46,68,34,34);D('#c89a5e',46,68,34,4)}
 if(id===12){D('#f2c9a0',108,48,30,9);D('#f2c9a0',130,40,8,24)}
 if(id===13){D('#9fd6e8',2,18,26,72);D('#cfeaf4',4,20,4,68);dp(15,88,BOSS[1],.75)}
 if(id===10){D('#7a808e',132,50,22,46);D('#e03030',138,62,10,10);D('#fff',141,65,4,4)}
 if(id===9){D('rgba(0,0,0,.94)',0,0,160,110);D('#fff',70,56,4,3);D('#fff',84,56,4,3)}
 D('#454858',0,102,160,8);D('#f2c9a0',54,96,10,14);D('#f2c9a0',96,96,10,14);D('#222',64,90,32,20);D(id===9?'#111':'#7fd0ff',67,93,26,14)}
function det(i){di=i;const d=new Date((W.ed||{})[i]||Date.now());$('#dd').textContent=(d.getMonth()+1)+'월 '+d.getDate()+'일 '+'일월화수목금토'[d.getDay()]+'요일 · 퇴근길';dpic(i);$('#dcp').textContent='엔딩 '+(i+1)+' · '+DXL[i];$('#dtt').textContent=DIA[i];$('#dtl').classList.add('on')}
function nav(d){const u=W.end.slice().sort((a,b)=>a-b);if(!u.length)return;det(u[(u.indexOf(di)+d+u.length)%u.length])}
const MS=[[3,'<i class=coin></i>20',()=>W.coin+=20],[6,'<i class=coin></i>40',()=>W.coin+=40],[10,'부스터 3개',()=>W.bo+=3],[23,'황금 슈트 + <i class=coin></i>100',()=>{W.coin+=100;W.gold=1;W.cs=6}]];
const hasNew=()=>W.end.some(i=>!(W.seen||[]).includes(i));const dxl=()=>'엔딩 도감'+(hasNew()?'<i class=nw>새 엔딩</i>':'')+(can()?'<i class=gf></i>':'');
const can=()=>MS.some((m,i)=>W.end.length>=m[0]&&!(W.cl||[]).includes(i));
function claim(i){W.cl=W.cl||[];if(W.end.length<MS[i][0]||W.cl.includes(i))return;MS[i][2]();W.cl.push(i);sv();beep(990,.12,'sine');setTimeout(()=>beep(1320,.25,'sine'),120);toast('보상 획득! '+MS[i][1]);dex()}
function dex(){const n=W.end.length,full=n>=ENDS.length;$('#dc').innerHTML='엔딩 도감 '+n+'/'+ENDS.length+(full?' 전부 모았다!':'')+'<div class=hn>엔딩을 누르면 일기가 열려요</div>';$('#dm').innerHTML=MS.map((m,i)=>{const ok=n>=m[0],got=(W.cl||[]).includes(i);return '<div class=ms><span>'+m[0]+'개 · '+m[1]+'</span>'+(got?'<span>완료</span>':ok?'<button class=cb onclick=claim('+i+')>받기</button>':'<span>잠김</span>')+'</div>'}).join('');$('#dxb').innerHTML=$('#dxb2').innerHTML=dxl();
$('#dl').innerHTML=ENDS.map((e,i)=>{const o=W.end.includes(i);return '<div class='+(o?'dx onclick=det('+i+')':'dxl')+'><b>'+String(i+1).padStart(2,'0')+' · '+DXL[i]+(o&&!(W.seen||[]).includes(i)?'<i class=nw2>새 엔딩</i>':'')+'</b><br>'+(o?e:'??? ('+(DXH[i]||'이 상사에게 잡히면')+'?)')+'</div>'}).join('')}
function shop(){ml();const r=MX();const hj=W.hj&&r<6;$('#sj').style.display=hj?'block':'none';$('#jb').style.display=hj?'block':'none';$('#sj').innerHTML=$('#jb').innerHTML='회장으로 환생하기 · <i class=coin></i>'+JC;$('#sz').style.display=(W.rk||0)>=6?'block':'none';$('#sz').textContent=zc?'정말 환생할까요? 한 번 더 누르세요':'환생하기 (직급, 코인 초기화)';$('#sy').innerHTML='직급 바꾸기 · 현재 '+RK[W.rk||0];$('#sy').style.display=r>0?'block':'none';$('#sr').innerHTML=r>=6?'최고 직급 '+RK[6]:'승진 시험 '+RK[r]+' → '+RK[r+1]+' · <i class=coin></i>'+RC[r]+' · 혜택 '+PK[r+1];const m=W.lv>=5;$('#sl').innerHTML='닫힘 버튼 강화 Lv'+W.lv+(m?' MAX':' · <i class="coin"></i>'+COST[W.lv]);$('#sb').innerHTML='2배 부스터 · <i class="coin"></i>15 (보유 '+W.bo+')';$('#sc').innerHTML='보유 <i class="coin"></i>'+W.coin+' · 엔딩 도감 '+W.end.length+'/'+ENDS.length;$('#tb').innerHTML='직급 '+RK[W.rk||0]+(W.rb?' (환생 '+W.rb+'회)':'')+' · '+(best()?'최고 기록 '+best()+'층 · ':'')+'<i class="coin"></i>'+W.coin}
function buy(cost,fn){if(W.coin<cost){toast('코인이 부족해요');beep(120,.2);return}W.coin-=cost;fn();sv();shop();beep(990,.12,'sine')}
let last=performance.now();
function loop(now){
  const dt=paused?0:Math.min(.05,(now-last)/1000);last=now;t+=dt;press=Math.max(0,press-dt);shk=Math.max(0,shk-dt);boostT=Math.max(0,boostT-dt);darkT=Math.max(0,darkT-dt);jamT=Math.max(0,jamT-dt);if(allyT>0){allyT-=dt;if(allyT<=0){allyT=0;spd/=.3}}handT=Math.max(0,handT-dt);
  if(st==='play'){
    c=Math.max(0,c-.22*dt);bx-=spd*dt;
    if(ev==='hand'&&!handDone&&bx<=140){handDone=1;c=Math.max(0,c-.5);handT=.5;say('잠깐만요~!');beep(250,.15)}
    if(ev==='ally'&&!handDone&&bx<=140){handDone=1;spd*=.3;allyT=1.6;say('동료: 부장님~ 잠깐만요!',1300);beep(520,.15,'triangle')}
    if(ev==='dash'&&!handDone&&bx<=146){handDone=1;spd*=2.2;shk=.25;say('뛰어온다!!',900);beep(220,.3,'sawtooth')}
    if(ev==='dark'&&!handDone&&bx<=150){handDone=1;darkT=1.3;say('정전?!',900);beep(100,.4,'sine')}
    if(ev==='jam'&&!handDone&&bx<=150){handDone=1;jamT=.5;say('버튼이 먹통!',900);beep(130,.3,'square')}
    if(ev==='rush')rushTick(dt);else if(ev==='inside')insideTick(dt);else if(c>=.92)closed()
    else if(ev==='group'){for(const m of grp){if(!m.d&&bx+m.o<=118){if(m.fk){m.d=1;W.coin+=3;ct('fb');sv();upd();say('안녕하세요~ <i class=coin></i>+3',900);beep(660,.1,'sine')}else{arrive();break}}}}else if(bx<=118)arrive()
  }else if(st==='succ'){tm+=dt;if(tm>.9)shk=Math.max(shk,.05);if(tm>1.3){newRound()}}
  else if(st==='open'){c=Math.max(0,c-dt*3);if(c<=0){st='play'}}
  else if(st==='fail'){tm+=dt;if(bx>92)bx-=34*dt;if(tm>1.7)over()}
  draw();requestAnimationFrame(loop);
}
$('#w').addEventListener('pointerdown',e=>{if(st==='play'){e.preventDefault();tap()}});
$('#go').onclick=start;$('#re').onclick=start;
$('#sh').onclick=async()=>{
  const url=location.href.split('#')[0],txt='🛗 엘베 눈치게임 '+score+'층! "'+$('#ort').textContent+'" 나왔다. 너도 도전해봐',full=txt+' '+url;
  try{if(navigator.share){await navigator.share({title:'엘베 눈치게임',text:txt,url});return}}catch(e){if(e&&e.name==='AbortError')return}
  try{await navigator.clipboard.writeText(full);toast('복사됐어요! 붙여넣어서 보내세요');return}catch(e){}
  try{const t=document.createElement('textarea');t.value=full;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();if(ok){toast('복사됐어요! 붙여넣어서 보내세요');return}}catch(e){}
  const d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;top:25%;z-index:30;background:#fff;color:#1b1b22;border:4px solid #000;padding:10px;font-weight:400;max-width:420px;margin:0 auto';
  d.innerHTML='<div style="margin-bottom:6px">길게 눌러 복사해서 보내주세요</div><textarea readonly style="width:100%;height:96px;font:inherit"></textarea><button class="btn" style="margin-top:8px;min-width:0;width:100%">닫기</button>';
  d.querySelector('textarea').value=full;d.querySelector('button').onclick=()=>d.remove();document.body.appendChild(d);d.querySelector('textarea').select()
};
$('#dxb').onclick=$('#dxb2').onclick=()=>{dex();$('#dexo').classList.add('on')};$('#dxx').onclick=()=>$('#dexo').classList.remove('on');
dex();$('#dxx').onclick=()=>{$('#dexo').classList.remove('on');W.seen=[...W.end];sv();dex()};
$('#dtc').onclick=()=>$('#dtl').classList.remove('on');$('#dtp').onclick=()=>nav(-1);$('#dtn').onclick=()=>nav(1);
$('#rv').onclick=()=>{const k=rvc();if(W.coin<k){toast('코인이 부족해요');beep(120,.2);return}W.coin-=k;sv();revived=1;$('#over').classList.remove('on');$('#hud').style.display='flex';$('#hint').style.display='block';$('#bo').style.display='block';$('#pb').style.display='block';boostT=0;newRound();c=0;st='play';upd();toast('이어서 달려요!')};
$('#sy').onclick=()=>{const m=MX();W.rk=((W.rk||0)-1+m+1)%(m+1);sv();shop();upd();toast(RK[W.rk]+'(으)로 바꿨어요')};
$('#jb').onclick=$('#sj').onclick=()=>buy(JC,()=>{W.rk=6;W.mx=6;W.hj=1;setTimeout(()=>toast('회장으로 환생했어요!'),0)});
$('#sz').onclick=()=>{if(!zc){zc=1;shop();setTimeout(()=>{zc=0;shop()},3000);return}zc=0;W.rb=(W.rb||0)+1;W.hj=1;W.rk=0;W.mx=0;W.coin=0;W.lv=0;sv();shop();upd();toast('환생! 영구 보너스 +'+W.rb*10+'%')};
function pause(){if(!['play','open','succ'].includes(st)||paused)return;paused=1;$('#pz').classList.add('on')}
function resume(){paused=0;last=performance.now();$('#pz').classList.remove('on')}
$('#pb').onclick=pause;$('#pr').onclick=resume;
$('#pq').onclick=()=>{paused=0;$('#pz').classList.remove('on');over();$('#ot').textContent='중간에 퇴근했다'};
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
const SK=[{n:'기본 초록',s:'#58a65c',h:'#4a2f1d'},{n:'파란 셔츠',s:'#4a7bd6',h:'#222'},{n:'빨간 후드',s:'#d6503a',h:'#3a1a10'},{n:'보라 정장',s:'#7b4ab8',t:'#ffd60a',h:'#222'},{n:'핑크 티',s:'#f08ab8',h:'#5a3a2a'},{n:'블랙 슈트',s:'#1a1a22',t:'#ff4030',h:'#222'},{n:'황금 슈트',s:'#e8b923',t:'#fff3a0',h:'#8a5a00'}];
const unl=i=>i===0||(i===6?!!W.gold:(W.sk||[]).includes(i));
const PS=()=>{const i=W.cs||0;return SK[unl(i)?i:0]};
const DQ=[{n:'일반 승객 5명 태우기',k:'fb',t:5,r:15},{n:'15층 도달하기',k:'fl',t:15,r:20},{n:'닫힘 버튼 200번 누르기',k:'tp',t:200,r:15},{n:'보스 1번 격파하기',k:'bk',t:1,r:30},{n:'게임 5판 하기',k:'pl',t:5,r:20},{n:'층을 30번 클리어하기',k:'cl',t:30,r:20}];
const AC=[{n:'첫 퇴근',d:'1판 하기',k:'pl',t:1,r:10},{n:'눈치 입문',d:'일반 승객 10명 태우기',k:'fb',t:10,r:20},{n:'배려왕',d:'일반 승객 100명 태우기',k:'fb',t:100,r:80,s:1},{n:'연타 장인',d:'닫힘 버튼 1000번 누르기',k:'tp',t:1000,r:30},{n:'연타의 신',d:'닫힘 버튼 10000번 누르기',k:'tp',t:10000,r:150,s:2},{n:'10층 돌파',d:'10층 도달하기',k:'@best',t:10,r:20},{n:'30층 돌파',d:'30층 도달하기',k:'@best',t:30,r:50},{n:'50층 돌파',d:'50층 도달하기',k:'@best',t:50,r:100,s:4},{n:'100층 돌파',d:'100층 도달하기',k:'@best',t:100,r:300,s:3},{n:'보스 헌터',d:'보스 5번 격파하기',k:'bk',t:5,r:60},{n:'탈출의 달인',d:'이미 탄 상사에게서 5번 탈출',k:'es',t:5,r:50},{n:'인파 돌파',d:'돌파 구간 1번 성공',k:'ru',t:1,r:80},{n:'회장 취임',d:'회장이 되기',k:'@mx',t:6,r:200,s:5},{n:'환생',d:'환생 1번 하기',k:'@rb',t:1,r:100},{n:'도감 수집가',d:'엔딩 10개 모으기',k:'@end',t:10,r:40}];
const dkey=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function dayChk(){const k=dkey();if(!W.dm||W.dm.d!==k)W.dm={d:k,p:{},c:[],b:0}}
function ct(k,n=1){W.st=W.st||{};W.st[k]=(W.st[k]||0)+n;dayChk();W.dm.p[k]=(W.dm.p[k]||0)+n}
function cx(k,v){W.st=W.st||{};W.st[k]=Math.max(W.st[k]||0,v);dayChk();W.dm.p[k]=Math.max(W.dm.p[k]||0,v)}
function dlist(){const k=dkey();let x=0;for(const c of k)x=(x*31+c.charCodeAt(0))>>>0;const idx=DQ.map((_,i)=>i),o=[];for(let i=0;i<3;i++){x=(x*1103515245+12345)>>>0;o.push(idx.splice(x%idx.length,1)[0])}return o}
const apg=a=>a.k==='@best'?best():a.k==='@mx'?(MX()>=6?1:0):a.k==='@rb'?(W.rb||0):a.k==='@end'?W.end.length:((W.st||{})[a.k]||0);
function can2(){dayChk();const l=dlist();const dc=l.some(i=>!W.dm.c.includes(i)&&(W.dm.p[DQ[i].k]||0)>=DQ[i].t);const bn=l.every(i=>W.dm.c.includes(i))&&!W.dm.b;const ac=AC.some((a,i)=>!(W.ac||[]).includes(i)&&apg(a)>=a.t);return dc||bn||ac}
function ml(){const h='미션·업적'+(can2()?'<i class=gf></i>':'');$('#mb').innerHTML=$('#mb2').innerHTML=h}
function gv(r,sk){W.coin+=r;if(sk){W.sk=W.sk||[];if(!W.sk.includes(sk)){W.sk.push(sk);W.cs=sk}}sv();upd();ml()}
function cd(i){dayChk();const q=DQ[i];if(W.dm.c.includes(i)||(W.dm.p[q.k]||0)<q.t)return;W.dm.c.push(i);gv(q.r);beep(990,.12,'sine');toast('보상 획득!');msn()}
function cdb(){dayChk();if(W.dm.b)return;W.dm.b=1;gv(30);beep(990,.12,'sine');toast('오늘의 미션 완료 보너스!');msn()}
function ca(i){const a=AC[i];W.ac=W.ac||[];if(W.ac.includes(i)||apg(a)<a.t)return;W.ac.push(i);gv(a.r,a.s);beep(990,.12,'sine');toast('업적 달성! '+a.n+(a.s?' · 새 의상':''));msn()}
function sks(i){if(unl(i)){W.cs=i;sv();msn()}}
function msn(){dayChk();const ic='<i class=coin></i>',l=dlist();let h='<div class=sec>오늘의 미션 (매일 새로 바뀌어요)</div>';
 l.forEach(i=>{const q=DQ[i],p=Math.min(q.t,W.dm.p[q.k]||0),ok=p>=q.t,got=W.dm.c.includes(i);h+='<div class=ms><span>'+q.n+' ('+p+'/'+q.t+')<br>'+ic+q.r+'</span>'+(got?'<span>완료</span>':ok?'<button class=cb onclick=cd('+i+')>받기</button>':'<span>진행중</span>')+'</div>'});
 const all=l.every(i=>W.dm.c.includes(i));h+='<div class=ms><span>3개 모두 완료 보너스<br>'+ic+'30</span>'+(W.dm.b?'<span>완료</span>':all?'<button class=cb onclick=cdb()>받기</button>':'<span>잠김</span>')+'</div>';
 h+='<div class=sec>업적</div>';AC.forEach((a,i)=>{const p=Math.min(a.t,apg(a)),ok=p>=a.t,got=(W.ac||[]).includes(i);h+='<div class=ms><span>'+a.n+'<br><small>'+a.d+' ('+p+'/'+a.t+')<br>'+ic+a.r+(a.s?' + 의상 '+SK[a.s].n:'')+'</small></span>'+(got?'<span>완료</span>':ok?'<button class=cb onclick=ca('+i+')>받기</button>':'<span>잠김</span>')+'</div>'});
 h+='<div class=sec>내 의상</div><div class=rowf>';SK.forEach((k,i)=>{h+='<button class="skb'+((W.cs||0)===i?' on':'')+(unl(i)?'':' lk')+'" onclick=sks('+i+')>'+k.n+(unl(i)?'':' (잠김)')+'</button>'});h+='</div>';$('#mbx').innerHTML=h;ml()}
$('#mb').onclick=$('#mb2').onclick=()=>{msn();$('#mso').classList.add('on')};$('#msx').onclick=()=>$('#mso').classList.remove('on');
const hsh=t=>{let x=2166136261;t='elv|'+t;for(let i=0;i<t.length;i++){x^=t.charCodeAt(i);x=Math.imul(x,16777619)}return(x>>>0).toString(36)};
function mkCode(){const j=JSON.stringify({v:1,w:W,b:best()});const p=btoa(unescape(encodeURIComponent(j))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');return 'ELV1-'+p+'.'+hsh(p)}
function readCode(c){c=(c||'').replace(/\s+/g,'');if(c.indexOf('ELV1-')!==0)throw 0;const k=c.lastIndexOf('.');const p=c.slice(5,k);if(k<6||hsh(p)!==c.slice(k+1))throw 1;const j=JSON.parse(decodeURIComponent(escape(atob(p.replace(/-/g,'+').replace(/_/g,'/')))));if(!j||typeof j.w!=='object')throw 2;return j}
const nm=(v,lo,hi)=>Math.min(hi,Math.max(lo,Math.floor(+v)||0));
const arr=(a,hi)=>(Array.isArray(a)?a:[]).map(x=>nm(x,0,hi)).filter((x,i,l)=>l.indexOf(x)===i);
function clean(w){const o={coin:nm(w.coin,0,1e9),lv:nm(w.lv,0,5),bo:nm(w.bo,0,9999),end:arr(w.end,ENDS.length-1),rk:nm(w.rk,0,6),mx:nm(w.mx,0,6),hj:w.hj?1:0,rb:nm(w.rb,0,999),cl:arr(w.cl,MS.length-1),seen:arr(w.seen,ENDS.length-1),ed:{},gold:w.gold?1:0,tut:w.tut?1:0,tl:w.tl?1:0,tn:w.tn?1:0,bk:+w.bk||0,st:{},ac:arr(w.ac,99),sk:arr(w.sk,9),cs:nm(w.cs,0,9)};if(w.st&&typeof w.st==='object')for(const k in w.st)if(/^[a-z]{1,3}$/.test(k))o.st[k]=nm(w.st[k],0,1e9);if(w.ed&&typeof w.ed==='object')for(const k in w.ed)o.ed[nm(k,0,99)]=+w.ed[k]||0;if(o.rk>o.mx)o.mx=o.rk;return o}
$('#bk').onclick=async()=>{const c=mkCode();W.bk=Date.now();sv();try{await navigator.clipboard.writeText(c);toast('백업 코드가 복사됐어요! 메모에 붙여넣어 두세요');return}catch(e){}$('#bw').style.display='flex';$('#bt').value=c;$('#bt').select();$('#bw').scrollIntoView&&$('#bw').scrollIntoView();toast('아래 코드를 길게 눌러 복사하세요')};
$('#bi').onclick=()=>{const v=$('#bw').style.display==='flex';$('#bw').style.display=v?'none':'flex';if(!v){$('#bt').value='';$('#bw').scrollIntoView&&$('#bw').scrollIntoView()}};
let bc=0;$('#ba').onclick=()=>{let j;try{j=readCode($('#bt').value)}catch(e){toast('코드가 올바르지 않아요');beep(120,.2);return}if(!bc){bc=1;$('#ba').textContent='현재 기록이 사라져요. 한 번 더!';setTimeout(()=>{bc=0;$('#ba').textContent='이 코드로 덮어쓰기'},3000);return}bc=0;$('#ba').textContent='이 코드로 덮어쓰기';W=Object.assign({coin:0,lv:0,bo:0,end:[]},clean(j.w));setBest(Math.max(0,Math.floor(+j.b)||0));sv();$('#bw').style.display='none';shop();upd();dex();toast('기록을 불러왔어요')};
$('#sr').onclick=()=>{const r=MX();if(r<6)buy(RC[r],()=>{W.rk=r+1;W.mx=r+1;if(r+1===6)W.hj=1;setTimeout(()=>toast(''+RK[r+1]+(r+1===6?' 취임!':' 승진!')+(r+1===2?' 이제 신입사원이 위협이에요':'')),0)})};
$('#sl').onclick=()=>{if(W.lv<5)buy(COST[W.lv],()=>W.lv++)};$('#sb').onclick=()=>buy(15,()=>W.bo++);$('#sx').onclick=()=>$('#shop').classList.remove('on');
$('#shb').onclick=$('#shb2').onclick=()=>{shop();$('#shop').classList.add('on')};
$('#bo').onpointerdown=e=>{e.stopPropagation();if(st==='play'&&W.bo>0&&boostT<=0){W.bo--;boostT=4;sv();upd();beep(1000,.2,'sine');say('2배 부스터!',900)}};
shop();
document.addEventListener('contextmenu',e=>e.preventDefault());
requestAnimationFrame(loop);
