// src/ui/portraits.js
// Motor de retratos y recoloreo de sprites en <canvas>, extraído de main.js (Paso 2 de modularización).

import { chance, pick } from '../core/utils.js';
import { hasRedGene, rawHairPigmentIndex, skinIndexFromGenotype, ensureGenotypeSync, displayedHairColorKey } from '../systems/genetics.js';
import { SPRITE_BASE_B64 } from '../data/constants.js';
import { world, householdStatus } from '../main.js';

/* =========================================================
   RETRATO REAL POR GENOTIPO (v7) — recolorea en <canvas> los sprites de
   pack/variantes con los colores reales del personaje, en vez de un tile
   genérico. Se recolorea en el navegador (no se embeben los 6240 PNG ya
   generados: harían crecer este HTML único ~15×) a partir de solo 6
   sprites base (~3KB en total, embebidos abajo) + las mismas tablas de
   paleta que usó pack/variantes/generar_sprites_medievales.bat y
   generar_base_mujer_vieja_sin_accesorio.bat para generar sus 6240+200
   PNG — verificado píxel a píxel contra un muestreo real de esos archivos
   (los 6 tipos de sprite, casos límite de piel+pelo incluidos) antes de
   integrarlo aquí, así que la salida es idéntica a la de esos scripts.

   - PALETTES: mismos nombres/códigos/hex que los .bat, para que
     appearance.hairColorKey / wardrobe.* (strings) mapeen directo.
   - SPRITE_BASE_B64: los 6 sprites base (hm/ha/hc/hb/mw/ow) con sus
     colores placeholder de siempre (magenta=piel, cian=pelo, etc. — ver
     PLACEHOLDER_RGB / PLACEHOLDER_RGB_OW).
   - preloadSpriteBases(): decodifica esos 6 PNG a ImageData UNA sola vez
     al arrancar (async, ver el boot al final del archivo); de ahí en
     adelante recolorToDataURL() es sync — solo remapea el array de
     píxeles ya decodificado, sin volver a cargar imágenes.
   - PORTRAIT_CACHE: cada combinación (tipo+piel+pelo+ropa) se pinta una
     sola vez por partida y se reusa (misma idea que TILE_B64, pero
     generado en vez de embebido). */
export const PALETTES = {
  skin: {1:['#FFD3A0','#F0B57B'],2:['#F7C282','#E19A65'],3:['#E9A66B','#C97B50'],4:['#C98255','#A85C3F'],5:['#985A3C','#753D2E']},
  hair: {
    black:['bk','#3B3438','#1F1B20'], dark_brown:['db','#6B4335','#3F2925'], brown:['br','#8F5A3C','#593629'],
    light_brown:['lb','#B47A50','#765039'], dark_blond:['dd','#C49A5A','#8B673E'], blond:['bd','#E1BD72','#B1874F'],
    light_blond:['ld','#F0D694','#C3A666'], ginger:['gi','#C9683C','#873C2D'], auburn:['au','#9D4D3D','#63302F'],
    gray:['gy','#B9B1A7','#77716D'], white:['wh','#E8E2D6','#AAA59D']
  },
  agedHair: {
    aged_dark:['od','#75839A','#BBC4D3'], aged_brown:['ob','#8D8E96','#CCC7C0'], aged_blond:['ol','#A5A39A','#E1DAC6'],
    aged_ginger:['og','#97867C','#D9C7BA'], white:['wh','#BCC5D0','#F1F3F4']
  },
  shirt: {linen:['ln','#D9D0BC','#A89D86'],olive:['ol','#7E8B55','#58613D'],forest:['fo','#4F6E4B','#314532'],blue:['bl','#5B7FA8','#3D5875'],red:['rd','#A35A52','#6F3B36'],burgundy:['bg','#7E4152','#552A36'],brown:['bn','#8B6B4A','#5F492F'],black:['bk','#4A4346','#292428']},
  pants: {brown:['br','#7A5A43','#523B2D'],dark_brown:['db','#5F4637','#3D2C24'],gray:['gy','#88858A','#5C5860'],blue:['bl','#586D8A','#39485F'],green:['gr','#62754D','#415033'],black:['bk','#3E3A3E','#221F23']},
  dress: {linen:['ln','#DCCCB2','#A99679'],olive:['ol','#76854F','#505B37'],forest:['fo','#4E6947','#314232'],blue:['bl','#5B79A6','#3A5272'],red:['rd','#AA5950','#743935'],burgundy:['bg','#7C4156','#522A39'],plum:['pl','#76608E','#4C3C5E'],brown:['bn','#89684B','#5B452F']},
  accessory: {white:['wh','#E9E2D5'],cream:['cr','#D7C9AA'],red:['rd','#A44B47'],blue:['bl','#5678A2'],olive:['ol','#73834F'],gold:['gd','#C8A45A']}
};
export const PLACEHOLDER_RGB = { skinBase:'255,0,255', skinShade:'170,0,170', hairBase:'0,255,255', hairShade:'0,136,170', shirtBase:'0,255,0', shirtShade:'0,136,0', pantsBase:'255,255,0', pantsShade:'170,136,0', dressBase:'255,102,0', dressShade:'153,51,0', accBase:'255,0,0', beardBase:'0,0,255' };
export const PLACEHOLDER_RGB_OW = { skinBase:'255,0,255', skinShade:'170,0,170', hairBase:'139,155,180', hairLight:'192,203,220', dressBase:'255,102,0', dressShade:'153,51,0' };
export function hexToRgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }

