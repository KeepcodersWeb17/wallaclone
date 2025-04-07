import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./index.css";
import App from "./App.tsx";

const response = await fetch(
  "https://api.wallaclone.keepcoders.duckdns.org/users",
  {
    credentials: "include",
  }
).then((res) => res.json());

const isAuth = response.error ? false : true;

console.log("Access Token:", isAuth);

const store = configureStore({ auth: isAuth });
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
