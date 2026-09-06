// src/systems/genetics.js
// Motor de genética mendeliana de apariencia, extraído de main.js (Paso 2 de modularización).

import { chance, rand, clamp } from '../core/utils.js';

/* ---------- genética de apariencia (Partes 24-29, reescrito v7) ----------
   Reemplaza la "herencia visual" de v5 (promedio ± ruido, sin base real)
   por un modelo mendeliano de verdad: cada rasgo heredable es un genotipo
   diploide (2 alelos por locus, uno de cada progenitor) que se combina por
   meiosis real — cada hijo recibe UN alelo al azar de cada par de CADA
   progenitor, no un promedio de los dos. Pensado para casar con el arte
   real de pack/variantes (5 tonos de piel × 11 colores de pelo, 43 de 55
   combinaciones piel+pelo con sprite dibujado — ver
   generar_sprites_medievales.bat / manifest.csv).

   - PIEL: rasgo POLIGÉNICO aditivo, como en la genética real (varios genes
     — SLC24A5, SLC45A2, OCA2, TYR, KITLG... — suman melanina, no hay un
     solo gen "dominante" que decida el tono). 4 loci × 2 alelos
     (0=claro,1=oscuro) → suma 0-8 → 5 tonos. Al ser una suma de variables
     al azar, la distribución sale en campana (tonos intermedios más
     comunes que los extremos) en vez de plana — efecto real de la
     herencia poligénica, no un ajuste manual.
   - PELO (pigmento): mismo tipo de modelo, 3 loci × 2 alelos → suma 0-6 →
     de negro (0) a rubio claro (6).
   - PELIRROJO: un gen aparte, recesivo, al estilo del MC1R real — solo se
     expresa en homocigoto (rr). Un portador (Rr) no lo muestra pero puede
     transmitirlo: dos padres de pelo oscuro sin pelirrojos visibles
     pueden tener un hijo pelirrojo "sorpresa", igual que en la vida real.
     Frecuencia del alelo ~15% → ~2% de la población nace rr, similar al
     porcentaje real de pelirrojos.
   - El gen pelirrojo interactúa con el eje de pigmento en vez de ser un
     color más de la lista: activo + pigmento claro = pelirrojo; activo +
     pigmento oscuro = auburn/rojizo oscuro. Son la misma mutación
     expresándose sobre una base clara u oscura, no dos genes distintos.
   - CANOSO y BLANCO NO son genotipo — son el pelo natural cubierto por la
     edad (ver displayedHairColorKey): todo el mundo encanece si vive lo
     bastante, así que no tiene sentido "heredar" ser canoso. Cada
     personaje recibe su propia edad de inicio (rollGrayOnset) una sola
     vez, no una edad fija para todo el mundo.
   - BARBA sigue ligada al color de pelo real del personaje (mismo tile,
     "1 por pelo" como pide el catálogo de arte), pero llevarla o no es
     aseo/elección personal, no genotipo.
   - ROPA (camisa/pantalón/vestido/accesorio) NO es genética — es elección/
     posición social, y queda fuera de este sistema a propósito (unidad
     aparte pendiente).
   - Límite del arte real: solo 43 de las 55 combinaciones piel+pelo
     teóricas tienen sprite dibujado (allowedHairBySkin en
     generar_sprites_medievales.bat — más claro el pelo, más se restringe
     al oscurecer la piel; pelirrojo natural solo dibujado en piel 1-3,
     auburn en las 5). clampHairPigment() recorta SOLO lo que se muestra
     este retrato; el genotipo completo se guarda igual, así que un tono
     de pelo claro "latente" puede reaparecer en un descendiente de piel
     más clara. Es una limitación del arte disponible, no una regla
     biológica real — documentado así para no confundir una cosa con otra. */
export const HAIR_PIGMENT_NAMES = ['black','dark_brown','brown','light_brown','dark_blond','blond','light_blond'];
export const HAIR_CODE = {black:'bk',dark_brown:'db',brown:'br',light_brown:'lb',dark_blond:'dd',blond:'bd',light_blond:'ld',ginger:'gi',auburn:'au',gray:'gy',white:'wh'};
export const SKIN_LOCI_N = 4, HAIR_LOCI_N = 3;
export const RED_ALLELE_FREQ = 0.15; // frecuencia del alelo recesivo -> ~2% homocigotos (rr) al nacer, similar a la frecuencia real de pelirrojos
export const MUTATION_RATE = 0.015; // por alelo, en cada concepción — no es la tasa real (muchísimo más baja), es para que 40-60 años de partida no agoten la diversidad de un pueblo de 12-20 fundadores

