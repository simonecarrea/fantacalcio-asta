// Aggiornamento post-mercato 02/09/2026
(function(){
  if (typeof data === 'undefined') return;
  const remove = new Set(['Di Gregorio','Suzuki','Perin','Leao','Sommer','Rui Patricio','Terracciano','Scuffet','Audero','Leali','Joronen','Turati','Consigli']);
  const seen = new Set();
  for (let i=data.length-1;i>=0;i--){
    const p=data[i], k=p.role+'|'+p.name+'|'+p.team;
    if(remove.has(p.name)||seen.has(k)) data.splice(i,1); else seen.add(k);
  }
  const provedel=data.find(p=>p.name==='Provedel');
  if(provedel) Object.assign(provedel,{team:'INT',q:2,fvm:5,status:'Riserva',band:3,target:'1–2',max:2,note:'Vice/alternativa Inter',tags:'handcuff'});
  const adds=[
    {role:'P',band:1,name:'Vicario',team:'JUV',status:'Titolare',q:17,fvm:70,target:'20–27',max:31,note:'Nuovo n.1 Juventus',tags:'top'},
    {role:'D',band:2,name:'Stones',team:'INT',status:'Riserva',q:12,fvm:25,target:'6–10',max:12,note:'Nuovo innesto Inter, upside ma gerarchie da seguire',tags:'value'},
    {role:'C',band:2,name:'Jones C.',team:'INT',status:'Ballottaggio',q:12,fvm:47,target:'12–18',max:22,note:'Ballottaggio e inserimenti, profilo da bonus',tags:'value'},
    {role:'C',band:2,name:'Gonzalez N.',team:'JUV',status:'Ballottaggio',q:12,fvm:45,target:'11–17',max:20,note:'Rotazioni offensive Juventus',tags:'value'}
  ];
  adds.forEach(p=>{if(!data.some(x=>x.name===p.name&&x.team===p.team))data.push(p)});
  try{render();renderTeam();renderFormations();}catch(e){console.error('market patch',e)}
  const legend=document.querySelector('.legend');
  if(legend&&!document.getElementById('marketPatchLegend')){const n=document.createElement('div');n.id='marketPatchLegend';n.className='legend';n.innerHTML='<b>✅ Check mercato 02/09:</b> lista riallineata dopo la chiusura del mercato. Vicario inserito come titolare Juventus; Di Gregorio rimosso.';legend.parentNode.insertBefore(n,legend);}
})();
