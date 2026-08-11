import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import {
  siCss,
  siDocker,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSocketdotio,
  siTailwindcss,
  siVite,
} from 'simple-icons'
import LogoLoop from './components/LogoLoop'
import LineSidebar from './components/LineSidebar'
import PillNav from './components/PillNav'
import Preloader from './components/ui/preloader'
import profilePhoto from './assets/ChatGPT Image Jul 29, 2026, 10_10_24 PM.png'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'github', label: 'GitHub' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
]

const experiences = [
  {
    role: 'Full Stack Web Development Intern',
    company: 'Divine Brains Technologies',
    tag: 'Unpaid Internship',
    details: [
      'Independently architected and deployed a Real-Time Collaborative Whiteboard using React, Node.js, Socket.IO, and HTML5 Canvas API.',
      'Designed a custom stroke persistence pipeline using MongoDB to store structured vector drawing instructions instead of flat images, enabling seamless board reconstruction.',
      'Engineered real-time room-based WebSocket synchronization, live cursor tracking, and custom canvas coordinate scaling.',
    ],
  },
  {
    role: 'Head of Marketing & Advertisement',
    company: 'TechnoClub, SSEC',
    tag: null,
    details: [
      'Core member and volunteer leading team outreach, event promotion, and digital media execution for campus-wide technical events.',
    ],
  },
  {
    role: 'Event Coordinator',
    company: 'Python Project Showcase, SSEC',
    tag: null,
    details: [
      'Coordinated event logistics, platform showcases, and project evaluations for student development teams.',
    ],
  },
]

const projects = [
  {
    name: 'QuickMart — Hyperlocal Multi-Vendor Marketplace & Delivery Platform',
    tech: 'MERN Stack, Socket.IO, MongoDB (GeoJSON/2dsphere), OSRM Routing',
    summary: 'A 4-role hyperlocal delivery platform with independent, synchronized order state machines governing vendor fulfillment and delivery logistics.',
    details: [
      'Built a 4-role hyperlocal delivery platform (customer, vendor, delivery partner, admin) with independent, synchronized order state machines governing vendor fulfillment and delivery logistics.',
      'Designed MongoDB aggregation pipelines ($geoNear, $lookup, $match) for location-based store discovery and real-time product availability filtering.',
      'Implemented atomic order claiming using findOneAndUpdate conditional locking to prevent race conditions when multiple delivery partners attempt to accept the same order simultaneously.',
      'Secured delivery verification with auto-generated OTP (schema-level select: false, role-restricted projection) and integrated OSRM road routing for real-time distance/ETA calculation on live delivery tracking maps.',
      'Architected Socket.IO room-based isolation per order, ensuring only authorized customer/vendor/delivery-partner can access a given order\'s live location stream.',
    ],
    demo: 'https://hybridecom.vercel.app/',
    repo: 'https://github.com/tasavvuf/quickmart',
    featured: true,
  },
  {
    name: 'Real-Time Collaborative Whiteboard',
    tech: 'React 19, Node.js, Express, Socket.IO, HTML5 Canvas API, MongoDB',
    summary: 'A Figma/Excalidraw-inspired real-time canvas built without heavy third-party drawing libraries. Features live drawing synchronization, room-based collaboration, cursor presence, and stroke replay persistence.',
    demo: 'https://real-time-collaborative-whiteboard-1.vercel.app',
    repo: 'https://github.com/tasavvuf/Real-Time-Collaborative-Whiteboard',
  },
  {
    name: 'Nami',
    tech: 'MERN Stack, Vite, Tailwind CSS, Vercel',
    summary: 'A privacy-first, anonymous note-sharing platform featuring a custom glassmorphism aesthetic, emotion-based tag filtering, and account-free interaction flows.',
    demo: 'https://nami777.vercel.app',
    repo: 'https://github.com/tasavvuf/Nami',
  },
  {
    name: 'Real-Time Location Tracker',
    tech: 'React 19, Node.js, Express, Socket.IO, Leaflet API',
    summary: 'A full-stack web application that allows multiple concurrent users to share live GPS coordinates on an interactive map with automatic panning and user presence tracking.',
    demo: null,
    repo: 'https://github.com/tasavvuf/Real-Time-Location-Tracker-with-Map',
  },
  {
    name: 'Gujarati AI Sales Agent Dashboard',
    tech: 'Node.js, Express, Sarvam AI, Google Sheets API',
    summary: 'A voice-driven conversational agent with real-time text-to-speech and speech-to-text integration, live microphone recording, barge-in audio handling, and automated CRM data syncing.',
    demo: null,
    repo: 'https://github.com/tasavvuf/Gujarati-AI-Sales-Agent-Dashboard-VaniSales-',
  },
]

