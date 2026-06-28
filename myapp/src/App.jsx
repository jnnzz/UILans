import { useEffect, useState } from 'react'
import { AdminApp } from './roles/admin/AdminApp.jsx'
import { CompanyApp } from './roles/company/CompanyApp.jsx'
import { CoordinatorApp } from './roles/coordinator/CoordinatorApp.jsx'
import { StudentApp } from './roles/student/StudentApp.jsx'
import { Icon } from './shared/Icon.jsx'

const roleCards = [
  {
    id: 'student',
    title: 'Student Side',
    eyebrow: 'OJT learner workspace',
    icon: 'user',
    detail: 'Company selection, requirements, DTR, journal, workspaces, and progress.',
  },
  {
    id: 'coordinator',
    title: 'Coordinator Side',
    eyebrow: 'Academic review workspace',
    icon: 'users',
    detail: 'Proposal, placement, requirement, final-package, and completion review.',
  },
  {
    id: 'company',
    title: 'Company Side',
    eyebrow: 'Partner workspace',
    icon: 'building',
    detail: 'Postings, company files, placed students, and DTR support.',
  },
  {
    id: 'admin',
    title: 'Administrator Side',
    eyebrow: 'System setup workspace',
    icon: 'dashboard',
    detail: 'Accounts, roles, workspaces, templates, OJT setup, and audit logs.',
  },
]

function getInitialRoute() {
  const hash = window.location.hash.replace('#', '')
  return hash || 'landing'
}

function App() {
  const [route, setRoute] = useState(getInitialRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getInitialRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute
    setRoute(nextRoute)
  }

  if (route === 'student') {
    return <StudentApp onSwitchRole={navigate} />
  }

  if (route === 'coordinator') {
    return <CoordinatorApp onSwitchRole={navigate} />
  }

  if (route === 'company') {
    return <CompanyApp onSwitchRole={navigate} />
  }

  if (route === 'admin') {
    return <AdminApp onSwitchRole={navigate} />
  }

  if (route === 'login') {
    return (
      <RoleLogin
        onBack={() => navigate('landing')}
        onSelectRole={(role) => navigate(role)}
      />
    )
  }

  return (
    <LandingPage
      onGoLogin={() => navigate('login')}
      onStudentPreview={() => navigate('student')}
    />
  )
}

function BrandMark({ compact = false }) {
  return (
    <div className={compact ? 'brand brand-compact' : 'brand'}>
      <span className="brand-dot" aria-hidden="true"></span>
      <span>OJThink</span>
    </div>
  )
}

function LandingPage({ onGoLogin, onStudentPreview }) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <BrandMark />
        <button className="ghost-button" type="button" onClick={onGoLogin}>
          <Icon name="logIn" size={17} />
          Login
        </button>
      </header>

      <main className="landing-hero">
        <section className="landing-copy" aria-labelledby="landing-title">
          <span className="eyebrow">UC Main CCS practicum</span>
          <h1 id="landing-title">OJThink</h1>
          <p>
            A workspace-based OJT lifecycle interface for company discovery,
            requirement tracking, DTR records, journals, and completion progress.
          </p>
          <div className="landing-actions">
            <button className="primary-button" type="button" onClick={onGoLogin}>
              <Icon name="logIn" size={18} />
              Continue
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={onStudentPreview}
            >
              <Icon name="dashboard" size={18} />
              Student Preview
            </button>
          </div>
        </section>

        <section className="landing-preview" aria-label="OJThink dashboard preview">
          <div className="preview-top">
            <BrandMark compact />
            <div className="preview-user"></div>
          </div>
          <div className="preview-nav">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="preview-grid">
            <div className="preview-panel preview-panel-wide">
              <div className="preview-line short"></div>
              <div className="preview-stats">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="preview-panel">
              <div className="preview-ring">80%</div>
            </div>
            <div className="preview-card"></div>
            <div className="preview-card accent"></div>
            <div className="preview-card"></div>
          </div>
        </section>
      </main>
    </div>
  )
}

function RoleLogin({ onBack, onSelectRole }) {
  return (
    <div className="login-page">
      <header className="login-header">
        <button className="brand-button" type="button" onClick={onBack}>
          <BrandMark />
        </button>
      </header>

      <main className="role-login" aria-labelledby="login-title">
        <section className="role-intro">
          <span className="eyebrow">Frontend access only</span>
          <h1 id="login-title">Choose Your Side</h1>
          <p>
            Select a role to open its dedicated UI. No accounts or passwords are
            checked in this prototype.
          </p>
        </section>

        <section className="role-grid" aria-label="Role options">
          {roleCards.map((role) => (
            <button
              className="role-card"
              type="button"
              key={role.id}
              onClick={() => onSelectRole(role.id)}
            >
              <span className="role-icon">
                <Icon name={role.icon} size={22} />
              </span>
              <span className="role-copy">
                <span>{role.eyebrow}</span>
                <strong>{role.title}</strong>
                <small>{role.detail}</small>
              </span>
              <Icon name="arrowUpRight" size={18} />
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
