import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Markup() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div style={{ flex: 1 }}>
        {" "}
        <Outlet />
      </div>

      <footer
        className="text-center py-3 mt-4"
        style={{
          backgroundColor: "#120a8f",
          color: "#fff",
          marginTop: "auto",
        }}
      >
        <p>© 2025 - Gameverse</p>
      </footer>
    </div>
  );
}
