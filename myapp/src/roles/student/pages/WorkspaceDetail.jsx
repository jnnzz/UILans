import { useState } from 'react'
import { workspaceDetails } from '../../../shared/data.js'
import { Icon } from '../../../shared/Icon.jsx'

export function WorkspaceDetail({ workspaceId, onBack }) {
  const workspace = workspaceDetails[workspaceId]
  const [activeTab, setActiveTab] = useState('Overview')

  if (!workspace) {
    return (
      <main className="student-main">
        <section className="placeholder-page">
          <button className="back-button" type="button" onClick={onBack}>
            <Icon name="arrowLeft" size={16} />
            Back to Workspaces
          </button>
          <div className="placeholder-heading">
            <Icon name="workspace" size={22} />
            <div>
              <h1>Workspace Not Found</h1>
              <p>Select a workspace from the workspace list.</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="student-main">
      <section className="workspace-detail-page">
        <button className="back-button" type="button" onClick={onBack}>
          <Icon name="arrowLeft" size={16} />
          Back to Workspaces
        </button>

        <div className="workspace-detail-hero">
          <div className="placeholder-icon">
            <Icon name="workspace" size={20} />
          </div>
          <div>
            <span className="eyebrow">{workspace.type}</span>
            <h1>{workspace.name}</h1>
            <p>{workspace.description}</p>
          </div>
          <span className="workspace-status">{workspace.status}</span>
        </div>

        <div className="tab-list workspace-tabs" role="tablist" aria-label={`${workspace.name} tabs`}>
          {workspace.tabs.map((tab) => (
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

        <WorkspaceTabContent workspace={workspace} activeTab={activeTab} />
      </section>
    </main>
  )
}

function WorkspaceTabContent({ workspace, activeTab }) {
  if (activeTab === 'Overview') {
    return (
      <>
        <section className="workspace-stat-grid" aria-label={`${workspace.name} summary`}>
          {workspace.stats.map(([label, value]) => (
            <article className="workspace-stat-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <div className="workspace-content-grid">
          <SharedContentPanel workspace={workspace} />
          <SubmissionPanel workspace={workspace} />
          <FilesPanel workspace={workspace} />
        </div>
      </>
    )
  }

  if (activeTab.toLowerCase().includes('file')) {
    return <FilesPanel workspace={workspace} standalone />
  }

  if (
    activeTab.toLowerCase().includes('requirement') ||
    activeTab.toLowerCase().includes('dtr') ||
    activeTab.toLowerCase().includes('proof') ||
    activeTab.toLowerCase().includes('journal')
  ) {
    return <SubmissionPanel workspace={workspace} standalone title={activeTab} />
  }

  return <SharedContentPanel workspace={workspace} standalone title={activeTab} />
}

function SharedContentPanel({ workspace, standalone = false, title = 'Visible to Members' }) {
  return (
    <section className={standalone ? 'workspace-panel workspace-files-panel' : 'workspace-panel'}>
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Shared content</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="workspace-list">
        {workspace.shared.map((item) => (
          <div className="workspace-list-row" key={item}>
            <Icon name="megaphone" size={16} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SubmissionPanel({ workspace, standalone = false, title = 'Your Records' }) {
  return (
    <section className={standalone ? 'workspace-panel workspace-files-panel' : 'workspace-panel'}>
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Private submissions</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="workspace-list">
        {workspace.submissions.map(([name, status]) => (
          <div className="workspace-list-row" key={name}>
            <Icon name="file" size={16} />
            <span>{name}</span>
            <small>{status}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function FilesPanel({ workspace, standalone = false }) {
  return (
    <section className={standalone ? 'workspace-panel workspace-files-panel' : 'workspace-panel workspace-files-panel'}>
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Files</span>
          <h2>Workspace Files</h2>
        </div>
      </div>
      <div className="workspace-file-grid">
        {workspace.files.map((file) => (
          <button type="button" key={file}>
            <Icon name="file" size={16} />
            <span>{file}</span>
            <Icon name="arrowUpRight" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}
