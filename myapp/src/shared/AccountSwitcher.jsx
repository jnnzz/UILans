import { useState } from 'react'
import { Icon } from './Icon.jsx'

const accounts = [
  ['student', 'Elena Dela Cruz', 'Student', 'ED'],
  ['coordinator', 'Dr. Maria Santos', 'OJT Coordinator', 'MS'],
  ['company', 'Full Scale PH', 'Company Supervisor', 'FS'],
  ['admin', 'System Administrator', 'Administrator', 'AD'],
]

export function AccountSwitcher({ activeRole, onSwitchRole }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeAccount = accounts.find(([id]) => id === activeRole) || accounts[0]

  const switchTo = (role) => {
    setIsOpen(false)
    onSwitchRole(role)
  }

  return (
    <div className="account-switcher">
      <button
        className="account-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="account-avatar">{activeAccount[3]}</span>
        <span className="account-trigger-copy">
          <strong>{activeAccount[1]}</strong>
          <small>{activeAccount[2]}</small>
        </span>
        <span className="account-chevron" aria-hidden="true">⌄</span>
      </button>

      {isOpen && (
        <>
          <button
            className="account-backdrop"
            type="button"
            aria-label="Close account switcher"
            onClick={() => setIsOpen(false)}
          />
          <div className="account-menu" role="menu" aria-label="Switch preview account">
            <div className="account-menu-heading">
              <span className="eyebrow">Preview mode</span>
              <strong>Switch account</strong>
              <small>No sign-in required</small>
            </div>
            <div className="account-options">
              {accounts.map(([id, name, role, initials]) => (
                <button
                  className={id === activeRole ? 'account-option active' : 'account-option'}
                  type="button"
                  role="menuitem"
                  key={id}
                  onClick={() => switchTo(id)}
                >
                  <span className="account-avatar">{initials}</span>
                  <span>
                    <strong>{name}</strong>
                    <small>{role}</small>
                  </span>
                  {id === activeRole && <Icon name="checkCircle" size={17} />}
                </button>
              ))}
            </div>
            <button
              className="account-exit"
              type="button"
              onClick={() => switchTo('login')}
            >
              <Icon name="logOut" size={16} />
              Back to all accounts
            </button>
          </div>
        </>
      )}
    </div>
  )
}
