export const getTotalXP=(analytics)=>{
    const dailyFocus=analytics.dailyFocus;
    if(!dailyFocus) return 0;
    let xp=0;
    Object.keys(dailyFocus).forEach(focus=>xp+=5*dailyFocus[focus]);
    return xp;

}