/* mismo límite de arte que allowedHairBySkin del generador joven (ver
   clampHairPigment más arriba, ya reproduce esa tabla exacta) y de
   generar_base_mujer_vieja_sin_accesorio.bat para la mujer vieja (tabla
   propia, no sigue la misma fórmula porque el set de 5 categorías
   "envejecidas" es distinto al de 11 colores naturales) */
export const AGED_HAIR_ALLOWED_BY_SKIN = {
  1:['aged_dark','aged_brown','aged_blond','aged_ginger','white'],
  2:['aged_dark','aged_brown','aged_blond','aged_ginger','white'],
  3:['aged_dark','aged_brown','aged_blond','aged_ginger','white'],
  4:['aged_dark','aged_brown','aged_ginger','white'],
  5:['aged_dark','aged_brown','white']
};
export function agedHairBucketFromGenotype(g){
  if(hasRedGene(g)) return 'aged_ginger';
  const h = rawHairPigmentIndex(g);
  if(h<=1) return 'aged_dark';
  if(h<=3) return 'aged_brown';
  return 'aged_blond';
}
export function clampAgedHair(skinIndex, bucket){
  const allowed = AGED_HAIR_ALLOWED_BY_SKIN[skinIndex];
  if(allowed.includes(bucket)) return bucket;
  return allowed.includes('aged_brown') ? 'aged_brown' : 'aged_dark';
}

/* vestuario NO es genético — elección/posición social, ver nota en el
   bloque de genética más arriba. Se sortea una sola vez por personaje
   (perezoso, como ensureGenotypeSync) y queda fijo, sesgado por la
   prosperidad ACTUAL de su hogar (householdStatus) en el momento en que
   se le pide por primera vez un retrato — no por su hogar de nacimiento,
   así que alguien que se independiza pobre y prospera después no queda
   "condenado" a su paleta humilde de siempre en renders futuros porque
   nunca se le había pedido un retrato antes de prosperar. */
export const WARDROBE_RICH_CHANCE = {destitute:0.03, poor:0.15, stable:0.35, comfortable:0.6, prosperous:0.85};
export const SHIRT_HUMBLE=['linen','olive','forest','brown'], SHIRT_RICH=['blue','red','burgundy','black'];
export const PANTS_HUMBLE=['brown','dark_brown','gray'], PANTS_RICH=['blue','green','black'];
export const DRESS_HUMBLE=['linen','olive','forest','brown'], DRESS_RICH=['blue','red','burgundy','plum'];
export const ACC_HUMBLE=['white','cream','olive'], ACC_RICH=['red','blue','gold'];
export function wardrobeStatusFor(ch){
  const hh = (ch.householdId && world && world.households) ? world.households[ch.householdId] : null;
  return hh ? householdStatus(hh) : 'stable';
}
export function weightedWardrobePick(status, humble, rich){ return chance(WARDROBE_RICH_CHANCE[status] ?? 0.35) ? pick(rich) : pick(humble); }
export function ensureWardrobe(ch){
  const a = ch && ch.appearance; if(!a || a.wardrobe) return;
  const status = wardrobeStatusFor(ch);
  a.wardrobe = ch.sex==='F'
    ? { dressKey: weightedWardrobePick(status, DRESS_HUMBLE, DRESS_RICH), accessoryKey: weightedWardrobePick(status, ACC_HUMBLE, ACC_RICH) }
    : { shirtKey: weightedWardrobePick(status, SHIRT_HUMBLE, SHIRT_RICH), pantsKey: weightedWardrobePick(status, PANTS_HUMBLE, PANTS_RICH) };
}

