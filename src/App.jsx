import { Suspense, lazy, useEffect, useState } from "react";
import {
  profile,
  stats,
  experience,
  projects,
  skills,
  codingProfiles,
  education,
  publication,
} from "./data.js";
import { TiltCard, ScrollProgress, useScrollReveal, usePrefersReducedMotion, hasWebGL } from "./effects.jsx";

function loadScene() {
  return import("./Scene.jsx");
}

const Scene = lazy(loadScene);

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function delay(index) {
  return { "--d": `${index * 80}ms` };
}

function ExternalLink({ href, children, className }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={className}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
    >
      {children}
    </a>
  );
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="blob blob-1" />
      <span className="blob blob-2" />
      <span className="blob blob-3" />
      <span className="grid-floor" />
    </div>
  );
}

function Nav() {
  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#top" className="brand">
          VCK<span className="brand-dot">.</span>
        </a>
        <ul className="nav-links">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero({ show3d, reducedMotion }) {
  return (
    <section id="about" className="hero" aria-labelledby="hero-title">
      {show3d && (
        <div className="scene-wrap">
          <Suspense fallback={null}>
            <Scene reducedMotion={reducedMotion} />
          </Suspense>
        </div>
      )}
      <div className="container hero-content">
        <p className="eyebrow reveal" style={delay(0)}>
          <span className="pulse" aria-hidden="true" /> Open to SDE roles
        </p>
        <h1 id="hero-title" className="reveal" style={delay(1)}>
          <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="hero-role reveal" style={delay(2)}>
          {profile.role} · Payments · Logistics · Distributed systems
        </p>
        <p className="hero-summary reveal" style={delay(3)}>
          {profile.summary}
        </p>
        <div className="hero-actions reveal" style={delay(4)}>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
          {profile.links
            .filter((l) => !l.href.startsWith("mailto:"))
            .map((l) => (
              <ExternalLink key={l.label} href={l.href} className="btn btn-ghost">
                {l.label}
              </ExternalLink>
            ))}
        </div>
      </div>
      <div className="container">
        <ul className="stats" aria-label="Highlights">
          {stats.map((s, i) => (
            <li key={s.label} className="reveal" style={delay(i + 5)}>
              <TiltCard className="stat glass" max={16}>
                <span className="stat-value lift">{s.value}</span>
                <span className="stat-label lift-sm">{s.label}</span>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
      <a href="#experience" className="scroll-cue" aria-label="Scroll to experience">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}

function SectionTitle({ id, kicker, children }) {
  return (
    <div className="section-head reveal">
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="section-title">
        {children}
      </h2>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="section container" aria-labelledby="experience-title">
      <SectionTitle id="experience-title" kicker="01 / Career">
        Experience
      </SectionTitle>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="timeline-item reveal">
            <span className="timeline-node" aria-hidden="true" />
            <TiltCard className="job glass" max={4}>
              <div className="job-head lift-sm">
                <h3>
                  {job.title} <span className="company">@ {job.company}</span>
                </h3>
                <span className="period">{job.period}</span>
              </div>
              {job.teams.map((team) => (
                <div key={team.name || job.company} className="team">
                  {team.name && (
                    <div className="team-head">
                      <h4>{team.name}</h4>
                      <span className="period">{team.period}</span>
                    </div>
                  )}
                  <ul className="points">
                    {team.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </TiltCard>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <SectionTitle id="projects-title" kicker="02 / Builds">
        Projects
      </SectionTitle>
      <div className="grid">
        {projects.map((p, i) => (
          <div key={p.name} className="reveal" style={delay(i)}>
            <TiltCard as="article" className="project glass glow-border" max={12}>
              <span className="project-index lift" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="lift">{p.name}</h3>
              <p className="lift-sm">{p.description}</p>
              <ul className="tags lift-sm" aria-label={`${p.name} tech stack`}>
                {p.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              {p.href && (
                <ExternalLink href={p.href} className="text-link lift">
                  View on GitHub <span aria-hidden="true">→</span>
                </ExternalLink>
              )}
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section container" aria-labelledby="skills-title">
      <SectionTitle id="skills-title" kicker="03 / Toolkit">
        Skills
      </SectionTitle>
      <div className="grid grid-3">
        {skills.map((g, i) => (
          <div key={g.group} className="reveal" style={delay(i)}>
            <TiltCard className="glass skill-card" max={10}>
              <h3 className="skill-group lift">{g.group}</h3>
              <ul className="tags lift-sm">
                {g.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        ))}
      </div>

      <div className="grid two-col">
        <div className="reveal">
          <TiltCard className="glass" max={8}>
            <h3 className="skill-group lift">Coding profiles</h3>
            <ul className="profile-list lift-sm">
              {codingProfiles.map((c) => (
                <li key={c.label}>
                  <ExternalLink href={c.href} className="profile-link">
                    <strong>{c.label}</strong>
                    <span className="muted">{c.handle}</span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
        <div className="reveal" style={delay(1)}>
          <TiltCard className="glass" max={8}>
            <h3 className="skill-group lift">Education</h3>
            <p className="edu-degree lift-sm">{education.degree}</p>
            <p className="lift-sm">{education.school}</p>
            <p className="muted lift-sm">
              {education.period} · {education.grade}
            </p>
            <h3 className="skill-group spaced lift">Publication</h3>
            <p className="lift-sm">
              {publication.text}{" "}
              <ExternalLink href={publication.href} className="text-link">
                {publication.label}
              </ExternalLink>
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section container contact" aria-labelledby="contact-title">
      <TiltCard className="glass contact-card glow-border reveal" max={6}>
        <p className="kicker lift-sm">04 / Contact</p>
        <h2 id="contact-title" className="section-title lift">
          Let's build something <span className="gradient-text">reliable</span>
        </h2>
        <p className="lift-sm">I'm open to SDE roles in backend, payments and distributed systems.</p>
        <a className="btn btn-primary lift" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </TiltCard>
    </section>
  );
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [show3d, setShow3d] = useState(false);
  useScrollReveal();

  useEffect(function detectWebGL() {
    setShow3d(hasWebGL());
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Aurora />
      <Nav />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero show3d={show3d} reducedMotion={reducedMotion} />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
