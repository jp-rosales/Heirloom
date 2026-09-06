// src/core/utils.js
// Utilidades centrales extraídas de main.js (Paso 2 de modularización).


/* ---------- utilidades ---------- */
export function uid(){return 'x'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);}
export function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
export function chance(p){return Math.random()<p;}
export function pick(arr){return arr[rand(0,arr.length-1)];}
export function pickWeighted(items){ // items: [{w,...}]
  const total=items.reduce((s,i)=>s+i.w,0);
  let r=Math.random()*total;
  for(const it of items){ r-=it.w; if(r<=0) return it; }
  return items[items.length-1];
}
export function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
