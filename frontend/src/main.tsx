import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./index.css";
import App from "./App.tsx";

const store = configureStore({ auth: false });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
