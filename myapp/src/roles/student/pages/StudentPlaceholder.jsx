import { files, workspaces } from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'

const pageCopy = {
  workspaces: {
    title: 'Workspaces',
    subtitle: 'Shared content stays visible while submissions remain private.',
    icon: 'workspace',
  },
  files: {
    title: 'Files',
    subtitle: 'Student requirement templates and final completion documents.',
    icon: 'file',
  },
}

export function StudentPlaceholder({ type, onOpenWorkspace }) {
  const copy = pageCopy[type]
  const list = type === 'workspaces' ? workspaces : files

  if (type === 'workspaces') {
    const visibleWorkspaces = workspaces.filter((workspace) =>
      ['uc-ccs', 'company'].includes(workspace.id),
    )

    return (
      <main className="student-main workspace-selector-main">
        <section className="workspace-selector" aria-labelledby="workspace-selector-title">
          <header className="workspace-selector-heading">
            <h1 id="workspace-selector-title">Your Workspaces</h1>
            <p>
              Choose your workspace. Shared content stays visible while submissions
              remain private.
            </p>
          </header>

          <div className="workspace-selector-grid">
            {visibleWorkspaces.map((workspace, index) => (
              <button
                className={index === 0 ? 'workspace-choice-card featured' : 'workspace-choice-card'}
                type="button"
                key={workspace.id}
                onClick={() => onOpenWorkspace(workspace.id)}
              >
                <span className={workspace.id === 'company' ? 'workspace-choice-logo company' : 'workspace-choice-logo academic'}>
                  {workspace.id === 'company' ? 'f' : 'CCS'}
                </span>
                <span className="workspace-choice-type">
                  {workspace.id === 'company' ? 'OJT Workspace' : 'Academic Workspace'}
                </span>
                <h2>{workspace.name}</h2>
                <p>{workspace.detail}</p>
                <span className="workspace-choice-action">
                  Open Workspace
                  <Icon name="arrowUpRight" size={15} />
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="student-main">
      <section className="placeholder-page">
        <div className="placeholder-heading">
          <Icon name={copy.icon} size={22} />
          <div>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
          </div>
        </div>

        <div className="placeholder-grid">
          {list.map((item) => {
            const label = typeof item === 'string' ? item : item.name
            const detail = typeof item === 'string' ? 'Required OJT document' : item.detail
            const typeLabel = typeof item === 'string' ? 'Template' : item.type
            return (
              <article className="placeholder-card" key={label}>
                <div className="placeholder-icon">
                  <Icon name={copy.icon} size={18} />
                </div>
                <span>{typeLabel}</span>
                <h2>{label}</h2>
                <p>{detail}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
