import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToQRPage = () => {
    navigate("/qr");
  };

  const goToProductionLogin = () => {
    navigate("/production-login");
  };

 return (
    <div>
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px"
      }}>
        <button onClick={goToProductionLogin} style={{
          padding: "8px 16px",
          fontSize: "0.9rem",
          backgroundColor: "#2c69d1",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Production Login
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h1>Medicine QR Scanner</h1>
        <button onClick={goToQRPage} style={{
          padding: "10px 20px",
          fontSize: "1rem",
          marginTop: "1rem",
          cursor: "pointer"
        }}>
          Upload from Device
        </button>
      </div>
    </div>
  );
}


export default Home;

