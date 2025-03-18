import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Markup() {
  return (
    <>
      <Navbar />
      <Outlet />

      <footer
        className="text-center py-3 mt-4"
        style={{ backgroundColor: "#120a8f", color: "#fff" }}
      >
        <p>© 2025 - Gameverse</p>
      </footer>
    </>
  );
}