/* tipo de sprite base por personaje. armadura/casco (ha/hc) quedan sin
   disparador todavía — pendiente de enganchar a oficio/actividad (p.ej.
   "guardia" o la ambición "ganar tus espuelas"), documentado como
   limitación conocida en vez de forzar una regla inventada. */
export function spriteTypeFor(ch){
  if(ch.sex==='F') return ch.age>=65 ? 'ow' : 'mw'; // 65 = mismo umbral que LIFE_STAGES.oldAge
  return (ch.appearance && ch.appearance.beard && ch.age>=16) ? 'hb' : 'hm';
}

export const SPRITE_PIXELS = {}; // se llena en preloadSpriteBases(): {hm:{width,height,data:Uint8ClampedArray}, ...}
export function loadSpritePixels(key){
  return new Promise((resolve)=>{
    const img = new Image();
    img.onload = ()=>{
      const c = document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
      const ctx = c.getContext('2d'); ctx.drawImage(img,0,0);
      const id = ctx.getImageData(0,0,c.width,c.height);
      SPRITE_PIXELS[key] = {width:c.width, height:c.height, data:id.data};
      resolve();
    };
    img.onerror = ()=>resolve(); // si falla esa clave queda sin píxeles -> characterPortraitURL cae al tile genérico
    img.src = 'data:image/png;base64,'+SPRITE_BASE_B64[key];
  });
}
export function preloadSpriteBases(){ return Promise.all(Object.keys(SPRITE_BASE_B64).map(loadSpritePixels)); }

/* recolorToDataURL: idéntico al algoritmo de New-VariantBitmap en los
   .bat (reemplaza SOLO los píxeles que matchean exacto un color
   placeholder; un píxel transparente se deja transparente; lo que no
   matchea ningún placeholder se copia igual) pero sobre el ImageData ya
   decodificado — sin volver a cargar ninguna imagen, así que es síncrono. */
export function recolorToDataURL(baseKey, mapping){
  const src = SPRITE_PIXELS[baseKey]; if(!src) return null;
  const c = document.createElement('canvas'); c.width=src.width; c.height=src.height;
  const ctx = c.getContext('2d');
  const out = ctx.createImageData(src.width, src.height);
  const sd = src.data, od = out.data;
  for(let i=0;i<sd.length;i+=4){
    const a = sd[i+3];
    if(a===0){ od[i+3]=0; continue; }
    const repl = mapping[sd[i]+','+sd[i+1]+','+sd[i+2]];
    if(repl){ od[i]=repl[0]; od[i+1]=repl[1]; od[i+2]=repl[2]; od[i+3]=255; }
    else { od[i]=sd[i]; od[i+1]=sd[i+1]; od[i+2]=sd[i+2]; od[i+3]=a; }
  }
  ctx.putImageData(out,0,0);
  return c.toDataURL('image/png');
}

