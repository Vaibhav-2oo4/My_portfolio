import { useState } from "react";
import { portfolioData } from "./data/portfolio";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};
const defaultResume = {
  name: "Vaibhav_Hattekar_Resume.docx",
  url: "/vaibhav-resume.docx"
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const portfolio = portfolioData;
  const directEmail = "vaibhavhattekar61@gmail.com";
  const fallbackHomeImage = "/hack.jpg";
  const [homeImage, setHomeImage] = useState(portfolio.profileImage || fallbackHomeImage);
  const nameParts = portfolio.name.split(" ").filter(Boolean);
  const firstName = nameParts[0] || portfolio.name;
  const lastName = nameParts.slice(1).join(" ");
  const aboutStats = [
    { value: "6 months", label: "Experience" },
    { value: `${portfolio.projects.length}+`, label: "Projects Completed" },
    { value: `${portfolio.experiences.length}`, label: "Companies" }
  ];
  const experienceTags = [
    "Network Monitoring",
    "Vulnerability Assessment",
    "Nmap",
    "Wireshark",
    "Burp Suite",
    "Acunetix",
    "Python"
  ];

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Thank you for reaching out. I will get back to you soon.");
    setForm(initialForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  const activeResumeName = defaultResume.name;
  const activeResumeUrl = defaultResume.url;

  return (
    <div className="page-shell">
      <header className="home-hero" id="home">
        <nav className="home-nav">
          <div className="home-brand-wrap">
            <img className="home-brand-dp" src="/hacker.jpg" alt="Hacker DP" />
            <span className="home-brand">{portfolio.name}</span>
          </div>
          <div className="home-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="home-resume-btn" href={activeResumeUrl} download={activeResumeName}>
            Download Resume
          </a>
        </nav>

        <section className="home-hero-content">
          <div className="home-copy">
            <h1 className="home-title">
              <span>Hi, I&apos;m {firstName}</span>
              <span>{lastName || firstName}</span>
            </h1>
            <p className="home-role">{portfolio.headline.toUpperCase()}</p>
            <p className="home-summary">{portfolio.bio}</p>
            <p className="home-location">{portfolio.location}</p>
            <div className="home-actions">
              <a className="home-btn home-btn-primary" href="#contact">
                Contact Me
              </a>
              <a className="home-btn home-btn-outline" href="#projects">
                View Projects
              </a>
            </div>
            <div className="home-socials">
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${directEmail}`}>{directEmail}</a>
            </div>
          </div>
          <div className="home-profile-card">
            <div className="home-photo-frame">
              <img
                className="home-photo-portrait"
                src={homeImage}
                alt={`${portfolio.name} portrait`}
                onError={() => {
                  if (homeImage !== fallbackHomeImage) {
                    setHomeImage(fallbackHomeImage);
                  }
                }}
              />
            </div>
            <div className="home-profile-meta">
              <h3>{portfolio.name}</h3>
              <p>{portfolio.role}</p>
            </div>
          </div>
          <a className="home-scroll" href="#about">
            Scroll Down ↓
          </a>
        </section>
      </header>

      <main>
        <section className="section about-panel interactive-card" id="about" style={{ "--card-accent": "#4d8dff" }}>
          <h2 className="about-title">About Me</h2>
          <p className="about-intro">
            I am an aspiring Bug Bounty Hunter focused on building secure, reliable, and practical defense-oriented solutions.
          </p>
          <div className="about-copy">
            <p>
              My expertise lies in network monitoring, vulnerability assessment, and web security testing using tools like Nmap,
              Wireshark, Burp Suite, and Acunetix.
            </p>
            <p>
              Through internship and project work, I collaborate with teams to analyze risks, document findings clearly, and
              improve system resilience with actionable security recommendations.
            </p>
          </div>
          <div className="about-stats">
            {aboutStats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="about-actions">
            <a className="about-button about-button-primary" href="#skills">
              View My Skills
            </a>
            <a className="about-button about-button-outline" href="#contact">
              Get In Touch
            </a>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Skills</p>
            <h2>Professional skills developed through projects, practice, and internship experience.</h2>
          </div>
          <div className="skills-progress-grid">
            {portfolio.skills.map((skill, index) => (
              <article
                className="skill-progress-card interactive-card"
                key={skill.category}
                style={{
                  "--card-accent": skill.accent,
                  "--card-delay": `${index * 100}ms`,
                  "--skill-width": `${skill.percent}%`
                }}
              >
                <div className="skill-progress-top">
                  <h3>{skill.category}</h3>
                  <strong>{skill.percent}%</strong>
                </div>
                <div className="skill-bar">
                  <span className="skill-bar-fill" />
                </div>
                <div className="skill-chip-row">
                  <span className="skill-chip">{skill.level}</span>
                  <span className="skill-chip">{skill.experience}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section project-showcase" id="projects">
          <div className="section-heading centered-heading projects-heading">
            <h2 className="projects-title">Projects</h2>
            <p className="projects-subtitle">
              A showcase of my recent work and the technologies I&apos;ve implemented
            </p>
          </div>
          <div className="project-grid simple-project-grid">
            {portfolio.projects.map((project, index) => (
              <article
                className="project-card simple-project-card interactive-card"
                key={project.title}
                style={{
                  "--card-accent": "#3f8dff",
                  "--card-delay": `${index * 120}ms`
                }}
              >
                <h3>{project.title}</h3>
                <p className="project-summary">{project.description}</p>
                <div className="tag-row project-tags">
                  {project.stack.map((tag) => (
                    <span className="tag project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience-modern-section" id="experience">
          <div className="section-heading centered-heading experience-modern-heading">
            <h2 className="experience-modern-title">Experience</h2>
            <p className="experience-modern-subtitle">My professional journey as a cyber security intern</p>
          </div>
          <div className="experience-modern-list">
            {portfolio.experiences.map((item, index) => (
              <article
                className="experience-modern-card interactive-card"
                key={`${item.company}-${item.year}`}
                style={{
                  "--card-accent": "#3f8dff",
                  "--card-delay": `${index * 140}ms`
                }}
              >
                <h3>{item.title}</h3>
                <p className="experience-modern-company">
                  <a href={item.companyWebsite} target="_blank" rel="noreferrer">
                    {item.company}
                  </a>
                </p>
                <p className="experience-modern-duration">{item.year} - Present</p>
                <p className="experience-modern-summary">{item.summary}</p>
                <div className="experience-modern-tags">
                  {experienceTags.map((tag) => (
                    <span className="experience-modern-tag" key={`${item.company}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-showcase" id="education">
          <div className="section-heading centered-heading education-heading">
            <h2 className="education-title">Education</h2>
            <p className="education-subtitle">My academic background and qualifications</p>
          </div>
          <div className="education-grid">
            {portfolio.education.map((item, index) => (
              <article
                className="education-card interactive-card"
                key={item.degree}
                style={{
                  "--card-accent": "#3f8dff",
                  "--card-delay": `${index * 120}ms`
                }}
              >
                <h3>{item.degree}</h3>
                <p className="education-institution">{item.institution}</p>
                <p className="education-period">{item.period}</p>
                <p className="education-description">{item.description || item.score}</p>
                {item.topics?.length ? (
                  <div className="education-tags">
                    {item.topics.map((topic) => (
                      <span className="education-tag" key={`${item.degree}-${topic}`}>
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-showcase" id="contact">
          <div className="section-heading centered-heading contact-modern-heading">
            <h2 className="contact-modern-title">Contact</h2>
            <p className="contact-modern-subtitle">
              Let&apos;s discuss your project and explore how we can work together
            </p>
          </div>

          <div className="contact-modern-grid">
            <div className="contact-form-panel">
              <h3>Get In Touch</h3>
              <form className="contact-modern-form" onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <button className="contact-modern-submit" type="submit">
                  Send Message
                </button>
                {status ? <p className="form-status">{status}</p> : null}
              </form>
            </div>

            <aside className="contact-info-panel">
              <h3>Contact</h3>

              <div className="contact-info-block">
                <h4>Email</h4>
                <a href={`mailto:${directEmail}`}>{directEmail}</a>
              </div>

              <div className="contact-info-block">
                <h4>Phone</h4>
                <a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a>
              </div>

              <div className="contact-info-block">
                <h4>Location</h4>
                <p>{portfolio.location}</p>
              </div>

              <div className="contact-info-block">
                <h4>Working Hours</h4>
                <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
              </div>

              <div className="contact-info-socials">
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={`mailto:${directEmail}`}>Email</a>
              </div>
            </aside>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-intro">
            <h3>{portfolio.name}</h3>
            <p className="footer-role">{portfolio.headline}</p>
            <p className="footer-copy">
              Passionate about creating secure digital solutions and practical security workflows. Let&apos;s collaborate and
              build reliable, resilient systems together.
            </p>
            <div className="footer-socials">
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${directEmail}`}>Email</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <div className="footer-links-grid">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <p className="footer-copyright">Copyright © 2026 Vaibhav Hattekar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
