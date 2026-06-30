import { useState } from 'react'
import { Icon } from '../../../shared/Icon.jsx'

const requirementsByPhase = {
  Placement: [
    {
      name: 'Acceptance Confirmation / Confirmation Slip',
      status: 'Accepted',
      detail: 'Track A · Full Scale PH',
      updated: 'Reviewed Jun 18',
    },
  ],
  'Pre-OJT': [
    { name: 'Application Letter', status: 'Accepted', detail: 'PDF · v1', updated: 'Reviewed Jun 12' },
    { name: 'Resume / CV', status: 'Accepted', detail: 'PDF · v2', updated: 'Reviewed Jun 13' },
    { name: 'Parent Consent', status: 'Submitted', detail: 'PDF · v1', updated: 'Submitted Jun 21' },
    { name: 'Medical Certificate', status: 'Needs Revision', detail: 'PDF · v1', updated: 'Feedback Jun 24' },
  ],
  Midterm: [
    { name: 'Student Internship Contract', status: 'Not Submitted', detail: 'Required', updated: 'Due Jul 15' },
    { name: 'Memorandum of Agreement', status: 'Not Submitted', detail: 'Required', updated: 'Due Jul 15' },
    { name: 'HTE Data Sheet', status: 'Optional', detail: 'Optional', updated: 'No deadline' },
  ],
  'Finals & Completion': [
    { name: 'Final DTR Package', status: 'Not Submitted', detail: 'Required', updated: 'Due Aug 30' },
    { name: 'Final Journal Package', status: 'Not Submitted', detail: 'Required', updated: 'Due Aug 30' },
    { name: 'Certificate of Completion', status: 'Not Submitted', detail: 'Required', updated: 'Due Sep 5' },
    { name: 'Performance Evaluation', status: 'Not Submitted', detail: 'Company-issued', updated: 'Due Sep 5' },
    { name: 'Summary of Immersion', status: 'Draft', detail: 'DOCX · v1', updated: 'Edited today' },
  ],
}

const dtrRows = [
  ['Fri, Jun 26', '08:07 AM', '05:11 PM', '8h 04m', 'QR', 'Recorded'],
  ['Thu, Jun 25', '08:15 AM', '05:10 PM', '7h 55m', 'QR', 'Recorded'],
  ['Wed, Jun 24', '08:00 AM', '05:00 PM', '8h 00m', 'Manual', 'Recorded'],
  ['Tue, Jun 23', '08:12 AM', '—', '—', 'QR', 'Draft'],
]

const journalEntries = [
  ['Jun 26', 'Design system clean-up', 'Refined reusable components and documented the final spacing rules.', 'Draft'],
  ['Jun 25', 'Component implementation', 'Built the company workspace cards and tested responsive layouts.', 'Saved'],
  ['Jun 24', 'Interface audit and wireframes', 'Mapped the current screens and prepared the first dashboard wireframe.', 'Saved'],
]

