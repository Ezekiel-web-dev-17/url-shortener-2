import logo from "../../src/assets/images/logo.svg";
import "./Navbar.css";
const Navbar = () => {
  const toggleMenu = () => {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    const menuClose = document.querySelector(".close-menu");
    hamburger.classList.toggle("d-none");
    menuClose.classList.toggle("d-none");
    navLinks.classList.toggle("d-flex");
    navLinks.classList.toggle("active");
  };

  const closeMenu = () => {
    const menuClose = document.querySelector(".close-menu");
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("d-none");
    menuClose.classList.toggle("d-none");
    menuClose.classList.toggle("d-flex");
    navLinks.classList.remove("d-flex");
    navLinks.classList.remove("active");
  };

  return (
    <div>
      <nav className="navbar d-flex justify-content-between align-items-center mx-sm-5">
        <img src={logo} height="35px" alt="logo" />

        {window.innerWidth < 441 ? (
          <>
            <div
              className="nav-links flex-column justify-content-between align-items-center text-white fw-bold position-absolute rounded-3 fs-4 pb-4 pt-5 gap-3 px-4"
              onClick={toggleMenu}
              style={{
                backgroundColor: "var(--Dark-Violet)",
                width: "85%",
                top: "70px",
                right: "8%",
              }}
            >
              <ul className="d-flex flex-column text-center list-unstyled gap-lg-4 gap-4 gap-sm-1 fs-5">
                <li className="fw-bold opacity-50">Features</li>
                <li className="fw-bold opacity-50">Pricing</li>
                <li className="fw-bold opacity-50">Resources</li>
              </ul>

              <div
                className="flex-column d-flex w-100 gap-2 pt-3 opacity-50"
                style={{
                  borderTop: "2px solid var(--Grayish-Violet)",
                }}
              >
                <button
                  className="login rounded-2 mb-0 border-0 bg-transparent opacity-100"
                  disabled={true}
                  style={{
                    cursor: "auto",
                    filter: "unset",
                    color: "white",
                  }}
                >
                  Login
                </button>
                <button
                  className=" rounded-5 mb-3 fw-bold fs-5 text-white border-0 py-2"
                  style={{ cursor: "unset", filter: "unset" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <svg
              className="hamburger"
              xmlns="http://www.w3.org/2000/svg"
              width="10%"
              height="21"
              onClick={toggleMenu}
            >
              <g fill="hsl(0, 0%, 75%)" fillRule="evenodd">
                <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x fs-1 close-menu d-none"
              viewBox="0 0 16 16"
              onClick={closeMenu}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </>
        ) : (
          <div
            className={`${
              window.innerWidth < 850 ? "" : "links"
            } d-flex justify-content-between align-items-center gap-5`}
          >
            <ul className="link-all d-flex list-unstyled gap-5 gap-sm-3 gap-lg-5 mb-0">
              <li className=" opacity-50">Features</li>
              <li className=" opacity-50">Pricing</li>
              <li className=" opacity-50">Resources</li>
            </ul>

            <div className="flex-column d-flex flex-sm-row gap-3 opacity-50">
              <button
                className="login rounded-2 mb-0 border-0 bg-transparent"
                disabled={true}
                style={{
                  cursor: "auto",
                  color: "var(--Grayish-Violet)",
                  filter: "unset",
                }}
              >
                Login
              </button>
              <button
                className=" rounded-5 mb-0 text-white fw-medium border-0 px-3 py-1"
                style={{ cursor: "unset", filter: "unset" }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
