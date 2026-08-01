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
    <main className="min-h-screen w-full mt-6 md:mt-12 p-4 md:p-8 lg:p-4 xl:p-0">
      <section className="flex items-center max-w-2xl mx-auto justify-center px-2">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-brand text-center">
          Understand your focus habits without the pressure of traditional
          productivity metrics.
        </h1>
      </section>

      <section className="relative mt-6 md:mt-8 border border-border-default dark:bg-app bg-text-inverse shadow-primary p-4 sm:p-6 md:p-8 rounded-md flex flex-col items-center mx-auto justify-center">
        <h2 className="text-xl md:text-2xl font-medium tracking-tight text-brand mb-4 md:mb-6 text-center">
          Todays Analytics
        </h2>
        <AnalyticsCards overview={overview} />
      </section>

      {/* Stack vertically on mobile, side-by-side on md+ */}
      <section className="mt-10 md:mt-16 rounded-md flex flex-col md:flex-row items-stretch md:items-start gap-8 md:gap-16">
        <MostUsed websites={websites?.usage ?? []} />
        <MostBlocked blocked={websites?.blocked ?? []} />
      </section>

      <section className="mt-8 rounded-md flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <FocusChart focus={focus} overview={overview} />
      </section>

      {/* Stack cards vertically on mobile, side-by-side on md+ */}
      <section className="mt-8 rounded-md flex flex-col md:flex-row items-stretch md:items-start gap-6 md:gap-16">
        <div className="w-full md:flex-1 border border-border-default dark:bg-app bg-text-inverse shadow-sm rounded-md p-4">
          <FocusForest dashboardData={dashboard.sanctuary} />
        </div>
        <div className="w-full md:flex-1 border border-border-default dark:bg-app bg-text-inverse shadow-sm rounded-md p-4">
          <FocusInsight focus={focus} overview={overview} />
        </div>
      </section>

      <section className="w-full border border-border-default dark:bg-app bg-text-inverse shadow-sm rounded-md flex flex-col justify-center items-center mt-8">
        <SanctuaryCard dashboardData={dashboard.sanctuary} />
      </section>
    </main>
  );
}

export default AnalyticPage;