export const isTemporarilyUnlocked=(domain, temporaryUnlocks)=>{
    for(const site of temporaryUnlocks ){
        if(site.domain==domain && site.expiresAt>Date.now()) return true;
    }
    return false;
}

export const getTemporaryUnlock=(domain, temporaryUnlocks)=>{
     for(const site of temporaryUnlocks ){
        if(site.domain==domain) return site;
    }
    return null;
}

export const cleanupExpiredUnlocks=(temporaryUnlocks)=>{
    return temporaryUnlocks.filter(unlock=>unlock.expiresAt>Date.now());
}