export function CompanySelectionPage({ onOpenWorkspace }) {
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [trackBVerified, setTrackBVerified] = useState(false)

  const selectTrack = (track) => {
    setSelectedTrack(track)
    setTrackBVerified(false)
  }

  if (!selectedTrack) {
    return <PlacementTrackPicker onSelectTrack={selectTrack} />
  }

  const needsCompanyVerification = selectedTrack === 'track-b' && !trackBVerified

  return (
    <main className="student-main">
      <section className="task-page placement-page">
        <div className="task-page-heading">
          <div className="page-title">
            <span className="eyebrow">{selectedTrack === 'track-a' ? 'Track A · Listed company' : 'Track B · Outside company'}</span>
            <h1>{needsCompanyVerification ? 'Company Verification' : 'Acceptance Confirmation'}</h1>
            <p>
              {needsCompanyVerification
                ? 'Verify your outside company before continuing to placement confirmation.'
                : 'Complete your placement details and submit the signed confirmation slip.'}
            </p>
          </div>
          <div className="placement-flow-header-actions">
            <span className="placement-overall-status">
              <Icon name={needsCompanyVerification ? 'building' : 'checkCircle'} size={16} />
              {needsCompanyVerification ? 'Verification required' : `${selectedTrack === 'track-a' ? 'Track A' : 'Track B'} selected`}
            </span>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setSelectedTrack(null)
                setTrackBVerified(false)
              }}
            >
              <Icon name="arrowLeft" size={16} />
              Change track
            </button>
          </div>
        </div>

        {needsCompanyVerification ? (
          <div className="direct-company-verification">
            <CompanyVerification
              initialMode="form"
              onVerified={() => setTrackBVerified(true)}
              onCancel={() => setSelectedTrack(null)}
            />
          </div>
        ) : (
          <>
            <section className="workspace-panel direct-placement-form">
              <div className="direct-placement-form-heading">
                <div>
                  <span className="eyebrow">Official placement checkpoint</span>
                  <h2>Placement details</h2>
                  <p>Review the information below before sending it to your coordinator.</p>
                </div>
                <div className="direct-placement-form-badges">
                  <span className="phase-chip">{selectedTrack === 'track-a' ? 'Track A · Listed Company' : 'Track B · Outside Company'}</span>
                  {selectedTrack === 'track-b' && <span className="status-pill status-accepted">Company verified</span>}
                </div>
              </div>
              <AcceptanceConfirmation key={selectedTrack} initialTrack={selectedTrack} embedded />
            </section>

            <div className="placement-work-area">
              <PlacementStatusPanel track={selectedTrack} onOpenWorkspace={onOpenWorkspace} />
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export function CompanyVerificationPage() {
  return (
    <main className="student-main">
      <section className="task-page placement-page">
        <div className="task-page-heading">
          <div className="page-title">
            <span className="eyebrow">Outside or unlisted company</span>
            <h1>Company Verification</h1>
            <p>Verify a possible OJT company before declaring Track B in Acceptance Confirmation.</p>
          </div>
          <span className="placement-overall-status">
            <Icon name="building" size={16} />
            Pre-placement validation
          </span>
        </div>
        <div className="direct-company-verification">
          <CompanyVerification initialMode="form" />
        </div>
      </section>
    </main>
  )
}

function PlacementTrackPicker({ onSelectTrack }) {
  return (
    <main className="student-main placement-track-picker-main">
      <section className="placement-track-picker" aria-labelledby="placement-track-title">
        <header className="placement-track-picker-heading">
          <span className="eyebrow">Placement setup</span>
          <h1 id="placement-track-title">Choose Your Placement Track</h1>
          <p>Select the option that describes where your company comes from. You will see only the process for that track.</p>
        </header>

        <div className="placement-track-picker-grid">
          <button className="placement-track-pick-card featured" type="button" onClick={() => onSelectTrack('track-a')}>
            <span className="placement-track-pick-logo">A</span>
            <span className="placement-track-pick-type">Listed Company</span>
            <h2>Track A</h2>
            <p>Choose this if your company is already listed as an OJThink partner.</p>
            <span className="placement-track-pick-facts">
              <span><Icon name="checkCircle" size={15} /> No company verification</span>
              <span><Icon name="workspace" size={15} /> Company workspace</span>
            </span>
            <span className="placement-track-pick-action">Choose Track A <Icon name="arrowUpRight" size={15} /></span>
          </button>

          <button className="placement-track-pick-card" type="button" onClick={() => onSelectTrack('track-b')}>
            <span className="placement-track-pick-logo secondary">B</span>
            <span className="placement-track-pick-type">Outside Company</span>
            <h2>Track B</h2>
            <p>Choose this if your intended company is outside or not listed in OJThink.</p>
            <span className="placement-track-pick-facts">
              <span><Icon name="checkCircle" size={15} /> Company verification required</span>
              <span><Icon name="workspace" size={15} /> Shared Track B workspace</span>
            </span>
            <span className="placement-track-pick-action">Choose Track B <Icon name="arrowUpRight" size={15} /></span>
          </button>
        </div>

        <div className="placement-track-shared-rule">
          <Icon name="checkCircle" size={18} />
          <p><strong>Both tracks follow the same final rule:</strong> placement becomes official only after the coordinator accepts the Acceptance Confirmation.</p>
        </div>
      </section>
    </main>
  )
}

const placementJourneys = {
  'track-a': [
    {
      id: 'Listed Companies',
      title: 'Choose Listed Company',
      short: 'OJThink partner',
      badge: 'Start here',
      detail: 'Browse companies already listed and recognized in OJThink.',
      action: 'Company Verification is not required for Track A.',
    },
    {
      id: 'Company Acceptance',
      title: 'Get Accepted',
      short: 'Handled outside OJThink',
      badge: 'External step',
      detail: 'Apply, interview, and receive company acceptance outside OJThink.',
      action: 'Ask the listed company for a signed Confirmation Slip.',
    },
    {
      id: 'Acceptance Confirmation',
      title: 'Submit Confirmation',
      short: 'Declare Track A',
      badge: 'Required',
      detail: 'Choose Track A, select the listed company, and upload your signed slip.',
      action: 'Submitting the form does not activate placement until coordinator approval.',
    },
    {
      id: 'Coordinator Review',
      title: 'Wait for Approval',
      short: 'Official checkpoint',
      badge: 'Coordinator review',
      detail: 'The coordinator validates the Confirmation Slip and placement details.',
      action: 'Approval officially saves Track A and confirms your placement.',
    },
    {
      id: 'My Placement',
      title: 'Start OJT',
      short: 'Company workspace',
      badge: 'Final step',
      detail: 'Enter the company workspace and begin OJT tracking.',
      action: 'DTR, journal, requirements, and company resources become available.',
    },
  ],
  'track-b': [
    {
      id: 'Outside Company',
      title: 'Find Outside Company',
      short: 'Not listed in OJThink',
      badge: 'Start here',
      detail: 'Identify an outside or unlisted company where you want to complete OJT.',
      action: 'Gather its address, contact person, department, and proposed role.',
    },
    {
      id: 'Company Verification',
      title: 'Verify Company',
      short: 'Required for Track B',
      badge: 'Required',
      detail: 'Submit the outside company details for coordinator verification.',
      action: 'Verification only checks the company. It does not confirm placement or Track B.',
    },
    {
      id: 'Company Acceptance',
      title: 'Get Accepted',
      short: 'Handled outside OJThink',
      badge: 'External step',
      detail: 'Apply, interview, and receive acceptance from the verified company.',
      action: 'Secure a signed Confirmation Slip before continuing.',
    },
    {
      id: 'Acceptance Confirmation',
      title: 'Submit Confirmation',
      short: 'Declare Track B',
      badge: 'Required',
      detail: 'Choose Track B, select the verified company, and upload your signed slip.',
      action: 'This form—not Company Verification—is the official placement checkpoint.',
    },
    {
      id: 'Coordinator Review',
      title: 'Wait for Approval',
      short: 'Official checkpoint',
      badge: 'Coordinator review',
      detail: 'The coordinator validates the Confirmation Slip and verified company.',
      action: 'Approval officially saves Track B and confirms your placement.',
    },
    {
      id: 'My Placement',
      title: 'Start OJT',
      short: 'Track B workspace',
      badge: 'Final step',
      detail: 'Enter the shared Track B workspace and begin OJT tracking.',
      action: 'Your files, DTR, journal, feedback, and status remain private.',
    },
  ],
}

export function PlacementJourney({ track, activeStep, onStepChange }) {
  const steps = placementJourneys[track]
  const actionIndex = steps.findIndex((step) => step.id === 'Acceptance Confirmation')
  const reminderSteps = steps.slice(0, actionIndex)
  const actionStep = steps[actionIndex]
  const systemSteps = steps.slice(actionIndex + 1)

  return (
    <section className="placement-process-board" aria-label={`${track === 'track-a' ? 'Track A' : 'Track B'} placement process`}>
      <div className="process-board-heading">
        <div>
          <span className="eyebrow">{track === 'track-a' ? 'Track A process' : 'Track B process'}</span>
          <h2>Your placement checklist</h2>
        </div>
        <span className="phase-chip">{track === 'track-a' ? 'Listed Company' : 'Outside Company'}</span>
      </div>

      <div className="placement-process-groups">
        <section className="process-group process-reminders">
          <div className="process-group-label">
            <span className="process-group-icon muted"><Icon name="checkCircle" size={17} /></span>
            <div><strong>Before you submit</strong><small>Review these preparation steps</small></div>
          </div>
          <div className="process-reminder-list">
            {reminderSteps.map((step, index) => (
              <button
                className={activeStep === step.id ? 'process-reminder active' : 'process-reminder'}
                type="button"
                key={step.id}
                onClick={() => onStepChange(step.id)}
              >
                <span className="process-step-number">{index + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.short}</small>
                </span>
                <span className="process-review-link">Review</span>
              </button>
            ))}
          </div>
        </section>

        <section className="process-group process-action">
          <div className="process-group-label">
            <span className="process-group-icon action"><Icon name="file" size={17} /></span>
            <div><strong>Your required action</strong><small>Complete this inside OJThink</small></div>
          </div>
          <div
            className={activeStep === actionStep.id ? 'process-action-card active' : 'process-action-card'}
          >
            <div className="process-action-intro">
              <span className="process-action-number">{actionIndex + 1}</span>
              <span>
                <span className="eyebrow">Official placement checkpoint</span>
                <strong>{actionStep.title}</strong>
                <small>{actionStep.detail}</small>
              </span>
            </div>
            <AcceptanceConfirmation
              key={track}
              initialTrack={track}
              embedded
              onSubmit={() => onStepChange('Coordinator Review')}
            />
          </div>
        </section>

        <section className="process-group process-system">
          <div className="process-group-label">
            <span className="process-group-icon system"><Icon name="clock" size={17} /></span>
            <div><strong>What happens next</strong><small>OJThink and your coordinator handle these steps</small></div>
          </div>
          <div className="system-step-list">
            {systemSteps.map((step, index) => (
              <article key={step.id}>
                <span className="process-step-number">{actionIndex + index + 2}</span>
                <div><strong>{step.title}</strong><small>{step.short}</small></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function PlacementStatusPanel({ track, onOpenWorkspace }) {
  const isTrackB = track === 'track-b'
  const company = isTrackB ? 'Acme Technologies Cebu' : 'Full Scale PH'
  const role = isTrackB ? 'QA Intern' : 'Product Design Intern'
  const workspace = isTrackB ? 'Track B Workspace' : 'Company Workspace'
  const workspaceId = isTrackB ? 'track-b' : 'company'

  return (
    <aside className="workspace-panel placement-status-panel" aria-label="Placement status">
      <div className="placement-status-heading">
        <div>
          <span className="eyebrow">Placement status</span>
          <h2>Placement confirmed</h2>
        </div>
        <span className="status-pill status-accepted">Accepted</span>
      </div>

      <div className="confirmed-company">
        <span className="placement-company-mark">{isTrackB ? 'AT' : 'FS'}</span>
        <div>
          <span className="phase-chip">{isTrackB ? 'Track B' : 'Track A'}</span>
          <strong>{company}</strong>
          <small>{role}</small>
        </div>
      </div>

      <div className="confirmed-placement-details">
        <span><small>Track</small><strong>{isTrackB ? 'Track B · Outside company' : 'Track A · Listed company'}</strong></span>
        <span><small>Start date</small><strong>June 16, 2026</strong></span>
        <span><small>Required hours</small><strong>540 hours</strong></span>
        <span><small>Workspace</small><strong>{workspace}</strong></span>
      </div>

      <div className="persistent-review-history">
        <div>
          <span className="eyebrow">Review history</span>
          <strong>Latest updates</strong>
        </div>
        {[
          ['Accepted', 'Jun 18 · 2:35 PM', 'Placement confirmed by coordinator'],
          ['Under review', 'Jun 18 · 9:10 AM', 'Review started by Dr. Santos'],
          ['Submitted', 'Jun 17 · 4:42 PM', 'Confirmation Slip submitted'],
        ].map(([status, time, detail]) => (
          <div className="persistent-review-item" key={status}>
            <span />
            <div><small>{time}</small><strong>{status}</strong><p>{detail}</p></div>
          </div>
        ))}
      </div>

      <button className="primary-button open-workspace-button" type="button" onClick={() => onOpenWorkspace?.(workspaceId)}>
        <Icon name="workspace" size={17} />
        Open {workspace}
      </button>
    </aside>
  )
}

export function PlacementOverview({ track, onGoConfirmation }) {
  const isTrackB = track === 'track-b'

  return (
    <div className="placement-layout">
      <section className="workspace-panel placement-primary">
        <div className="placement-company-mark">{isTrackB ? 'AT' : 'FS'}</div>
        <div className="placement-copy">
          <div className="placement-label-row">
            <span className="status-pill status-accepted">Placement Outcome</span>
            <span className="phase-chip">{isTrackB ? 'Track B' : 'Track A'}</span>
          </div>
          <span className="eyebrow">{isTrackB ? 'Outside company placement' : 'Listed company placement'}</span>
          <h2>{isTrackB ? 'Acme Technologies Cebu' : 'Full Scale PH'}</h2>
          <p>{isTrackB ? 'QA Intern · Cebu Business Park' : 'Product Design Intern · Cebu City'} · Jun 16 – Sep 5, 2026</p>
          <div className="placement-meta">
            <span><Icon name="user" size={15} /> {isTrackB ? 'Marco Villanueva' : 'Ana Reyes'} · Supervisor</span>
            <span><Icon name="clock" size={15} /> 540 required hours</span>
            <span><Icon name="workspace" size={15} /> {isTrackB ? 'Shared Track B Workspace' : 'Company Workspace'}</span>
          </div>
        </div>
        <button className="secondary-button" type="button" onClick={onGoConfirmation}>
          View confirmation
        </button>
      </section>
    </div>
  )
}

export function OutsideCompanyStart({ onContinue }) {
  return (
    <div className="outside-company-layout">
      <section className="workspace-panel outside-company-card">
        <div>
          <span className="eyebrow">Track B · Step 1</span>
          <h2>Prepare Your Outside Company Details</h2>
          <p>Before requesting verification, make sure you can identify the company and its proposed OJT assignment.</p>
        </div>
        <div className="outside-company-checklist">
          {[
            ['Company identity', 'Official company name and complete address', 'building'],
            ['Contact person', 'Supervisor, HR representative, email, or phone', 'user'],
            ['Proposed assignment', 'Department, office, and intended OJT role', 'briefcase'],
            ['Supporting proof', 'Company profile, registration, or official communication', 'file'],
          ].map(([title, detail, icon]) => (
            <article key={title}>
              <span><Icon name={icon} size={18} /></span>
              <div><strong>{title}</strong><small>{detail}</small></div>
            </article>
          ))}
        </div>
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={onContinue}>Continue to verification <Icon name="arrowUpRight" size={16} /></button>
        </div>
      </section>
      <aside className="workspace-panel outside-company-note">
        <span className="track-path-letter">B</span>
        <div>
          <span className="eyebrow">Remember</span>
          <h2>Not placement yet</h2>
          <p>Finding an outside company does not classify you as Track B. Track B becomes official only after Acceptance Confirmation approval.</p>
        </div>
      </aside>
    </div>
  )
}

export function CompanyAcceptance({ track, onContinue }) {
  const isTrackB = track === 'track-b'

  return (
    <div className="acceptance-guide-layout">
      <section className="workspace-panel acceptance-guide-card">
        <div className="acceptance-guide-heading">
          <span className="placement-company-mark">{isTrackB ? 'AT' : 'FS'}</span>
          <div>
            <span className="eyebrow">Completed outside OJThink</span>
            <h2>Secure Company Acceptance</h2>
            <p>Coordinate directly with {isTrackB ? 'the verified outside company' : 'the listed company'} until you receive a signed Confirmation Slip.</p>
          </div>
          <span className="status-pill status-review">External step</span>
        </div>
        <div className="acceptance-checklist">
          {[
            ['Company application or referral', 'Handled outside OJThink', true],
            ['Interview and company screening', 'Handled by the company', true],
            ['Official company acceptance', 'Acceptance received', true],
            ['Signed Confirmation Slip', 'Ready for upload', true],
          ].map(([title, detail, done]) => (
            <div key={title}>
              <span className={done ? 'acceptance-check done' : 'acceptance-check'}><Icon name="checkCircle" size={16} /></span>
              <div><strong>{title}</strong><small>{detail}</small></div>
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={onContinue}>Continue to confirmation <Icon name="arrowUpRight" size={16} /></button>
        </div>
      </section>
      <aside className="workspace-panel acceptance-guide-note">
        <Icon name="file" size={20} />
        <div>
          <span className="eyebrow">Bring to the next step</span>
          <h2>Signed Confirmation Slip</h2>
          <p>This document is required before the coordinator can confirm your official placement.</p>
        </div>
      </aside>
    </div>
  )
}

export function CoordinatorReviewGuide({ onContinue }) {
  return (
    <div className="coordinator-review-guide">
      <section className="workspace-panel coordinator-review-card">
        <div className="coordinator-review-heading">
          <span className="file-tile"><Icon name="checkCircle" size={19} /></span>
          <div>
            <span className="eyebrow">Official placement checkpoint</span>
            <h2>Coordinator Review</h2>
            <p>The coordinator reviews your Confirmation Slip and declared track before placement is activated.</p>
          </div>
        </div>
        <div className="review-state-flow">
          {[
            ['1', 'Submitted', 'Your form and signed slip are received.'],
            ['2', 'Under Review', 'The coordinator checks company and track details.'],
            ['3', 'Accepted', 'Your official placement and workspace are activated.'],
          ].map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
            </article>
          ))}
        </div>
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={onContinue}>See placement outcome <Icon name="arrowUpRight" size={16} /></button>
        </div>
      </section>
      <aside className="workspace-panel review-rule-card">
        <Icon name="checkCircle" size={20} />
        <div>
          <span className="eyebrow">Critical rule</span>
          <h2>Approval makes it official</h2>
          <p>A verified company or submitted form alone does not activate DTR, journal, or a workspace.</p>
        </div>
      </aside>
    </div>
  )
}

export function ListedCompanies() {
  return (
    <section className="task-grid company-browser-grid">
      {[
        ['FS', 'Full Scale PH', 'Software Development', '3 open roles', 'Cebu City'],
        ['CD', 'Cebu Digital Works', 'Digital Services', '2 open roles', 'Mandaue City'],
        ['NS', 'Northpoint Studio', 'Creative Technology', '1 open role', 'Remote / Cebu'],
      ].map(([initials, company, industry, roles, location]) => (
        <article className="task-card company-browser-card" key={company}>
          <div className="company-card-top">
            <span className="company-logo">{initials}</span>
            <button className="icon-button plain" type="button" aria-label={`Save ${company}`}>
              <Icon name="heart" size={18} />
            </button>
          </div>
          <span className="eyebrow">{industry}</span>
          <h2>{company}</h2>
          <p><Icon name="mapPin" size={15} /> {location}</p>
          <div className="company-card-footer">
            <span>{roles}</span>
            <button className="details-button" type="button">View profile</button>
          </div>
        </article>
      ))}
    </section>
  )
}

export function CompanyVerification({ initialMode = 'status', onVerified, onCancel }) {
  const [mode, setMode] = useState(initialMode)

  if (mode === 'form') {
    return (
      <section className="workspace-panel task-form-panel">
        <div className="coordinator-panel-heading compact">
          <div>
            <span className="eyebrow">Outside or unlisted company</span>
            <h2>New Verification Request</h2>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              if (onCancel) onCancel()
              else setMode('status')
            }}
          >
            Cancel
          </button>
        </div>
        <div className="form-note">
          <Icon name="building" size={18} />
          <p>Verification only checks if the company is a valid OJT site. It does not confirm placement or classify your track.</p>
        </div>
        <div className="task-field-grid">
          {[
            ['Company name', 'e.g. Acme Technologies'],
            ['Company address', 'Complete office address'],
            ['Company email', 'company@example.com'],
            ['Company telephone', 'Official contact number'],
            ['Contact person', 'Supervisor or HR contact'],
            ['Contact person position', 'e.g. HR Manager'],
            ['Department / office', 'Proposed assignment'],
            ['Proposed OJT role', 'Role or job description'],
          ].map(([field, placeholder]) => (
            <label className="task-field" key={field}>
              <span>{field}</span>
              <input type="text" placeholder={placeholder} />
            </label>
          ))}
          <label className="task-field full-span">
            <span>Student reason / remarks</span>
            <textarea rows="4" placeholder="Explain why you want this company verified as a possible OJT site." />
          </label>
          <label className="task-field full-span">
            <span>Supporting document</span>
            <button className="upload-dropzone" type="button">
              <Icon name="upload" size={20} />
              <strong>Upload company proof</strong>
              <small>PDF, JPG, or PNG · up to 10 MB</small>
            </button>
          </label>
        </div>
        <div className="form-actions">
          <button className="secondary-button" type="button">Save draft</button>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              if (onVerified) onVerified()
              else setMode('status')
            }}
          >
            Submit for verification
          </button>
        </div>
      </section>
    )
  }

  return (
    <div className="verification-layout">
      <section className="workspace-panel verification-card">
        <div className="verification-card-head">
          <span className="company-logo">AT</span>
          <div>
            <span className="eyebrow">Verification request #CV-026</span>
            <h2>Acme Technologies Cebu</h2>
            <p>IT Services · Cebu Business Park</p>
          </div>
          <span className="status-pill status-accepted">Verified</span>
        </div>
        <div className="verification-message">
          <Icon name="checkCircle" size={19} />
          <div>
            <strong>Company is eligible as a possible OJT site</strong>
            <p>Verified by Dr. Maria Santos on June 14, 2026. Placement is not yet confirmed.</p>
          </div>
        </div>
        <div className="verification-details">
          <span><small>Contact person</small><strong>Marco Villanueva</strong></span>
          <span><small>Proposed role</small><strong>QA Intern</strong></span>
          <span><small>Department</small><strong>Product Engineering</strong></span>
        </div>
      </section>
      <aside className="workspace-panel verification-guide">
        <span className="eyebrow">What happens next?</span>
        <h2>Verification is step one</h2>
        <ol>
          <li>Coordinate with the company outside OJThink.</li>
          <li>Secure a signed Confirmation Slip.</li>
          <li>Declare Track B in Acceptance Confirmation.</li>
          <li>Wait for coordinator approval.</li>
        </ol>
        <button className="secondary-button" type="button" onClick={() => setMode('form')}>
          <Icon name="building" size={16} /> New request
        </button>
      </aside>
    </div>
  )
}

function AcceptanceConfirmation({ initialTrack = 'track-a', embedded = false, onSubmit }) {
  const selectedTrack = initialTrack
  const isTrackB = selectedTrack === 'track-b'
  const [submitted, setSubmitted] = useState(false)

  const form = (
    <>
      {!embedded && <div className="coordinator-panel-heading compact">
        <div>
          <span className="eyebrow">Official placement checkpoint</span>
          <h2>Acceptance Confirmation</h2>
        </div>
        <span className="status-pill status-accepted">Accepted</span>
      </div>}

      <form
        className="confirmation-summary"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
          onSubmit?.()
        }}
      >
        <label className="task-field">
          <span>{isTrackB ? 'Verified company' : 'Listed company'}</span>
          <select defaultValue={isTrackB ? 'Acme Technologies Cebu' : 'Full Scale PH'}>
            <option>{isTrackB ? 'Acme Technologies Cebu' : 'Full Scale PH'}</option>
          </select>
        </label>
        <label className="task-field">
          <span>OJT position</span>
          <input value={isTrackB ? 'QA Intern' : 'Product Design Intern'} readOnly />
        </label>
        <label className="task-field">
          <span>Department / office</span>
          <input value={isTrackB ? 'Product Engineering' : 'Design Team'} readOnly />
        </label>
        <label className="task-field">
          <span>Start date</span>
          <input value="June 16, 2026" readOnly />
        </label>
        <label className="task-field full-span">
          <span>Signed Confirmation Slip</span>
          <div className="attached-file">
            <Icon name="file" size={18} />
            <div><strong>confirmation-slip-elena.pdf</strong><small>PDF · 1.8 MB · Version 1</small></div>
            <button className="details-button" type="button">View</button>
          </div>
        </label>
        <label className="task-field full-span">
          <span>Student notes</span>
          <textarea rows="3" placeholder="Add optional placement notes for the coordinator." />
        </label>
        <div className="confirmation-submit-row full-span">
          <div>
            <strong>{submitted ? 'Confirmation submitted' : 'Ready for coordinator review?'}</strong>
            <small>{submitted ? 'Your placement details are now queued for review.' : 'Check the details and signed slip before submitting.'}</small>
          </div>
          <button className="primary-button" type="submit" disabled={submitted}>
            <Icon name={submitted ? 'checkCircle' : 'upload'} size={16} />
            {submitted ? 'Submitted' : 'Submit Confirmation'}
          </button>
        </div>
      </form>
    </>
  )

  if (embedded) {
    return <div className="inline-confirmation-form">{form}</div>
  }

  return <section className="workspace-panel confirmation-form">{form}</section>
}

export function RequirementsPage() {
  const [activeTab, setActiveTab] = useState('Pre-OJT')
  const requirements = requirementsByPhase[activeTab]
  const completed = requirements.filter((item) => item.status === 'Accepted').length

  return (
    <TaskPage
      title="Requirements Checklist"
      description="Your private submission checklist for every stage of the OJT lifecycle."
      tabs={Object.keys(requirementsByPhase)}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <section className="requirement-summary">
        <div><span>Stage progress</span><strong>{completed} / {requirements.length}</strong></div>
        <div className="requirement-progress"><span style={{ width: `${Math.max(8, (completed / requirements.length) * 100)}%` }} /></div>
        <small>{requirements.length - completed} item{requirements.length - completed === 1 ? '' : 's'} still need attention</small>
      </section>
      <section className="workspace-panel requirement-table">
        <div className="requirement-table-head">
          <span>Requirement</span><span>File / type</span><span>Last update</span><span>Status</span><span />
        </div>
        {requirements.map((item) => (
          <div className="requirement-row" key={item.name}>
            <div className="requirement-name">
              <span className="file-tile"><Icon name="file" size={17} /></span>
              <div><strong>{item.name}</strong><small>Private to you and authorized reviewers</small></div>
            </div>
            <span>{item.detail}</span>
            <span>{item.updated}</span>
            <span className={statusClass(item.status)}>{item.status}</span>
            <button className="details-button" type="button">{item.status === 'Not Submitted' ? 'Upload' : 'Open'}</button>
          </div>
        ))}
      </section>
    </TaskPage>
  )
}

export function DtrPage() {
  const [activeTab, setActiveTab] = useState('Activity')
  const [entryModalOpen, setEntryModalOpen] = useState(false)

  return (
    <>
      <TaskPage
        title="DTR / TITO"
        description="Record daily attendance and prepare one final DTR package for coordinator review."
        tabs={['Activity', 'Daily Records', 'Final DTR Package']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        action={(
          <button className="primary-button" type="button" onClick={() => setEntryModalOpen(true)}>
            <Icon name="clock" size={17} /> Add time entry
          </button>
        )}
      >
        {activeTab === 'Activity' && <DtrActivity />}
        {activeTab === 'Daily Records' && <DtrRecords />}
        {activeTab === 'Final DTR Package' && <FinalPackage type="DTR" />}
      </TaskPage>
      {entryModalOpen && <DtrEntryModal onClose={() => setEntryModalOpen(false)} />}
    </>
  )
}

function DtrEntryModal({ onClose }) {
  const [method, setMethod] = useState('manual')
  const [qrReady, setQrReady] = useState(false)
  const methods = [
    ['manual', 'clock', 'Manual Entry', 'Enter time in and time out together'],
    ['qr', 'qrCode', 'QR Scan', 'Scan one attendance event at a time'],
    ['proof', 'upload', 'Upload Proof', 'Attach a photo or attendance file'],
    ['company', 'building', 'Company Record', 'Use a company-issued record'],
  ]

  const SessionField = () => (
    <label className="dtr-entry-field">
      <span>Session</span>
      <select defaultValue="whole_day">
        <option value="whole_day">Whole day</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="overtime">Overtime</option>
        <option value="other">Other</option>
      </select>
    </label>
  )

  return (
    <div className="dtr-entry-backdrop" role="presentation" onClick={onClose}>
      <section
        className="dtr-entry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dtr-entry-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dtr-entry-modal-header">
          <div>
            <span className="eyebrow">Daily time record</span>
            <h2 id="dtr-entry-title">Add DTR Entry</h2>
            <p>Choose the source of today&apos;s attendance record.</p>
          </div>
          <button className="dtr-modal-close" type="button" aria-label="Close DTR entry" onClick={onClose}>×</button>
        </header>

        <div className="dtr-method-picker" aria-label="DTR entry method">
          {methods.map(([value, icon, label, description]) => (
            <button
              className={method === value ? 'dtr-method-card active' : 'dtr-method-card'}
              type="button"
              onClick={() => {
                setMethod(value)
                setQrReady(false)
              }}
              key={value}
            >
              <span><Icon name={icon} size={19} /></span>
              <div><strong>{label}</strong><small>{description}</small></div>
              <i>{method === value ? 'Selected' : 'Choose'}</i>
            </button>
          ))}
        </div>

        {method === 'manual' && (
          <form className="dtr-manual-form" onSubmit={(event) => { event.preventDefault(); onClose() }}>
            <div className="dtr-entry-field-grid">
              <label className="dtr-entry-field">
                <span>Date</span>
                <input type="date" defaultValue="2026-06-29" />
              </label>
              <SessionField />
              <label className="dtr-entry-field">
                <span>Time in</span>
                <input type="time" />
              </label>
              <label className="dtr-entry-field">
                <span>Time out</span>
                <input type="time" />
              </label>
              <label className="dtr-entry-field">
                <span>Break (minutes)</span>
                <input type="number" defaultValue="60" min="0" />
              </label>
              <label className="dtr-entry-field full-span">
                <span>Task description</span>
                <textarea rows="4" placeholder="Describe the tasks you completed today..." />
              </label>
            </div>
            <footer className="dtr-entry-modal-footer">
              <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
              <button className="primary-button" type="submit"><Icon name="checkCircle" size={16} /> Add Entry</button>
            </footer>
          </form>
        )}

        {method === 'qr' && (
          <div className="dtr-qr-content">
            <div className="dtr-entry-field-grid">
              <label className="dtr-entry-field">
                <span>Date</span>
                <input type="date" defaultValue="2026-06-29" />
              </label>
              <SessionField />
            </div>
            <div className={qrReady ? 'dtr-qr-scanner active' : 'dtr-qr-scanner'}>
              <span className="dtr-qr-frame"><Icon name="qrCode" size={54} /></span>
              <div>
                <strong>{qrReady ? 'Scanner ready' : 'Scan your workplace QR code'}</strong>
                <p>{qrReady ? 'Place the attendance QR code inside the frame.' : 'OJThink will use your device camera to record your time.'}</p>
              </div>
              {qrReady && <span className="status-pill status-accepted">Camera active</span>}
            </div>
            <div className="dtr-qr-note">
              <Icon name="checkCircle" size={18} />
              <p><strong>Time In or Time Out is detected automatically.</strong> The system checks your existing record for this date and session.</p>
            </div>
            <footer className="dtr-entry-modal-footer">
              <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
              <button className="primary-button" type="button" onClick={() => setQrReady(true)}>
                <Icon name="qrCode" size={16} /> {qrReady ? 'Scanner Active' : 'Start QR Scanner'}
              </button>
            </footer>
          </div>
        )}

        {(method === 'proof' || method === 'company') && (
          <form className="dtr-manual-form" onSubmit={(event) => { event.preventDefault(); onClose() }}>
            <div className="dtr-entry-field-grid">
              <label className="dtr-entry-field">
                <span>Date</span>
                <input type="date" defaultValue="2026-06-29" />
              </label>
              <SessionField />
              {method === 'company' && (
                <label className="dtr-entry-field full-span">
                  <span>Record source</span>
                  <input placeholder="e.g. Full Scale PH biometric record" />
                </label>
              )}
              <button className="upload-dropzone compact full-span" type="button">
                <Icon name="upload" size={20} />
                <strong>{method === 'proof' ? 'Upload attendance proof' : 'Upload company attendance record'}</strong>
                <small>JPG, PNG, or PDF · up to 10 MB</small>
              </button>
              <label className="dtr-entry-field full-span">
                <span>Notes</span>
                <textarea rows="3" placeholder="Add context about this attendance record..." />
              </label>
            </div>
            <div className="dtr-qr-note">
              <Icon name="checkCircle" size={18} />
              <p><strong>This saves as a daily record.</strong> Daily entries do not need approval; only your final DTR package is reviewed.</p>
            </div>
            <footer className="dtr-entry-modal-footer">
              <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
              <button className="primary-button" type="submit"><Icon name="checkCircle" size={16} /> Save Recorded Entry</button>
            </footer>
          </form>
        )}
      </section>
    </div>
  )
}

function DtrActivity() {
  return (
    <>
      <section className="dtr-stat-grid">
        {[
          ['Hours rendered', '184h 30m', '34% of 540 hours', 'clock'],
          ['Days recorded', '24', '22 complete · 2 drafts', 'calendar'],
          ['Average per day', '7h 41m', 'This placement period', 'dashboard'],
          ['Current streak', '9 days', 'Personal best: 12', 'checkCircle'],
        ].map(([label, value, detail, icon]) => (
          <article className="dtr-stat-card" key={label}>
            <span><Icon name={icon} size={18} /></span>
            <small>{label}</small>
            <strong>{value}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="workspace-panel heatmap-panel">
        <MonthlyAttendanceCalendar />
      </section>

      <section className="workspace-panel recent-dtr">
        <div className="heatmap-heading">
          <div><span className="eyebrow">Latest activity</span><h2>Recent time entries</h2></div>
          <button className="details-button" type="button">View all records</button>
        </div>
        <DtrTable rows={dtrRows.slice(0, 3)} />
      </section>
    </>
  )
}

const attendanceMonths = [
  {
    label: 'May 2026',
    year: 2026,
    month: 4,
    recorded: [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22],
  },
  {
    label: 'June 2026',
    year: 2026,
    month: 5,
    recorded: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 24, 25],
  },
  {
    label: 'July 2026',
    year: 2026,
    month: 6,
    recorded: [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16],
  },
]

function MonthlyAttendanceCalendar() {
  const [monthIndex, setMonthIndex] = useState(1)
  const selectedMonth = attendanceMonths[monthIndex]
  const daysInMonth = new Date(selectedMonth.year, selectedMonth.month + 1, 0).getDate()
  const mondayOffset = (new Date(selectedMonth.year, selectedMonth.month, 1).getDay() + 6) % 7
  const calendarCells = [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  while (calendarCells.length % 7 !== 0) calendarCells.push(null)

  return (
    <div className="monthly-attendance">
      <div className="monthly-attendance-heading">
        <div>
          <span className="eyebrow">Attendance activity</span>
          <h2>{selectedMonth.recorded.length} recorded days in {selectedMonth.label.split(' ')[0]}</h2>
          <p>Each filled date represents one completed attendance record.</p>
        </div>
        <div className="month-switcher" aria-label="Attendance month">
          <button
            type="button"
            aria-label="Previous month"
            disabled={monthIndex === 0}
            onClick={() => setMonthIndex((index) => Math.max(0, index - 1))}
          >
            <Icon name="arrowLeft" size={16} />
          </button>
          <strong><Icon name="calendar" size={16} /> {selectedMonth.label}</strong>
          <button
            className="next"
            type="button"
            aria-label="Next month"
            disabled={monthIndex === attendanceMonths.length - 1}
            onClick={() => setMonthIndex((index) => Math.min(attendanceMonths.length - 1, index + 1))}
          >
            <Icon name="arrowLeft" size={16} />
          </button>
        </div>
      </div>

      <div className="attendance-calendar" aria-label={`${selectedMonth.label} attendance calendar`}>
        <div className="attendance-weekdays" aria-hidden="true">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="attendance-calendar-grid">
          {calendarCells.map((day, index) => {
            if (!day) return <span className="attendance-day empty" aria-hidden="true" key={`empty-${index}`} />

            const dayOfWeek = new Date(selectedMonth.year, selectedMonth.month, day).getDay()
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const isRecorded = selectedMonth.recorded.includes(day)

            return (
              <span
                className={`attendance-day${isRecorded ? ' recorded' : ''}${isWeekend ? ' weekend' : ''}`}
                title={`${selectedMonth.label.split(' ')[0]} ${day}: ${isRecorded ? 'Attendance recorded' : 'No attendance record'}`}
                key={day}
              >
                <strong>{day}</strong>
                {isRecorded && <small>Recorded</small>}
              </span>
            )
          })}
        </div>
      </div>

      <div className="attendance-calendar-footer">
        <div className="attendance-legend">
          <span><i className="recorded" /> Recorded</span>
          <span><i /> No record</span>
          <span><i className="weekend" /> Weekend</span>
        </div>
        <div className="attendance-month-total">
          <span>Month total</span>
          <strong>{selectedMonth.recorded.length * 8} hours</strong>
        </div>
      </div>
    </div>
  )
}

function DtrRecords() {
  return (
    <section className="workspace-panel recent-dtr">
      <div className="heatmap-heading">
        <div><span className="eyebrow">Student-maintained records</span><h2>Daily DTR Records</h2></div>
        <label className="compact-search"><Icon name="search" size={16} /><input placeholder="Search records" /></label>
      </div>
      <DtrTable rows={dtrRows} />
    </section>
  )
}

function DtrTable({ rows }) {
  return (
    <div className="dtr-table">
      <div className="dtr-table-head"><span>Date</span><span>Time in</span><span>Time out</span><span>Total</span><span>Method</span><span>Status</span></div>
      {rows.map((row) => (
        <div className="dtr-table-row" key={row[0]}>
          {row.map((cell, index) => index === 5 ? <span className={statusClass(cell)} key={cell}>{cell}</span> : <span key={`${cell}-${index}`}>{cell}</span>)}
        </div>
      ))}
    </div>
  )
}

function FinalPackage({ type }) {
  return (
    <div className="package-layout">
      <section className="workspace-panel package-card">
        <span className="package-icon"><Icon name="file" size={24} /></span>
        <span className="eyebrow">Final coordinator-reviewed submission</span>
        <h2>Final {type} Package</h2>
        <p>Daily records remain student-maintained. Submit the compiled final package once your OJT period is complete.</p>
        <div className="package-stats">
          <span><small>Coverage</small><strong>Jun 16 – Sep 5</strong></span>
          <span><small>{type === 'DTR' ? 'Claimed hours' : 'Included entries'}</small><strong>{type === 'DTR' ? '184h 30m' : '12 entries'}</strong></span>
          <span><small>Status</small><strong>Not Submitted</strong></span>
        </div>
        <button className="upload-dropzone" type="button">
          <Icon name="upload" size={22} />
          <strong>Choose final package</strong>
          <small>PDF or ZIP · up to 25 MB</small>
        </button>
        <button className="primary-button" type="button">Submit final package</button>
      </section>
      <aside className="workspace-panel package-checklist">
        <span className="eyebrow">Before you submit</span>
        <h2>Package checklist</h2>
        {[
          'All dates and time entries are complete',
          'Supervisor signature is included',
          'Claimed hours match your daily records',
          'Uploaded document is readable',
        ].map((item, index) => (
          <div key={item}><Icon name={index < 2 ? 'checkCircle' : 'clock'} size={17} /><span>{item}</span></div>
        ))}
      </aside>
    </div>
  )
}

export function JournalPage() {
  const [activeTab, setActiveTab] = useState('Entries')

  return (
    <TaskPage
      title="Journal / Diary"
      description="Capture daily work and reflection, then submit one final journal package."
      tabs={['Entries', 'New Entry', 'Final Journal Package']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={<button className="primary-button" type="button" onClick={() => setActiveTab('New Entry')}><Icon name="journal" size={17} /> Write entry</button>}
    >
      {activeTab === 'Entries' && (
        <section className="journal-list">
          {journalEntries.map(([date, title, excerpt, status]) => (
            <article className="workspace-panel journal-entry-card" key={title}>
              <time>{date}</time>
              <div><span className="eyebrow">Daily reflection</span><h2>{title}</h2><p>{excerpt}</p></div>
              <span className={statusClass(status)}>{status}</span>
              <button className="details-button" type="button">Edit</button>
            </article>
          ))}
        </section>
      )}
      {activeTab === 'New Entry' && <JournalEditor onSaved={() => setActiveTab('Entries')} />}
      {activeTab === 'Final Journal Package' && <FinalPackage type="Journal" />}
    </TaskPage>
  )
}

function JournalEditor({ onSaved }) {
  return (
    <section className="workspace-panel journal-editor">
      <div className="journal-editor-head">
        <div><span className="eyebrow">Daily reflection</span><h2>New journal entry</h2></div>
        <span>June 28, 2026</span>
      </div>
      <label className="task-field"><span>Entry title</span><input placeholder="What did you work on today?" /></label>
      <label className="task-field"><span>Reflection</span><textarea rows="9" placeholder="Describe your tasks, learning, challenges, and reflections..." /></label>
      <button className="upload-dropzone compact" type="button"><Icon name="upload" size={19} /><strong>Add one attachment</strong><small>Optional · JPG, PNG, or PDF</small></button>
      <div className="form-actions"><button className="secondary-button" type="button">Save draft</button><button className="primary-button" type="button" onClick={onSaved}>Save entry</button></div>
    </section>
  )
}

function TaskPage({ title, description, tabs, activeTab, onTabChange, action, children }) {
  return (
    <main className="student-main">
      <section className="task-page">
        <div className="task-page-heading">
          <div className="page-title"><h1>{title}</h1><p>{description}</p></div>
          {action}
        </div>
        <div className="tab-list task-tabs" role="tablist" aria-label={`${title} tabs`}>
          {tabs.map((tab) => (
            <button className={activeTab === tab ? 'tab active' : 'tab'} type="button" key={tab} onClick={() => onTabChange(tab)}>{tab}</button>
          ))}
        </div>
        {children}
      </section>
    </main>
  )
}

function statusClass(status) {
  if (status === 'Accepted' || status === 'Recorded' || status === 'Saved') return 'status-pill status-accepted'
  if (status === 'Needs Revision') return 'status-pill status-revision'
  if (status === 'Under Review') return 'status-pill status-review'
  if (status === 'Draft') return 'status-pill status-draft'
  return 'status-pill status-submitted'
}