const achievements = [
  {
    title: 'Winner (1st Place) — Future Innovators in Aerospace (FIA) Competition',
    description: 'Earned first place for building MySpaceTracker: A Galaxy of Dreamers, demonstrating full-stack execution and platform architecture.',
  },
  {
    title: 'Participant & Developer — Bolt 30-Day International Vibecoding Hackathon',
    description: 'Competed in a global hackathon with a $1M prize pool, prototyping and deploying Hirly (a swipe-first job matching platform).',
  },
  {
    title: 'District Shortlist — CodeWave 1.0 Hackathon',
    description: 'Selected among top competitors at the district level for rapid full-stack application development.',
  },
]

const techStack = [
  { label: 'HTML5', icon: siHtml5 },
  { label: 'CSS3', icon: siCss },
  { label: 'JavaScript', icon: siJavascript },
  { label: 'React', icon: siReact },
  { label: 'Next.js', icon: siNextdotjs },
  { label: 'Node.js', icon: siNodedotjs },
  { label: 'Express', icon: siExpress },
  { label: 'MongoDB', icon: siMongodb },
  { label: 'Socket.IO', icon: siSocketdotio },
  { label: 'Firebase', icon: siFirebase },
  { label: 'Docker', icon: siDocker },
  { label: 'Git', icon: siGit },
  { label: 'GitHub', icon: siGithub },
  { label: 'Linux (Tux)', icon: siLinux },
  { label: 'Vite', icon: siVite },
  { label: 'Tailwind CSS', icon: siTailwindcss },
  { label: 'PostgreSQL', icon: siPostgresql },
]

function SectionHeading({ children }) {
  return (
    <h2 className="section-heading">
      {children}
    </h2>
  )
}

function TechLogo({ icon, label }) {
  return (
    <span className="tech-logo-mark" title={label}>
      <svg viewBox="0 0 24 24" role="img" aria-label={label}>
        <path d={icon.path} fill="currentColor" />
      </svg>
    </span>
  )
}

