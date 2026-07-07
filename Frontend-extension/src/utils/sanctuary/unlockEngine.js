import { LEVELS } from "./constants"
export const getUnlockInfo=(lvl)=>{
    return {currentUnlock:LEVELS[lvl-1].stage,nextUnlock:LEVELS[lvl-1].nextUnlock}
}