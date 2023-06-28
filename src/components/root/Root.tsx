import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./Root.module.css"

export default function Root() {
  return (
    <>
      <Navigation />

      <div className={styles['content']}>
        <Outlet />
      </div>
    </>
  );
}