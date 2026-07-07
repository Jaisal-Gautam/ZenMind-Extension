import Logo from "@/assets/Logo.svg";
import { User } from "lucide-react";
function Header() {
  const openSetting = () => {
    try {
      const baseUrl = chrome.runtime.getURL("index.html");
      const url = `${baseUrl}#/auth`;
      chrome.tabs.create({
        url,
      });
    } catch (error) {
      console.error("Failed to open dashboard:", error);
      window.open("/", "_blank");
    }
  };
  return (
    <div className="flex justify-between w-full max-h-12 p-2 bg-white border-b-2 border-gray-200 ">
      <h2 className="text-xl font-medium text-green-primary ">ZenMind</h2>
      <button onClick={openSetting}>
        <User className="text-green-secondary/80 hover:text-green-primary" />
      </button>
    </div>
  );
}

export default Header;