export const PORTRAIT_CACHE = {};
export function characterPortraitURL(ch){
  if(!ch || ch.age<=2) return null; // bebés: sigue el sistema baby1..5 existente, sin sprite base propio
  ensureGenotypeSync(ch);
  const a = ch.appearance; if(!a || !a.genotype) return null;
  if(!SPRITE_PIXELS.hm) return null; // bases todavía sin decodificar (arranque en curso) -> respaldo de tileImg
  ensureWardrobe(ch);
  const spriteType = spriteTypeFor(ch);
  const skinIndex = a.skinIndex || skinIndexFromGenotype(a.genotype);
  let cacheKey, mapping;
  if(spriteType==='ow'){
    // pasado el propio whiteOnsetAge (aunque ya esté en el tramo "ow" de
    // 65+), el pelo termina de blanquear del todo -- mismo criterio de
    // displayedHairColorKey, para que una misma persona sea consistente
    // consigo misma a lo largo de la vejez en vez de quedar fija en su
    // tono envejecido inicial para siempre
    const bucket = (ch.age >= a.whiteOnsetAge) ? 'white' : clampAgedHair(skinIndex, agedHairBucketFromGenotype(a.genotype));
    const [hCode,hBase,hLight] = PALETTES.agedHair[bucket];
    const [dCode,dBase,dShade] = PALETTES.dress[a.wardrobe.dressKey];
    cacheKey = `ow|sk${skinIndex}|${hCode}|${dCode}`;
    if(PORTRAIT_CACHE[cacheKey]) return PORTRAIT_CACHE[cacheKey];
    mapping = {};
    mapping[PLACEHOLDER_RGB_OW.skinBase]=hexToRgb(PALETTES.skin[skinIndex][0]); mapping[PLACEHOLDER_RGB_OW.skinShade]=hexToRgb(PALETTES.skin[skinIndex][1]);
    mapping[PLACEHOLDER_RGB_OW.hairBase]=hexToRgb(hBase); mapping[PLACEHOLDER_RGB_OW.hairLight]=hexToRgb(hLight);
    mapping[PLACEHOLDER_RGB_OW.dressBase]=hexToRgb(dBase); mapping[PLACEHOLDER_RGB_OW.dressShade]=hexToRgb(dShade);
  } else {
    const hairName = displayedHairColorKey(ch); // canoso/blanco por edad ya resuelto acá
    const [hCode,hBase,hShade] = PALETTES.hair[hairName] || PALETTES.hair.brown;
    mapping = {};
    mapping[PLACEHOLDER_RGB.skinBase]=hexToRgb(PALETTES.skin[skinIndex][0]); mapping[PLACEHOLDER_RGB.skinShade]=hexToRgb(PALETTES.skin[skinIndex][1]);
    mapping[PLACEHOLDER_RGB.hairBase]=hexToRgb(hBase); mapping[PLACEHOLDER_RGB.hairShade]=hexToRgb(hShade);
    if(spriteType==='mw'){
      const [dCode,dBase,dShade] = PALETTES.dress[a.wardrobe.dressKey];
      const [acCode,acColor] = PALETTES.accessory[a.wardrobe.accessoryKey];
      mapping[PLACEHOLDER_RGB.dressBase]=hexToRgb(dBase); mapping[PLACEHOLDER_RGB.dressShade]=hexToRgb(dShade);
      mapping[PLACEHOLDER_RGB.accBase]=hexToRgb(acColor);
      cacheKey = `mw|sk${skinIndex}|${hCode}|${dCode}|${acCode}`;
    } else { // hm / hb (y ha/hc el día que se disparen, ya soportado el color de piel+pelo)
      const [shCode,shBase,shShade] = PALETTES.shirt[a.wardrobe.shirtKey];
      const [ptCode,ptBase,ptShade] = PALETTES.pants[a.wardrobe.pantsKey];
      mapping[PLACEHOLDER_RGB.shirtBase]=hexToRgb(shBase); mapping[PLACEHOLDER_RGB.shirtShade]=hexToRgb(shShade);
      mapping[PLACEHOLDER_RGB.pantsBase]=hexToRgb(ptBase); mapping[PLACEHOLDER_RGB.pantsShade]=hexToRgb(ptShade);
      if(spriteType==='hb') mapping[PLACEHOLDER_RGB.beardBase]=hexToRgb(hShade); // barba = sombra del pelo real, "1 por pelo"
      cacheKey = `${spriteType}|sk${skinIndex}|${hCode}|${shCode}|${ptCode}`;
    }
    if(PORTRAIT_CACHE[cacheKey]) return PORTRAIT_CACHE[cacheKey];
  }
  const url = recolorToDataURL(spriteType, mapping);
  if(url) PORTRAIT_CACHE[cacheKey] = url;
  return url;
}
