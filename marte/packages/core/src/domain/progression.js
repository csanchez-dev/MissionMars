export const RANKS=['Rover novato','Explorador','Geólogo','Astrobiólogo','Pionero de Marte'];
export const levelFor=p=>Math.min(RANKS.length,1+Math.floor(Math.sqrt(p/100)));
export const pointsForLevel=l=>100*(l-1)**2;
export const rankFor=l=>RANKS[l-1];
