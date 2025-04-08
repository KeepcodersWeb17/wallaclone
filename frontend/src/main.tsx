// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const response = await fetch(
  "https://api.wallaclone.keepcoders.duckdns.org/users",
  {
    credentials: "include",
  }
).then((res) => res.json());

let store = null;

if (response.error) {
  store = configureStore({
    user: {
      id: "",
      username: "",
    },
  });
} else {
  store = configureStore({
    user: {
      id: response.user._id,
      username: response.user.username,
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ErrorBoundary> */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* </ErrorBoundary> */}
  </StrictMode>
);