function App() {
  const lenisRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reduceMotion ? 0 : 1.65,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: !reduceMotion,
      wheelMultiplier: 0.78,
      touchMultiplier: 0.95,
      syncTouch: true,
      syncTouchLerp: 0.08,
      lerp: 0.08,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return

        const index = navItems.findIndex((item) => item.id === visible.target.id)
        if (index !== -1) setActiveSection(index)
      },
      {
        root: null,
        rootMargin: '-15% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: -88,
        duration: 1.45,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      })
      return
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <div className="site-frame">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <LineSidebar
        items={navItems.map((item) => item.label)}
        activeIndex={activeSection}
        accentColor="rgb(54, 53, 55)"
        textColor="#a0a0a7"
        markerColor="#d4d4d8"
        markerLength={46}
        markerGap={8}
        maxShift={12}
        itemGap={18}
        fontSize={0.92}
        showIndex={false}
        className="section-sidebar"
        onItemClick={(index) => scrollTo(navItems[index].id)}
      />

      <PillNav
        logo="/favicon.svg"
        logoAlt="Tasavvuf Gori logo"
        logoHref="#home"
        items={navItems.map((item) => ({
          label: item.label,
          href: `#${item.id}`,
        }))}
        activeHref={`#${navItems[activeSection]?.id || 'home'}`}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
        onItemClick={(event, item) => {
          event.preventDefault()
          scrollTo(item.href.replace('#', ''))
        }}
      />

      <main className="main-shell">
        <section id="home" className="hero-section">
          <h1 className="hero-title">
            Tasavvuf Gori
          </h1>
          <p className="hero-copy">
            IT Engineering student building functional, zero-to-one web applications with modern stacks.
          </p>
        </section>

        <section className="profile-photo-section" aria-label="Tasavvuf Gori portrait">
          <img
            src={profilePhoto}
            alt="Stylized monochrome portrait of Tasavvuf Gori"
            className="profile-photo"
            width="1254"
            height="1254"
          />
        </section>

        <section id="about" className="content-section narrow-section about-section">
          <SectionHeading>About</SectionHeading>
          <p className="lead-text">
            I&apos;m an IT Engineering student at Shantilal Shah Engineering College with a focus on building functional, zero-to-one web applications. Rather than over-engineering simple problems, I leverage modern stacks like React, Node.js, Socket.IO, PostgreSQL, and MERN to ship fast, reliable software. Whether architecting real-time WebSocket systems or integrating voice AI models, I focus on shipping clean, high-velocity code that solves actual problems.
          </p>
        </section>

        <section className="tech-loop-section" aria-labelledby="tech-stack-title">
          <h2 id="tech-stack-title" className="tech-loop-title">Tech Stack</h2>
          <LogoLoop
            logos={techStack.map((tech) => ({
              node: <TechLogo icon={tech.icon} label={tech.label} />,
              title: tech.label,
              ariaLabel: tech.label,
            }))}
            speed={62}
            gap={56}
            logoHeight={52}
            pauseOnHover
            fadeOut
            fadeOutColor="#fbfbfb"
            ariaLabel="Technology stack logos"
            className="tech-logo-loop"
          />
        </section>

        <section id="github" className="content-section">
          <SectionHeading>GitHub</SectionHeading>
          <a
            href="https://github.com/tasavvuf"
            target="_blank"
            rel="noopener noreferrer"
            className="github-card"
          >
            <img
              src="https://ghchart.rshah.org/tasavvuf"
              alt="GitHub contribution chart"
              className="github-chart"
              style={{ filter: 'grayscale(100%) contrast(1.15) brightness(1.05)' }}
              loading="lazy"
            />
            <p className="github-link">
              github.com/tasavvuf
            </p>
          </a>
        </section>

        <section id="experience" className="content-section narrow-section">
          <SectionHeading>Experience</SectionHeading>
          <div className="experience-list">
            {experiences.map((exp, i) => (
              <article key={i} className="experience-item">
                <div className="experience-marker">
                  {i + 1}
                </div>
                <div className="experience-body">
                  <div className="experience-header">
                    <h3>{exp.role}</h3>
                    {exp.tag && (
                      <span>{exp.tag}</span>
                    )}
                  </div>
                  <p className="company-name">{exp.company}</p>
                  <ul>
                    {exp.details.map((d, j) => (
                      <li key={j}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionHeading>Projects</SectionHeading>
          <div className="project-grid">
            {projects.map((p, i) => (
              <div key={i} className={`project-card ${p.featured ? 'featured' : ''}`}>
                <h3>{p.name}</h3>
                <p className="project-tech">{p.tech}</p>
                {p.details ? (
                  <ul className="project-details">
                    {p.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="project-summary">{p.summary}</p>
                )}
                <div className="project-actions">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      Live Demo &rarr;
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer">
                      Source &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section narrow-section">
          <SectionHeading>Achievements</SectionHeading>
          <div className="achievement-list">
            {achievements.map((a, i) => (
              <div key={i} className="achievement-card">
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="resume" className="content-section narrow-section">
          <SectionHeading>Resume</SectionHeading>
          <div className="resume-embed">
            <iframe
              src="https://drive.google.com/file/d/1qN_GXMD301THAyOnTt1-_LfNkMqeM4UG/preview"
              title="Tasavvuf Gori Resume"
              className="resume-frame"
              loading="lazy"
            />
          </div>
          <p className="resume-download">
            <a
              href="https://drive.google.com/uc?export=download&id=1qN_GXMD301THAyOnTt1-_LfNkMqeM4UG"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume &rarr;
            </a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-name">Tasavvuf Gori</span>
            <span className="footer-location">Gujarat, India</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/tasavvuf" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/tasavvuf-gori-b21a81278/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:tasavvufg@gmail.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
