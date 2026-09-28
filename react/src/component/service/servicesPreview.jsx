// ServicesPage.jsx
import { useState, useRef, useEffect } from "react";
import { LayoutGrid, Sparkles, Waves, Scissors, Clock, X, Star, ArrowLeft } from "lucide-react";
import "./servicesPreview.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80";

const PLACEHOLDER_IDEAL = "Anyone looking to add this to their regular routine.";
const PLACEHOLDER_INVOLVED = [
  { title: "Consultation", desc: "We start by talking through your goals so the session is built around you." },
  { title: "Treatment", desc: "The core service is performed using professional-grade tools and products." },
  { title: "Aftercare", desc: "You'll leave with simple guidance to help the results last." },
];

const CATEGORIES = [
  {
    id: "all",
    label: "All",
    count: 54,
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=80",
  },
  {
    id: "skin-care",
    label: "Skin Care",
    count: 24,
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=80",
    description: [
      "Inspired by nature, light, and the soft rhythm of self-care, our skin treatments are designed to restore balance, nourish deeply, and reveal your natural radiance.",
      "Whether you seek a glow before a big event or long-term skin health, each treatment is performed with intention and care.",
    ],
    services: [
      {
        id: "really-good-facial",
        name: "The Really Good Facial",
        price: 140,
        duration: "60min",
        desc: "The 60-minute personalized facial that transforms your skin and renews your confidence.",
        rating: 4.9,
        idealFor: "Monthly maintenance and promoting overall skin health.",
        whatsInvolved: [
          { title: "Double Cleanse", desc: "Removes makeup, sweat, and dirt, leaving your skin fresh and ready for treatment." },
          { title: "Skin Analysis", desc: "We map your skin's needs before choosing products and technique." },
          { title: "Customized Treatments", desc: "The most effective products and techniques are used to address your unique skin concerns." },
        ],
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80",
        modalImages: [
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        ],
      },
      {
        id: "dermaplaning",
        name: "Dermaplaning",
        price: 120,
        duration: "60min",
        desc: "Removes dead skin and peach fuzz for a soft, smooth, radiant finish.",
        modalImages: [
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
        ],
      },
      {
        id: "enzyme-exfoliation",
        name: "Enzyme Exfoliation",
        price: 110,
        duration: "45min",
        desc: "Manual pore cleansing to remove blackheads, congestion, and impurities.",
        modalImages: [
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
        ],
      },
      {
        id: "high-frequency",
        name: "High Frequency",
        price: 90,
        duration: "30min",
        desc: "Calms acne, boosts healing, and improves circulation using gentle electrical currents.",
        modalImages: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
        ],
      },
      {
        id: "purelift",
        name: "PureLift Technology",
        price: 160,
        duration: "60min",
        desc: "Microcurrent lifts and tones facial muscles for firmer, younger-looking skin.",
        modalImages: [
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
        ],
      },
      {
        id: "cryo-globe",
        name: "Cryo Globe Massage",
        price: 95,
        duration: "45min",
        desc: "Cooling globes reduce puffiness, soothe inflammation, and boost circulation.",
        modalImages: [
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        ],
      },
      {
        id: "muscle-tension",
        name: "Muscle Tension Relief",
        price: 160,
        duration: "45min",
        desc: "Deep facial massage releases muscle tension and supports skin elasticity.",
        modalImages: [
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
        ],
      },
    ],
  },
  {
    id: "body-rituals",
    label: "Body Rituals",
    count: 18,
    icon: Waves,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700&q=80",
    description: [
      "Slow down with treatments built around warmth, pressure, and touch.",
      "Each ritual is designed to release tension and leave your body feeling reset.",
    ],
    services: [
      {
        id: "hot-stone",
        name: "Hot Stone Massage",
        price: 150,
        duration: "75min",
        desc: "Heated stones ease deep muscle tension and improve circulation.",
        modalImages: [
          "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
        ],
      },
      {
        id: "body-scrub",
        name: "Sea Salt Body Scrub",
        price: 100,
        duration: "45min",
        desc: "Full-body exfoliation leaves skin soft and renewed.",
        modalImages: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
          "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
        ],
      },
      {
        id: "lymphatic",
        name: "Lymphatic Drainage",
        price: 130,
        duration: "60min",
        desc: "Gentle manual technique to reduce fluid retention and puffiness.",
        modalImages: [
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
          "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
        ],
      },
      {
        id: "wrap",
        name: "Detox Body Wrap",
        price: 140,
        duration: "60min",
        desc: "Mineral-rich wrap to nourish and tighten the skin.",
        modalImages: [
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
        ],
      },
    ],
  },
  {
    id: "hair-treatments",
    label: "Hair Treatments",
    count: 12,
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80",
    description: [
      "Treatments focused on strength, shine, and scalp health.",
      "From quick refreshes to deep repair, each service is tailored to your hair type.",
    ],
    services: [
      {
        id: "keratin",
        name: "Keratin Smoothing",
        price: 220,
        duration: "120min",
        desc: "Reduces frizz and adds long-lasting shine and smoothness.",
        modalImages: [
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
          "https://images.unsplash.com/photo-1677091508080-d6ee28356318?w=600&q=80",
        ],
      },
      {
        id: "scalp-treatment",
        name: "Scalp Detox",
        price: 85,
        duration: "40min",
        desc: "Deep cleanse to remove buildup and support healthy growth.",
        modalImages: [
          "https://images.unsplash.com/photo-1677091508080-d6ee28356318?w=600&q=80",
          "https://images.unsplash.com/photo-1677091508089-2958f18244fe?w=600&q=80",
        ],
      },
      {
        id: "gloss",
        name: "Color Gloss",
        price: 95,
        duration: "45min",
        desc: "Adds vibrancy and a glass-like shine between color sessions.",
        modalImages: [
          "https://images.unsplash.com/photo-1677091508089-2958f18244fe?w=600&q=80",
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
        ],
      },
    ],
  },
];

