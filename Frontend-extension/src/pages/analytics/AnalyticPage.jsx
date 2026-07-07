import AnalyticsCards from "@/components/ui/AnalyticsCards";
import MostBlocked from "@/components/ui/MostBlocked";
import MostUsed from "@/components/ui/MostUsed";
import WebsiteTimeline from "@/components/ui/WebsiteTimeline";
import FocusChart from "@/components/ui/FocusChart";
import { motion } from "motion/react";
import { useState } from "react";
import FocusInsight from "@/components/ui/FocusInsight";
import FocusForest from "@/components/ui/FocusForest";
import SanctuaryCard from "@/components/ui/SanctuaryCard";
import { useSelector } from "react-redux";
import { buildAnalyticsData } from "@/utils/analyticService";
function AnalyticPage() {
  const [selectedPeriod, changeSelectedPeriod] = useState("today");
  const handleChange = (val) => {
    changeSelectedPeriod(val);
  };
  const options = [
    { id: "today", label: "Today" },
    { id: "week", label: "Week" },
  ];
  const analytics = useSelector((state) => state.analytics);
  const dashboard = buildAnalyticsData(analytics, selectedPeriod);
  return (
    <main className=" min-h-screen w-full mt-12  p-8 lg:p-4 xl:p-0">
      <section className="  flex items-center  max-w-2xl mx-auto justify-center">
        <h1 className="md:text-4xl text-2xl text-green-primary text-center ">
          Understand your focus habits without the pressure of traditional
          productivity metrics.
        </h1>
      </section>
      <section className="relative mt-8 border border-gray-200 bg-neutral-tertiary shadow-primary p-8 rounded-md  flex flex-col items-center  mx-auto justify-center">
        <div className="absolute bg-neutral-100 rounded-md p-2  top-2 right-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleChange(option.id)}
              className={`relative px-3 py-1 rounded-sm transition-colors duration-200 ${
                selectedPeriod === option.id
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {/* Animated Background Pill */}
              {selectedPeriod === option.id && (
                <motion.div
                  layoutId="active-period-indicator"
                  className="absolute inset-0 bg-white rounded-sm shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Button Text (Needs to sit above the animated background) */}
              <span className="relative z-10">{option.label}</span>
            </button>
          ))}
        </div>
        <h2 className="text-2xl font-medium tracking-tight text-green-primary mb-6">
          {selectedPeriod === "today" ? "Today's" : "This Week's"} Analytics
        </h2>
        <AnalyticsCards dashboardData={dashboard.summary} />
      </section>
      <section className="mt-16 rounded-md  flex items-start gap-16 ">
        <MostBlocked dashboardData={dashboard.website} />
        <MostUsed dashboardData={dashboard.website} />
      </section>
      <section className="mt-8 rounded-md  flex items-start gap-16 ">
        <FocusChart dashboardData={dashboard.focus} />
      </section>
      <section className="mt-8 rounded-md  flex  items-start gap-16 ">
        <div className="w-full md:flex-1 border border-gray-200  bg-neutral-secondary shadow-sm rounded-md p-4">
          <FocusForest dashboardData={dashboard.sanctuary} />
        </div>
        <div className="w-full md:flex-1 border border-gray-200  bg-neutral-secondary shadow-sm rounded-md p-4">
          <FocusInsight dashboardData={dashboard} />
        </div>
      </section>
      <section className="w-full border border-gray-200  bg-neutral-secondary shadow-sm rounded-md  flex-col  justify-center items-center mt-8">
        <SanctuaryCard dashboardData={dashboard.sanctuary} />
      </section>
    </main>
  );
}

export default AnalyticPage;
