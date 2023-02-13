import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/root.css";

export default function Root() {
  return (
    <>
      <Sidebar />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
