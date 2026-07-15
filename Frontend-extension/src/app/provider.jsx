import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createAppStore } from "./store";
import { loadCurrentUser } from "./slices/auth/authThunk";

function StoreProvider({ children }) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initStore = async () => {
      const appStore = await createAppStore();

      try {
        await appStore.dispatch(loadCurrentUser()).unwrap();
      } catch (err) {
        console.log("Session restore skipped:", err);
      } finally {
        setStore(appStore);
      }
    };

    initStore();
  }, []);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;