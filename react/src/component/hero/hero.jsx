// Hero.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./hero.css";

export default function Hero() {
  const photoRef = useRef(null);
  const scriptRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const wordmarkRef = useRef(null);
  const morphLetterRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      photoRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
    )
      .fromTo(
        scriptRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        headingRef.current.querySelectorAll(".hero__heading-line-inner"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.6)" },
        "-=0.4"
      )
      .fromTo(
        statsRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

    // Morph animation for the letter
    const morphTl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 2.5 });
    morphTl
      .to(morphLetterRef.current, {
        rotateX: 90,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => (morphLetterRef.current.textContent = "X"),
      })
      .to(morphLetterRef.current, { rotateX: 0, duration: 0.25, ease: "power2.out" })
      .to({}, { duration: 1.4 })
      .to(morphLetterRef.current, {
        rotateX: 90,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => (morphLetterRef.current.textContent = "U"),
      })
      .to(morphLetterRef.current, { rotateX: 0, duration: 0.25, ease: "power2.out" });
  }, []);

  return (
    <section className="hero">
      <div ref={photoRef} className="hero__photo">
        <img
          src="https://images.unsplash.com/photo-1556942040-df93bd3bdd19?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJlYXV0eSUyMHNhbG9ufGVufDB8fDB8fHww"
          alt="Portrait, natural sunlight, freckled skin"
        />
        <div className="hero__photo-scrim" />
      </div>

      <div className="hero__content">
 
        <h2 ref={headingRef} className="hero__heading">
          <span className="hero__heading-line">
            <span className="hero__heading-line-inner">Welcome to Muse</span>
          </span>
          <span className="hero__heading-line">
           </span>
        </h2>

        <p ref={descriptionRef} className="hero__description">
          Muse is a premium beauty studio offering expert care for skin, hair, and body.
          We craft personalized rituals that bring out your natural glow, one visit at a time.
        </p>

        <div ref={ctaRef} className="hero__cta">
          <a href="#booking" className="hero__cta-primary">Book an Appointment</a>
          <a href="#services" className="hero__cta-secondary">View Services</a>
        </div>

        <div ref={statsRef} className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">4.9★</span>
            <span className="hero__stat-label">Average Rating</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">12</span>
            <span className="hero__stat-label">Expert Stylists</span>
          </div>
        </div>
      </div>

      <div ref={wordmarkRef} className="hero__wordmark" aria-hidden="true">
        <h1>
          BEA
          <span ref={morphLetterRef} className="hero__morph-letter">U</span>
          TY SALON
        </h1>
      </div>
    </section>
  );
}