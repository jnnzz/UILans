import { useState } from 'react'
import {
  companyDtrRecords,
  companyEvaluations,
  companyFiles,
  companyPostings,
  companyProfile,
  companyStats,
  companyStudents,
} from '../../shared/data.js'
import { Icon } from '../../shared/Icon.jsx'
import { AccountSwitcher } from '../../shared/AccountSwitcher.jsx'

const companyNav = [
  ['dashboard', 'Dashboard', 'dashboard'],
  ['profile', 'Company Profile', 'building'],
  ['postings', 'Postings', 'briefcase'],
  ['students', 'Students', 'users'],
  ['dtr', 'DTR', 'clock'],
  ['files', 'Files', 'file'],
  ['evaluations', 'Evaluations', 'checkCircle'],
]

const companyTabs = {
  dashboard: ['Overview', 'Announcements', 'Quick Actions'],
  profile: ['Company Details', 'Contact', 'Workspace Settings'],
  postings: ['Active Posts', 'Closed Posts', 'Drafts'],
  students: ['Officially Placed', 'Needs Attention'],
  dtr: ['Records', 'QR Attendance', 'Manual Proof'],
  files: ['Company Files', 'Templates', 'Instructions'],
  evaluations: ['Pending', 'Drafts', 'Submitted'],
}

