import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
///import App from "./App";
import Game from "./components/Game";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </StrictMode>,
);
