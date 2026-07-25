import React from "react";
import Card from "../Card";
import { Timer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBlockedSite,removeBlockedSite } from "@/app/slices/blocking/blockingThunk";
function DeepFocusCard() {
  const blockedSites = useSelector((state) => state.blocking.deepFocusSites);
  const dispatch = useDispatch();
  const handleAddWebsite = async (websiteName) => {
    await dispatch(
      createBlockedSite({
        mode: "focus",
        domain: websiteName,
      }),
    ).unwrap();
  };
  const handleremoveWebsite = async (websiteName) => {
    await dispatch(
      removeBlockedSite({
        mode: "focus",
        domain: websiteName,
      }),
    ).unwrap();
  };
  return (
    <div className="w-full bg-page dark:bg-app  shadow-sm  p-4 md:p-6 lg:p-8 border border-border-default rounded-md border-t-6 dark:border-t-brand border-t-brand-muted">
      <Card
        icon={<Timer className=" size-6 lg:size-8 text-brand" />}
        heading="Deep Focus"
        content="High intensity mode for deep work. Blocked only during Deep Focus sessions."
        dispatcher={handleAddWebsite}
        selector={blockedSites}
        deleter={handleremoveWebsite}
      />
    </div>
  );
}

export default DeepFocusCard;
