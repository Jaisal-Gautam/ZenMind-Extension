import { LEVELS } from "./constants"
export const getStageInfo=(lvl)=>{
    if (lvl>20) lvl=20;
    if (lvl<1) lvl=1;
    const stage= LEVELS[lvl-1].stage;
    const img=LEVELS[lvl-1].path;
    const desc=LEVELS[lvl-1].desc;
    return {stage,img,desc}
}