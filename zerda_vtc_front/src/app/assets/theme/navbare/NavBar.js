import React,{ useState } from 'react';
import NavItem from './NavItem';
import Button from '../buttons/button';
import Dropdown from './Dropdown';
import logo from "../../logo/fleet.gif";
import photo from "../../images/106599293.jpg"



export default function NavBar({ isAuthenticated, user }) {
    const [ isOpen, setIsOpen] = useState(false); 
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

    isAuthenticated = true;
 
    user = {
      name: "John Doe",
      email: "john.doe@example.com",
      profilePhoto: photo,
    };

    return (
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-14 w-auto" src={logo} alt="" />
          </a>
          <div className="hidden md:flex space-x-4">
            <NavItem to="/" text="Home" href="/home">
              Home
            </NavItem>
            <NavItem to="/home" text="about" href="#home">
              about
            </NavItem>
            <NavItem to="/home" text="services" href="#home">
              services
            </NavItem>
            <NavItem to="/home" text="contact" href="#home">
              contact
            </NavItem>
          </div>

          {/* Authenticate profile navBar */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center rounded focus: outline-none"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profilePhoto}
                    alt="profile"
                  />
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
                {isDropdownOpen && (
                  <Dropdown>
                    <NavItem href="#profile">Profile</NavItem>
                    <NavItem href="#settings">Settings</NavItem>
                    <NavItem href="#logout">Logout</NavItem>
                  </Dropdown>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-4">
                <Button>
                  <a href="/register">Sign Up</a>
                </Button>
                <Button variant="secondary">Log in</Button>
              </div>
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
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 z-10"></div>
              <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img className="h-14 w-auto" src={logo} alt="" />
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
                    <NavItem href="#home">Home</NavItem>
                    <NavItem href="#about">About</NavItem>
                    <NavItem href="#services">Services</NavItem>
                    <NavItem href="#contact">Contact</NavItem>
                    <div className="py-6">
                      {isAuthenticated && (
                        <>
                          <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center rounded  focus: outline-none"
                          >
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.profilePhoto}
                              alt="profile"
                            />
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
                            <div className="mt-2 space-y-2" id="disclosure-1">
                              <NavItem href="#profile">Profile</NavItem>
                              <NavItem href="#settings">Settings</NavItem>
                              <NavItem href="#logout">Logout</NavItem>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isAuthenticated && (
                <>
                  <NavItem href="#profile">Profile</NavItem>
                  <NavItem href="#settings">Settings</NavItem>
                  <NavItem href="#logout">Logout</NavItem>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    );
}