import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./components/StateProvider";
import { ModalContextProvider } from "./components/Modal";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ModalContextProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </ModalContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
