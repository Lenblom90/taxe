import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