export function randomLocusPair(pDark){ const a=()=>chance(pDark)?1:0; return [a(),a()]; }
export function randomGenotype(){
  return {
    skinLoci: Array.from({length:SKIN_LOCI_N},()=>randomLocusPair(0.5)),
    hairLoci: Array.from({length:HAIR_LOCI_N},()=>randomLocusPair(0.5)),
    redAlleles: [chance(RED_ALLELE_FREQ)?1:0, chance(RED_ALLELE_FREQ)?1:0]
  };
}
export function gameteAllele(pair){ const a = pair[chance(0.5)?0:1]; return chance(MUTATION_RATE) ? (a?0:1) : a; }
export function inheritLocusPair(fatherPair, motherPair){ return [gameteAllele(fatherPair), gameteAllele(motherPair)]; }
export function inheritGenotype(fatherGenotype, motherGenotype){
  const fg = fatherGenotype || randomGenotype(), mg = motherGenotype || randomGenotype();
  return {
    skinLoci: fg.skinLoci.map((fp,i)=>inheritLocusPair(fp, mg.skinLoci[i])),
    hairLoci: fg.hairLoci.map((fp,i)=>inheritLocusPair(fp, mg.hairLoci[i])),
    redAlleles: inheritLocusPair(fg.redAlleles, mg.redAlleles)
  };
}
export function sumLoci(loci){ return loci.reduce((s,pair)=>s+pair[0]+pair[1],0); }
export function skinIndexFromGenotype(g){
  const s = sumLoci(g.skinLoci); // 0-8
  if(s<=1) return 1; if(s<=3) return 2; if(s===4) return 3; if(s<=6) return 4; return 5;
}
export function rawHairPigmentIndex(g){ return sumLoci(g.hairLoci); } // 0-6, 0=negro .. 6=rubio claro
export function hasRedGene(g){ return g.redAlleles[0]===1 && g.redAlleles[1]===1; }
/* recorta el eje de pigmento a lo que existe dibujado para ese tono de piel
   (pack/variantes: allowedHairBySkin, maxH = 7-tonoDePiel reproduce la
   tabla exacta del generador sin tener que copiarla entera aquí) */
export function clampHairPigment(skinIndex, rawH){ return Math.min(rawH, 7-skinIndex); }
export function naturalHairColorKey(genotype, skinIndex){
  const h = clampHairPigment(skinIndex, rawHairPigmentIndex(genotype));
  if(hasRedGene(genotype)) return h>=4 ? 'ginger' : 'auburn';
  return HAIR_PIGMENT_NAMES[h];
}

/* encanecer es un fenómeno de la edad, no del genotipo: misma lógica para
   cualquier color de pelo natural. Edades de inicio propias de cada
   individuo, sorteadas una sola vez al crear el personaje (no en cada
   render) para que no cambien de un año a otro. */
export function rollGrayOnset(){ const start = rand(38,55); return { grayOnsetAge: start, whiteOnsetAge: start + rand(12,25) }; }
export function displayedHairColorKey(ch){
  const a = ch && ch.appearance; if(!a) return 'brown';
  if(typeof a.grayOnsetAge==='number'){
    if(ch.age >= a.whiteOnsetAge) return 'white';
    if(ch.age >= a.grayOnsetAge) return 'gray';
  }
  return a.hairColorKey || 'brown';
}

/* migra apariencias de antes de la genética real (solo guardaban
   {skinTone 0-4, hairType textura, beard} sin genotipo) a un genotipo
   sintético compatible, para no "resetear" el aspecto de personajes ya
   vivos en una partida guardada. hairType nunca fue un color (era textura:
   straight/curly/red/white/bald) así que no hay color previo que
   preservar ahí — el pelo nuevo sale al azar; la piel sí se reconstruye
   sesgada hacia el tono que ya tenía. Perezoso: una sola vez por
   personaje, la primera vez que hace falta su genotipo real (hoy: al
   convertirse en padre/madre). */
export function ensureGenotypeSync(ch){
  const a = ch && ch.appearance; if(!a || a.genotype) return;
  const priorSkinIndex = clamp((typeof a.skinTone==='number'?a.skinTone:2)+1, 1, 5);
  const pDark = (priorSkinIndex-1)/4;
  const genotype = {
    skinLoci: Array.from({length:SKIN_LOCI_N},()=>randomLocusPair(pDark)),
    hairLoci: Array.from({length:HAIR_LOCI_N},()=>randomLocusPair(0.5)),
    redAlleles: [chance(RED_ALLELE_FREQ)?1:0, chance(RED_ALLELE_FREQ)?1:0]
  };
  const skinIndex = skinIndexFromGenotype(genotype);
  a.genotype = genotype;
  a.skinIndex = skinIndex;
  a.skinTone = skinIndex-1;
  a.hairColorKey = naturalHairColorKey(genotype, skinIndex);
  if(typeof a.grayOnsetAge!=='number') Object.assign(a, rollGrayOnset());
  if(typeof a.beard!=='boolean') a.beard = chance(0.35);
}

export function randomAppearance(){
  const genotype = randomGenotype();
  const skinIndex = skinIndexFromGenotype(genotype);
  return {
    genotype, skinIndex, skinTone: skinIndex-1,
    hairColorKey: naturalHairColorKey(genotype, skinIndex),
    ...rollGrayOnset(),
    beard: chance(0.35)
  };
}
export function inheritAppearance(father, mother){
  ensureGenotypeSync(father); ensureGenotypeSync(mother);
  const genotype = inheritGenotype(father&&father.appearance&&father.appearance.genotype, mother&&mother.appearance&&mother.appearance.genotype);
  const skinIndex = skinIndexFromGenotype(genotype);
  return {
    genotype, skinIndex, skinTone: skinIndex-1,
    hairColorKey: naturalHairColorKey(genotype, skinIndex),
    ...rollGrayOnset(),
    beard: chance(0.35)
  };
}
