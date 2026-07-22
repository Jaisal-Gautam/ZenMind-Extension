import AnalyticsCards from "@/components/ui/AnalyticsCards";
import MostBlocked from "@/components/ui/MostBlocked";
import MostUsed from "@/components/ui/MostUsed";
import WebsiteTimeline from "@/components/ui/WebsiteTimeline";
import FocusChart from "@/components/ui/FocusChart";

import FocusInsight from "@/components/ui/FocusInsight";
import FocusForest from "@/components/ui/FocusForest";
import SanctuaryCard from "@/components/ui/SanctuaryCard";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { buildAnalyticsData } from "@/utils/analyticService";
function AnalyticPage() {
  const { focus, overview, websites, lifetime } = useSelector(
    (state) => state.analytics,
  );

  const dashboard = useMemo(() => buildAnalyticsData(lifetime), [lifetime]);

  return (
    <main className=" min-h-screen w-full mt-12  p-8 lg:p-4 xl:p-0">
      <section className="  flex items-center  max-w-2xl mx-auto justify-center">
        <h1 className="md:text-4xl text-2xl text-green-primary text-center ">
          Understand your focus habits without the pressure of traditional
          productivity metrics.
        </h1>
      </section>
      <section className="relative mt-8 border border-gray-200 bg-neutral-tertiary shadow-primary p-8 rounded-md  flex flex-col items-center  mx-auto justify-center">
        <h2 className="text-2xl font-medium tracking-tight text-green-primary mb-6">
          Todays Analytics
        </h2>
        <AnalyticsCards overview={overview} />
      </section>
      <section className="mt-16 rounded-md  flex items-start gap-16 ">
        <MostUsed websites={websites?.usage ?? []} />
        <MostBlocked blocked={websites?.blocked ?? []} />
      </section>
      <section className="mt-8 rounded-md  flex items-start gap-16 ">
        <FocusChart focus={focus} overview={overview} />
      </section>
      <section className="mt-8 rounded-md  flex  items-start gap-16 ">
        <div className="w-full md:flex-1 border border-gray-200  bg-neutral-secondary shadow-sm rounded-md p-4">
          <FocusForest dashboardData={dashboard.sanctuary} />
        </div>
        <div className="w-full md:flex-1 border border-gray-200  bg-neutral-secondary shadow-sm rounded-md p-4">
          <FocusInsight focus={focus} overview={overview} />
        </div>
      </section>
      <section className="w-full border border-gray-200  bg-neutral-secondary shadow-sm rounded-md  flex-col  justify-center items-center mt-8">
        <SanctuaryCard dashboardData={dashboard.sanctuary} />
      </section>
    </main>
  );
}

export default AnalyticPage;
