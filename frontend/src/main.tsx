import "./index.css";
// import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import App from "./App.tsx";
import getPreloadedState from "./lib/preloadedState.ts";
import { ErrorBoundary } from "./error/ErrorBoundary.tsx";
import socket from "./store/services/sockets.ts";

const preloadedState = await getPreloadedState();

if (preloadedState.user) {
  socket.connect();
}

const store = configureStore(preloadedState);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
  // </StrictMode>
);
