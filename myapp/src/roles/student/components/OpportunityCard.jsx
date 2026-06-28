import { Icon } from '../../../shared/Icon.jsx'

export function OpportunityCard({ opportunity, featured = false, showMatch = false }) {
  return (
    <article className={featured ? 'opportunity-card featured' : 'opportunity-card'}>
      <div className="opportunity-main">
        <div
          className="company-logo"
          style={{ '--logo-color': opportunity.color }}
          aria-hidden="true"
        >
          f
        </div>
        <div className="opportunity-title">
          <h3>{opportunity.title}</h3>
          <span>{opportunity.company}</span>
        </div>
      </div>

      <div className="opportunity-tags">
        <span>{opportunity.type}</span>
        <span>{opportunity.hours}</span>
        <span>{opportunity.mode}</span>
        <time>{opportunity.date}</time>
      </div>

      {showMatch && (
        <div className="match-summary">
          <strong>{opportunity.match} skill match</strong>
          <span>Matched: {opportunity.skills.slice(0, 2).join(', ')}</span>
          <small>Missing: Figma prototyping</small>
          <p>Your declared skills overlap with this posting's technical requirements.</p>
        </div>
      )}

      <div className="contact-box">
        <span>
          <Icon name="mail" size={13} />
          {opportunity.email}
        </span>
        <span>
          <Icon name="phone" size={13} />
          {opportunity.phone}
        </span>
        <div className="skill-list">
          {opportunity.skills.map((skill) => (
            <small key={skill}>{skill}</small>
          ))}
        </div>
      </div>

      <footer className="opportunity-footer">
        <span>
          <Icon name="mapPin" size={13} />
          {opportunity.location}
        </span>
        <button className="details-button" type="button">
          Details
        </button>
      </footer>
    </article>
  )
}
