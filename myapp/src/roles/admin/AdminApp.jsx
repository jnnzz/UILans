import { useState } from 'react'
import { Icon } from '../../shared/Icon.jsx'

const adminViews = [
  ['dashboard', 'Dashboard', 'dashboard'],
  ['accounts', 'Accounts', 'users'],
  ['workspaces', 'Workspaces', 'workspace'],
  ['templates', 'Templates', 'file'],
  ['setup', 'OJT Setup', 'clock'],
  ['audit', 'Audit Logs', 'journal'],
]

const adminContent = {
  dashboard: {
    title: 'Admin Dashboard',
    description: 'System setup, account access, workspace records, templates, and auditability.',
    tabs: ['Overview', 'System Status'],
    items: [
      ['Active Accounts', '246'],
      ['Company Workspaces', '18'],
      ['Requirement Templates', '22'],
      ['Audit Events Today', '37'],
    ],
  },
  accounts: {
    title: 'User Accounts',
    description: 'Create, activate, deactivate, and assign system roles.',
    tabs: ['All Accounts', 'Students', 'Coordinators', 'Companies'],
    items: [
      ['Student accounts', '214'],
      ['Coordinator accounts', '6'],
      ['Company supervisor accounts', '18'],
      ['Administrator accounts', '3'],
    ],
  },
  workspaces: {
    title: 'Workspace Management',
    description: 'Maintain UC-CCS, company, and shared Track B workspaces.',
    tabs: ['UC-CCS', 'Company Workspaces', 'Track B'],
    items: [
      ['UC-CCS Workspace', 'Active'],
      ['Company Workspaces', '18 Active'],
      ['Shared Track B Workspace', 'Active'],
    ],
  },
  templates: {
    title: 'Requirement Templates',
    description: 'Configure Pre-OJT, Midterm, and Finals submission templates.',
    tabs: ['Pre-OJT', 'Midterm', 'Finals'],
    items: [
      ['Pre-OJT templates', '6'],
      ['Midterm templates', '8'],
      ['Finals templates', '8'],
    ],
  },
  setup: {
    title: 'OJT Setup',
    description: 'Configure phase labels, required hours, continuation options, and deadlines.',
    tabs: ['Phase Settings', 'Required Hours', 'Continuation'],
    items: [
      ['Default required hours', '540'],
      ['Active practicum phase', '2026'],
      ['Continuation option', 'Enabled'],
    ],
  },
  audit: {
    title: 'Audit Logs',
    description: 'Monitor approvals, rejections, role changes, and account changes.',
    tabs: ['All Events', 'Accounts', 'Reviews', 'Access'],
    items: [
      ['Coordinator accepted Acceptance Confirmation', '10:24 AM'],
      ['Admin activated company account', '9:42 AM'],
      ['Student resubmitted proposed company', '8:55 AM'],
    ],
  },
}

export function AdminApp({ onExit }) {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('Overview')
  const content = adminContent[activeView]

  const navigate = (view) => {
    setActiveView(view)
    setActiveTab(adminContent[view].tabs[0])
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
            <div className="avatar coordinator-avatar">AD</div>
            <div className="profile-copy">
              <strong>System Administrator</strong>
              <span>Admin</span>
            </div>
            <button className="icon-button plain" type="button" onClick={onExit}>
              <Icon name="logOut" size={20} />
            </button>
          </div>
        </div>
        <div className="nav-row">
          <nav className="student-nav" aria-label="Administrator navigation">
            {adminViews.map(([id, label, icon]) => (
              <button
                className={activeView === id ? 'nav-item active' : 'nav-item'}
                type="button"
                key={id}
                onClick={() => navigate(id)}
              >
                <Icon name={icon} size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="coordinator-main">
        <section className="coordinator-hero">
          <div>
            <span className="eyebrow">System administration</span>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <div className="tab-list coordinator-subnav">
              {content.tabs.map((tab) => (
                <button
                  className={activeTab === tab ? 'tab active' : 'tab'}
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="workspace-panel">
          <div className="coordinator-panel-heading compact">
            <div>
              <span className="eyebrow">{activeTab}</span>
              <h2>{content.title}</h2>
            </div>
          </div>
          <div className="workspace-list">
            {content.items.map(([label, value]) => (
              <div className="workspace-list-row" key={label}>
                <Icon name="file" size={16} />
                <span>{label}</span>
                <small>{value}</small>
              </div>
            ))}
          </div>
        </section>

        <div className="workspace-alert">
          <Icon name="checkCircle" size={16} />
          <p>
            Admin manages setup and access only. Academic review decisions remain
            with the OJT Coordinator.
          </p>
        </div>
      </main>
    </div>
  )
}
