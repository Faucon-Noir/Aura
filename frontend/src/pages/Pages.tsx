import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Home";
import Layout from "./Layout";
import { Home, Test } from "./paths";
import ErrorComponent, { ErrorBoundary } from "../components/error";
import TestPage from "./Test";

const Pages = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.key}>
    <Routes>
      <Route path="*" element={<ErrorComponent />} />

      <Route path={Home} element={<Layout />}>
        <Route path={Home} element={<HomePage />} />
        <Route path={Test} element={<TestPage />} />
      </Route>
    </Routes>
    </ErrorBoundary>
  );
};
export default Pages;
