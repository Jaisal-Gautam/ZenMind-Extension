import StrictBlocked from "@/assets/StrictBlocked.webp";
import { CircleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import parseDomain from "@/utils/siteParser";
function Strict() {
  const params = new URLSearchParams(window.location.search);
  const originalUrl = params.get("url");
  const domain = originalUrl ? parseDomain(originalUrl) : null;
  const guardToggle = useSelector((state) => state.blocking.guardEnabled)
  const OpenDashboard = () => {
    try {
      const url = chrome.runtime.getURL("index.html");

      chrome.tabs.create({
        url,
      });
    } catch (error) {
      console.error("Failed to open dashboard:", error);
      window.open("/", "_blank");
    }
  };

  const handleTemporaryUnlock = () => {
    if (!domain) return;

    chrome.runtime.sendMessage({
      type: "TEMP_UNLOCK",
      domain,
      minutes: 5,
      originalUrl,
    });
  };
  return (
    <div
      className="relative  h-screen max-h-screen overflow-hidden 
    bg-red-950"
    >
      <div
        className="h-full mask-b-from-90% rounded-xl flex items-center justify-center bg-cover bg-top"
        style={{ backgroundImage: `url(${StrictBlocked})` }}
      >
        <div className="w-sm p-4  rounded-xl flex items-center flex-col absolute top-25 gap-4 ">
          <CircleAlert className="size-30 text-[#C2410C]" />
          <h1 className="text-4xl text-[#C2410C] font-bold text-shadow-2xs ">
            This Site is Blocked
          </h1>
          <p className="text-center w-fit text-yellow-700 text-md tracking-tighter font-mono font-light">
            You're in Strict Mode.
            <br />
            Every distraction has been removed
            <br />
            Stay on the path you've chosen.
          </p>
          <button
            className="px-4 py-2 bg-[#EA580C] cursor-pointer text-white rounded-md shadow-2xl"
            onClick={OpenDashboard}
          >
            Go To Dashboard
          </button>
          {!guardToggle && <button
            className="px-4 py-2 bg-[#EA580C] cursor-pointer text-white rounded-md shadow-2xl"
            onClick={handleTemporaryUnlock}
          >
            Go Back to Site
          </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Strict;
