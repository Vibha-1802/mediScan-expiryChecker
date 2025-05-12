import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToQRPage = () => {
    navigate("/qr");
  };

  return (
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
  );
}

export default Home;
