import GuardToggle from "@/components/ui/GuardToggle";
import BlockedSitesCard from "@/components/ui/BlockedSitesCard";
import StrictModeCard from "@/components/ui/StrictModeCard";
import DeepFocusCard from "@/components/ui/DeepFocusCard";
import ContentCategory from "@/components/ui/ContentCategory";
function BlockingPage() {
  return (
    <main className="min-h-screen bg-page dark:bg-app w-full mt-12  flex flex-col gap-12 p-8 lg:p-4 xl:p-0 ">
      <GuardToggle />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BlockedSitesCard />
        <DeepFocusCard />
        <StrictModeCard />
      </section>
      <section className="pb-8">
        <ContentCategory />
      </section>
    </main>
  );
}

export default BlockingPage;
