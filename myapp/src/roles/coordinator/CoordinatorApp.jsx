import { useState } from 'react'
import {
  coordinatorChecklist,
  coordinatorExportHistory,
  coordinatorProfile,
  coordinatorReportCards,
  coordinatorReports,
  coordinatorReviewQueue,
  coordinatorStats,
  coordinatorStudents,
} from '../../shared/data.js'
import { Icon } from '../../shared/Icon.jsx'

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    id: 'reviews',
    label: 'Review Queue',
    icon: 'file',
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'users',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'journal',
  },
]

const pageTabs = {
  dashboard: ['Overview', 'Queue Snapshot', 'Completion'],
  reviews: [
    'All Reviews',
    'Proposed Companies',
    'Acceptance',
    'Requirements',
    'Final Packages',
    'Completion',
  ],
  students: ['All Students', 'Track A', 'Track B', 'Completion Ready'],
  reports: ['Generated Reports', 'Templates', 'Export History'],
}

export function CoordinatorApp({ onExit }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedReview, setSelectedReview] = useState(null)
  const [activeTabs, setActiveTabs] = useState({
    dashboard: 'Overview',
    reviews: 'All Reviews',
    students: 'All Students',
    reports: 'Generated Reports',
  })

  const setActiveTab = (tab) => {
    setActiveTabs((tabs) => ({
      ...tabs,
      [activeView]: tab,
    }))
  }

  return (
    <div className="coordinator-app">
      <header className="coordinator-header">
        <div className="top-row">
          <div className="brand">
            <span className="brand-dot" aria-hidden="true"></span>
            <span>OJThink</span>
          </div>

          <div className="profile-cluster">
            <div className="avatar coordinator-avatar" aria-hidden="true">
              {coordinatorProfile.initials}
            </div>
            <div className="profile-copy">
              <strong>{coordinatorProfile.name}</strong>
              <span>{coordinatorProfile.role}</span>
            </div>
            <button
              className="icon-button plain"
              type="button"
              onClick={onExit}
              aria-label="Exit coordinator side"
              title="Exit coordinator side"
            >
              <Icon name="logOut" size={20} />
            </button>
          </div>
        </div>

        <div className="nav-row">
          <nav className="student-nav" aria-label="Coordinator navigation">
            {navItems.map((item) => (
              <button
                className={item.id === activeView ? 'nav-item active' : 'nav-item'}
                type="button"
                key={item.id}
                onClick={() => setActiveView(item.id)}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button muted" type="button" aria-label="Date filter">
              <Icon name="calendar" size={18} />
            </button>
            <button className="icon-button alert" type="button" aria-label="Notifications">
              <Icon name="bell" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="coordinator-main">
        {renderCoordinatorView(
          activeView,
          activeTabs[activeView],
          setActiveTab,
          setSelectedReview,
        )}
      </main>
      {selectedReview && (
        <ReviewDetail item={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </div>
  )
}

function renderCoordinatorView(activeView, activeTab, onTabChange, onReview) {
  if (activeView === 'reviews') {
    return (
      <ReviewQueuePage
        activeTab={activeTab}
        onTabChange={onTabChange}
        onReview={onReview}
      />
    )
  }

  if (activeView === 'students') {
    return <StudentsPage activeTab={activeTab} onTabChange={onTabChange} />
  }

  if (activeView === 'reports') {
    return <ReportsPage activeTab={activeTab} onTabChange={onTabChange} />
  }

  return (
    <DashboardPage
      activeTab={activeTab}
      onTabChange={onTabChange}
      onReview={onReview}
    />
  )
}

function DashboardPage({ activeTab, onTabChange, onReview }) {
  return (
    <>
      <CoordinatorHero
        eyebrow={coordinatorProfile.section}
        title="Coordinator Dashboard"
        description="Centralized monitoring for proposed companies, placement confirmation, phased requirements, final packages, and completion readiness."
        activePage="dashboard"
        activeTab={activeTab}
        onTabChange={onTabChange}
        actions={
          <>
            <button className="outline-tool" type="button">
              <Icon name="calendar" size={18} />
              June 26, 2026
            </button>
            <button className="outline-tool" type="button">
              <Icon name="filter" size={18} />
              All Sections
            </button>
          </>
        }
      />

      <DashboardTabContent activeTab={activeTab} onReview={onReview} />
    </>
  )
}

function DashboardTabContent({ activeTab, onReview }) {
  if (activeTab === 'Queue Snapshot') {
    return (
      <div className="coordinator-grid single-column-grid">
        <ReviewQueueSummary />
        <ReviewQueuePanel onReview={onReview} />
      </div>
    )
  }

  if (activeTab === 'Completion') {
    return (
      <div className="coordinator-lower-grid">
        <ChecklistPanel />
        <StudentMonitorPanel />
      </div>
    )
  }

  return (
    <>
      <section className="coordinator-stats" aria-label="Coordinator overview">
        {coordinatorStats.map((stat) => (
          <article className="coordinator-stat-card" key={stat.label}>
            <div className="coordinator-stat-icon">
              <Icon name={stat.icon} size={19} />
            </div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.subtext}</small>
          </article>
        ))}
      </section>

      <div className="coordinator-grid">
        <ReviewQueuePanel compact onReview={onReview} />
        <aside className="coordinator-side-panel">
          <FocusCard />
          <ReportShortcutCard />
        </aside>
      </div>

      <div className="coordinator-lower-grid">
        <ChecklistPanel />
        <StudentMonitorPanel />
      </div>
    </>
  )
}

function ReviewQueuePage({ activeTab, onTabChange, onReview }) {
  const filteredQueue = getFilteredReviews(activeTab)

  return (
    <>
      <CoordinatorHero
        eyebrow="Central review queue"
        title="Review Queue"
        description="Review official student submissions from one place instead of opening each workspace manually."
        activePage="reviews"
        activeTab={activeTab}
        onTabChange={onTabChange}
        actions={
          <>
            <button className="outline-tool" type="button">
              <Icon name="filter" size={18} />
              Status
            </button>
            <button className="outline-tool" type="button">
              <Icon name="workspace" size={18} />
              Track
            </button>
          </>
        }
      />

      <ReviewQueueSummary />

      <ReviewQueuePanel queue={filteredQueue} onReview={onReview} />
    </>
  )
}

function StudentsPage({ activeTab, onTabChange }) {
  const filteredStudents = getFilteredStudents(activeTab)

  return (
    <>
      <CoordinatorHero
        eyebrow="Student checklist monitoring"
        title="Students"
        description="Track each student's placement, missing requirements, review status, and completion readiness."
        activePage="students"
        activeTab={activeTab}
        onTabChange={onTabChange}
        actions={
          <>
            <button className="outline-tool" type="button">
              <Icon name="filter" size={18} />
              BSIT 4A
            </button>
            <button className="outline-tool" type="button">
              <Icon name="search" size={18} />
              Find Student
            </button>
          </>
        }
      />

      <div className="students-layout">
        <section className="student-directory-panel">
          <div className="coordinator-panel-heading">
            <div>
              <span className="eyebrow">Directory</span>
              <h2>Practicum Students</h2>
            </div>
            <label className="compact-search">
              <Icon name="search" size={17} />
              <input type="search" placeholder="Search student" />
            </label>
          </div>

          <div className="student-directory-list">
            {filteredStudents.map((student) => (
              <article className="student-directory-row" key={student.name}>
                <div className="review-student">
                  <div className="small-avatar" aria-hidden="true">
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <h3>{student.name}</h3>
                    <span>
                      {student.section} - {student.company}
                    </span>
                  </div>
                </div>
                <span className="track-pill">{student.track}</span>
                <div className="monitor-progress">
                  <div
                    style={{ '--student-progress': `${student.progress}%` }}
                    aria-label={`${student.progress} percent complete`}
                  ></div>
                </div>
                <strong>{student.progress}%</strong>
                <small>{student.missing} missing</small>
              </article>
            ))}
          </div>
        </section>

        <aside className="student-insight-panel">
          <FocusCard
            title="Monitoring Notes"
            copy="Students with Track B placements need cleaner proof routing and visible missing-requirement counts before final completion checking."
          />
          <ChecklistPanel compact />
        </aside>
      </div>
    </>
  )
}

function ReportsPage({ activeTab, onTabChange }) {
  return (
    <>
      <CoordinatorHero
        eyebrow="Coordinator reports"
        title="Reports"
        description="Prepare checklist, missing requirement, DTR/TITO, Track B, and completion readiness exports."
        activePage="reports"
        activeTab={activeTab}
        onTabChange={onTabChange}
        actions={
          <>
            <button className="outline-tool" type="button">
              <Icon name="calendar" size={18} />
              This Term
            </button>
            <button className="outline-tool" type="button">
              <Icon name="filter" size={18} />
              Export Type
            </button>
          </>
        }
      />

      <ReportsTabContent activeTab={activeTab} />
    </>
  )
}

function CoordinatorHero({
  eyebrow,
  title,
  description,
  activePage,
  activeTab,
  onTabChange,
  actions,
}) {
  return (
    <section className="coordinator-hero" aria-labelledby={`${activePage}-title`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 id={`${activePage}-title`}>{title}</h1>
        <p>{description}</p>
        <PageSubnav
          activePage={activePage}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      <div className="coordinator-actions">{actions}</div>
    </section>
  )
}

function PageSubnav({ activePage, activeTab, onTabChange }) {
  return (
    <div className="tab-list coordinator-subnav" role="tablist" aria-label={`${activePage} tabs`}>
      {pageTabs[activePage].map((tab) => (
        <button
          className={activeTab === tab ? 'tab active' : 'tab'}
          type="button"
          key={tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function ReviewQueueSummary() {
  const queueStats = [
    {
      label: 'Submitted',
      value: '18',
      detail: 'awaiting review',
      tone: 'submitted',
    },
    {
      label: 'Under Review',
      value: '11',
      detail: 'currently being checked',
      tone: 'review',
    },
    {
      label: 'Accepted',
      value: '64',
      detail: 'approved submissions',
      tone: 'accepted',
    },
    {
      label: 'Needs Revision',
      value: '9',
      detail: 'student action required',
      tone: 'revision',
    },
  ]

  return (
    <section className="queue-summary-grid" aria-label="Review queue summary">
      {queueStats.map((stat) => (
        <article
          className={`queue-summary-card queue-summary-${stat.tone}`}
          key={stat.label}
        >
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <small>{stat.detail}</small>
        </article>
      ))}
    </section>
  )
}

function ReviewQueuePanel({
  compact = false,
  queue = coordinatorReviewQueue,
  onReview,
}) {
  return (
    <section className={compact ? 'review-queue-panel compact-panel' : 'review-queue-panel'}>
      <div className="coordinator-panel-heading">
        <div>
          <span className="eyebrow">Central queue</span>
          <h2>Review Activity</h2>
        </div>
        <label className="compact-search">
          <Icon name="search" size={17} />
          <input type="search" placeholder="Search student" />
        </label>
      </div>

      <div className="review-list">
        {queue.map((item) => (
          <article className="review-row" key={item.id}>
            <div className="review-student">
              <div className="small-avatar" aria-hidden="true">
                {getInitials(item.student)}
              </div>
              <div>
                <h3>{item.student}</h3>
                <span>
                  {item.section} - {item.company}
                </span>
              </div>
            </div>

            <div className="review-meta">
              <span className="track-pill">{item.track}</span>
              <strong>{item.requirement}</strong>
            </div>

            <div className="review-status">
              <span className={getStatusClass(item.status)}>{item.status}</span>
              <small>{item.date}</small>
            </div>

            <button
              className="details-button"
              type="button"
              onClick={() => onReview?.(item)}
            >
              {item.status === 'Accepted' || item.status === 'Rejected'
                ? 'View'
                : 'Review'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function FocusCard({
  title = "Today's Focus",
  copy = 'Acceptance Confirmation reviews and final DTR packages have the highest workload. Track B proposals need coordinator remarks before students continue.',
}) {
  return (
    <section className="summary-card">
      <span className="eyebrow">AI-assisted summary</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </section>
  )
}

function ReportShortcutCard() {
  return (
    <section className="report-card">
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Exports</span>
          <h2>Reports</h2>
        </div>
      </div>
      <div className="report-list">
        {coordinatorReports.map((report) => (
          <button type="button" key={report}>
            <Icon name="file" size={16} />
            <span>{report}</span>
            <Icon name="arrowUpRight" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}

function ChecklistPanel({ compact = false }) {
  return (
    <section className={compact ? 'checklist-panel compact-panel' : 'checklist-panel'}>
      <div className="coordinator-panel-heading">
        <div>
          <span className="eyebrow">Checklist monitoring</span>
          <h2>Requirement Phases</h2>
        </div>
      </div>

      <div className="phase-grid">
        {coordinatorChecklist.map((phase) => (
          <article className="phase-card" key={phase.phase}>
            <div className="phase-topline">
              <h3>{phase.phase}</h3>
              <span>{phase.completed}%</span>
            </div>
            <div
              className="phase-progress"
              style={{ '--phase-progress': `${phase.completed}%` }}
              aria-label={`${phase.phase} ${phase.completed} percent complete`}
            ></div>
            <div className="phase-numbers">
              <span>
                <strong>{phase.pending}</strong>
                Pending
              </span>
              <span>
                <strong>{phase.needsRevision}</strong>
                Revision
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function StudentMonitorPanel() {
  return (
    <section className="student-monitor-panel">
      <div className="coordinator-panel-heading">
        <div>
          <span className="eyebrow">Student monitoring</span>
          <h2>Completion Progress</h2>
        </div>
      </div>

      <div className="monitor-list">
        {coordinatorStudents.map((student) => (
          <article className="monitor-row" key={student.name}>
            <div>
              <h3>{student.name}</h3>
              <span>
                {student.section} - {student.company}
              </span>
            </div>
                <span className="track-pill">{student.track}</span>
                <span className="placement-pill">{student.placementStatus}</span>
                <div className="monitor-progress">
              <div
                style={{ '--student-progress': `${student.progress}%` }}
                aria-label={`${student.progress} percent complete`}
              ></div>
            </div>
            <strong>{student.progress}%</strong>
            <small>{student.missing} missing</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReportsTabContent({ activeTab }) {
  if (activeTab === 'Templates') {
    return (
      <section className="export-history-panel">
        <div className="coordinator-panel-heading">
          <div>
            <span className="eyebrow">Reusable templates</span>
            <h2>Report Templates</h2>
          </div>
        </div>
        <div className="report-list">
          {coordinatorReports.map((report) => (
            <button type="button" key={report}>
              <Icon name="file" size={16} />
              <span>{report}</span>
              <Icon name="arrowUpRight" size={15} />
            </button>
          ))}
        </div>
      </section>
    )
  }

  if (activeTab === 'Export History') {
    return <ExportHistoryPanel />
  }

  return (
    <>
      <section className="report-card-grid" aria-label="Report types">
        {coordinatorReportCards.map((report) => (
          <article className="report-type-card" key={report.title}>
            <div className="coordinator-stat-icon">
              <Icon name={report.icon} size={19} />
            </div>
            <span>{report.title}</span>
            <strong>{report.metric}</strong>
            <small>{report.subtext}</small>
            <p>{report.description}</p>
            <button className="details-button" type="button">
              Generate
            </button>
          </article>
        ))}
      </section>
      <ExportHistoryPanel compact />
    </>
  )
}

function ExportHistoryPanel({ compact = false }) {
  return (
    <section className="export-history-panel">
      <div className="coordinator-panel-heading">
        <div>
          <span className="eyebrow">Export history</span>
          <h2>{compact ? 'Recent Reports' : 'Export History'}</h2>
        </div>
        <button className="secondary-button slim" type="button">
          <Icon name="file" size={16} />
          New Report
        </button>
      </div>

      <div className="export-history-list">
        {coordinatorExportHistory.map((item) => (
          <article className="export-history-row" key={item.name}>
            <div>
              <h3>{item.name}</h3>
              <span>{item.type}</span>
            </div>
            <time>{item.date}</time>
            <span className={item.status === 'Ready' ? 'status-pill status-submitted' : 'status-pill'}>
              {item.status}
            </span>
            <button className="details-button" type="button">
              Open
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function getFilteredReviews(activeTab) {
  if (activeTab === 'Proposed Companies') {
    return coordinatorReviewQueue.filter((item) =>
      item.requirement.includes('Proposed Company'),
    )
  }

  if (activeTab === 'Acceptance') {
    return coordinatorReviewQueue.filter((item) =>
      item.requirement.includes('Acceptance Confirmation'),
    )
  }

  if (activeTab === 'Requirements') {
    return coordinatorReviewQueue.filter((item) =>
      item.requirement.includes('Requirements'),
    )
  }

  if (activeTab === 'Final Packages') {
    return coordinatorReviewQueue.filter((item) => item.requirement.includes('Final'))
  }

  if (activeTab === 'Completion') {
    return coordinatorReviewQueue.filter((item) =>
      item.requirement.includes('Completion'),
    )
  }

  return coordinatorReviewQueue
}

function getFilteredStudents(activeTab) {
  if (activeTab === 'Track A' || activeTab === 'Track B') {
    return coordinatorStudents.filter((student) => student.track === activeTab)
  }

  if (activeTab === 'Completion Ready') {
    return coordinatorStudents.filter((student) => student.completionReady)
  }

  return coordinatorStudents
}

function ReviewDetail({ item, onClose }) {
  return (
    <div className="review-detail-backdrop" role="presentation" onClick={onClose}>
      <section
        className="review-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="coordinator-panel-heading">
          <div>
            <span className="eyebrow">Official submission review</span>
            <h2 id="review-detail-title">{item.requirement}</h2>
          </div>
          <button className="icon-button plain" type="button" onClick={onClose}>
            <Icon name="arrowLeft" size={18} />
          </button>
        </div>

        <div className="review-detail-meta">
          <span>{item.student}</span>
          <span>{item.section}</span>
          <span>{item.track}</span>
          <span>{item.company}</span>
        </div>

        <div className="review-file-preview">
          <Icon name="file" size={28} />
          <strong>{item.requirement}.pdf</strong>
          <small>Frontend document preview</small>
        </div>

        <label className="review-remarks">
          <span>Coordinator remarks</span>
          <textarea placeholder="Add written feedback or correction notes"></textarea>
        </label>

        <div className="review-actions">
          <button className="secondary-button" type="button">
            Under Review
          </button>
          <button className="secondary-button" type="button">
            Needs Revision
          </button>
          <button className="secondary-button" type="button">
            Reject
          </button>
          <button className="primary-button" type="button">
            Accept
          </button>
        </div>
      </section>
    </div>
  )
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function getStatusClass(status) {
  if (status === 'Accepted') {
    return 'status-pill status-accepted'
  }

  if (status === 'Rejected') {
    return 'status-pill status-rejected'
  }

  if (status === 'Needs Revision') {
    return 'status-pill status-revision'
  }

  if (status === 'Under Review') {
    return 'status-pill status-review'
  }

  return 'status-pill status-submitted'
}
