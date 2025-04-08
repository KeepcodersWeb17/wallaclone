// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const getPreloadedState = async () => {
  const response = await fetch(
    "https://api.wallaclone.keepcoders.duckdns.org/users",
    {
      credentials: "include",
    }
  ).then((res) => res.json());

  const user = {
    id: "",
    username: "",
  };

  if (!response.error) {
    user.id = response.user._id;
    user.username = response.user.username;
  }

  return { user };
};

const preloadedState = await getPreloadedState();

const store = configureStore(preloadedState);

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
