import { useState } from 'react'
import { Icon } from '../../../shared/Icon.jsx'

const requirementsByPhase = {
  'Pre-OJT': [
    ['Application Letter', 'Accepted'],
    ['Resume / CV', 'Accepted'],
    ['Confirmation Letter / Slip', 'Under Review'],
    ['Parents Consent', 'Submitted'],
  ],
  Midterm: [
    ['Medical Certificate', 'Not Submitted'],
    ['Student Internship Contract', 'Not Submitted'],
    ['Memorandum of Agreement', 'Not Submitted'],
    ['HTE Data Sheet', 'Optional'],
  ],
  Finals: [
    ['Practicum Data Sheet', 'Not Submitted'],
    ['Final DTR / TITO Package', 'Not Submitted'],
    ['Final Journal Package', 'Not Submitted'],
    ['Certificate of Completion', 'Not Submitted'],
    ['Performance Evaluation', 'Not Submitted'],
    ['Summary of Immersion', 'Not Submitted'],
  ],
}

export function CompanySelectionPage() {
  const [activeTab, setActiveTab] = useState('Track A')

  return (
    <TaskPage
      title="Company Selection"
      description="Choose a listed company for Track A or submit a proposed company for coordinator approval under Track B."
      tabs={['Track A', 'Track B Proposal', 'Acceptance Confirmation']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'Track A' && (
        <section className="task-grid">
          {['Full Scale PH', 'Cebu Digital Works', 'Northpoint Studio'].map((company) => (
            <article className="task-card" key={company}>
              <div className="placeholder-icon">
                <Icon name="building" size={18} />
              </div>
              <span className="eyebrow">Listed company</span>
              <h2>{company}</h2>
              <p>Selecting a company confirms the Track A path, not official placement.</p>
              <button className="details-button" type="button">
                Select
              </button>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'Track B Proposal' && (
        <section className="workspace-panel task-form-panel">
          <div className="coordinator-panel-heading compact">
            <div>
              <span className="eyebrow">Coordinator approval required</span>
              <h2>Proposed Company Details</h2>
            </div>
            <span className="status-pill status-review">Needs Revision</span>
          </div>
          <div className="task-field-grid">
            {[
              'Company name',
              'Company address',
              'Contact person',
              'Contact number or email',
              'Proposed department or office',
              'Proposed role or job description',
            ].map((field) => (
              <label className="task-field" key={field}>
                <span>{field}</span>
                <input type="text" placeholder={field} />
              </label>
            ))}
          </div>
          <button className="primary-button task-submit" type="button">
            Submit Proposal
          </button>
        </section>
      )}

      {activeTab === 'Acceptance Confirmation' && (
        <section className="workspace-panel task-status-panel">
          <div className="placeholder-icon">
            <Icon name="file" size={20} />
          </div>
          <div>
            <span className="eyebrow">Official placement checkpoint</span>
            <h2>Acceptance Confirmation Form</h2>
            <p>
              Upload this form only after the company accepts you outside OJThink.
              Coordinator acceptance confirms placement and activates DTR tracking.
            </p>
          </div>
          <span className="status-pill status-submitted">Accepted</span>
          <button className="secondary-button" type="button">
            <Icon name="file" size={16} />
            View File
          </button>
        </section>
      )}
    </TaskPage>
  )
}

export function RequirementsPage() {
  const [activeTab, setActiveTab] = useState('Pre-OJT')
  const requirements = requirementsByPhase[activeTab]

  return (
    <TaskPage
      title="Requirements Checklist"
      description="Submit Pre-OJT, Midterm, and Finals requirements privately for coordinator review."
      tabs={Object.keys(requirementsByPhase)}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <section className="workspace-panel">
        <div className="workspace-list">
          {requirements.map(([name, status]) => (
            <div className="workspace-list-row" key={name}>
              <Icon name="file" size={16} />
              <span>{name}</span>
              <small>{status}</small>
            </div>
          ))}
        </div>
      </section>
    </TaskPage>
  )
}

export function DtrPage() {
  const [activeTab, setActiveTab] = useState('Daily Records')

  return (
    <TaskPage
      title="DTR / TITO"
      description="Daily entries are student-maintained records. Only the final DTR package is reviewed for completion."
      tabs={['Daily Records', 'Final DTR Package', 'Proof Methods']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'Daily Records' && (
        <RecordPanel
          title="Daily DTR Records"
          items={[
            ['June 24, 2026 - 8:00 AM to 5:00 PM', 'Recorded'],
            ['June 25, 2026 - 8:15 AM to 5:10 PM', 'Recorded'],
            ['June 26, 2026 - Draft Entry', 'Draft'],
          ]}
        />
      )}
      {activeTab === 'Final DTR Package' && (
        <RecordPanel
          title="Final Package"
          items={[
            ['Coverage Period', 'June 1 - August 30'],
            ['Claimed Hours', '320 Hours'],
            ['Supporting Proof', 'Not Uploaded'],
            ['Package Status', 'Not Submitted'],
          ]}
        />
      )}
      {activeTab === 'Proof Methods' && (
        <RecordPanel
          title="Accepted Proof Methods"
          items={[
            ['QR-based OJThink time-in/time-out', 'Supported'],
            ['Manual DTR or TITO record', 'Supported'],
            ['Excel, biometric, scan, or signed form', 'Supported'],
          ]}
        />
      )}
    </TaskPage>
  )
}

export function JournalPage() {
  const [activeTab, setActiveTab] = useState('Daily Entries')

  return (
    <TaskPage
      title="Journal / Diary"
      description="Save daily activities and reflections, then submit one final journal package for coordinator review."
      tabs={['Daily Entries', 'Pictures During Duty', 'Final Journal Package']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'Daily Entries' && (
        <RecordPanel
          title="Journal Entries"
          items={[
            ['June 24 - Interface audit and wireframes', 'Saved'],
            ['June 25 - Component implementation', 'Saved'],
            ['June 26 - Reflection draft', 'Draft'],
          ]}
        />
      )}
      {activeTab === 'Pictures During Duty' && (
        <section className="task-grid">
          {['Workstation setup', 'Team review', 'Project presentation'].map((item) => (
            <article className="task-card task-photo-card" key={item}>
              <Icon name="file" size={22} />
              <h2>{item}</h2>
              <span className="status-pill status-submitted">Saved</span>
            </article>
          ))}
        </section>
      )}
      {activeTab === 'Final Journal Package' && (
        <RecordPanel
          title="Final Journal Package"
          items={[
            ['Included Entries', '12 Saved'],
            ['Pictures During Duty', '6 Saved'],
            ['Summary of Tasks', 'Draft'],
            ['Package Status', 'Not Submitted'],
          ]}
        />
      )}
    </TaskPage>
  )
}

function TaskPage({ title, description, tabs, activeTab, onTabChange, children }) {
  return (
    <main className="student-main">
      <section className="task-page">
        <div className="page-title">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="tab-list task-tabs" role="tablist" aria-label={`${title} tabs`}>
            {tabs.map((tab) => (
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
        {children}
      </section>
    </main>
  )
}

function RecordPanel({ title, items }) {
  return (
    <section className="workspace-panel">
      <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Student-maintained record</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="workspace-list">
        {items.map(([name, status]) => (
          <div className="workspace-list-row" key={name}>
            <Icon name="clock" size={16} />
            <span>{name}</span>
            <small>{status}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