export function CompanyApp({ onSwitchRole }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeTabs, setActiveTabs] = useState({
    dashboard: 'Overview',
    profile: 'Company Details',
    postings: 'Active Posts',
    students: 'Officially Placed',
    dtr: 'Records',
    files: 'Company Files',
    evaluations: 'Pending',
  })

  const activeTab = activeTabs[activeView]
  const setActiveTab = (tab) => {
    setActiveTabs((tabs) => ({
      ...tabs,
      [activeView]: tab,
    }))
  }

  return (
    <div className="company-app">
      <header className="coordinator-header">
        <div className="top-row">
          <div className="brand">
            <span className="brand-dot" aria-hidden="true"></span>
            <span>OJThink</span>
          </div>

          <AccountSwitcher activeRole="company" onSwitchRole={onSwitchRole} />
        </div>

        <div className="nav-row">
          <nav className="student-nav" aria-label="Company navigation">
            {companyNav.map(([id, label, icon]) => (
              <button
                className={id === activeView ? 'nav-item active' : 'nav-item'}
                type="button"
                key={id}
                onClick={() => setActiveView(id)}
              >
                <Icon name={icon} size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button muted" type="button" aria-label="Company date">
              <Icon name="calendar" size={18} />
            </button>
            <button className="icon-button alert" type="button" aria-label="Notifications">
              <Icon name="bell" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="coordinator-main">
        <CompanyHero
          activeView={activeView}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <CompanyContent activeView={activeView} activeTab={activeTab} />
      </main>
    </div>
  )
}

function CompanyHero({ activeView, activeTab, onTabChange }) {
  const titles = {
    dashboard: ['Company Dashboard', 'Partner workspace overview for postings, files, students, attendance, and evaluations.'],
    profile: [
      'Company Profile',
      'Maintain company-controlled information used in the Opportunity Board and Company Workspace.',
    ],
    postings: ['Postings', 'Manage OJT opportunities for company discovery only. Applications still happen outside OJThink.'],
    students: [
      'Placed Students',
      'View Track A students only after coordinator approval of the Acceptance Confirmation Form.',
    ],
    dtr: ['DTR Support', 'Support QR attendance, manual TITO entries, and final DTR proof preparation.'],
    files: ['Files', 'Share company instructions, templates, and guidance for assigned interns.'],
    evaluations: ['Evaluations', 'Prepare company-side evaluation support for final completion checking.'],
  }

  return (
    <section className="coordinator-hero" aria-labelledby={`company-${activeView}-title`}>
      <div>
        <span className="eyebrow">{companyProfile.supervisor}</span>
        <h1 id={`company-${activeView}-title`}>{titles[activeView][0]}</h1>
        <p>{titles[activeView][1]}</p>
        <div className="tab-list coordinator-subnav" role="tablist" aria-label={`${activeView} tabs`}>
          {companyTabs[activeView].map((tab) => (
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
      </div>

      <div className="coordinator-actions">
        <button className="outline-tool" type="button">
          <Icon name="building" size={18} />
          {companyProfile.name}
        </button>
        <button className="outline-tool" type="button">
          <Icon name="filter" size={18} />
          This Term
        </button>
      </div>
    </section>
  )
}

function CompanyContent({ activeView, activeTab }) {
  if (activeView === 'profile') {
    return <CompanyProfileContent activeTab={activeTab} />
  }

  if (activeView === 'postings') {
    return <PostingsContent activeTab={activeTab} />
  }

  if (activeView === 'students') {
    return <CompanyStudentsContent activeTab={activeTab} />
  }

  if (activeView === 'dtr') {
    return <DtrContent activeTab={activeTab} />
  }

  if (activeView === 'files') {
    return <CompanyFilesContent activeTab={activeTab} />
  }

  if (activeView === 'evaluations') {
    return <EvaluationsContent activeTab={activeTab} />
  }

  return <CompanyDashboardContent activeTab={activeTab} />
}

function CompanyProfileContent({ activeTab }) {
  const fields = {
    'Company Details': [
      ['Company Name', companyProfile.name],
      ['Industry', 'Software Development'],
      ['Office Address', 'Cebu City'],
    ],
    Contact: [
      ['Supervisor', companyProfile.supervisor],
      ['Email', 'supervisor@fullscale.io'],
      ['Contact Number', '(+63) 998 231 1245'],
    ],
    'Workspace Settings': [
      ['Company Workspace', 'Active'],
      ['QR Attendance Support', 'Enabled'],
      ['Evaluation Support', 'Enabled'],
    ],
  }

  return (
    <CompanyPanel title={activeTab} eyebrow="Company-controlled information">
      {fields[activeTab].map(([label, value]) => (
        <ListRow icon="building" title={label} meta={value} key={label} />
      ))}
    </CompanyPanel>
  )
}

function CompanyDashboardContent({ activeTab }) {
  if (activeTab === 'Announcements') {
    return (
      <CompanyPanel title="Company Announcements" eyebrow="Shared reminders">
        {['Dress code reminder', 'QR attendance required this week', 'Submit weekly task notes'].map((item) => (
          <ListRow icon="megaphone" title={item} meta="Visible to placed students" key={item} />
        ))}
      </CompanyPanel>
    )
  }

  if (activeTab === 'Quick Actions') {
    return (
      <section className="company-action-grid">
        {['Create Posting', 'Upload File', 'Open QR Attendance', 'Prepare Evaluation'].map((action) => (
          <button className="role-card company-action-card" type="button" key={action}>
            <span className="role-icon">
              <Icon name="arrowUpRight" size={18} />
            </span>
            <span className="role-copy">
              <span>Action</span>
              <strong>{action}</strong>
              <small>Frontend-only command placeholder.</small>
            </span>
          </button>
        ))}
      </section>
    )
  }

  return (
    <>
      <section className="coordinator-stats" aria-label="Company overview">
        {companyStats.map(([label, value]) => (
          <article className="coordinator-stat-card" key={label}>
            <div className="coordinator-stat-icon">
              <Icon name="building" size={19} />
            </div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>current term</small>
          </article>
        ))}
      </section>
      <div className="coordinator-grid">
        <PostingsContent activeTab="Active Posts" compact />
        <CompanyPanel title="Placed Students" eyebrow="Current interns">
          {companyStudents.map((student) => (
            <ListRow
              icon="user"
              title={student.name}
              meta={`${student.role} - ${student.hours} hours`}
              status={student.status}
              key={student.name}
            />
          ))}
        </CompanyPanel>
      </div>
    </>
  )
}

function PostingsContent({ activeTab, compact = false }) {
  const filtered = companyPostings.filter((posting) => {
    if (activeTab === 'Closed Posts') return posting.status === 'Closed'
    if (activeTab === 'Drafts') return posting.status === 'Draft'
    return posting.status === 'Open'
  })

  return (
    <CompanyPanel title={compact ? 'Active Postings' : activeTab} eyebrow="Opportunity discovery">
      {filtered.length ? (
        filtered.map((posting) => (
          <ListRow
            icon="briefcase"
            title={posting.title}
            meta={`${posting.department} - ${posting.date}`}
            status={posting.status}
            key={posting.title}
          />
        ))
      ) : (
        <EmptyState label={`No ${activeTab.toLowerCase()} yet.`} />
      )}
    </CompanyPanel>
  )
}

function CompanyStudentsContent({ activeTab }) {
  const filtered = companyStudents.filter((student) => {
    if (activeTab === 'Needs Attention') {
      return student.status !== 'Officially Placed'
    }
    return student.status === 'Officially Placed'
  })

  return (
    <CompanyPanel title={activeTab} eyebrow="Student placement">
      {filtered.map((student) => (
        <ListRow
          icon="user"
          title={student.name}
          meta={`${student.role} - ${student.hours} hours`}
          status={student.status}
          key={student.name}
        />
      ))}
    </CompanyPanel>
  )
}

function DtrContent({ activeTab }) {
  const filteredRecords = companyDtrRecords.filter((record) => {
    if (activeTab === 'QR Attendance') return record.method.includes('QR')
    if (activeTab === 'Manual Proof') return !record.method.includes('QR')
    return true
  })

  return (
    <CompanyPanel title={activeTab} eyebrow="Attendance support">
      {filteredRecords.map((record) => (
        <ListRow
          icon="clock"
          title={record.student}
          meta={`${record.method} - ${record.date}`}
          status={record.status}
          key={`${record.student}-${record.method}`}
        />
      ))}
    </CompanyPanel>
  )
}

function CompanyFilesContent({ activeTab }) {
  return (
    <CompanyPanel title={activeTab} eyebrow="Shared files">
      <div className="workspace-file-grid">
        {companyFiles.map((file) => (
          <button type="button" key={file}>
            <Icon name="file" size={16} />
            <span>{file}</span>
            <Icon name="arrowUpRight" size={15} />
          </button>
        ))}
      </div>
    </CompanyPanel>
  )
}

function EvaluationsContent({ activeTab }) {
  const filtered = companyEvaluations.filter((item) => {
    if (activeTab === 'Drafts') return item.status === 'Draft'
    if (activeTab === 'Submitted') return item.status === 'Submitted'
    return item.status === 'Pending' || item.status === 'Locked'
  })

  return (
    <CompanyPanel title={activeTab} eyebrow="Evaluation support">
      {filtered.length ? (
        filtered.map((evaluation) => (
          <ListRow
            icon="checkCircle"
            title={evaluation.student}
            meta={evaluation.requirement}
            status={evaluation.status}
            key={`${evaluation.student}-${evaluation.requirement}`}
          />
        ))
      ) : (
        <EmptyState label={`No ${activeTab.toLowerCase()} evaluations yet.`} />
      )}
    </CompanyPanel>
  )
}

function CompanyPanel({ title, eyebrow, children }) {
  return (
    <section className="workspace-panel company-panel">
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="workspace-list">{children}</div>
    </section>
  )
}

function ListRow({ icon, title, meta, status }) {
  return (
    <div className="workspace-list-row">
      <Icon name={icon} size={16} />
      <span>{title}</span>
      {status ? <small>{status}</small> : <small>{meta}</small>}
      {status && <em>{meta}</em>}
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div className="workspace-list-row">
      <Icon name="file" size={16} />
      <span>{label}</span>
    </div>
  )
}
