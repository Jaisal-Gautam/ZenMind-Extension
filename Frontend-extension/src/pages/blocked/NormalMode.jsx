import NormalBlocked from "@/assets/NormalBlocked.png";
import { CircleAlert } from "lucide-react";
import parseDomain from "@/utils/siteParser";

function NormalMode() {
  const params = new URLSearchParams(window.location.search);
  const originalUrl = params.get("url");
  const domain = originalUrl ? parseDomain(originalUrl) : null;

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
    <div className="relative h-screen max-h-screen overflow-hidden mask-b-from-90%">
      <div
        className="h-full flex items-center justify-center bg-cover bg-top"
        style={{ backgroundImage: `url(${NormalBlocked})` }}
      >
        <div className="absolute top-25 flex w-sm flex-col items-center gap-4 rounded-xl p-4">
          <CircleAlert className="size-30 text-[#2563EB]" />

          <h1 className="text-4xl font-bold text-[#3B82F6]">
            This Site is Blocked
          </h1>

          {domain && (
            <p className="text-sm font-semibold text-sky-600">
              {domain}
            </p>
          )}

          <p className="text-center font-mono text-md font-light tracking-tighter text-neutral-500">
            You're in Normal Focus Mode.
            <br />
            Balance productivity and freedom.
            <br />
            Return to what matters most.
          </p>

          <button
            className="rounded-md bg-sky-700 px-4 py-2 text-white shadow-2xl cursor-pointer"
            onClick={OpenDashboard}
          >
            Go To Dashboard
          </button>

          <button
            className="rounded-md bg-sky-700 px-4 py-2 text-white shadow-2xl cursor-pointer"
            onClick={handleTemporaryUnlock}
          >
            Unlock for 5 min
          </button>
        </div>
      </div>
    </div>
  );
}

export default NormalMode;