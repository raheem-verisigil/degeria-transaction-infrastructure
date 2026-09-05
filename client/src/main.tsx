import { createRoot } from "react-dom/client";
import App from "./App";
import { useSiteLocalization } from "./lib/site-localization";
import "./index.css";

function LocalizedApp() {
  useSiteLocalization();
  return <App />;
}

createRoot(document.getElementById("root")!).render(<LocalizedApp />);
