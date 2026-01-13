export function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
    >
      <a className="navbar-brand"   style={{ backgroundColor: "#c2c2c20c", marginLeft: "30px", fontSize: "20px" }} href="#">Satea</a>

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
            <a className="nav-link" href="#">Albums</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">Photos</a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profiles
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ backgroundColor: "#d4d1d19e" }}>
              <li><a className="dropdown-item" href="#">Satea</a></li>
              <li><a className="dropdown-item" href="#">Alexis</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
