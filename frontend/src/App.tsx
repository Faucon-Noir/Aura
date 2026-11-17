import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import Pages from "./pages/Pages";
import { helloApi } from "./utils/api";

function App() {
  const { t } = useTranslation("common");

  useEffect(() => {
    helloApi
      .getHello()
      .catch((err) => {
        console.error("API error:", err);
      });
    document.title = t("title");
  }, []);

  return (
    <Pages />
  );
}

export default App;
