import React from "react";
import Card from "../Card";
import { LockKeyhole } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addStrictWhitelistSite,removeStrictWhitelistSite } from "@/app/slices/blockingSlice";
function StrictModeCard() {
  const blockedSites = useSelector(
    (state) => state.blocking.strictWhitelist,
  );
  const dispatch = useDispatch();
  const handleAddWebsite = (websiteName) => {
    dispatch(addStrictWhitelistSite({ website: websiteName }));
  };
  const handleremoveWebsite = (websiteName) => {
    dispatch(removeStrictWhitelistSite({ website: websiteName }));
  };
  return (
    <div className="w-full bg-neutral-tertiary  shadow-sm  p-4 md:p-6 lg:p-8 border border-gray-200 rounded-md border-t-6 border-t-red-700">
      <Card
        icon={<LockKeyhole className=" size-6 lg:size-8 text-red-800" />}
        heading="Strict Mode"
        content="Total lockdown. Only whitelisted essential sites are allowed."
        dispatcher={handleAddWebsite}
        selector={blockedSites}
        deleter={handleremoveWebsite}
      />
    </div>
  )
}

export default StrictModeCard