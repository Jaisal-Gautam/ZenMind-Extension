import React from "react";
import Card from "../Card";
import { LockKeyhole } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBlockedSite, removeBlockedSite } from "@/app/slices/blocking/blockingThunk";

function StrictModeCard() {
  const blockedSites = useSelector((state) => state.blocking.strictWhitelist);
  const dispatch = useDispatch();

  const handleAddWebsite = async (websiteName) => {
    await dispatch(
      createBlockedSite({
        mode: "strict",
        domain: websiteName,
      }),
    ).unwrap();
  };

  const handleremoveWebsite = async (websiteName) => {
    await dispatch(
      removeBlockedSite({
        mode: "strict",
        domain: websiteName,
      }),
    ).unwrap();
  };

  return (
    <div className="w-full bg-page dark:bg-app shadow-sm p-4 sm:p-6 lg:p-8 border border-border-default rounded-md border-t-4 sm:border-t-6 border-t-danger-max">
      <Card
        icon={<LockKeyhole className="size-5 sm:size-6 lg:size-8 text-danger" />}
        heading="Strict Mode"
        content="Total lockdown. Only whitelisted essential sites are allowed."
        dispatcher={handleAddWebsite}
        selector={blockedSites}
        deleter={handleremoveWebsite}
      />
    </div>
  );
}

export default StrictModeCard;