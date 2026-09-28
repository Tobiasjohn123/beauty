// About.jsx
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Sparkles, Zap, Users, Heart, ScanFace, Repeat, Star } from "lucide-react";
import "./about.css";

const TEAM = [
  { name: "Robert Fox", role: "Marketing Coordinator", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", tilt: -6 },
  { name: "Ralph Edwards", role: "Master Colorist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80", tilt: 4 },
  { name: "Arlene McCoy", role: "Lead Esthetician", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80", tilt: -3 },
  { name: "James Cocolo", role: "Studio Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80", tilt: 5 },
];

const STATS = [
  { value: "75+", label: "Sessions Booked Weekly", desc: "Clients trust us for their beauty rituals every week" },
  { value: "12", label: "Expert Stylists", desc: "Skilled specialists across hair, skin, and body" },
  { value: "4.9★", label: "Average Rating", desc: "From real clients, verified after every session" },
  { value: "9", label: "Years in Business", desc: "Serving the community with intention and care" },
];

const VALUES = [
  { icon: Sparkles, title: "Precision In Every Detail", desc: "We treat every service as a craft, not a routine — details make the difference." },
  { icon: Users, title: "Client-First Philosophy", desc: "Your comfort and confidence guide every consultation and treatment plan." },
  { icon: Heart, title: "Genuine Care", desc: "We build relationships, not just appointments — your glow is personal to us." },
  { icon: ScanFace, title: "Personalized Rituals", desc: "No two clients are the same, so no two treatment plans are either." },
  { icon: Zap, title: "Modern Techniques", desc: "We stay ahead on technique and product so results stay ahead too." },
  { icon: Repeat, title: "Continuous Growth", desc: "Our stylists train year-round to keep every service at its best." },
];

const FOUNDERS = [
  { name: "Amara Reyes", role: "Founder, Muse Studio", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
  { name: "Noah Bennett", role: "Creative Director", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
];

// Phone carousel images
const PHONE_IMAGES = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
];

// Reusable sparkle eyebrow — repeats above every heading, matches reference
function Eyebrow() {
  return (
    <span className="about__eyebrow">
      <Sparkles size={16} strokeWidth={1.6} />
    </span>
  );
}

// Reusable scroll-reveal wrapper using IntersectionObserver — same reliable pattern as rest of site
function Reveal({ children, className = "", onEnter }) {
  const ref = useRef(null);
  const hasPlayed = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setActive(true);
          if (onEnter) onEnter(ref.current);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onEnter]);

  return (
    <div ref={ref} className={`${className} ${active ? "is-active" : ""}`}>
      {children}
    </div>
  );
}

export default function About() {
  // ============ BLOCK 1: Team polaroid strip ============
  const teamHeadingRef = useRef(null);
  const teamCtaRef = useRef(null);
  const teamCardsRef = useRef([]);

  const animateTeamIntro = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      teamHeadingRef.current.querySelectorAll(".about__mask-inner"),
      { yPercent: 105 },
      { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" }
    )
      .fromTo(
        teamCtaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        teamCardsRef.current.filter(Boolean),
        { opacity: 0, y: 50, scale: 0.85, rotate: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: (i) => TEAM[i].tilt,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  };

  // ============ BLOCK 2: Stats grid ============
  const statsHeadingRef = useRef(null);
  const statsGridRef = useRef(null);

  const animateStats = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      statsHeadingRef.current.querySelectorAll(".about__mask-inner"),
      { yPercent: 105 },
      { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
    ).fromTo(
      statsGridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    );
    // Underline bars draw in after their card appears
    tl.fromTo(
      statsGridRef.current.querySelectorAll(".about__underline"),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", transformOrigin: "left" },
      "-=0.5"
    );
  };

  // ============ BLOCK 3: Vision intro ============
  const visionHeadingRef = useRef(null);

  const animateVision = () => {
    gsap.fromTo(
      visionHeadingRef.current.querySelectorAll(".about__mask-inner"),
      { yPercent: 105 },
      { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power4.out" }
    );
  };

  // ============ BLOCK 4a: Feature row — photo right, badges float ============
  const feat1PhotoRef = useRef(null);
  const feat1TextRef = useRef(null);
  const feat1BadgesRef = useRef([]);

  const animateFeature1 = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      feat1PhotoRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.inOut" }
    )
      .fromTo(
        feat1TextRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo(
        feat1BadgesRef.current.filter(Boolean),
        { opacity: 0, y: -10, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(2)" },
        "-=0.4"
      );
  };

  // ============ BLOCK 4b: Feature row — photo left, floating card ============
  const feat2PhotoRef = useRef(null);
  const feat2TextRef = useRef(null);
  const feat2CardRef = useRef(null);

  const animateFeature2 = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      feat2PhotoRef.current,
      { clipPath: "inset(0 0 0 100%)" },
      { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power4.inOut" }
    )
      .fromTo(
        feat2CardRef.current,
        { opacity: 0, x: -20, y: 10 },
        { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "back.out(1.6)" },
        "-=0.6"
      )
      .fromTo(
        feat2TextRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      );
  };

  // ============ BLOCK 5: Core values (gradient bg + phone mockup + grid) ============
  const valuesTextRef = useRef(null);
  const phoneRef = useRef(null);
  const phoneCardsRef = useRef([]);
  const valuesGridRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate phone images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % PHONE_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const animateValuesIntro = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      valuesTextRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    )
      .fromTo(
        phoneRef.current,
        { opacity: 0, y: 40, rotate: 6 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        phoneCardsRef.current.filter(Boolean),
        { opacity: 0, scale: 0.7, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" },
        "-=0.4"
      );
  };

  const animateValuesGrid = () => {
    gsap.fromTo(
      valuesGridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  };

  // ============ BLOCK 6: Founders ============
  const foundersHeadingRef = useRef(null);
  const foundersRowRef = useRef(null);

  const animateFounders = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      foundersHeadingRef.current.querySelectorAll(".about__mask-inner"),
      { yPercent: 105 },
      { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power4.out" }
    ).fromTo(
      foundersRowRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );
  };

  const Mask = ({ text }) => (
    <span className="about__mask">
      <span className="about__mask-inner">{text}</span>
    </span>
  );

  return (
    <section className="about">
      {/* ===== BLOCK 1: Team ===== */}
      <div className="about__block about__block--team">
        <div className="about__intro">
          <Eyebrow />
          <h2 ref={teamHeadingRef} className="about__heading">
            <Mask text="The Hands" />
            <Mask text="Behind Every Glow" />
          </h2>
          <p className="about__sub">
            At Muse, our stylists are dedicated to making every visit feel
            intentional, relaxed, and entirely yours.
          </p>
          <div ref={teamCtaRef} className="about__cta-row">
            <a href="#booking" className="about__btn about__btn--primary">Book Now</a>
            <a href="#services" className="about__btn about__btn--ghost">View Services</a>
          </div>
        </div>

        <Reveal className="about__team-strip" onEnter={animateTeamIntro}>
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="about__polaroid"
              ref={(el) => (teamCardsRef.current[i] = el)}
              style={{ "--tilt": `${member.tilt}deg` }}
            >
              <img src={member.img} alt={member.name} />
              <span className="about__polaroid-name">{member.name}</span>
              <span className="about__polaroid-role">{member.role}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ===== BLOCK 2: Stats ===== */}
      <div className="about__block about__block--stats">
        <div className="about__intro">
          <Eyebrow />
          <h2 ref={statsHeadingRef} className="about__heading about__heading--md">
            <Mask text="We're A Small Team Of" />
            <Mask text="Stylists Obsessed With Craft." />
          </h2>
          <p className="about__sub">Built by people who live and breathe beauty rituals.</p>
        </div>

        <Reveal className="about__stats-grid" onEnter={animateStats}>
          <div ref={statsGridRef} className="about__stats-inner">
            {STATS.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-desc">{s.desc}</span>
                <span className="about__underline" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ===== BLOCK 3: Vision intro ===== */}
      <Reveal className="about__block about__block--vision" onEnter={animateVision}>
        <Eyebrow />
        <h2 ref={visionHeadingRef} className="about__heading about__heading--center">
          <Mask text="Our Philosophy" />
          <Mask text="Beauty As Ritual, Not Routine" />
        </h2>
        <p className="about__sub about__sub--center">
          We believe every service should feel considered — from the products we choose to the pace of every appointment.
        </p>
      </Reveal>

      {/* ===== BLOCK 4a: Feature — text left, photo right ===== */}
      <Reveal className="about__feature" onEnter={animateFeature1}>
        <div ref={feat1TextRef} className="about__feature-text">
          <h3>Redefining The Studio Experience With Intentional Care</h3>
          <p>
            Every treatment plan is built around you — your skin, your hair,
            your goals — not a one-size-fits-all menu.
          </p>
          <a href="#services" className="about__feature-link">Explore Services</a>
        </div>

        <div ref={feat1PhotoRef} className="about__feature-photo">
          <img
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
            alt="Stylist consulting with client"
          />
          <span
            ref={(el) => (feat1BadgesRef.current[0] = el)}
            className="about__float-badge about__float-badge--tl"
          >
            <Star size={12} fill="currentColor" strokeWidth={0} /> 4.9 Rating
          </span>
          <span
            ref={(el) => (feat1BadgesRef.current[1] = el)}
            className="about__float-badge about__float-badge--br"
          >
            98% Client Return
          </span>
        </div>
      </Reveal>

      {/* ===== BLOCK 4b: Feature — photo left, text right, floating card ===== */}
      <Reveal className="about__feature about__feature--reverse" onEnter={animateFeature2}>
        <div ref={feat2PhotoRef} className="about__feature-photo">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
            alt="Client during treatment"
          />
          <div ref={feat2CardRef} className="about__float-card">
            <div className="about__float-card-top">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="" />
              <div>
                <span className="about__float-card-name">Priya Shah</span>
                <span className="about__float-card-verified">Skin Therapist</span>
              </div>
            </div>
            <div className="about__float-card-bar">
              <span style={{ width: "95%" }} />
            </div>
            <span className="about__float-card-meta">95% client satisfaction</span>
          </div>
        </div>

        <div ref={feat2TextRef} className="about__feature-text">
          <h3>Skilled Hands, Modern Technique, Genuine Warmth</h3>
          <p>
            Our stylists train continuously, so the newest techniques always
            meet you where your beauty routine already lives.
          </p>
          <a href="#booking" className="about__feature-link">Meet the Team</a>
        </div>
      </Reveal>

      {/* ===== BLOCK 5: Core values, gradient bg + phone mockup ===== */}
      <div className="about__block about__block--values">
        <Reveal className="about__values-intro" onEnter={animateValuesIntro}>
          <div ref={valuesTextRef} className="about__values-text">
            <h3>The Values Driving Muse's Craft</h3>
            <p>Care, precision, and warmth guide every session we deliver.</p>
          </div>

          <div ref={phoneRef} className="about__phone">
            <div className="about__phone-frame">
              <div className="about__phone-screen">
                <div className="about__phone-image-wrapper">
                  <img 
                    src={PHONE_IMAGES[currentImage]} 
                    alt="Skincare treatment preview" 
                    className="about__phone-image"
                  />
                  <div className="about__phone-image-overlay"></div>
                  
                  <div className="about__phone-dots">
                    {PHONE_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        className={`about__phone-dot ${i === currentImage ? 'active' : ''}`}
                        onClick={() => setCurrentImage(i)}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="about__phone-content">
                  <span className="about__phone-heading">Ready For Your Glow-Up?</span>
                  <span className="about__phone-sub">
                    Book personalized sessions, explore stylists, and manage
                    appointments — all in one place.
                  </span>
                  <button className="about__phone-btn">Get Started</button>
                </div>
              </div>
            </div>
            
            <div
              ref={(el) => (phoneCardsRef.current[0] = el)}
              className="about__phone-card about__phone-card--1"
            >
              <span className="about__phone-card-icon" style={{ background: "#4ade80" }} />
              <div>
                <span>Hair Color</span>
                <small>Amara Reyes</small>
              </div>
              <span className="about__phone-card-pct">-15%</span>
            </div>
            <div
              ref={(el) => (phoneCardsRef.current[1] = el)}
              className="about__phone-card about__phone-card--2"
            >
              <span className="about__phone-card-icon" style={{ background: "#facc15" }} />
              <div>
                <span>Deep Facial</span>
                <small>Priya Shah</small>
              </div>
              <span className="about__phone-card-pct">-12%</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about__values-grid-wrap" onEnter={animateValuesGrid}>
          <div ref={valuesGridRef} className="about__values-grid">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="about__value">
                  <span className="about__value-icon">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                  <span className="about__underline" />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* ===== BLOCK 6: Founders ===== */}
      <div className="about__block about__block--founders">
        <div className="about__intro">
          <Eyebrow />
          <h2 ref={foundersHeadingRef} className="about__heading about__heading--center">
            <Mask text="Meet The Vision Behind" />
            <Mask text="Muse Studio" />
          </h2>
          <p className="about__sub about__sub--center">
            The people whose care and craft shaped everything Muse stands for.
          </p>
        </div>

        <Reveal className="about__founders-wrap" onEnter={animateFounders}>
          <div ref={foundersRowRef} className="about__founders-row">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="about__founder">
                <div className="about__founder-photo">
                  <img src={f.img} alt={f.name} />
                </div>
                <span className="about__founder-name">{f.name}</span>
                <span className="about__founder-role">{f.role}</span>
                <span className="about__underline" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}