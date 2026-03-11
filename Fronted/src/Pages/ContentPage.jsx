import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheckCircle, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { getPagePath, pageContent } from '../siteContent'

function ContentPage({ pageId }) {
  const page = pageContent[pageId] ?? pageContent.services

  return (
    <main className="content-page">
      <section
        className="content-page-hero"
        style={{ backgroundImage: `linear-gradient(rgba(11, 35, 68, 0.82), rgba(11, 35, 68, 0.9)), url(${page.heroImage})` }}
      >
        <div className="content-page-shell">
          <p className="content-page-badge">{page.badge}</p>
          <h1>{page.title}</h1>
          <p className="content-page-description">{page.description}</p>
        </div>
      </section>

      <section className="content-page-section">
        <div className="content-page-shell content-page-grid">
          <div>
            <p className="content-page-kicker">Why This Page Matters</p>
            <h2>Structured support instead of disconnected advice</h2>
            <p className="content-page-copy">{page.intro}</p>

            <div className="content-page-list">
              {[
                'Direct guidance matched to business stage',
                'Clear priorities for the next operating cycle',
                'Measurable actions the team can actually execute',
              ].map((item) => (
                <div key={item} className="content-page-list-item">
                  <FaCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="content-page-panel">
            <h3>Need a broader plan?</h3>
            <p>Explore service lines or contact Torado for a structured engagement review.</p>
            <Link to={getPagePath('services')}>View Services</Link>
            <Link to={getPagePath('contact')} className="content-page-panel-secondary">
              Contact Us
            </Link>
          </aside>
        </div>
      </section>

      <section className="content-page-section content-page-section-muted">
        <div className="content-page-shell">
          <div className="content-page-heading">
            <p className="content-page-kicker">Focused Highlights</p>
            <h2>What Torado delivers on this page</h2>
          </div>

          <div className="content-page-cards">
            {page.highlights.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="content-page-card">
                  <div className="content-page-card-icon">
                    <Icon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {page.teamMembers && (
        <section className="content-page-section">
          <div className="content-page-shell">
            <div className="content-page-heading">
              <p className="content-page-kicker">Leadership</p>
              <h2>People behind the work</h2>
            </div>

            <div className="content-page-team">
              {page.teamMembers.map((member) => (
                <article key={member.name} className="content-page-team-card">
                  <img src={member.img} alt={member.name} />
                  <div className="content-page-team-body">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <div className="content-page-socials">
                      <FaFacebookF />
                      <FaTwitter />
                      <FaInstagram />
                      <FaLinkedinIn />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="content-page-section content-page-cta">
        <div className="content-page-shell content-page-cta-box">
          <div>
            <p className="content-page-kicker">Next Step</p>
            <h2>Move from browsing to an actual working page flow</h2>
          </div>
          <Link to={getPagePath('contact')}>
            Start Conversation
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ContentPage
