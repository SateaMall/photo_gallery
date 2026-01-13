import { Link, NavLink, useLocation, useParams } from "react-router-dom";

export function Navbar() {
  const { context } = useParams(); // "satea" | "alexis" | "shared" | undefined
  const location = useLocation();

  // "shared mode" when:
  // - we are on /profiles
  // - OR context is shared
  const isSharedMode = location.pathname.startsWith("/profiles") || context === "shared";

  const brandText = isSharedMode
    ? "Mohamad Satea Almallouhi × Alexis Cordier"
    : context === "alexis"
      ? "Alexis Cordier"
      : "Mohamad Satea Almallouhi";

  // Where brand click should go
  const brandTo = isSharedMode ? "/shared" : `/${context}`;

  // Base for albums/photos links
  const base = isSharedMode ? "/shared" : `/${context}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link
        className="navbar-brand"
        style={{ backgroundColor: "#c2c2c20c", marginLeft: "30px", fontSize: "20px" }}
        to={brandTo}
      >
        {brandText}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to={`${base}/albums`}>Albums</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${base}/photos`}>Photos</NavLink>
          </li>

          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              type="button"
              style={{ textDecoration: "none" }}
            >
              Spaces
            </button>

            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><Link className="dropdown-item" to="/shared">Shared</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/satea">Satea</Link></li>
              <li><Link className="dropdown-item" to="/alexis">Alexis</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/profiles">Profile picker</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
