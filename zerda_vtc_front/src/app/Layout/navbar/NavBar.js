import {
  React, useState, NavItem, Button, Dropdown,HiOutlineUserCircle, HiCursorClick, HiOutlineLogout
} from "../index";
import logo from "../../assets/images/logo/fleet.gif";
import photo from "../../assets/images/profilePhoto/106599293.jpg";

export default function NavBar({ user }) {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dummy user data
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePhoto: photo,
  };

  return (
    <header className="rounded ">
      <nav
        className="bg-white rounded mx-auto flex w-auto items-center justify-between p-3 lg:px-8 mb-3"
        aria-label="Global"
      >
        {/* Logo */}
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-14 w-auto" src={logo} alt="Logo" />
        </a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <NavItem to="/" text="Home" href="/home">
            Home
          </NavItem>
          <NavItem to="/about" text="About" href="#about">
            About
          </NavItem>
          <NavItem to="/services" text="Services" href="#services">
            Services
          </NavItem>
          <NavItem to="/contact" text="Contact" href="#contact">
            Contact
          </NavItem>
        </div>

        {/* Profile & Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center rounded focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.profilePhoto}
                  alt="Profile"
                />
                <p className="text-gray-900 text-left font-nunito font-thin px-2">
                  {" "}
                  {user.name}{" "}
                </p>
                <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {isProfileOpen && (
                <Dropdown
                  isOpen={isProfileOpen}
                  id="dropdownMenuButton1"
                  onClose={() => {
                    setIsProfileOpen(false);
                  }}
                >
                  <div className="flex-auto">
                    <NavItem
                      href="/user/profile"
                      icone={
                        <HiOutlineUserCircle className="h-6 w-6 text-indigo-900" />
                      }
                    >
                      {" "}
                      Profile
                    </NavItem>
                    <NavItem
                      href="/user/resrvation"
                      icone={
                        <HiCursorClick className="h-6 w-6 text-indigo-900" />
                      }
                    >
                      Mes réservation
                    </NavItem>
                    <NavItem
                      icone={
                        <HiOutlineLogout className="h-6 w-6 text-indigo-900" />
                      }
                    >
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIsAuthenticated(false);
                          setIsProfileOpen(false);
                        }}
                      >
                        {" "}
                        Log out{" "}
                      </Button>
                    </NavItem>
                  </div>
                </Dropdown>
              )}
            </div>
          ) : (
            <>
              <Button>
                <a href="/signup">Sign Up</a>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsAuthenticated(true)}
              >
                Log in
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-14 w-auto" src={logo} alt="Logo" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  <NavItem href="#home">Home</NavItem>
                  <NavItem href="#about">About</NavItem>
                  <NavItem href="#services">Services</NavItem>
                  <NavItem href="#contact">Contact</NavItem>
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <>
                      <NavItem href="#profile">Profile</NavItem>
                      <NavItem href="#settings">Settings</NavItem>
                      <Button onClick={() => setIsAuthenticated(false)}>
                        Log out <span aria-hidden="true">&rarr;</span>
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button>
                        <a href="/register">Sign Up</a>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsAuthenticated(true)}
                      >
                        Log in
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
