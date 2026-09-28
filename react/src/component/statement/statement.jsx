// Statement.jsx
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./statement.css";

export default function Statement() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const linkRef = useRef(null);
  const tagRefs = useRef([]);
  const hasPlayed = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const lines = headingRef.current.querySelectorAll(".statement__line-inner");
    const tags = tagRefs.current.filter(Boolean);

    const tl = gsap.timeline();

    if (lines.length) {
      tl.fromTo(
        lines,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.9, stagger: 0.15, ease: "power4.out" }
      );
    }

    // Measure each tag's real content width, then animate exactly to that —
    // no arbitrary target, so the visual growth and the tween duration match perfectly
    tags.forEach((tag, i) => {
      const inner = tag.querySelector(".statement__tag-inner");
      const targetWidth = inner.scrollWidth;

      tl.to(
        tag,
        {
          width: targetWidth,
          duration: 0.6,
          ease: "power3.out",
        },
        i === 0 ? "+=0.15" : "<+=0.18"
      );
    });

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.1"
      );
    }

    if (linkRef.current) {
      tl.fromTo(
        linkRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, [inView]);

  const Line = ({ text }) => (
    <span className="statement__line">
      <span className="statement__line-inner">{text}&nbsp;</span>
    </span>
  );

  let tagIndex = -1;
  const Tag = () => {
    tagIndex += 1;
    const myIndex = tagIndex;
    return (
      <span
        className="statement__tag"
        ref={(el) => (tagRefs.current[myIndex] = el)}
      >
        <span className="statement__tag-inner">
          <ChevronLeft className="statement__bracket" strokeWidth={2} />
          <span className="statement__tag-text">ABOUT US</span>
          <ChevronRight className="statement__bracket" strokeWidth={2} />
        </span>
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="statement">
      <div ref={headingRef} className="statement__heading">
        <Line text="WE" />
        <Tag />
        <Line text="HELP CREATE MOMENTS" />
        <Line text="OF BEAUTY FOR YOU" />
        <Tag />
        <Line text="AND" />
        <Line text="YOUR GLOW" />
        <Tag />
      </div>

      <p ref={descRef} className="statement__desc">
        Muse is a premium beauty studio for women, offering expert care for
        skin, body, and hair. We provide personalized consultations to
        select treatments that precisely address each client's individual
        needs.
      </p>

      <a ref={linkRef} href="#about" className="statement__link">Read More</a>
    </section>
  );
}