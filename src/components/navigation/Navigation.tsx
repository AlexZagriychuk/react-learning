import { Link } from "react-router-dom";
import "./Navigation.css"

export default function Navigation() {
  return (
    <>
        <nav className="horizontal-nav-bar">
          <ul>
            <li>
              <Link to={`counter`}>Counter</Link>
            </li>
            <li>
              <Link to={`posts`}>Posts</Link>
            </li>
            <li>
              <Link to={`todos`}>Todos</Link>
            </li>
            <li>
              <Link to={`users`}>Users</Link>
            </li>
          </ul>
        </nav>
    </>
  );
}