import {
  announcements,
  ojtProgress,
  opportunities,
  requirementSubmissions,
  studentProfile,
  studentStats,
} from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'
import { OpportunityCard } from '../components/OpportunityCard.jsx'

export function StudentDashboard({ onGoAnnouncements }) {
  return (
    <main className="student-main">
      <div className="dashboard-grid">
        <section className="dashboard-left">
          <PageTitle
            title="Dashboard"
            activeTab="overview"
            onGoAnnouncements={onGoAnnouncements}
          />

          <div className="workspace-alert">
            <span className="workspace-badge" aria-hidden="true">
              CCS
            </span>
            <p>
              You've been added to <strong>{studentProfile.workspace}</strong>
            </p>
            <button type="button">View Workspace</button>
            <Icon name="arrowUpRight" size={14} />
          </div>

          <section className="stats-strip" aria-label="OJT hour status">
            {studentStats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <div className="stat-label">
                  <Icon name={stat.icon} size={16} />
                  <span>{stat.label}</span>
                </div>
                {stat.gauge ? (
                  <div className="mini-gauge" aria-label="80 percent progress">
                    <span>80%</span>
                    <small>out of 540</small>
                  </div>
                ) : (
                  <div className="stat-value">
                    <strong>{stat.value}</strong>
                    <small>{stat.subtext}</small>
                  </div>
                )}
              </article>
            ))}
          </section>

          <div className="dashboard-panels">
            <section className="announcement-panel">
              <PanelHeading
                icon="megaphone"
                title="Announcement"
                onClick={onGoAnnouncements}
              />
              {announcements.slice(0, 2).map((announcement, index) => (
                <article
                  className={index === 0 ? 'mini-announcement active' : 'mini-announcement'}
                  key={announcement.id}
                >
                  <div className="announcement-row">
                    <div className="author-dot" aria-hidden="true"></div>
                    <div>
                      <h3>{announcement.role}</h3>
                      <h4>{announcement.title}</h4>
                    </div>
                    <time>{announcement.date}</time>
                  </div>
                  <p>{announcement.preview}</p>
                </article>
              ))}
            </section>

            <section className="progress-panel">
              <PanelHeading icon="file" title="OJT Progress" />
              <div className="progress-list">
                {ojtProgress.map((item, index) => (
                  <div className={`progress-item ${item.status}`} key={`${item.title}-${index}`}>
                    <Icon
                      name={item.status === 'done' ? 'checkCircle' : 'clock'}
                      size={16}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="opportunity-section">
            <div className="section-heading">
              <Icon name="file" size={18} />
              <h2>OJT Opportunities</h2>
            </div>
            <div className="opportunity-row">
              {opportunities.slice(0, 3).map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  featured={index === 0}
                />
              ))}
            </div>
          </section>
        </section>

        <aside className="dashboard-right">
          <h2>Welcome Back, Lans!</h2>

          <button className="submission-shortcut" type="button">
            <Icon name="megaphone" size={18} />
            <span>Submissions</span>
            <Icon name="arrowUpRight" size={17} />
          </button>

          <div className="submission-list">
            {requirementSubmissions.map((item, index) => (
              <div className="submission-item" key={`${item.title}-${index}`}>
                <span>{item.title}</span>
                {item.status === 'Upload' ? (
                  <Icon name="upload" size={16} />
                ) : (
                  <small>{item.status}</small>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

function PageTitle({ title, activeTab, onGoAnnouncements }) {
  return (
    <div className="page-title">
      <h1>{title}</h1>
      <div className="tab-list" role="tablist" aria-label="Dashboard tabs">
        <button className={activeTab === 'overview' ? 'tab active' : 'tab'} type="button">
          Overview
        </button>
        <button
          className={activeTab === 'announcements' ? 'tab active' : 'tab'}
          type="button"
          onClick={onGoAnnouncements}
        >
          Announcements
        </button>
      </div>
    </div>
  )
}

function PanelHeading({ icon, title, onClick }) {
  const content = (
    <>
      <Icon name={icon} size={18} />
      <span>{title}</span>
      <Icon name="arrowUpRight" size={16} />
    </>
  )

  if (onClick) {
    return (
      <button className="panel-heading panel-heading-button" type="button" onClick={onClick}>
        {content}
      </button>
    )
  }

  return <div className="panel-heading">{content}</div>
}
