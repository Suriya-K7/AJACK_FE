import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>
);
