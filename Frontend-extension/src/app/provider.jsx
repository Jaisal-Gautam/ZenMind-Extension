import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createAppStore } from "./store";
function Storeprovider({ children }) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initStore = async () => {
      const appStore = await createAppStore();
      setStore(appStore);
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
  return (
    <Provider store={store}>

      {children}
    </Provider>
  );
}

export default Storeprovider;