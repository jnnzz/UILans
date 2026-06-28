import { useState } from 'react'
import { AccountSwitcher } from '../../shared/AccountSwitcher.jsx'
import { Icon } from '../../shared/Icon.jsx'

const adminViews = [
  ['dashboard', 'Dashboard', 'dashboard'],
  ['accounts', 'Accounts', 'users'],
  ['workspaces', 'Workspaces', 'workspace'],
  ['templates', 'Templates', 'file'],
  ['setup', 'OJT Setup', 'clock'],
  ['audit', 'Audit Logs', 'journal'],
]

const viewMeta = {
  dashboard: ['Admin Dashboard', 'System health, access, setup, workspace records, and auditability.', ['Overview', 'System Status']],
  accounts: ['User Accounts', 'Manage account access and assign one system role per preview account.', ['All Accounts', 'Students', 'Coordinators', 'Companies']],
  workspaces: ['Workspace Management', 'Maintain UC-CCS, partner company, and shared Track B workspaces.', ['All Workspaces', 'UC-CCS', 'Company', 'Track B']],
  templates: ['Requirement Templates', 'Configure the checklist without creating a separate module for every document.', ['Placement', 'Pre-OJT', 'Midterm', 'Finals & Completion']],
  setup: ['OJT Setup', 'Set the active practicum phase, required hours, dates, and continuation policy.', ['Phase Settings', 'Required Hours', 'Deadlines', 'Continuation']],
  audit: ['Audit Logs', 'Review important access, setup, verification, placement, and submission actions.', ['All Events', 'Accounts', 'Reviews', 'Access']],
}

const accountRows = [
  ['ED', 'Elena Dela Cruz', 'elena.delacruz@uc.edu.ph', 'Student', 'Active', '2 min ago'],
  ['MS', 'Dr. Maria Santos', 'maria.santos@uc.edu.ph', 'Coordinator', 'Active', '12 min ago'],
  ['FS', 'Ana Reyes', 'supervisor@fullscale.io', 'Company', 'Active', '1 hour ago'],
  ['JL', 'Joshua Lim', 'joshua.lim@uc.edu.ph', 'Student', 'Active', 'Yesterday'],
  ['NC', 'Nicole Cruz', 'nicole.cruz@uc.edu.ph', 'Student', 'Inactive', 'Jun 12'],
]

const workspaceRows = [
  ['UC', 'UC-CCS OJT Hub', 'Department', '214 members', 'Active', 'Jun 26'],
  ['FS', 'Full Scale PH', 'Company', '13 members', 'Active', 'Jun 24'],
  ['CD', 'Cebu Digital Works', 'Company', '9 members', 'Active', 'Jun 23'],
  ['TB', 'Track B Shared Workspace', 'Track B', '42 members', 'Active', 'Jun 25'],
]

const templateRows = [
  ['Acceptance Confirmation / Confirmation Slip', 'Placement', 'Both tracks', 'Required', 'Active'],
  ['Application Letter', 'Pre-OJT', 'Both tracks', 'Required', 'Active'],
  ['Resume / CV', 'Pre-OJT', 'Both tracks', 'Required', 'Active'],
  ['Memorandum of Agreement', 'Midterm', 'Both tracks', 'Required', 'Active'],
  ['Final DTR Package', 'Finals', 'Both tracks', 'Required', 'Active'],
  ['Final Journal Package', 'Finals', 'Both tracks', 'Required', 'Active'],
  ['Certificate of Completion', 'Completion', 'Both tracks', 'Required', 'Active'],
]

const auditRows = [
  ['Accepted submission', 'Dr. Maria Santos', 'Acceptance Confirmation · Elena Dela Cruz', 'Review', '10:24 AM'],
  ['Activated account', 'System Administrator', 'Company supervisor · Full Scale PH', 'Account', '9:42 AM'],
  ['Verified company', 'Dr. Maria Santos', 'Acme Technologies Cebu', 'Review', '9:18 AM'],
  ['Updated required hours', 'System Administrator', '540 hours · BSIT Practicum 2026', 'Setup', 'Yesterday'],
  ['Resubmitted document', 'Joshua Lim', 'Medical Certificate · Version 2', 'Submission', 'Yesterday'],
  ['Signed in', 'Ana Reyes', 'Company supervisor account', 'Access', 'Jun 26'],
]

