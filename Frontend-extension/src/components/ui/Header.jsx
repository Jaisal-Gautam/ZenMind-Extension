import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/app/slices/auth/authThunk";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between w-full max-h-12 p-2 bg-white border-b-2 border-gray-200 ">
      <h2 className="text-xl font-medium text-green-primary ">ZenMind</h2>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-green-primary transition hover:text-green-secondary"
        >
          Logout
        </button>
      ) : (
        <button onClick={openSetting} aria-label="Open dashboard">
          <User className="hover:text-green-secondary" size={25} />
        </button>
      )}
    </div>
  );
}

export default Header;
