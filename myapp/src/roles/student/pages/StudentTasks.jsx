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

export function CompanySelectionPage() {
  const [selectedTrack, setSelectedTrack] = useState('track-a')
  const [activeTab, setActiveTab] = useState('Listed Companies')

  const selectTrack = (track) => {
    setSelectedTrack(track)
    setActiveTab(placementJourneys[track][0].id)
  }

  return (
    <main className="student-main">
      <section className="task-page placement-page">
        <div className="task-page-heading">
          <div className="page-title">
            <h1>Placement</h1>
            <p>Choose the path that matches your company, then follow its guided steps.</p>
          </div>
          <span className="placement-overall-status">
            <Icon name={selectedTrack === 'track-a' ? 'checkCircle' : 'briefcase'} size={16} />
            {selectedTrack === 'track-a' ? 'Current account: Track A' : 'Previewing Track B'}
          </span>
        </div>

        <TrackPathSelector selectedTrack={selectedTrack} onSelectTrack={selectTrack} />

        <PlacementJourney
          track={selectedTrack}
          activeStep={activeTab}
          onStepChange={setActiveTab}
        />

        {activeTab === 'My Placement' && <PlacementOverview track={selectedTrack} onGoConfirmation={() => setActiveTab('Acceptance Confirmation')} />}
        {activeTab === 'Listed Companies' && <ListedCompanies />}
        {activeTab === 'Company Verification' && <CompanyVerification />}
        {activeTab === 'Outside Company' && <OutsideCompanyStart onContinue={() => setActiveTab('Company Verification')} />}
        {activeTab === 'Company Acceptance' && <CompanyAcceptance track={selectedTrack} onContinue={() => setActiveTab('Acceptance Confirmation')} />}
        {activeTab === 'Acceptance Confirmation' && <AcceptanceConfirmation key={selectedTrack} initialTrack={selectedTrack} />}
        {activeTab === 'Coordinator Review' && <CoordinatorReviewGuide onContinue={() => setActiveTab('My Placement')} />}
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

function TrackPathSelector({ selectedTrack, onSelectTrack }) {
  return (
    <section className="track-path-section" aria-labelledby="track-path-title">
      <div className="track-path-heading">
        <span className="track-path-kicker">Start here</span>
        <div>
          <h2 id="track-path-title">Which company path applies to you?</h2>
          <p>You can switch paths anytime while exploring this prototype.</p>
        </div>
      </div>

      <div className="track-path-grid">
        <button
          className={selectedTrack === 'track-a' ? 'track-path-card active' : 'track-path-card'}
          type="button"
          aria-pressed={selectedTrack === 'track-a'}
          onClick={() => onSelectTrack('track-a')}
        >
          <span className="track-path-letter">A</span>
          <span className="track-path-copy">
            <span className="eyebrow">Listed partner company</span>
            <strong>Track A</strong>
            <small>Choose this when the company already appears in OJThink.</small>
          </span>
          <span className="track-path-facts">
            <span><Icon name="checkCircle" size={15} /> Skip company verification</span>
            <span><Icon name="workspace" size={15} /> Company workspace</span>
          </span>
          <span className="track-path-select">{selectedTrack === 'track-a' ? 'Selected' : 'Choose Track A'}</span>
        </button>

        <button
          className={selectedTrack === 'track-b' ? 'track-path-card active' : 'track-path-card'}
          type="button"
          aria-pressed={selectedTrack === 'track-b'}
          onClick={() => onSelectTrack('track-b')}
        >
          <span className="track-path-letter">B</span>
          <span className="track-path-copy">
            <span className="eyebrow">Outside or unlisted company</span>
            <strong>Track B</strong>
            <small>Choose this when your company is not listed in OJThink.</small>
          </span>
          <span className="track-path-facts">
            <span><Icon name="checkCircle" size={15} /> Verification is required</span>
            <span><Icon name="workspace" size={15} /> Shared Track B workspace</span>
          </span>
          <span className="track-path-select">{selectedTrack === 'track-b' ? 'Selected' : 'Choose Track B'}</span>
        </button>
      </div>

      <div className="shared-placement-rule">
        <Icon name="checkCircle" size={18} />
        <p><strong>Same final rule for both tracks:</strong> placement becomes official only after the coordinator accepts your Acceptance Confirmation.</p>
      </div>
    </section>
  )
}

function PlacementJourney({ track, activeStep, onStepChange }) {
  const steps = placementJourneys[track]
  const selectedStep = steps.find((step) => step.id === activeStep) || steps[0]
  const activeIndex = steps.findIndex((step) => step.id === selectedStep.id)

  return (
    <section className="placement-journey" aria-label="Placement steps">
      <div className="journey-title-row">
        <div>
          <span className="eyebrow">{track === 'track-a' ? 'Track A process' : 'Track B process'}</span>
          <h2>Follow these steps in order</h2>
        </div>
        <span className="phase-chip">{track === 'track-a' ? 'Listed Company' : 'Outside Company'}</span>
      </div>
      <div className="placement-stepper" style={{ '--step-count': steps.length }}>
        {steps.map((step, index) => (
          <button
            className={activeStep === step.id ? 'journey-step active' : 'journey-step'}
            type="button"
            key={step.id}
            onClick={() => onStepChange(step.id)}
          >
            <span className={`journey-marker ${index < activeIndex ? 'completed' : index === activeIndex ? 'current' : 'upcoming'}`}>
              {index < activeIndex ? <Icon name="checkCircle" size={17} /> : index + 1}
            </span>
            <strong>{step.title}</strong>
            <small>{step.short}</small>
            {index < steps.length - 1 && <i className={index < activeIndex ? 'completed' : ''} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="journey-guidance">
        <span className="journey-guidance-number">Step {activeIndex + 1}</span>
        <div>
          <span className="eyebrow">{selectedStep.badge}</span>
          <strong>{selectedStep.detail}</strong>
          <p>{selectedStep.action}</p>
        </div>
        <span className="status-pill status-review">{selectedStep.badge}</span>
      </div>
    </section>
  )
}

function PlacementOverview({ track, onGoConfirmation }) {
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

function OutsideCompanyStart({ onContinue }) {
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

function CompanyAcceptance({ track, onContinue }) {
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

function CoordinatorReviewGuide({ onContinue }) {
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

function ListedCompanies() {
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

function CompanyVerification() {
  const [mode, setMode] = useState('status')

  if (mode === 'form') {
    return (
      <section className="workspace-panel task-form-panel">
        <div className="coordinator-panel-heading compact">
          <div>
            <span className="eyebrow">Outside or unlisted company</span>
            <h2>New Verification Request</h2>
          </div>
          <button className="secondary-button" type="button" onClick={() => setMode('status')}>Cancel</button>
        </div>
        <div className="form-note">
          <Icon name="building" size={18} />
          <p>Verification only checks if the company is a valid OJT site. It does not confirm placement or classify your track.</p>
        </div>
        <div className="task-field-grid">
          {[
            ['Company name', 'e.g. Acme Technologies'],
            ['Company address', 'Complete office address'],
            ['Contact person', 'Supervisor or HR contact'],
            ['Contact email', 'name@company.com'],
            ['Department / office', 'Proposed assignment'],
            ['Proposed OJT role', 'Role or job description'],
          ].map(([field, placeholder]) => (
            <label className="task-field" key={field}>
              <span>{field}</span>
              <input type="text" placeholder={placeholder} />
            </label>
          ))}
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
          <button className="primary-button" type="button" onClick={() => setMode('status')}>Submit for verification</button>
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

function AcceptanceConfirmation({ initialTrack = 'track-a' }) {
  const selectedTrack = initialTrack
  const isTrackB = selectedTrack === 'track-b'

  return (
    <div className="confirmation-layout">
      <section className="workspace-panel confirmation-form">
        <div className="coordinator-panel-heading compact">
          <div>
            <span className="eyebrow">Official placement checkpoint</span>
            <h2>Acceptance Confirmation</h2>
          </div>
          <span className="status-pill status-accepted">Accepted</span>
        </div>

        <div className="selected-track-summary">
          <span className="selected-track-letter">{isTrackB ? 'B' : 'A'}</span>
          <div>
            <span className="eyebrow">Selected placement path</span>
            <strong>{isTrackB ? 'Track B' : 'Track A'}</strong>
            <small>{isTrackB ? 'Verified outside or unlisted company' : 'Listed OJThink partner company'}</small>
          </div>
          <span className="selected-track-locked"><Icon name="checkCircle" size={15} /> Selected earlier</span>
        </div>

        <div className="confirmation-summary">
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
        </div>
      </section>
      <aside className="workspace-panel status-timeline">
        <span className="eyebrow">Review history</span>
        <h2>Placement confirmed</h2>
        {[
          ['Jun 18 · 2:35 PM', 'Accepted', 'Placement confirmed by coordinator'],
          ['Jun 18 · 9:10 AM', 'Under review', 'Review started by Dr. Santos'],
          ['Jun 17 · 4:42 PM', 'Submitted', 'Confirmation Slip submitted'],
        ].map(([time, status, detail]) => (
          <div className="timeline-item" key={time}>
            <span />
            <div><small>{time}</small><strong>{status}</strong><p>{detail}</p></div>
          </div>
        ))}
      </aside>
    </div>
  )
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

  return (
    <TaskPage
      title="DTR / TITO"
      description="Record daily attendance and prepare one final DTR package for coordinator review."
      tabs={['Activity', 'Daily Records', 'Final DTR Package']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      action={<button className="primary-button" type="button"><Icon name="clock" size={17} /> Add time entry</button>}
    >
      {activeTab === 'Activity' && <DtrActivity />}
      {activeTab === 'Daily Records' && <DtrRecords />}
      {activeTab === 'Final DTR Package' && <FinalPackage type="DTR" />}
    </TaskPage>
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
