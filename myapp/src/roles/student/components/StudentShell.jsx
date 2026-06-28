import { studentProfile } from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    id: 'company-selection',
    label: 'Company Selection',
    icon: 'briefcase',
  },
  {
    id: 'requirements',
    label: 'Requirements',
    icon: 'file',
  },
  {
    id: 'dtr',
    label: 'DTR',
    icon: 'clock',
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: 'journal',
  },
  {
    id: 'opportunities',
    label: 'Opportunity Board',
    icon: 'briefcase',
  },
  {
    id: 'announcements',
    label: 'Announcements',
    icon: 'megaphone',
  },
  {
    id: 'workspaces',
    label: 'Workspaces',
    icon: 'workspace',
  },
]

export function StudentShell({ activeView, onNavigate, onExit, children }) {
  return (
    <div className="student-app">
      <header className="app-header">
        <div className="top-row">
          <button
            className="brand-button"
            type="button"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="brand-dot" aria-hidden="true"></span>
            <span>OJThink</span>
          </button>

          <div className="profile-cluster">
            <div className="avatar" aria-hidden="true">
              {studentProfile.initials}
            </div>
            <div className="profile-copy">
              <strong>{studentProfile.name}</strong>
              <span>{studentProfile.role}</span>
            </div>
            <button
              className="icon-button plain"
              type="button"
              onClick={onExit}
              aria-label="Exit student side"
              title="Exit student side"
            >
              <Icon name="logOut" size={20} />
            </button>
          </div>
        </div>

        <div className="nav-row">
          <nav className="student-nav" aria-label="Student navigation">
            {navItems.map((item) => {
              const isActive = item.id === activeView

              return (
                <button
                  className={isActive ? 'nav-item active' : 'nav-item'}
                  type="button"
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="header-actions">
            <button className="icon-button muted" type="button" aria-label="Theme">
              <Icon name="moon" size={18} />
            </button>
            <button className="icon-button alert" type="button" aria-label="Notifications">
              <Icon name="bell" size={18} />
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
