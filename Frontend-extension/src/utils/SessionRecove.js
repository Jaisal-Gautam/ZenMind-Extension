import { getData } from "./chromeStorage"

export const recoverFocusSession=async ()=>{
    const state=await getData();
    if (!state) return { status: "none" };
    if(!state.focus.isActive) return {status:"none"};
    if(state.focus.endTime>Date.now()) return {status:"active",state};
    if(state.focus.endTime <= Date.now()) return {status:"expired",state};
}