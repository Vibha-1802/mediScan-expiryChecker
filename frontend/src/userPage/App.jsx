import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import QRPage from "./QRPage";
import ProductionLogin from "../productionPage/ProductionLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/production-login" element={<ProductionLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
