import DeepBlocked from "@/assets/DeepBlocked.png";
import { CircleAlert } from "lucide-react";
import parseDomain from "@/utils/siteParser";
function DeepMode() {
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
    <div className="relative  h-screen max-h-screen overflow-hidden  mask-b-from-90%">
      <div
        className="h-full rounded-xl flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${DeepBlocked})` }}
      >
        <div className="w-sm p-4  rounded-xl flex items-center flex-col absolute top-25 gap-4 ">
          <CircleAlert className="size-30 text-green-primary" />
          <h1 className="text-4xl text-green-primary font-bold text-shadow-2xs ">
            This Site is Blocked
          </h1>
          <p className="text-center text-md tracking-tighter font-mono font-light">
            You're in Deep Focus Mode.
            <br />
            The noise has been quieted
            <br />
            Now it's time for meaningful work.
          </p>
          <button
            className="px-4 py-2 bg-green-primary cursor-pointer text-white rounded-md shadow-2xl"
            onClick={OpenDashboard}
          >
            Go To DashBoard
          </button>
          <button
            className="rounded-md bg-green-primary px-4 py-2 text-white shadow-2xl cursor-pointer"
            onClick={handleTemporaryUnlock}
          >
            Unlock for 5 min
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeepMode;
