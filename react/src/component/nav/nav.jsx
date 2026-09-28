// Nav.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./nav.css";

const LINKS = ["About Us", "Services", "Blog", "Contacts"];

export default function Nav() {
  const brandRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarLinksRef = useRef(null);
  const overlayRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(
      brandRef.current,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        linksRef.current?.querySelectorAll("li") || [],
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  // Animate sidebar links when opened
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.fromTo(
        sidebarLinksRef.current?.querySelectorAll("li") || [],
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }
  }, [isSidebarOpen]);

  return (
    <>
      <header className="nav">
        <a href="#top" ref={brandRef} className="nav__brand">
          MUSE
        </a>

        {/* Desktop Navigation */}
        <nav ref={linksRef} className="nav__links" aria-label="Main Navigation">
          <ul>
            {LINKS.map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a ref={ctaRef} href="#booking" className="nav__cta">
          Book an Appointment
        </a>

        {/* Hamburger Button */}
        <button
          className={`nav__hamburger ${isSidebarOpen ? "active" : ""}`}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`nav__overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`nav__sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        {/* Close Button */}
        <button
          className="nav__sidebar-close"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <nav ref={sidebarLinksRef} aria-label="Mobile Navigation">
          <ul>
            {LINKS.map((label) => (
              <li key={label}>
                <a href="#" onClick={closeSidebar}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__sidebar-cta-wrapper">
            <a href="#booking" className="nav__sidebar-cta" onClick={closeSidebar}>
              Book an Appointment
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}