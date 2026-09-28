// Booking.jsx
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Check, Clock, User, Calendar, Sparkles, Star } from "lucide-react";
import "./booking.css";

const STYLISTS = [
  { id: "any", name: "Any Available", role: "First open slot", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80" },
  { id: "amara", name: "Amara Reyes", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80" },
  { id: "noah", name: "Noah Bennett", role: "Color Specialist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80" },
  { id: "priya", name: "Priya Shah", role: "Skin Therapist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80" },
];

const SERVICES = [
  { id: "facial", name: "The Really Good Facial", price: "$140", duration: "60 min", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&q=80" },
  { id: "dermaplaning", name: "Dermaplaning", price: "$120", duration: "60 min", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80" },
  { id: "cut-color", name: "Cut & Color", price: "$180", duration: "90 min", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&q=80" },
  { id: "massage", name: "Cryo Globe Massage", price: "$95", duration: "45 min", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&q=80" },
];

const DATES = ["Mon 24", "Tue 25", "Wed 26", "Thu 27", "Fri 28", "Sat 29"];
const TIME_SLOTS = ["9:00 am", "10:30 am", "12:00 pm", "1:30 pm", "3:00 pm", "4:30 pm"];

export default function Booking() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tagRef = useRef(null);
  const orbsRef = useRef(null);
  const photoWrapRef = useRef(null);
  const photoImgRef = useRef(null);
  const badgeRef = useRef(null);
  const panelRef = useRef(null);
  const stylistRowRef = useRef(null);
  const serviceRowRef = useRef(null);
  const dateRowRef = useRef(null);
  const timeRowRef = useRef(null);
  const formRowRef = useRef(null);
  const submitRef = useRef(null);
  const summaryRef = useRef(null);
  const successRef = useRef(null);
  const stylistCardsRef = useRef([]);
  const hasPlayed = useRef(false);
  const [inView, setInView] = useState(false);

  const [stylist, setStylist] = useState(null);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  // ============ ENTRANCE ============
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Ambient background orbs — slow continuous drift, purely atmospheric
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll(".booking__orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 40 : -40,
          y: i % 2 === 0 ? -30 : 30,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!inView) return;

    const lines = headingRef.current.querySelectorAll(".booking__line-inner");
    const tag = tagRef.current;
    const tl = gsap.timeline();

    // 1. Heading mask-reveal
    if (lines.length) {
      tl.fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.15, ease: "power4.out" });
    }
    if (tag) {
      const inner = tag.querySelector(".booking__tag-inner");
      tl.to(tag, { width: inner.scrollWidth, duration: 0.6, ease: "power3.out" }, "+=0.1");
    }

    // 2. Photo panel — clip-path wipe reveal, corner brackets scale in, badge pops
    tl.fromTo(
      photoWrapRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut" },
      "-=0.2"
    )
      .fromTo(
        photoImgRef.current,
        { scale: 1.25 },
        { scale: 1, duration: 1.4, ease: "power3.out" },
        "<"
      )
      .fromTo(
        photoWrapRef.current.querySelectorAll(".booking__corner"),
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2.5)" },
        "-=0.6"
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" },
        "-=0.3"
      );

    // 3. Panel container fades/slides in
    tl.fromTo(panelRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=1.2");

    // 4. Stylist cards — 3D flip-in cascade
    if (stylistRowRef.current) {
      tl.fromTo(
        stylistRowRef.current.children,
        { opacity: 0, rotateY: -60, transformPerspective: 600 },
        { opacity: 1, rotateY: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );
    }

    // 5. Service rows — slide in from right, staggered
    if (serviceRowRef.current) {
      tl.fromTo(
        serviceRowRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.3"
      );
    }

    // 6. Date pills — elastic wave
    if (dateRowRef.current) {
      tl.fromTo(
        dateRowRef.current.children,
        { opacity: 0, scale: 0.6, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "back.out(2.2)" },
        "-=0.2"
      );
    }

    // 7. Time slots — wave
    if (timeRowRef.current) {
      tl.fromTo(
        timeRowRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        "-=0.25"
      );
    }

    // 8. Form fields rise
    if (formRowRef.current) {
      tl.fromTo(
        formRowRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.15"
      );
    }

    // 9. Submit button pops in last
    tl.fromTo(
      submitRef.current,
      { opacity: 0, y: 16, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
      "-=0.2"
    );
  }, [inView]);

  // Crossfade + Ken Burns whenever stylist photo changes
  const activeStylist = STYLISTS.find((s) => s.id === stylist) || STYLISTS[0];
  useEffect(() => {
    if (!photoImgRef.current) return;
    gsap.fromTo(
      photoImgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
    );
  }, [stylist]);

  // ============ SELECTION SUMMARY — live receipt ============
  const selections = [
    stylist && { label: "Stylist", value: activeStylist.name, icon: User },
    service && { label: "Service", value: SERVICES.find((s) => s.id === service)?.name, icon: Sparkles },
    date && { label: "Date", value: date, icon: Calendar },
    time && { label: "Time", value: time, icon: Clock },
  ].filter(Boolean);

  const prevCount = useRef(0);
  useEffect(() => {
    if (!summaryRef.current) return;
    const items = summaryRef.current.querySelectorAll(".booking__summary-item");
    if (selections.length > prevCount.current) {
      const newest = items[items.length - 1];
      if (newest) {
        gsap.fromTo(
          newest,
          { opacity: 0, x: -16, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }
        );
      }
    }
    prevCount.current = selections.length;
  }, [selections.length]);

  // ============ SUBMIT + SUCCESS ============
  const canSubmit = service && date && time && form.name && form.email;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;

    const path = successRef.current?.querySelector(".booking__check-path");
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 0.7, delay: 0.2, ease: "power2.out" });
    }

    // Particle burst around the checkmark
    const particles = successRef.current?.querySelectorAll(".booking__particle");
    if (particles) {
      gsap.fromTo(
        particles,
        { opacity: 1, x: 0, y: 0, scale: 0 },
        {
          opacity: 0,
          x: (i) => Math.cos((i / particles.length) * Math.PI * 2) * 70,
          y: (i) => Math.sin((i / particles.length) * Math.PI * 2) * 70,
          scale: 1,
          duration: 0.9,
          delay: 0.35,
          ease: "power2.out",
        }
      );
    }

    gsap.fromTo(
      successRef.current.querySelectorAll(".booking__success-line"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );
  }, [submitted]);

  const reset = () => {
    setSubmitted(false);
    setStylist(null);
    setService(null);
    setDate(null);
    setTime(null);
    setForm({ name: "", email: "" });
  };

  // ============ 3D TILT ON STYLIST CARDS ============
  const handleTiltMove = (e, i) => {
    const card = stylistCardsRef.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 500,
    });
  };

  const resetTilt = (i) => {
    const card = stylistCardsRef.current[i];
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" });
  };

  // ============ MAGNETIC SUBMIT BUTTON ============
  const handleMagnetic = (e) => {
    if (!submitRef.current) return;
    const rect = submitRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(submitRef.current, { x: x * 0.2, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const resetMagnetic = () => {
    gsap.to(submitRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <section ref={sectionRef} className="booking">
      {/* Ambient drifting background orbs */}
      <div ref={orbsRef} className="booking__orbs" aria-hidden="true">
        <div className="booking__orb booking__orb--1" />
        <div className="booking__orb booking__orb--2" />
      </div>

      <div className="booking__intro">
        <h2 ref={headingRef} className="booking__heading">
          <span className="booking__line"><span className="booking__line-inner">Reserve</span></span>
          <span ref={tagRef} className="booking__tag">
            <span className="booking__tag-inner">Your Session</span>
          </span>
          <span className="booking__line"><span className="booking__line-inner">With Us</span></span>
        </h2>
        <p className="booking__sub">
          Choose your stylist, pick a service, and secure your slot — takes less than a minute.
        </p>
      </div>

      <div className="booking__split">
        {/* Photo panel */}
        <div ref={photoWrapRef} className="booking__photo">
          <img ref={photoImgRef} src={activeStylist.img} alt={activeStylist.name} />
          <div className="booking__photo-scrim" />

          {/* Decorative corner brackets */}
          <span className="booking__corner booking__corner--tl" />
          <span className="booking__corner booking__corner--tr" />
          <span className="booking__corner booking__corner--bl" />
          <span className="booking__corner booking__corner--br" />

          <div ref={badgeRef} className="booking__photo-badge">
            <Star size={13} fill="currentColor" strokeWidth={0} />
            <span>4.9 · 500+ sessions booked</span>
          </div>

          <div className="booking__photo-caption">
            <span className="booking__photo-name">{activeStylist.name}</span>
            <span className="booking__photo-role">{activeStylist.role}</span>
          </div>
        </div>

        {/* Interactive panel */}
        <div ref={panelRef} className="booking__panel">
          {!submitted ? (
            <>
              {/* Live selection summary receipt */}
              {selections.length > 0 && (
                <div ref={summaryRef} className="booking__summary">
                  {selections.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="booking__summary-item">
                        <Icon size={12} strokeWidth={2} />
                        <span>{s.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="booking__block">
                <span className="booking__block-label">Stylist</span>
                <div ref={stylistRowRef} className="booking__stylist-row">
                  {STYLISTS.map((s, i) => (
                    <button
                      key={s.id}
                      ref={(el) => (stylistCardsRef.current[i] = el)}
                      className={`booking__stylist ${stylist === s.id ? "booking__stylist--active" : ""}`}
                      onClick={() => setStylist(s.id)}
                      onMouseMove={(e) => handleTiltMove(e, i)}
                      onMouseLeave={() => resetTilt(i)}
                    >
                      <img src={s.img} alt={s.name} />
                      <span className="booking__stylist-scrim" />
                      <span className="booking__stylist-name">{s.name}</span>
                      {stylist === s.id && (
                        <span className="booking__stylist-check">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                      <span className="booking__stylist-ring" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking__block">
                <span className="booking__block-label">Service</span>
                <div ref={serviceRowRef} className="booking__service-grid">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      className={`booking__service ${service === s.id ? "booking__service--active" : ""}`}
                      onClick={() => setService(s.id)}
                    >
                      <span className="booking__service-thumb">
                        <img src={s.img} alt="" />
                      </span>
                      <span className="booking__service-info">
                        <span className="booking__service-name">{s.name}</span>
                        <span className="booking__service-meta">
                          {s.price}
                          <span className="booking__service-dot" />
                          <Clock size={11} strokeWidth={2} /> {s.duration}
                        </span>
                      </span>
                      <span className="booking__service-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking__block">
                <span className="booking__block-label">Date</span>
                <div ref={dateRowRef} className="booking__date-row">
                  {DATES.map((d) => (
                    <button
                      key={d}
                      className={`booking__date ${date === d ? "booking__date--active" : ""}`}
                      onClick={() => setDate(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking__block">
                <span className="booking__block-label">Time</span>
                <div ref={timeRowRef} className="booking__time-row">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      className={`booking__time ${time === t ? "booking__time--active" : ""}`}
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={formRowRef} className="booking__block booking__block--form">
                <div className="booking__field">
                  <span>Full Name</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="booking__field">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <button
                ref={submitRef}
                className="booking__submit"
                disabled={!canSubmit}
                onClick={handleSubmit}
                onMouseMove={handleMagnetic}
                onMouseLeave={resetMagnetic}
              >
                Confirm Appointment
              </button>
            </>
          ) : (
            <div ref={successRef} className="booking__success">
              <div className="booking__check-wrap">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="booking__particle" />
                ))}
                <div className="booking__check">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      className="booking__check-path"
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="booking__success-line">You're Booked</h3>
              <p className="booking__success-line">
                {SERVICES.find((s) => s.id === service)?.name} on {date} at {time}.
                A confirmation has been sent to {form.email}.
              </p>
              <button className="booking__success-line booking__reset" onClick={reset}>
                Book Another Session
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}