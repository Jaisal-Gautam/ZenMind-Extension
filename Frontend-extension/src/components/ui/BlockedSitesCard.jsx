import React from "react";
import Card from "../Card";
import { Sprout } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addBlockedSite,removeBlockedSite } from "@/app/slices/blockingSlice";
function BlockedSitesCard() {
  const blockedSites = useSelector(
    (state) => state.blocking.blockedSites,
  );
  const dispatch = useDispatch();
  const handleAddWebsite = (websiteName) => {
    dispatch(addBlockedSite({ website: websiteName }));
  };
  const handleremoveWebsite = (websiteName) => {
    dispatch(removeBlockedSite({ website: websiteName }));
  };
  return (
    <div className="w-full bg-neutral-tertiary  shadow-sm  p-4 md:p-6 lg:p-8 border border-gray-200 rounded-md border-t-6 border-t-green-secondary">
      <Card
        icon={<Sprout className=" size-6 lg:size-8 text-green-primary" />}
        heading="Normal Mode"
        content="Balanced mode for everyday tasks.Always blocked while Website Blocking is enabled."
        dispatcher={handleAddWebsite}
        selector={blockedSites}
        deleter={handleremoveWebsite}
      />
    </div>
  );
}

export default BlockedSitesCard;
