import React from "react";
import Card from "../Card";
import { Sprout } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBlockedSite, removeBlockedSite } from "@/app/slices/blocking/blockingThunk";

function BlockedSitesCard() {
  const blockedSites = useSelector((state) => state.blocking.blockedSites);
  const dispatch = useDispatch();

  const handleAddWebsite = async (websiteName) => {
    await dispatch(
      createBlockedSite({
        mode: "normal",
        domain: websiteName,
      }),
    ).unwrap();
  };

  const handleremoveWebsite = async (websiteName) => {
    await dispatch(
      removeBlockedSite({
        mode: "normal",
        domain: websiteName,
      }),
    ).unwrap();
  };

  return (
    <div className="w-full bg-page dark:bg-app shadow-sm p-4 sm:p-6 lg:p-8 border border-border-default rounded-md border-t-4 sm:border-t-6 border-t-brand dark:border-t-brand-muted">
      <Card
        icon={<Sprout className="size-5 sm:size-6 lg:size-8 text-brand" />}
        heading="Normal Mode"
        content="Balanced mode for everyday tasks. Always blocked while Website Blocking is enabled."
        dispatcher={handleAddWebsite}
        selector={blockedSites}
        deleter={handleremoveWebsite}
      />
    </div>
  );
}

export default BlockedSitesCard;