export function AdminApp({ onSwitchRole }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('Overview')
  const [search, setSearch] = useState('')
  const [showPanel, setShowPanel] = useState(false)
  const meta = viewMeta[activeView]

  const navigate = (view) => {
    setActiveView(view)
    setActiveTab(viewMeta[view][2][0])
    setSearch('')
  }

  return (
    <div className="coordinator-app admin-app">
      <header className="coordinator-header">
        <div className="top-row">
          <button className="brand-button" type="button" onClick={() => navigate('dashboard')}>
            <span className="brand-dot" aria-hidden="true" />
            <span>OJThink</span>
          </button>
          <AccountSwitcher activeRole="admin" onSwitchRole={onSwitchRole} />
        </div>
        <div className="nav-row">
          <nav className="student-nav" aria-label="Administrator navigation">
            {adminViews.map(([id, label, icon]) => (
              <button className={activeView === id ? 'nav-item active' : 'nav-item'} type="button" key={id} onClick={() => navigate(id)}>
                <Icon name={icon} size={16} />{label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-button muted" type="button" aria-label="System alerts"><Icon name="bell" size={18} /></button>
          </div>
        </div>
      </header>

      <main className="coordinator-main">
        <section className="coordinator-hero">
          <div>
            <span className="eyebrow">System administration</span>
            <h1>{meta[0]}</h1>
            <p>{meta[1]}</p>
            <div className="tab-list coordinator-subnav">
              {meta[2].map((tab) => <button className={activeTab === tab ? 'tab active' : 'tab'} type="button" key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
          </div>
          {activeView !== 'dashboard' && activeView !== 'audit' && (
            <div className="coordinator-actions">
              <button className="primary-button" type="button" onClick={() => setShowPanel(true)}>
                <Icon name="upload" size={17} /> Add {activeView === 'setup' ? 'phase' : activeView === 'audit' ? 'event' : activeView.slice(0, -1)}
              </button>
            </div>
          )}
        </section>

        <AdminContent activeView={activeView} activeTab={activeTab} search={search} onSearch={setSearch} />

        <div className="workspace-alert">
          <Icon name="checkCircle" size={16} />
          <p>Administrators manage configuration and access. Academic review decisions remain with the OJT Coordinator.</p>
        </div>
      </main>

      {showPanel && <AdminPanel type={activeView} onClose={() => setShowPanel(false)} />}
    </div>
  )
}

function AdminContent({ activeView, activeTab, search, onSearch }) {
  if (activeView === 'dashboard') return <AdminDashboard activeTab={activeTab} />
  if (activeView === 'setup') return <SetupPage activeTab={activeTab} />

  let rows = accountRows
  let headers = ['Account', 'Email', 'Role', 'Status', 'Last active']
  if (activeView === 'workspaces') {
    rows = workspaceRows
    headers = ['Workspace', 'Type', 'Members', 'Status', 'Updated']
  } else if (activeView === 'templates') {
    rows = templateRows.map((row) => ['', ...row])
    headers = ['Template', 'Stage', 'Applies to', 'Requirement', 'Status']
  } else if (activeView === 'audit') {
    rows = auditRows.map((row) => ['', ...row])
    headers = ['Action', 'Actor', 'Target', 'Category', 'Time']
  }

  const filtered = rows.filter((row) => {
    const matchesSearch = row.join(' ').toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    if (activeTab.startsWith('All')) return true
    if (activeView === 'accounts') {
      const roleFilter = activeTab === 'Companies' ? 'Company' : activeTab.replace(/s$/, '')
      return row[3].includes(roleFilter)
    }
    if (activeView === 'workspaces') return row[2].includes(activeTab)
    if (activeView === 'templates') return row[2].includes(activeTab.split(' &')[0])
    if (activeView === 'audit') return row[4].includes(activeTab.replace('Reviews', 'Review').replace('Accounts', 'Account'))
    return true
  })

  return (
    <section className="workspace-panel admin-table-panel">
      <div className="admin-table-tools">
        <label className="compact-search"><Icon name="search" size={16} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={`Search ${activeView}`} /></label>
        <button className="outline-tool" type="button"><Icon name="filter" size={16} /> Filters</button>
      </div>
      <div className="admin-data-table">
        <div className="admin-data-head">{headers.map((header) => <span key={header}>{header}</span>)}<span /></div>
        {filtered.map((row, rowIndex) => (
          <div className="admin-data-row" key={`${row[1]}-${rowIndex}`}>
            <div className="admin-primary-cell">
              {row[0] ? <span className="admin-avatar">{row[0]}</span> : <span className="file-tile"><Icon name={activeView === 'audit' ? 'journal' : 'file'} size={16} /></span>}
              <strong>{row[1]}</strong>
            </div>
            {row.slice(2).map((cell, index) => (
              <span className={cell === 'Active' ? 'status-pill status-accepted' : cell === 'Inactive' ? 'status-pill status-revision' : ''} key={`${cell}-${index}`}>{cell}</span>
            ))}
            <button className="details-button" type="button">{activeView === 'audit' ? 'Details' : 'Manage'}</button>
          </div>
        ))}
      </div>
    </section>
  )
}

function AdminDashboard({ activeTab }) {
  if (activeTab === 'System Status') {
    return (
      <section className="admin-status-grid">
        {[
          ['Application', 'Operational', 'All UI modules available'],
          ['Account access', 'Operational', '246 active accounts'],
          ['File storage', 'Operational', '41% of allocation used'],
          ['Audit trail', 'Operational', 'Latest event 2 min ago'],
        ].map(([name, status, detail]) => (
          <article className="workspace-panel admin-status-card" key={name}>
            <span className="status-dot" /><div><strong>{name}</strong><small>{detail}</small></div><span>{status}</span>
          </article>
        ))}
      </section>
    )
  }

  return (
    <>
      <section className="coordinator-stats">
        {[
          ['Active Accounts', '246', '+12 this term', 'users'],
          ['Company Workspaces', '18', 'All operational', 'workspace'],
          ['Requirement Templates', '22', '19 required · 3 optional', 'file'],
          ['Audit Events Today', '37', 'No critical alerts', 'journal'],
        ].map(([label, value, detail, icon]) => (
          <article className="coordinator-stat-card" key={label}><div className="coordinator-stat-icon"><Icon name={icon} size={19} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>
        ))}
      </section>
      <div className="admin-dashboard-grid">
        <section className="workspace-panel admin-overview-card">
          <div className="coordinator-panel-heading compact"><div><span className="eyebrow">Account distribution</span><h2>Users by role</h2></div></div>
          {[
            ['Students', 214, '87%'], ['Company supervisors', 18, '7%'], ['Coordinators', 6, '3%'], ['Administrators', 3, '1%'],
          ].map(([label, value, width]) => (
            <div className="role-meter" key={label}><span>{label}</span><strong>{value}</strong><i><b style={{ width }} /></i></div>
          ))}
        </section>
        <section className="workspace-panel admin-overview-card">
          <div className="coordinator-panel-heading compact"><div><span className="eyebrow">Recent system activity</span><h2>Latest events</h2></div></div>
          {auditRows.slice(0, 4).map((row) => (
            <div className="mini-audit-row" key={row[0]}><span className="file-tile"><Icon name="journal" size={15} /></span><div><strong>{row[0]}</strong><small>{row[1]} · {row[4]}</small></div></div>
          ))}
        </section>
      </div>
    </>
  )
}

function SetupPage({ activeTab }) {
  const fields = {
    'Phase Settings': [['Active practicum phase', 'BSIT Practicum · 2026'], ['Phase status', 'Active'], ['Academic term', 'Summer Term']],
    'Required Hours': [['Default required hours', '540 hours'], ['Minimum daily hours', '4 hours'], ['Maximum daily hours', '12 hours']],
    Deadlines: [['Pre-OJT requirements', 'July 15, 2026'], ['Final packages', 'August 30, 2026'], ['Completion documents', 'September 5, 2026']],
    Continuation: [['Continuation option', 'Enabled'], ['Maximum extension', '30 days'], ['Requires coordinator approval', 'Yes']],
  }
  return (
    <div className="setup-layout">
      <section className="workspace-panel setup-form">
        <div className="coordinator-panel-heading compact"><div><span className="eyebrow">{activeTab}</span><h2>Current configuration</h2></div><span className="status-pill status-accepted">Active</span></div>
        {fields[activeTab].map(([label, value]) => (
          <label className="task-field" key={label}><span>{label}</span><input value={value} readOnly /></label>
        ))}
        <div className="form-actions"><button className="secondary-button" type="button">Discard</button><button className="primary-button" type="button">Save changes</button></div>
      </section>
      <aside className="workspace-panel setup-note"><Icon name="checkCircle" size={20} /><div><strong>Configuration scope</strong><p>Changes affect future placements and checklist deadlines. Existing review decisions are not changed.</p></div></aside>
    </div>
  )
}

function AdminPanel({ type, onClose }) {
  return (
    <div className="review-detail-backdrop" role="presentation">
      <section className="review-detail-panel admin-drawer" role="dialog" aria-modal="true" aria-labelledby="admin-panel-title">
        <div className="review-detail-head">
          <div><span className="eyebrow">New system record</span><h2 id="admin-panel-title">Add {type === 'setup' ? 'OJT phase' : type === 'audit' ? 'audit event' : type.slice(0, -1)}</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close panel">×</button>
        </div>
        <div className="admin-drawer-fields">
          <label className="task-field"><span>Name or title</span><input placeholder="Enter a clear name" /></label>
          <label className="task-field"><span>Description</span><textarea rows="5" placeholder="Optional notes or context" /></label>
          <label className="task-field"><span>Status</span><select defaultValue="Active"><option>Active</option><option>Inactive</option></select></label>
        </div>
        <div className="form-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="button" onClick={onClose}>Save record</button></div>
      </section>
    </div>
  )
}