function StarRating({ rating = 5 }) {
  const rounded = Math.round(rating);
  return (
    <div className="services-page__modal-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rounded ? "#1a1a1a" : "none"}
          color={i < rounded ? "#1a1a1a" : "#c9c9c9"}
        />
      ))}
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}

// Scroll-triggered reveal — animates once, the first time the element enters the viewport.
function Reveal({ as: Tag = "div", delay = 0, className = "", style = {}, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`services-page__reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function ServicesPage({ onBack }) {
  const [view, setView] = useState("landing"); // "landing" | "category"
  const [activeCategory, setActiveCategory] = useState("skin-care");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // ADDED

  const landingCards = CATEGORIES.filter((c) => c.id !== "all");

  const openCategory = (id) => {
    setActiveCategory(id);
    setView("category");
  };

  // ADDED: Open modal with animation
  const openService = (service) => {
    setSelectedService(service);
    requestAnimationFrame(() => setModalVisible(true));
  };

  // ADDED: Close modal with animation
  const closeService = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[1];
  const services =
    activeCategory === "all"
      ? CATEGORIES.filter((c) => c.id !== "all").flatMap((c) => c.services)
      : activeCat.services;

  const heroService = services[0];
  const restServices = services.slice(1);

  const modalImageSrcs = selectedService
    ? (selectedService.modalImages || [selectedService.image, selectedService.image])
        .map((src) => src || FALLBACK_IMAGE)
    : [];

  const renderCardFooter = (service) => (
    <div className="services-page__card-footer">
      <div className="services-page__card-duration">
        <Clock size={12} />
        {service.duration}
      </div>
      <div className="services-page__card-actions">
        <button
          className="services-page__book-btn"
          onClick={(e) => e.stopPropagation()}
        >
          Book Now
        </button>
        <button
          className="services-page__learn-link"
          onClick={(e) => {
            e.stopPropagation();
            openService(service); // UPDATED
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );

  // ---------- LANDING VIEW — fully static, no animation of any kind ----------
  if (view === "landing") {
    return (
      <section className="services-page services-page--landing">
        {onBack && (
          <button className="services-page__back" onClick={onBack}>
            <ArrowLeft size={14} /> Back
          </button>
        )}

        <h1 className="services-page__landing-heading">OUR SERVICES</h1>

        <div className="services-page__landing-grid">
          {landingCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="services-page__landing-card"
                onClick={() => openCategory(cat.id)}
              >
                <img className="services-page__landing-img" src={cat.image} alt={cat.label} />
                <span className="services-page__landing-scrim" />
                <span className="services-page__landing-icon">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="services-page__landing-body">
                  <span className="services-page__landing-label">{cat.label.toUpperCase()}</span>
                  <span className="services-page__landing-count">{cat.count} services</span>
                </span>
              </button>
            );
          })}
        </div>

        <button className="services-page__view-all" onClick={() => openCategory("all")}>
          View All
        </button>
      </section>
    );
  }

  // ---------- FULL CATEGORY VIEW — scroll-triggered cinematic reveal ----------
  return (
    <section className="services-page">
      <button className="services-page__back" onClick={() => setView("landing")}>
        <ArrowLeft size={14} /> Back
      </button>

      <Reveal as="div" className="services-page__header" delay={0}>
        <h1 className="services-page__heading">
          OUR <span className="services-page__heading-tag">SERVICES</span> SERVICES
        </h1>
      </Reveal>

      <div className="services-page__tabs">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          const showThumb = hoveredTab === cat.id || activeCategory === cat.id;
          return (
            <Reveal
              key={cat.id}
              as="button"
              delay={i * 90}
              className={`services-page__tab ${showThumb ? "services-page__tab--thumb" : ""}`}
              onMouseEnter={() => setHoveredTab(cat.id)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveCategory(cat.id)}
            >
              <img className="services-page__tab-img" src={cat.image} alt="" />
              <span className="services-page__tab-scrim" />
              <span className="services-page__tab-icon">
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="services-page__tab-body">
                <span className="services-page__tab-label">{cat.label}</span>
                <span className="services-page__tab-count">{cat.count} services</span>
              </span>
            </Reveal>
          );
        })}
      </div>

      {activeCat.description && (
        <Reveal as="div" className="services-page__intro" delay={120}>
          <h2 className="services-page__category-title">{activeCat.label}</h2>
          <div className="services-page__category-desc">
            {activeCat.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      )}

      <div className="services-page__grid">
        {heroService && (
          <>
            <Reveal
              as="article"
              delay={160}
              className="services-page__card services-page__card--hero"
              onClick={() => openService(heroService)} // UPDATED
            >
              <h3 className="services-page__card-name">{heroService.name}</h3>
              <p className="services-page__card-price">${heroService.price}</p>
              <p className="services-page__card-desc">{heroService.desc}</p>
              {renderCardFooter(heroService)}
            </Reveal>

            {heroService.image && (
              <Reveal as="div" delay={200} className="services-page__hero-image">
                <img src={heroService.image} alt={heroService.name} />
              </Reveal>
            )}
          </>
        )}

        <Reveal as="div" delay={220} className="services-page__bracket-tile">
          <span className="services-page__bracket-inner">OUR SERVICES</span>
        </Reveal>

        {restServices.map((service, i) => (
          <Reveal
            key={service.id}
            as="article"
            delay={240 + i * 60}
            className="services-page__card"
            onClick={() => openService(service)} // UPDATED
          >
            <h3 className="services-page__card-name">{service.name}</h3>
            <p className="services-page__card-price">${service.price}</p>
            <p className="services-page__card-desc">{service.desc}</p>
            {renderCardFooter(service)}
          </Reveal>
        ))}
      </div>

      {/* UPDATED: Modal with animation */}
      {selectedService && (
        <div 
          className={`services-page__overlay ${modalVisible ? 'is-open' : ''}`}
          onClick={closeService} // UPDATED
        >
          <div className="services-page__modal" onClick={(e) => e.stopPropagation()}>
            <button className="services-page__modal-close" onClick={closeService}> {/* UPDATED */}
              <X size={20} />
            </button>

            <div className="services-page__modal-images">
              {modalImageSrcs.map((src, i) => (
                <img key={i} src={src} alt={selectedService.name} />
              ))}
            </div>

            <div className="services-page__modal-content">
              <StarRating rating={selectedService.rating || 4.8} />
              <h2 className="services-page__modal-title">{selectedService.name}</h2>
              <div className="services-page__modal-meta">
                <span className="services-page__modal-meta-price">${selectedService.price}</span>
                <span className="services-page__modal-meta-duration">
                  <Clock size={12} /> {selectedService.duration}
                </span>
              </div>
              <p className="services-page__modal-desc">{selectedService.desc}</p>

              <p className="services-page__modal-label">IDEAL FOR:</p>
              <p className="services-page__modal-ideal">
                {selectedService.idealFor || PLACEHOLDER_IDEAL}
              </p>

              <p className="services-page__modal-label">WHAT'S INVOLVED:</p>
              {(selectedService.whatsInvolved || PLACEHOLDER_INVOLVED).map((item, i) => (
                <div key={i} className="services-page__modal-involved-item">
                  <p className="services-page__modal-involved-title">{item.title}</p>
                  <p className="services-page__modal-involved-desc">{item.desc}</p>
                </div>
              ))}

              <button className="services-page__modal-book">Book Now</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}