import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import QRPage from "./QRPage";
import ProductionLogin from "../productionPage/ProductionLogin";
import GenerationPage from "../productionPage/GenrationPage";
import ProtectedRoute from "../productionPage/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/production-login" element={<ProductionLogin/>} />
        <Route path="/generation" element={<ProtectedRoute><GenerationPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
