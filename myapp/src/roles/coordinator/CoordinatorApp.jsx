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
import { AccountSwitcher } from '../../shared/AccountSwitcher.jsx'

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
    'Company Verification',
    'Acceptance',
    'Requirements',
    'Final Packages',
    'Completion',
    'Placement Monitoring',
  ],
  students: ['All Students', 'Track A', 'Track B', 'Completion Ready'],
  reports: ['Generated Reports', 'Templates', 'Export History'],
}

export function CoordinatorApp({ onSwitchRole }) {
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

          <AccountSwitcher activeRole="coordinator" onSwitchRole={onSwitchRole} />
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
        description="Centralized monitoring for company verification, placement confirmation, phased requirements, final packages, and completion readiness."
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

      <CoordinatorAnalytics />

      <div className="coordinator-grid">
        <ReviewQueuePanel compact onReview={onReview} />
        <aside className="coordinator-side-panel">
          <FocusCard />
          <ReportShortcutCard />
        </aside>
      </div>
    </>
  )
}

export function CoordinatorAnalytics() {
  const workload = [
    ['Jan', 18],
    ['Feb', 25],
    ['Mar', 31],
    ['Apr', 22],
    ['May', 29],
    ['Jun', 34],
    ['Jul', 27],
  ]
  const [activeMonth, setActiveMonth] = useState(5)
  const activeWorkload = workload[activeMonth]

  return (
    <section className="coordinator-analytics" aria-label="Coordinator analytics">
      <article className="analytics-card analytics-area-card">
        <header className="analytics-card-heading">
          <div>
            <span className="eyebrow">Submission analytics</span>
            <h2>Review activity</h2>
            <p>Daily student submissions compared with completed coordinator reviews.</p>
          </div>
          <div className="analytics-period-toggle" aria-label="Review activity period">
            <button className="active" type="button">30 Days</button>
            <button type="button">Term</button>
          </div>
        </header>

        <div className="area-chart-canvas" aria-label="Submission and review activity chart">
          <svg viewBox="0 0 760 240" preserveAspectRatio="none" role="img" aria-label="Daily submissions and completed reviews">
            <defs>
              <linearGradient id="reviewAreaPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6f2f95" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#6f2f95" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="reviewAreaSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d69d22" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d69d22" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {[35, 85, 135, 185, 235].map((y) => (
              <line className="analytics-grid-line" x1="0" x2="760" y1={y} y2={y} key={y} />
            ))}
            <path
              className="analytics-area secondary"
              d="M0 80 C55 102 84 130 123 153 C165 178 206 132 248 118 C292 104 326 136 370 124 C418 112 445 66 492 78 C538 91 571 120 618 103 C668 85 714 75 760 112 L760 240 L0 240 Z"
            />
            <path
              className="analytics-line secondary"
              d="M0 80 C55 102 84 130 123 153 C165 178 206 132 248 118 C292 104 326 136 370 124 C418 112 445 66 492 78 C538 91 571 120 618 103 C668 85 714 75 760 112"
            />
            <path
              className="analytics-area primary"
              d="M0 207 C49 172 82 96 125 105 C168 113 190 181 233 169 C278 157 287 48 338 54 C386 60 395 160 447 166 C499 171 527 89 574 84 C622 78 654 116 699 126 C728 133 746 118 760 106 L760 240 L0 240 Z"
            />
            <path
              className="analytics-line primary"
              d="M0 207 C49 172 82 96 125 105 C168 113 190 181 233 169 C278 157 287 48 338 54 C386 60 395 160 447 166 C499 171 527 89 574 84 C622 78 654 116 699 126 C728 133 746 118 760 106"
            />
            <circle className="analytics-focus-ring" cx="574" cy="84" r="7" />
            <circle className="analytics-focus-dot" cx="574" cy="84" r="3" />
          </svg>
          <span className="analytics-chart-callout area-callout"><strong>26</strong><small>Jun 24</small></span>
        </div>
        <div className="analytics-axis">
          {['1', '5', '10', '15', '20', '25', '30'].map((day) => <span key={day}>{day}</span>)}
        </div>
        <footer className="analytics-card-footer">
          <div className="analytics-legend">
            <span><i className="primary" /> Submissions</span>
            <span><i className="secondary" /> Reviews completed</span>
          </div>
          <div className="analytics-summary"><strong>82%</strong><span>reviewed within 3 days</span></div>
        </footer>
      </article>

      <article className="analytics-card analytics-bar-card">
        <header className="analytics-card-heading">
          <div>
            <span className="eyebrow">Review workload</span>
            <h2>{activeWorkload[1]} pending</h2>
            <p>{activeWorkload[0]} 2026</p>
          </div>
          <span className="analytics-change positive">−8% this month</span>
        </header>

        <div className="workload-chart">
          <div className="workload-y-axis" aria-hidden="true">
            <span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
          </div>
          <div className="workload-bars">
            {workload.map(([month, value], index) => (
              <button
                className={index === activeMonth ? 'workload-bar active' : 'workload-bar'}
                style={{ '--bar-height': `${(value / 40) * 100}%` }}
                type="button"
                key={month}
                onClick={() => setActiveMonth(index)}
                aria-label={`${month}: ${value} pending reviews`}
              >
                <span>{index === activeMonth && <i>{value}</i>}</span>
                <small>{month}</small>
              </button>
            ))}
          </div>
        </div>
      </article>

    </section>
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

      {activeTab === 'Placement Monitoring' ? (
        <PlacementMonitoringPanel />
      ) : (
        <>
          <ReviewQueueSummary />
          <ReviewQueuePanel queue={filteredQueue} onReview={onReview} />
        </>
      )}
    </>
  )
}

