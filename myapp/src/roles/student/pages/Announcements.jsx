import { announcements } from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'

export function Announcements({ onGoOverview }) {
  return (
    <main className="student-main">
      <section className="announcement-page">
        <div className="page-title">
          <h1>Dashboard</h1>
          <div className="tab-list">
            <button className="tab" type="button" onClick={onGoOverview}>
              Overview
            </button>
            <button className="tab active" type="button">
              Announcements
            </button>
          </div>
        </div>

        <div className="announcement-toolbar">
          <label className="search-box">
            <Icon name="search" size={20} />
            <input type="search" placeholder="Search Announcement" />
          </label>

          <div className="toolbar-filters">
            <button className="outline-tool" type="button">
              <Icon name="calendar" size={18} />
              June 23, 2026
            </button>
            <button className="outline-tool" type="button">
              <Icon name="filter" size={18} />
              CCS Coordinat..
            </button>
          </div>
        </div>

        <div className="announcement-feed">
          {announcements.map((announcement) => (
            <article className="announcement-card" key={announcement.id}>
              <header>
                <div className="large-author-dot" aria-hidden="true"></div>
                <div className="feed-author">
                  <div>
                    <strong>{announcement.author}</strong>
                    <small>{announcement.timeAgo}</small>
                  </div>
                  <span>{announcement.role}</span>
                </div>
                <time>{announcement.date}</time>
              </header>

              <h2>{announcement.title}</h2>
              <p>{announcement.body}</p>
              <p className="clamped-copy">{announcement.preview}</p>

              <footer>
                <Icon name="heart" size={19} />
              </footer>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
