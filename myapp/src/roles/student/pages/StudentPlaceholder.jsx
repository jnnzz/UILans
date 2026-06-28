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
            const isWorkspace = type === 'workspaces' && typeof item !== 'string'

            if (isWorkspace) {
              return (
                <button
                  className="placeholder-card workspace-card-button"
                  type="button"
                  key={label}
                  onClick={() => onOpenWorkspace(item.id)}
                >
                  <div className="placeholder-icon">
                    <Icon name={copy.icon} size={18} />
                  </div>
                  <span>{typeLabel}</span>
                  <h2>{label}</h2>
                  <p>{detail}</p>
                  <small>
                    Open Workspace
                    <Icon name="arrowUpRight" size={14} />
                  </small>
                </button>
              )
            }

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
