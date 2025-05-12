import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import QRPage from "./QRPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
