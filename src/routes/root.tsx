import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import './root.css'

export default function Root() {
  return (
    <>
      <Navigation />

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}