function PlacementMonitoringPanel() {
  const [endingStudent, setEndingStudent] = useState(null)
  const [endingType, setEndingType] = useState('Cancelled')
  const startDates = ['June 16, 2026', 'June 18, 2026', 'June 20, 2026', 'June 23, 2026']

  return (
    <>
      <section className="placement-monitoring-panel">
        <div className="coordinator-panel-heading">
          <div>
            <span className="eyebrow">Official placements</span>
            <h2>Placement Monitoring</h2>
            <p>Track active assignments and formally record placements that end.</p>
          </div>
          <label className="compact-search">
            <Icon name="search" size={17} />
            <input type="search" placeholder="Find student or company" />
          </label>
        </div>

        <div className="placement-monitoring-list">
          {coordinatorStudents.map((student, index) => (
            <article className="placement-monitoring-row" key={student.name}>
              <div className="review-student">
                <div className="small-avatar" aria-hidden="true">{getInitials(student.name)}</div>
                <div>
                  <h3>{student.name}</h3>
                  <span>{student.section}</span>
                </div>
              </div>
              <div className="placement-company-cell">
                <small>Company</small>
                <strong>{student.company}</strong>
              </div>
              <span className="track-pill">{student.track}</span>
              <div className="placement-company-cell">
                <small>Start date</small>
                <strong>{startDates[index]}</strong>
              </div>
              <span className="status-pill status-accepted">In Progress</span>
              <button className="details-button" type="button" onClick={() => setEndingStudent(student)}>
                Manage
              </button>
            </article>
          ))}
        </div>
      </section>

      {endingStudent && (
        <div className="review-detail-backdrop" role="presentation" onClick={() => setEndingStudent(null)}>
          <form
            className="review-detail-panel placement-ending-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="placement-ending-title"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault()
              setEndingStudent(null)
            }}
          >
            <div className="coordinator-panel-heading">
              <div>
                <span className="eyebrow">Placement lifecycle</span>
                <h2 id="placement-ending-title">Record placement ending</h2>
                <p>{endingStudent.name} · {endingStudent.company}</p>
              </div>
              <button className="dtr-modal-close" type="button" aria-label="Close" onClick={() => setEndingStudent(null)}>×</button>
            </div>

            <div className="placement-ending-choice" role="radiogroup" aria-label="Ending type">
              {[
                ['Cancelled', 'Use before meaningful OJT work has started.'],
                ['Terminated', 'Use after the student has already started OJT.'],
              ].map(([type, description]) => (
                <button
                  className={endingType === type ? 'active' : ''}
                  type="button"
                  role="radio"
                  aria-checked={endingType === type}
                  onClick={() => setEndingType(type)}
                  key={type}
                >
                  <strong>{type}</strong>
                  <small>{description}</small>
                </button>
              ))}
            </div>

            <div className="placement-ending-fields">
              <label className="dtr-entry-field">
                <span>Ended date</span>
                <input type="date" defaultValue="2026-06-30" />
              </label>
              <label className="dtr-entry-field full-span">
                <span>Reason</span>
                <textarea rows="4" placeholder={`Explain why this placement was ${endingType.toLowerCase()}...`} />
              </label>
            </div>
            <p className="placement-ending-note">
              Existing DTR, journal, and review records remain preserved after this status change.
            </p>
            <div className="review-actions">
              <button className="secondary-button" type="button" onClick={() => setEndingStudent(null)}>Keep placement</button>
              <button className="primary-button" type="submit">Record {endingType}</button>
            </div>
          </form>
        </div>
      )}
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
    <section className="analytics-card queue-status-chart-panel" aria-label="Review queue status chart">
      <header className="analytics-card-heading">
        <div>
          <span className="eyebrow">Review queue analytics</span>
          <h2>Submission status</h2>
          <p>Current volume of submissions at each review state.</p>
        </div>
        <div className="analytics-summary"><strong>102</strong><span>total submissions</span></div>
      </header>
      <div className="queue-status-chart">
        {queueStats.map((stat) => (
          <button
            className={`queue-status-column ${stat.tone}`}
            type="button"
            key={stat.label}
            aria-label={`${stat.label}: ${stat.value}, ${stat.detail}`}
          >
            <div className="queue-status-value">
              <span style={{ '--status-height': `${(Number(stat.value) / 70) * 100}%` }}>
                <strong>{stat.value}</strong>
              </span>
            </div>
            <div>
              <strong>{stat.label}</strong>
              <small>{stat.detail}</small>
            </div>
            <span className="chart-hover-tooltip">
              <strong>{stat.value} {stat.label}</strong>
              <small>{stat.detail}</small>
            </span>
          </button>
        ))}
      </div>
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
  copy = 'Acceptance Confirmation reviews and final DTR packages have the highest workload. Company verification requests need coordinator remarks before students continue.',
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
  const [activePhase, setActivePhase] = useState(0)
  const selectedPhase = coordinatorChecklist[activePhase]

  return (
    <section className={compact ? 'analytics-card requirement-chart-panel compact-panel' : 'analytics-card requirement-chart-panel'}>
      <div className="analytics-card-heading">
        <div>
          <span className="eyebrow">Checklist monitoring</span>
          <h2>Requirement Phases</h2>
          <p>Completion, pending work, and revisions by OJT phase.</p>
        </div>
        <div className="phase-chart-highlight">
          <strong>{selectedPhase.completed}%</strong>
          <span>{selectedPhase.phase} complete</span>
        </div>
      </div>

      <div className="requirement-phase-chart">
        <div className="requirement-y-axis" aria-hidden="true">
          <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
        <div className="requirement-phase-groups">
          {coordinatorChecklist.map((phase, index) => (
            <button
              className={index === activePhase ? 'requirement-phase-group active' : 'requirement-phase-group'}
              type="button"
              key={phase.phase}
              onClick={() => setActivePhase(index)}
              onMouseEnter={() => setActivePhase(index)}
              onFocus={() => setActivePhase(index)}
              aria-label={`${phase.phase}: ${phase.completed}% completed, ${phase.pending} pending, ${phase.needsRevision} revisions`}
            >
              <span className="requirement-phase-bars">
                <i className="completed" style={{ '--phase-bar-height': `${phase.completed}%` }}><b>{phase.completed}</b></i>
                <i className="pending" style={{ '--phase-bar-height': `${phase.pending}%` }}><b>{phase.pending}</b></i>
                <i className="revision" style={{ '--phase-bar-height': `${phase.needsRevision}%` }}><b>{phase.needsRevision}</b></i>
              </span>
              <strong>{phase.phase}</strong>
              <span className="chart-hover-tooltip phase-tooltip">
                <strong>{phase.phase}</strong>
                <small>{phase.completed}% completed · {phase.pending} pending · {phase.needsRevision} revisions</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="analytics-legend requirement-chart-legend">
        <span><i className="primary" /> Completed</span>
        <span><i className="secondary" /> Pending</span>
        <span><i className="revision" /> Needs revision</span>
      </div>
    </section>
  )
}

function StudentMonitorPanel() {
  return (
    <section className="analytics-card student-progress-chart-panel">
      <div className="analytics-card-heading">
        <div>
          <span className="eyebrow">Student monitoring</span>
          <h2>Completion Progress</h2>
          <p>Current requirement completion across monitored students.</p>
        </div>
        <div className="trend-total"><strong>77%</strong><span>average progress</span></div>
      </div>

      <div className="student-progress-chart" aria-label="Student completion progress line chart">
        <svg viewBox="0 0 720 250" preserveAspectRatio="none" role="img" aria-label="Completion progress: Lance 80%, Andrea 64%, Miguel 72%, Jessa 91%">
          <defs>
            <linearGradient id="studentProgressArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6f2f95" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#6f2f95" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[35, 90, 145, 200, 245].map((y) => (
            <line className="analytics-grid-line" x1="0" x2="720" y1={y} y2={y} key={y} />
          ))}
          <path className="student-progress-area" d="M35 83 C105 83 145 132 225 132 C305 132 355 111 430 111 C510 111 555 59 685 59 L685 250 L35 250 Z" />
          <path className="student-progress-line" d="M35 83 C105 83 145 132 225 132 C305 132 355 111 430 111 C510 111 555 59 685 59" />
          {[
            [35, 83],
            [225, 132],
            [430, 111],
            [685, 59],
          ].map(([x, y]) => <circle className="student-progress-dot" cx={x} cy={y} r="5" key={`${x}-${y}`} />)}
        </svg>
        {[
          ['Lance Timothy Satorre', 80, 2, '4.9%', '33.2%'],
          ['Andrea Mae Lim', 64, 5, '31.25%', '52.8%'],
          ['Miguel Santos', 72, 3, '59.7%', '44.4%'],
          ['Jessa Marie Yu', 91, 1, '95.1%', '23.6%'],
        ].map(([name, progress, missing, left, top]) => (
          <button
            className="student-progress-hover-point"
            style={{ '--point-left': left, '--point-top': top }}
            type="button"
            key={name}
            aria-label={`${name}: ${progress}% complete, ${missing} missing`}
          >
            <span className="chart-hover-tooltip student-tooltip">
              <strong>{name}</strong>
              <small>{progress}% complete · {missing} missing</small>
            </span>
          </button>
        ))}
      </div>
      <div className="student-progress-axis">
        {coordinatorStudents.map((student) => (
          <span key={student.name}><strong>{student.name.split(' ')[0]}</strong><small>{student.track}</small></span>
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
  if (activeTab === 'Company Verification') {
    return coordinatorReviewQueue.filter((item) =>
      item.requirement.includes('Company Verification'),
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
