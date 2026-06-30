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
  const [postings, setPostings] = useState(companyPostings)
  const [editingPosting, setEditingPosting] = useState(null)
  const filtered = postings.filter((posting) => {
    if (activeTab === 'Closed Posts') return posting.status === 'Closed'
    if (activeTab === 'Drafts') return posting.status === 'Draft'
    return posting.status === 'Open'
  })

  const openNewPosting = () => {
    setEditingPosting({
      title: '',
      department: '',
      status: 'Draft',
      date: 'June 30, 2026',
      employmentType: 'Full Time',
      schedule: 'Flexible Hours',
      workSetup: 'On Site',
      email: 'careers@fullscale.io',
      phone: '(+63) 998 231 1245',
      location: 'Cebu IT Park, Cebu City',
      skills: [],
      isNew: true,
    })
  }

  const savePosting = (updatedPosting) => {
    if (updatedPosting.isNew) {
      const { isNew: _isNew, ...newPosting } = updatedPosting
      setPostings((current) => [...current, newPosting])
    } else {
      setPostings((current) => current.map((posting) => (
        posting.title === editingPosting.title ? updatedPosting : posting
      )))
    }
    setEditingPosting(null)
  }

  return (
    <>
      <section className="workspace-panel company-panel company-postings-panel">
        <div className="coordinator-panel-heading">
          <div>
            <span className="eyebrow">Opportunity discovery</span>
            <h2>{compact ? 'Active Postings' : activeTab}</h2>
            {!compact && <p>Update what students see on the Opportunity Board.</p>}
          </div>
          {!compact && (
            <button className="primary-button" type="button" onClick={openNewPosting}>
              <Icon name="briefcase" size={16} /> Create Posting
            </button>
          )}
        </div>

        {filtered.length ? (
          <div className={compact ? 'company-posting-grid compact' : 'company-posting-grid'}>
            {filtered.map((posting) => (
              <article className="company-posting-card" key={posting.title}>
                <header className="company-posting-card-head">
                  <span className="posting-company-mark">{companyProfile.initials}</span>
                  <div>
                    <h3>{posting.title}</h3>
                    <p>{posting.department} · {companyProfile.name}</p>
                  </div>
                  <span className={`posting-state ${posting.status.toLowerCase()}`}>{posting.status}</span>
                </header>

                <div className="posting-chip-row">
                  {[posting.employmentType, posting.schedule, posting.workSetup].map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>

                <div className="posting-contact-box">
                  <span><Icon name="mail" size={14} /> {posting.email}</span>
                  <span><Icon name="phone" size={14} /> {posting.phone}</span>
                  <div className="posting-skills">
                    {posting.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </div>

                <footer className="company-posting-card-footer">
                  <span><Icon name="mapPin" size={14} /> {posting.location}</span>
                  <time>{posting.date}</time>
                  <button className="secondary-button slim" type="button">Preview</button>
                  <button className="primary-button slim" type="button" onClick={() => setEditingPosting(posting)}>
                    Edit
                  </button>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="posting-empty-state">
            <Icon name="briefcase" size={24} />
            <strong>No {activeTab.toLowerCase()} yet.</strong>
            <button className="details-button" type="button" onClick={openNewPosting}>Create a posting</button>
          </div>
        )}
      </section>

      {editingPosting && (
        <PostingEditor
          posting={editingPosting}
          onClose={() => setEditingPosting(null)}
          onSave={savePosting}
        />
      )}
    </>
  )
}

function PostingEditor({ posting, onClose, onSave }) {
  const [form, setForm] = useState(posting)
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  return (
    <div className="review-detail-backdrop" role="presentation" onClick={onClose}>
      <form
        className="review-detail-panel posting-editor"
        role="dialog"
        aria-modal="true"
        aria-labelledby="posting-editor-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault()
          onSave(form)
        }}
      >
        <div className="coordinator-panel-heading">
          <div>
            <span className="eyebrow">Company-managed opportunity</span>
            <h2 id="posting-editor-title">{posting.isNew ? 'Create Posting' : 'Edit Posting'}</h2>
            <p>Changes appear on the student Opportunity Board after publishing.</p>
          </div>
          <button className="dtr-modal-close" type="button" aria-label="Close editor" onClick={onClose}>×</button>
        </div>

        <div className="posting-editor-grid">
          <label className="dtr-entry-field full-span">
            <span>Position title</span>
            <input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="e.g. Junior UI Designer" />
          </label>
          <label className="dtr-entry-field">
            <span>Department</span>
            <input value={form.department} onChange={(event) => updateField('department', event.target.value)} placeholder="e.g. Product Design" />
          </label>
          <label className="dtr-entry-field">
            <span>Posting status</span>
            <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
              <option>Draft</option>
              <option>Open</option>
              <option>Closed</option>
            </select>
          </label>
          <label className="dtr-entry-field">
            <span>Employment type</span>
            <input value={form.employmentType} onChange={(event) => updateField('employmentType', event.target.value)} />
          </label>
          <label className="dtr-entry-field">
            <span>Work setup</span>
            <select value={form.workSetup} onChange={(event) => updateField('workSetup', event.target.value)}>
              <option>On Site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </label>
          <label className="dtr-entry-field">
            <span>Schedule</span>
            <input value={form.schedule} onChange={(event) => updateField('schedule', event.target.value)} />
          </label>
          <label className="dtr-entry-field">
            <span>Location</span>
            <input value={form.location} onChange={(event) => updateField('location', event.target.value)} />
          </label>
          <label className="dtr-entry-field">
            <span>Contact email</span>
            <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
          </label>
          <label className="dtr-entry-field">
            <span>Contact number</span>
            <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
          </label>
          <label className="dtr-entry-field full-span">
            <span>Skills</span>
            <input
              value={form.skills.join(', ')}
              onChange={(event) => updateField('skills', event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean))}
              placeholder="Figma, UI Design, Prototyping"
            />
          </label>
          <label className="dtr-entry-field full-span">
            <span>Description and contact instructions</span>
            <textarea rows="5" placeholder="Describe the opportunity and explain how students should contact your company." />
          </label>
        </div>

        <div className="posting-editor-actions">
          <small>Applications remain outside OJThink. This posting is for discovery only.</small>
          <div>
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit">{form.status === 'Draft' ? 'Save Draft' : 'Save Changes'}</button>
          </div>
        </div>
      </form>
    </div>
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
  if (activeTab === 'QR Attendance') {
    return <QrAttendancePanel />
  }

  const filteredRecords = companyDtrRecords.filter((record) => {
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

function QrAttendancePanel() {
  const [session, setSession] = useState('Whole day')
  const [qrRevision, setQrRevision] = useState(1)
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <>
      <section className="company-qr-layout">
        <article className="workspace-panel company-qr-control">
          <div className="coordinator-panel-heading">
            <div>
              <span className="eyebrow">Basic attendance QR</span>
              <h2>Display Attendance QR</h2>
              <p>Select the attendance session before students scan.</p>
            </div>
            <span className="status-pill status-accepted">Available</span>
          </div>

          <div className="company-qr-fields">
            <label className="dtr-entry-field">
              <span>Attendance date</span>
              <input type="date" defaultValue="2026-06-30" />
            </label>
            <label className="dtr-entry-field">
              <span>Session</span>
              <select value={session} onChange={(event) => setSession(event.target.value)}>
                <option>Whole day</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Overtime</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <div className="company-qr-preview">
            <div className="company-qr-code-shell">
              <BasicQrCode revision={qrRevision} />
            </div>
            <div className="company-qr-preview-copy">
              <span>{companyProfile.name}</span>
              <h3>{session} attendance</h3>
              <p>June 30, 2026 · QR version {qrRevision}</p>
              <small>Students scan this from DTR → Add Time Entry → QR Scan.</small>
            </div>
          </div>

          <div className="company-qr-actions">
            <button className="secondary-button" type="button" onClick={() => setQrRevision((revision) => revision + 1)}>
              <Icon name="qrCode" size={16} /> Refresh QR
            </button>
            <button className="primary-button" type="button" onClick={() => setFullScreen(true)}>
              <Icon name="arrowUpRight" size={16} /> Display Full Screen
            </button>
          </div>

          <div className="company-qr-note">
            <Icon name="checkCircle" size={18} />
            <p>
              <strong>OJThink determines Time In or Time Out.</strong>
              The system checks the student&apos;s existing record for the selected date and session.
            </p>
          </div>
        </article>

        <aside className="workspace-panel company-qr-activity">
          <div className="coordinator-panel-heading compact">
            <div>
              <span className="eyebrow">Today&apos;s activity</span>
              <h2>Recent Scans</h2>
            </div>
            <strong>4 scans</strong>
          </div>
          <div className="company-qr-scan-list">
            {[
              ['Lance Timothy Satorre', 'Time In', '8:02 AM'],
              ['Andrea Mae Lim', 'Time In', '8:09 AM'],
              ['Miguel Santos', 'Time In', '8:17 AM'],
              ['Lance Timothy Satorre', 'Time Out', '5:04 PM'],
            ].map(([student, event, time]) => (
              <article key={`${student}-${event}`}>
                <span className="small-avatar">{getCompanyInitials(student)}</span>
                <div><strong>{student}</strong><small>{event} · {session}</small></div>
                <time>{time}</time>
              </article>
            ))}
          </div>
          <p className="company-qr-scope-note">
            QR is one attendance option. Students may still use manual entries, uploaded proof, or company attendance records.
          </p>
        </aside>
      </section>

      {fullScreen && (
        <div className="company-qr-display-backdrop" role="presentation" onClick={() => setFullScreen(false)}>
          <section
            className="company-qr-display"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-qr-display-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="dtr-modal-close" type="button" aria-label="Close QR display" onClick={() => setFullScreen(false)}>×</button>
            <span className="eyebrow">{companyProfile.name}</span>
            <h2 id="company-qr-display-title">Scan for {session} Attendance</h2>
            <p>June 30, 2026</p>
            <div className="company-qr-code-shell large"><BasicQrCode revision={qrRevision} /></div>
            <small>Open OJThink DTR and select QR Scan.</small>
          </section>
        </div>
      )}
    </>
  )
}

function BasicQrCode({ revision }) {
  const size = 25
  const isFinder = (x, y, startX, startY) => {
    const relativeX = x - startX
    const relativeY = y - startY
    if (relativeX < 0 || relativeY < 0 || relativeX > 6 || relativeY > 6) return false
    const outer = relativeX === 0 || relativeX === 6 || relativeY === 0 || relativeY === 6
    const center = relativeX >= 2 && relativeX <= 4 && relativeY >= 2 && relativeY <= 4
    return outer || center
  }
  const isDark = (x, y) => {
    if (isFinder(x, y, 0, 0) || isFinder(x, y, 18, 0) || isFinder(x, y, 0, 18)) return true
    if (x === 7 || y === 7 || (x >= 17 && y <= 7) || (y >= 17 && x <= 7)) return false
    if (x === 8 || y === 8) return (x + y + revision) % 2 === 0
    return ((x * 11 + y * 7 + x * y + revision * 13) % 9) < 4
  }

  return (
    <svg className="basic-qr-code" viewBox={`-2 -2 ${size + 4} ${size + 4}`} role="img" aria-label="Company attendance QR code">
      <rect x="-2" y="-2" width={size + 4} height={size + 4} fill="#fff" />
      {Array.from({ length: size * size }, (_, index) => {
        const x = index % size
        const y = Math.floor(index / size)
        return isDark(x, y) ? <rect x={x} y={y} width="1" height="1" fill="#31084f" key={index} /> : null
      })}
    </svg>
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

function getCompanyInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}
