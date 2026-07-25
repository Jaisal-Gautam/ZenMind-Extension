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
    <div className="flex w-full max-h-12 items-center justify-between border-b border-border-default bg-surface p-2">
      <h2 className="text-xl font-medium text-brand ">ZenMind</h2>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-brand transition-colors hover:text-brand-muted"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={openSetting}
          aria-label="Open dashboard"
          className="rounded-lg p-1 text-text-muted transition-colors hover:bg-surface-soft hover:text-brand"
        >
          <User size={25} />
        </button>
      )}
    </div>
  );
}

export default Header;
