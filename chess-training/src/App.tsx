import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { TrainingProvider } from "./store/TrainingContext";
import Compare from "./pages/Compare";
import DesignView from "./pages/DesignView";
import Dashboard from "./pages/Dashboard";
import Design3 from "./pages/designs/Design3";
import Design8 from "./pages/designs/Design8";
import Design9 from "./pages/designs/Design9";
import Design10 from "./pages/designs/Design10";
import Design11 from "./pages/designs/Design11";

const designComponents: Record<string, React.FC> = {
  "3": Design3,
  "8": Design8,
  "9": Design9,
  "10": Design10,
  "11": Design11,
};

export default function App() {
  return (
    <TrainingProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compare" element={<Compare />} />
          <Route
            path="/design/:id"
            element={<DesignView components={designComponents} />}
          />
        </Routes>
      </HashRouter>
    </TrainingProvider>
  );
}
